<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Db;

use DateInterval;
use DateTime;
use DateTimeImmutable;
use DateTimeZone;
use JsonSerializable;
use OCA\Agora\Exceptions\InsufficientAttributesException;
use OCA\Agora\Model\SimpleOption;
use OCA\Agora\Model\UserBase;
use OCP\IL10N;

/**
 * @psalm-suppress UnusedProperty
 * @method         int getId()
 * @method         void setId(int $value)
 * @method         int getConfirmed()
 * @method         void setConfirmed(int $value)
 * @method         int getDuration()
 * @method         void setDuration(int $value)
 * @method         int getOrder()
 * @method         void setOrder(int $value)
 * @method         string getOwner()
 * @method         void setOwner(string $value)
 * @method         int getInquiryId()
 * @method         void setInquiryId(int $value)
 * @method         string getInquiryOptionText()
 * @method         void setInquiryOptionText(string $value)
 * @method         string getInquiryOptionHash()
 * @method         void setInquiryOptionHash(string $value)
 * @method         int getReleased()
 * @method         void setReleased(int $value)
 * @method         int getTimestamp()
 * @method         void setTimestamp(int $value)
 * @method         int getDeleted()
 * @method         void setDeleted(int $value)
 *
 * Joined Attributes
 * @method         int getOptionLimit()
 * @method         int getSupportLimit()
 * @method         int getCountOptionSupports()
 * @method         int getShowResults()
 */
class Option extends EntityWithUser implements JsonSerializable
{
    public const TABLE = 'agora_options';

    // schema columns
    public $id = null;
    protected int $inquiryId = 0;
    protected string $inquiryOptionText = '';
    protected string $inquiryOptionHash = '';
    protected int $timestamp = 0;
    protected int $duration = 0;
    protected int $order = 0;
    protected int $confirmed = 0;
    protected string $owner = '';
    protected int $released = 0;
    protected int $deleted = 0;

    // joined columns
    protected int $optionLimit = 0;
    protected int $supportLimit = 0;
    protected int $countOptionSupports = 0;
    protected int $showResults = 0;

    public function __construct()
    {
        $this->addType('released', 'integer');
        $this->addType('inquiryId', 'integer');
        $this->addType('timestamp', 'integer');
        $this->addType('order', 'integer');
        $this->addType('confirmed', 'integer');
        $this->addType('duration', 'integer');
        $this->addType('deleted', 'integer');

        // joined Attributes
        $this->addType('optionLimit', 'integer');
        $this->addType('supportLimit', 'integer');
        $this->addType('countOptionSupports', 'integer');
        $this->addType('showResults', 'integer');
    }

    /**
     * @return array
     *
     * @psalm-suppress PossiblyUnusedMethod
     */
    public function jsonSerialize(): array
    {
        return [
        'id' => $this->getId(),
        'inquiryId' => $this->getInquiryId(),
        'text' => $this->getInquiryOptionText(),
        'timestamp' => $this->getTimestamp(),
        'deleted' => $this->getDeleted(),
        'order' => $this->getOrder(),
        'confirmed' => $this->getConfirmed(),
        'duration' => $this->getDuration(),
        'locked' => $this->getIsLocked(),
        'hash' => $this->getInquiryOptionHash(),
        'isOwner' => $this->getCurrentUserIsEntityUser(),
        'supports' => $this->getSupports(),
        'owner' => $this->getOwnerUser(),
        ];
    }

    private function getSupports(): array
    {
        return [
        'count' => $this->getCountOptionSupports() * $this->getShowResults(),
        'currentUser' => $this->getUserSupportAnswer(),
        ];
    }

    public function getOwnerUser(): ?UserBase
    {
        if ($this->getOwner() === '') {
            return null;
        }
        return parent::getUser();
    }

    public function setFromSimpleOption(SimpleOption $option): void
    {
        $this->setOption(
            $option->getTimestamp(),
            $option->getDuration(),
            $option->getText(),
            $option->getOrder(),
        );
        $this->setDeleted(0);
        $this->syncOption();
    }

    /**
     * cumulative Set option entities cumulative and validated
     * if timestamp is given, the inquiryOptionText will be synced according to the timestamp and duration
     *
     * @param  int    $timestamp         Timestamp to set
     * @param  int    $duration          Set duration of option in seconds and used together with timestamp, defaults to 0
     * @param  string $inquiryOptionText Option text, ignored if $timestamp is set
     * @param  int    $order             Set order of this option inside the inquiry, defaults to 0, ignored if timestap is set
     * @return void
     */
    public function setOption(
        int $timestamp = 0,
        int $duration = 0,
        string $inquiryOptionText = '',
        int $order = 0,
    ): void {

        if ($timestamp) {
            $this->setTimestamp($timestamp);
            $this->setDuration($duration);
        } elseif ($inquiryOptionText) {
            $this->setInquiryOptionText($inquiryOptionText);
            if ($order > 0) {
                $this->setOrder($order);
            }
        } else {
            throw new InsufficientAttributesException('Option must have a value');
        }

        $this->syncOption();
    }

    public function shiftOption(DateTimeZone $timeZone, int $step, string $unit): void
    {
        $from = (new DateTime())
            ->setTimestamp($this->getTimestamp())
            ->setTimezone($timeZone)
            ->modify($step . ' ' . $unit);
        $to = (new DateTime())
            ->setTimestamp($this->getTimestamp() + $this->getDuration())
            ->setTimezone($timeZone)
            ->modify($step . ' ' . $unit);
        $this->setTimestamp($from->getTimestamp());
        $this->setDuration($to->getTimestamp() - $from->getTimestamp());
        $this->syncOption();
    }

    /**
     * Syncs inquiryOptionText and order according to timestamp and duration if timestamp > 0
     * Updates hash
     */
    public function syncOption(): void
    {
        // make sure, inquiryOptionText matches timestamp and duration
        // timestamp gets precedence over inquiryOptionText
        if ($this->getTimestamp()) {
            $this->setOrder($this->getTimestamp());

            if ($this->duration) {
                $this->setInquiryOptionText(date('c', $this->getTimestamp()) . ' - ' . date('c', $this->getTimestamp() + $this->getDuration()));
            } else {
                $this->setInquiryOptionText(date('c', $this->timestamp));
            }
        }

        // update hash
        $this->updateHash();
    }

    private function updateHash(): void
    {
        $this->setInquiryOptionHash(hash('md5', $this->getInquiryId() . $this->getInquiryOptionText() . $this->getTimestamp()));
    }

    public function getInquiryOptionText(): string
    {
        if ($this->getTimestamp() === 0) {
            return htmlspecialchars_decode($this->inquiryOptionText);
        }

        // return timespan, if duration is set
        if ($this->getDuration()) {
            return date('c', $this->getTimestamp()) . ' - ' . date('c', $this->getTimestamp() + $this->getDuration());
        }

        // else return formatted timestamp
        return date('c', $this->getTimestamp());
    }

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function getInquiryOptionTextEnd(): string
    {
        if ($this->getTimestamp()) {
            return date('c', $this->getTimestamp() + $this->getDuration());
        }
        return htmlspecialchars_decode($this->inquiryOptionText);
    }

    public function getInquiryOptionTextStart(): string
    {
        if ($this->getTimestamp()) {
            return date('c', $this->getTimestamp());
        }
        return htmlspecialchars_decode($this->inquiryOptionText);
    }

    public function getIsLocked(): bool
    {
        return $this->getDeleted() && ($this->getIsLockedByOptionLimit() || $this->getIsLockedBySupportsLimit());
    }

    /**
     * @return bool Returns true, if this option is locked by the optionLimit and the user has not supportd yes
     */
    public function getIsLockedByOptionLimit(): bool
    {
        //    return $this->getOptionLimit() && $this->getSupportsYes() >= $this->getOptionLimit() && $this->getUserSupportAnswer() !== Support::VOTE_YES;
        return false;
    }

    public function getIsLockedBySupportsLimit(): bool
    {
        // IF a support limit is set
        // AND the user did not support yes for this option
        // AND the count of yes supports of the current user is EQUAL OR GREATER THAN the support limit
        // return true (locked option for current user)
        return $this->getSupportLimit();
    }

    public function getOrder(): int
    {
        if ($this->timestamp) {
            return $this->getTimestamp();
        }
        return $this->order;
    }

    // alias of getOwner()
    public function getUserId(): string
    {
        return $this->getOwner();
    }

    public function getDateStringLocalized(DateTimeZone $timeZone, IL10N $l10n): string
    {
        $mutableFrom = DateTime::createFromImmutable($this->getDateObjectFrom($timeZone));
        $mutableTo = DateTime::createFromImmutable($this->getDateObjectTo($timeZone));
        $dayLongSecond = new DateInterval('PT1S');
        $sameDay = $this->getDateObjectFrom($timeZone)->format('Y-m-d') === $this->getDateObjectTo($timeZone)->format('Y-m-d');

        // If duration is zero, the option represents a moment with day and time
        if ($this->getDuration() === 0) {
            return (string)$l10n->l('datetime', $mutableFrom);
        }

        $dateTimeFrom = $l10n->l('datetime', $mutableFrom);
        $dateTimeTo = $l10n->l('datetime', $mutableTo);

        // If the option spans over on or more whole days, the option represents only the days without time
        // adjust the end by substracting a second, to represent the last moment at the day and not the first moment of the following day
        // which is calculated by adding the duration
        if ($this->getDaylong($timeZone)) {
            $dateTimeFrom = $l10n->l('date', $mutableFrom);
            $dateTimeTo = $l10n->l('date', $mutableTo->sub($dayLongSecond));
            // if start and end day are identiacal, just return the start day
            if ($dateTimeFrom === $dateTimeTo) {
                return (string)$dateTimeFrom;
            }
        }

        if ($sameDay) {
            $dateTimeTo = $l10n->l('time', $mutableTo);
        }

        return (string)$dateTimeFrom . ' - ' . (string)$dateTimeTo;
    }

    /**
     * Check, if the date option spans one or more whole days (from 00:00 to 24:00)
     */
    private function getDaylong(DateTimeZone $timeZone): bool
    {
        $from = $this->getDateObjectFrom($timeZone);
        $to = $this->getDateObjectTo($timeZone);
        $dateInterval = $from->diff($to);

        if ($this->getDuration() > 0
            && $from->format('H') === '00'
            && $dateInterval->h + $dateInterval->i + $dateInterval->h === 0
        ) {
            return true;
        }
        return false;
    }

    private function getDateObjectFrom(DateTimeZone $timeZone): DateTimeImmutable
    {
        $dateTime = (new DateTimeImmutable())->setTimestamp($this->getTimestamp());
        return $dateTime->setTimezone($timeZone);
    }

    private function getDateObjectTo(DateTimeZone $timeZone): DateTimeImmutable
    {
        $dateTime = (new DateTimeImmutable())->setTimestamp($this->getTimestamp() + $this->getDuration());
        return $dateTime->setTimezone($timeZone);
    }
}
