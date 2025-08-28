<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Service;

use OCA\Agora\Db\Log;
use OCA\Agora\Db\LogMapper;
use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\InquiryMapper;
use OCA\Agora\Db\Share;
use OCA\Agora\Db\ShareMapper;
use OCA\Agora\Db\SubscriptionMapper;
use OCA\Agora\Db\UserMapper;
use OCA\Agora\Exceptions\InvalidEmailAddress;
use OCA\Agora\Exceptions\NoDeadLineException;
use OCA\Agora\Exceptions\NoEmailAddress;
use OCA\Agora\Model\Mail\ConfirmationMail;
use OCA\Agora\Model\Mail\InvitationMail;
use OCA\Agora\Model\Mail\NotificationMail;
use OCA\Agora\Model\Mail\ReminderMail;
use OCA\Agora\Model\SentResult;
use OCA\Agora\Model\UserBase;
use Psr\Log\LoggerInterface;

class MailService
{
    /**
     * @var Log[] * 
     */
    private array $logs;

    // regular expression to extract the email address and name
    private const REGEX_PARSE_MAIL_AND_NAME = '/(?:[^<]*<)?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?:>)?$/';

    // Regex for a check, if an email string is contained
    private const REGEX_CONTAINS_EMAIL_ADDRESS = '/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/';

    // Regex for extracting only email address
    //  private const REGEX_PARSE_MAIL = '/^([^<>@\s]+@[^\s<>]+\.[a-zA-Z]{2,})$/';

    /**
     * @psalm-suppress PossiblyUnusedMethod 
     */
    public function __construct(
        private LoggerInterface $logger,
        private LogMapper $logMapper,
        private InquiryMapper $inquiryMapper,
        private ShareMapper $shareMapper,
        private SubscriptionMapper $subscriptionMapper,
        private UserMapper $userMapper,
    ) {
        $this->logs = [];
    }

    /**
     * Validate string as email address
     *
     * @return bool
     */
    private static function isValidEmail(string $eMailAddress): bool
    {
        // Rely on PHP's filter
        return (bool)filter_var($eMailAddress, FILTER_VALIDATE_EMAIL);

        // Alternative
        // return (bool) preg_match(self::REGEX_VALID_MAIL, $eMailAddress);
    }

    /**
     * Validate email address and throw an exception
     * return true, if email address is a valid
     *
     * @return true
     */
    public static function validateEmailAddress(string $eMailAddress, bool $emptyIsValid = false): bool
    {
        if ((!$eMailAddress && $emptyIsValid) || self::isValidEmail($eMailAddress)) {
            return true;
        }

        throw new InvalidEmailAddress;
    }

    /**
     * Extracts the email address and name from an input string.
     *
     * Allows to parse and explode email strings into its email address and name parts
     * valid inputs:
     * - Peter User peter.user@foo.com, Peter User \<peter.user@foo.com\>
     * - peter.user@foo.com, \<peter.user@foo.com\>
     * - (Info: Please ignore backslashes if visible in front of "<" and ">")
     *
     * @param  string $eMailString The input string containing an email address and optionally a name.
     * @return array Associative array with keys 'eMailString', 'email', and 'name'.
     * @throws InvalidEmailAddress If an invalid email address or inalid email format is found
     * @throws NoEmailAddress If no email address is found
     */
    public static function extractEmailAddressAndName($eMailString): array
    {
        // Trim the input string
        $eMailString = trim($eMailString);

        preg_match(self::REGEX_PARSE_MAIL_AND_NAME, $eMailString, $matches);

        // Check if the found element is a valid email address
        $emailAddress = (isset($matches[1]) && trim($matches[1]) !== '') ? trim($matches[1]) : null;
        if ($emailAddress !== null && filter_var($emailAddress, FILTER_VALIDATE_EMAIL)) {
            // Extract the name based on the input string
            $displayName = trim(str_replace(['<', '>'], '', str_replace($emailAddress, '', $eMailString)));

            return ['input' => $eMailString, 'emailAddress' => $emailAddress, 'displayName' => $displayName];
        }

        if (preg_match(self::REGEX_CONTAINS_EMAIL_ADDRESS, $eMailString)) {
            throw new InvalidEmailAddress($eMailString);
        }

        throw new NoEmailAddress($eMailString);

    }

    public static function parseEmailStrings(array $emailArray): array
    {
        $validEmails = [];
        $invalidEmails = [];
        $noEmails = [];

        foreach ($emailArray as $emailString) {
            try {
                $validEmails[] = self::extractEmailAddressAndName($emailString);
            } catch (NoEmailAddress $invalidEmail) {
                $noEmails[] = $invalidEmail;
            } catch (InvalidEmailAddress $invalidEmail) {
                // Contained an email string, but this email string is an invalid email address
                $invalidEmails[] = $invalidEmail;
            }
        }

        return [
        'validEmails' => $validEmails,
        'invalidEmails' => $invalidEmails,
        'noEmails' => $noEmails,
        ];
    }

    public function sendNotifications(): void
    {
        $subscriptions = [];
        $this->logs = $this->logMapper->findUnprocessed();

        // Extract a unique array of inquiryIds from $this->logs
        // TODO: can we achieve this a little more elegant?
        $inquiryIds = array_values(array_unique(array_column(json_decode(json_encode($this->logs)), 'inquiryId')));

        // collect subscriptions for the inquiries to notify
        foreach ($inquiryIds as $inquiryId) {
            $subscriptions = array_merge($subscriptions, $this->subscriptionMapper->findAllByInquiry($inquiryId));
        }

        foreach ($subscriptions as $subscription) {
            try {
                $subscription->setNotifyLogs($this->logs);
                $notification = new NotificationMail($subscription);
                $notification->send();
            } catch (InvalidEmailAddress $e) {
                $this->logger->warning(
                    'Invalid or no email address for notification', [
                    'recipient' => json_encode($subscription),
                    'exception' => $e,
                    ]
                );
            } catch (\Exception $e) {
                $this->logger->error(
                    'Error sending notification', [
                    'recipient' => json_encode($subscription),
                    'exception' => $e,
                    ]
                );
                continue;
            }
        }

        foreach ($this->logs as $logItem) {
            $logItem->setProcessed(intval(microtime(true) * 1000));
            $this->logMapper->update($logItem);
            usleep(5000);
        }
    }

    public function sendInvitation(Share $share, ?SentResult &$sentResult = null): ?SentResult
    {
        foreach ($this->userMapper->getUserFromShare($share)->getMembers() as $recipient) {
            $invitation = new InvitationMail($recipient->getId(), $share);

            try {
                $invitation->send();
                if ($sentResult) {
                    $sentResult->AddSentMail($recipient);
                }

            } catch (InvalidEmailAddress $e) {
                if ($sentResult) {
                    $sentResult->AddAbortedMail($recipient, SentResult::INVALID_EMAIL_ADDRESS);
                }
                $this->logger->warning('Invalid or no email address for invitation', ['recipient' => json_encode($recipient)]);

            } catch (\Exception $e) {
                if ($sentResult) {
                    $sentResult->AddAbortedMail($recipient);
                }

                $this->logger->error(
                    'Error sending invitation', [
                    'recipient' => json_encode($recipient),
                    'exception' => $e,
                    ]
                );
            }
        }

        $share->setInvitationSent(time());
        $this->shareMapper->update($share);

        return $sentResult;
    }

    public function sendAutoReminder(): void
    {
        $inquiries = $this->inquiryMapper->findAutoReminderInquiries();

        foreach ($inquiries as $inquiry) {
            try {
                $this->processSharesForAutoReminder($inquiry);
            } catch (NoDeadLineException $e) {
                continue;
            }
        }
    }

    /**
     * Send a confirmation mail for the inquiry to all participants
     */
    public function sendConfirmations(int $inquiryId): SentResult
    {
        $this->inquiryMapper->get($inquiryId, withRoles: true)->request(Inquiry::PERMISSION_INQUIRY_EDIT);
        $sentResult = new SentResult();

        $participants = $this->userMapper->getParticipants($inquiryId);

        foreach ($participants as $participant) {
            try {
                $this->sendConfirmationMail($participant, $inquiryId);
                $sentResult->AddSentMail($participant);
            } catch (InvalidEmailAddress $e) {
                $this->logger->warning(
                    'Invalid or no email address for confirmation', [
                    'recipient' => json_encode($participant),
                    'exception' => $e,
                    ]
                );
                $sentResult->AddAbortedMail($participant, SentResult::INVALID_EMAIL_ADDRESS);
            } catch (\Exception $e) {
                $this->logger->error(
                    'Error sending confirmation', [
                    'recipient' => json_encode($participant),
                    'exception' => $e,
                    ]
                );
                $sentResult->AddAbortedMail($participant);
            }
        }

        return $sentResult;
    }

    private function processSharesForAutoReminder(Inquiry $inquiry): void
    {
        $shares = $this->shareMapper->findByInquiryUnreminded($inquiry->getId());
        foreach ($shares as $share) {
            if (in_array($share->getType(), [Share::TYPE_CIRCLE, Share::TYPE_CONTACTGROUP])) {
                continue;
            }

            $this->sendAutoReminderToRecipients($share, $inquiry);
            $share->setReminderSent(time());
            $this->shareMapper->update($share);
        }
    }

    private function sendConfirmationMail(UserBase $participant, int $inquiryId): void
    {
        $confirmation = new ConfirmationMail($participant->getId(), $inquiryId);
        $confirmation->send();
    }

    private function sendAutoReminderToRecipients(Share $share, Inquiry $inquiry): void
    {
        foreach ($this->userMapper->getUserFromShare($share)->getMembers() as $recipient) {
            $reminder = new ReminderMail(
                $recipient->getId(),
                $inquiry->getId()
            );

            try {
                   $reminder->send();
                $this->logger->info(
                    'Reminder sent', [
                    'recipient' => json_encode($recipient),
                    'inquiryId' => $inquiry->getId(),
                    ]
                );
            } catch (InvalidEmailAddress $e) {
                $this->logger->warning(
                    'Invalid or missing email address for sending out reminder', [
                    'inquiryId' => $inquiry->getid(),
                    'shareId' => $share->getId()
                    ]
                );
            } catch (\Exception $e) {
                $this->logger->error(
                    'Error sending reminder', [
                    'share' => json_encode($share),
                    'exception' => $e
                    ]
                );
            }
        }
    }
}
