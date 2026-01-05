<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use DateTimeZone;
use OCA\Agora\Db\Option;
use OCA\Agora\Db\OptionMapper;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\Support;
use OCA\Agora\Event\OptionConfirmedEvent;
use OCA\Agora\Event\OptionCreatedEvent;
use OCA\Agora\Event\OptionDeletedEvent;
use OCA\Agora\Event\OptionUnconfirmedEvent;
use OCA\Agora\Event\OptionUpdatedEvent;
use OCA\Agora\Event\InquiryOptionReorderedEvent;
use OCA\Agora\Exceptions\ForbiddenException;
use OCA\Agora\Exceptions\InvalidInquiryTypeException;
use OCA\Agora\Model\Sequence;
use OCA\Agora\Model\SimpleOption;
use OCA\Agora\UserSession;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\DB\Exception;
use OCP\EventDispatcher\IEventDispatcher;
use Psr\Log\LoggerInterface;

class OptionService
{
    /**
     * @var Option[] 
     */
    private array $options;

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private IEventDispatcher $eventDispatcher,
        private LoggerInterface $logger,
        private OptionMapper $optionMapper,
        private InquiryMapper $inquiryMapper,
        private UserSession $userSession,
        private SupportService $supportService,
    ) {
        $this->options = [];
    }

    public function get(int $optionId): Option
    {
        return $this->optionMapper->find($optionId);
    }

    /**
     * Get all options of given inquiry
     *
     * @return Option[]
     *
     * @psalm-return array<array-key, Option>
     */
    public function list(int $inquiryId): array
    {

        try {
            $this->options = $this->optionMapper->findByInquiry($inquiryId);

        } catch (DoesNotExistException $e) {
            $this->options = [];
        }

        return array_values($this->options);
    }

    /**
     * Intermediate step to avoid code duplication
     */
    public function addWithSequenceAndAutoSupport(
        int $inquiryId,
        SimpleOption $option,
        bool $supportYes = false,
        ?Sequence $sequence = null,
    ): array {

        $newOption = $this->add($inquiryId, $option, $supportYes);


        if ($sequence) {
            $repetitions = $this->sequence($newOption, $sequence, $supportYes);
        } else {
            $repetitions = [];
        }

        return [
        'option' => $newOption,
        'repetitions' => $repetitions,
        ];
    }

    /**
     * Add a new option to a inquiry
     *
     * @param  int          $inquiryId    inquiry id of inquiry to add option to
     * @param  SimpleOption $simpleOption SimpleOption object
     * @param  bool         $supportYes   Directly support 'yes' for the new option
     * @return Option
     */
    public function add(int $inquiryId, SimpleOption $simpleOption, bool $supportYes = false): Option
    {
        $this->getInquiry($inquiryId, Inquiry::PERMISSION_OPTION_ADD);

        $simpleOption->setOrder($this->getHighestOrder($inquiryId) + 1);

        // Build the new option
        $newOption = new Option();
        $newOption->setInquiryId($inquiryId);
        $newOption->setFromSimpleOption($simpleOption);

        if (!$this->inquiry->getIsInquiryOwner()) {
            $newOption->setOwner($this->userSession->getCurrentUserId());
        }

        try {
            // Insert the new option
            $newOption = $this->optionMapper->insert($newOption);
        } catch (Exception $e) {
            // TODO: Change exception catch to actual exception
            // Currently OC\DB\Exceptions\DbalException is thrown instead of
            // UniqueConstraintViolationException
            // since the exception is from private namespace, we check the type string
            if (get_class($e) === 'OC\DB\Exceptions\DbalException' || $e->getReason() === Exception::REASON_UNIQUE_CONSTRAINT_VIOLATION) {

                // Option already exists, so we need to update the existing one
                // and remove deleted setting
                $option = $this->optionMapper->findByInquiryAndText($inquiryId, $newOption->getInquiryOptionText(), true);
                $option->setDeleted(0);

                $newOption = $this->optionMapper->update($option);

            } else {
                throw $e;
            }
        }


        if ($supportYes) {
            // Set the support for the new option on request
            $this->supportService->set($newOption, Support::VOTE_YES);
        }

        $this->eventDispatcher->dispatchTyped(new OptionCreatedEvent($newOption));

        return $newOption;
    }
    /**
     * Add a new option
     *
     * @param  int    $inquiryId inquiry id of inquiry to add option to
     * @param  string $bulkText  Text for new options separated by new lines
     * @return Option[]
     */
    public function addBulk(int $inquiryId, string $bulkText = ''): array
    {
        $this->getInquiry($inquiryId, Inquiry::PERMISSION_OPTION_ADD);

        $newOptionsTexts = array_unique(explode(PHP_EOL, $bulkText));

        foreach ($newOptionsTexts as $inquiryOptionText) {
            if ($inquiryOptionText) {
                $this->add($inquiryId, new SimpleOption($inquiryOptionText, 0));
            }
        }

        return $this->list($inquiryId);
    }

    /**
     * Update option
     *
     * @return Option
     */
    public function update(int $optionId, int $timestamp = 0, string $inquiryOptionText = '', int $duration = 0): Option
    {
        $option = $this->optionMapper->find($optionId);
        $this->getInquiry($option->getInquiryId(), Inquiry::PERMISSION_INQUIRY_EDIT);

        $option->setOption($timestamp, $duration, $inquiryOptionText);

        $option = $this->optionMapper->update($option);
        $this->eventDispatcher->dispatchTyped(new OptionUpdatedEvent($option));

        return $option;
    }

    /**
     * Delete option
     *
     * @param int  $optionId Id of option to delete or restore
     * @param bool $restore  Set true, if option is to be restored
     */
    public function delete(int $optionId, bool $restore = false): Option
    {
        $option = $this->optionMapper->find($optionId);

        if (!$option->getCurrentUserIsEntityUser()) {
            $this->inquiryMapper->get($option->getInquiryId(), withRoles: true)->request(Inquiry::PERMISSION_OPTION_DELETE);
        }

        $option->setDeleted($restore ? 0 : time());
        $this->optionMapper->update($option);
        $this->eventDispatcher->dispatchTyped(new OptionDeletedEvent($option));

        return $option;
    }

    /**
     * Switch option confirmation
     *
     * @return Option
     */
    public function confirm(int $optionId): Option
    {
        $option = $this->optionMapper->find($optionId);
        $this->getInquiry($option->getInquiryId(), Inquiry::PERMISSION_OPTION_CONFIRM);

        $option->setConfirmed($option->getConfirmed() ? 0 : time());
        $option = $this->optionMapper->update($option);

        if ($option->getConfirmed()) {
            $this->eventDispatcher->dispatchTyped(new OptionConfirmedEvent($option));
        } else {
            $this->eventDispatcher->dispatchTyped(new OptionUnconfirmedEvent($option));
        }

        return $option;
    }

    /**
     * Make a sequence of date inquiry options
     *
     * @param  int | Option $optionOrOptionId Option od optionId of the option to clone
     * @param  Sequence     $sequence         Sequence object
     * @param  bool         $supportYes       Directly support 'yes' for the new options
     * @return Option[]
     *
     * @psalm-return array<array-key, Option>
     */
    public function sequence(int|Option $optionOrOptionId, Sequence $sequence, bool $supportYes = false): array
    {
        if ($sequence->getRepetitions() < 1) {
            return [];
        }

        if ($optionOrOptionId instanceof Option) {
            $baseOption = $optionOrOptionId;
        } else {
            $baseOption = $this->optionMapper->find($optionOrOptionId);
        }

        $this->getInquiry($baseOption->getInquiryId(), Inquiry::PERMISSION_OPTION_ADD);

        if ($this->inquiry->getType() !== Inquiry::TYPE_DATE) {
            throw new InvalidInquiryTypeException('Sequences are only available in date inquiries');
        }

        $sequence->setTimeZone(new DateTimeZone($this->userSession->getClientTimeZone()));
        $sequence->setBaseTimeStamp($baseOption->getTimestamp());

        // iterate over the amount of options to create
        for ($i = 1; $i <= ($sequence->getRepetitions()); $i++) {
            // build a new option
            $this->add(
                $baseOption->getInquiryId(),
                new SimpleOption(
                    '',
                    $sequence->getOccurence($i),
                    $baseOption->getDuration(),
                ),
                $supportYes
            );
        }

        $this->eventDispatcher->dispatchTyped(new OptionCreatedEvent($baseOption));

        // return list of all options of the inquiry
        return $this->optionMapper->findByInquiry($this->inquiry->getId());
    }

    private function countSuggestions(array $options): int
    {
        $count = 0;
        foreach ($options as $option) {
            if ($option->getOwner()) {
                $count++;
            }
        }
        return $count;
    }

    /**
     * Shift all date options
     *
     * @return Option[]
     *
     * @psalm-return array<array-key, Option>
     */
    public function shift(int $inquiryId, int $step, string $unit): array
    {
        $this->getInquiry($inquiryId);

        if ($this->inquiry->getType() !== Inquiry::TYPE_DATE) {
            throw new InvalidInquiryTypeException('Shifting is only available in date inquiries');
        }

        $options = $this->optionMapper->findByInquiry($inquiryId);

        if ($this->countSuggestions($options) > 0) {
            throw new ForbiddenException('dates is not allowed');
        }

        $timezone = new DateTimeZone($this->userSession->getClientTimeZone());

        if ($step > 0) {
            // start from last item if moving option into the future
            // avoid UniqueConstraintViolationException
            $options = array_reverse($options);
        }

        foreach ($options as $option) {
            $option->shiftOption($timezone, $step, $unit);
            $this->optionMapper->update($option);
        }

        return $this->optionMapper->findByInquiry($inquiryId);
    }

    /**
     * Copy options from $fromInquiry to $toInquiry
     */
    public function clone(int $fromInquiryId, int $toInquiryId): void
    {
        $this->inquiryMapper->get($fromInquiryId, withRoles: true)->request(Inquiry::PERMISSION_INQUIRY_VIEW);
        $this->inquiryMapper->get($toInquiryId, withRoles: true)->request(Inquiry::PERMISSION_OPTION_ADD);

        foreach ($this->optionMapper->findByInquiry($fromInquiryId) as $origin) {
            $option = new Option();
            $option->setInquiryId($toInquiryId);
            $option->setConfirmed(0);
            $option->setOption(
                $origin->getTimestamp(),
                $origin->getDuration(),
                $origin->getInquiryOptionText(),
            );
            $option->setOrder($origin->getOrder());
            $option = $this->optionMapper->insert($option);
            $this->eventDispatcher->dispatchTyped(new OptionCreatedEvent($option));
        }
    }

    /**
     * Reorder options with the order specified by $options
     *
     * @return Option[]
     *
     * @psalm-return array<array-key, Option>
     */
    public function reorder(int $inquiryId, array $options): array
    {
        $this->getInquiry($inquiryId, Inquiry::PERMISSION_INQUIRY_EDIT);

        if ($this->inquiry->getType() === Inquiry::TYPE_DATE) {
            throw new InvalidInquiryTypeException('Not allowed in date inquiries');
        }

        $i = 0;
        foreach ($options as $option) {
            // we do not trust the delivered array, so we try to load the option from the db
            $loadedOption = $this->optionMapper->find($option['id']);

            // check, if the loaded option matches the inquiryId
            if ($inquiryId === intval($loadedOption->getInquiryId())) {
                $loadedOption->setOrder(++$i);
                $this->optionMapper->update($loadedOption);
                $this->eventDispatcher->dispatchTyped(new OptionUpdatedEvent($loadedOption));
            } else {
                $this->logger->error(
                    'Option {optionId} does not belong to inquiry {inquiryId}', [
                    'optionId' => $loadedOption->getId(),
                    'inquiryId' => $inquiryId,
                    ]
                );
                throw new DoesNotExistException('Option does not belong to inquiry');
            }
        }

        return $this->optionMapper->findByInquiry($inquiryId);
    }

    /**
     * Change order for $optionId and reorder the options
     *
     * @return Option[]
     *
     * @psalm-return array<array-key, Option>
     */
    public function setOrder(int $optionId, int $newOrder): array
    {
        $option = $this->optionMapper->find($optionId);
        $this->getInquiry($option->getInquiryId(), Inquiry::PERMISSION_INQUIRY_EDIT);

        if ($this->inquiry->getType() === Inquiry::TYPE_DATE) {
            throw new InvalidInquiryTypeException('Not allowed in date inquiries');
        }

        if ($newOrder < 1) {
            $newOrder = 1;
        } elseif ($newOrder > $this->getHighestOrder($this->inquiry->getId())) {
            $newOrder = $this->getHighestOrder($this->inquiry->getId());
        }

        foreach ($this->optionMapper->findByInquiry($this->inquiry->getId()) as $option) {
            $option->setOrder($this->moveModifier($option->getOrder(), $newOrder, $option->getOrder()));
            $this->optionMapper->update($option);
        }

        $this->eventDispatcher->dispatchTyped(new InquiryOptionReorderedEvent($this->inquiry));

        return $this->optionMapper->findByInquiry($this->inquiry->getId());
    }

    /**
     * moveModifier - evaluate new order depending on the old and
     * the new position of a moved array item
     *
     * @return int - The modified new position of the current item
     */
    private function moveModifier(int $moveFrom, int $moveTo, int $currentPosition): int
    {
        $moveModifier = 0;
        if ($moveFrom < $currentPosition && $currentPosition <= $moveTo) {
            // moving forward
            $moveModifier = -1;
        } elseif ($moveTo <= $currentPosition && $currentPosition < $moveFrom) {
            //moving backwards
            $moveModifier = 1;
        } elseif ($moveFrom === $currentPosition) {
            return $moveTo;
        }
        return $currentPosition + $moveModifier;
    }

    /**
     * Load the inquiry and check permissions
     *
     * @return void
    private function getInquiry(int $inquiryId, string $permission = Inquiry::PERMISSION_INQUIRY_VIEW): void
    {
        if ($this->getInquiryId() !== $inquiryId) {
            $inquiry= $this->inquiryMapper->get($inquiryId, withRoles: true);
            $inquiry->request($permission);
        }
    }
     */

    /**
     * Get the highest order number in $inquiryId
     * Return Highest order number
     *
     * @return int
     */
    public function getHighestOrder(int $inquiryId): int
    {
        $result = intval($this->optionMapper->getOrderBoundaries($inquiryId)['max']);
        return $result;
    }
}
