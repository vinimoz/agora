<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora\Controller;

use OCA\Agora\Model\Sequence;
use OCA\Agora\Model\SimpleOption;
use OCA\Agora\Service\CalendarService;
use OCA\Agora\Service\OptionService;
use OCA\Agora\Service\SupportService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\FrontpageRoute;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * @psalm-api
 */
class OptionController extends BaseController
{
    public function __construct(
        string $appName,
        IRequest $request,
        private OptionService $optionService,
        private CalendarService $calendarService,
        private SupportService $supportService,
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * Get all options of given inquiry
  *
     * @param int $inquiryId Inquiry id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/inquiry/{inquiryId}/options')]
    public function list(int $inquiryId): JSONResponse
    {
        return $this->response(
            function () use ($inquiryId) {
                return ['options' => $this->optionService->list($inquiryId)];
            }
        );
    }

    /**
     * Add a new option
  *
     * @param  int   $inquiryId  inquiry id
     * @param  array $option     Options text for text inquiry
     * @param  array $sequence   sequence of new options
     * @param  bool  $supportYes support yes
     * @return JSONResponse
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/{inquiryId}/option')]
    public function add(
        int $inquiryId,
        array $option,
        bool $supportYes = false,
        ?array $sequence = null,
    ): JSONResponse {
        return $this->response(
            fn () => array_merge(
                $this->optionService->addWithSequenceAndAutoSupport(
                    $inquiryId,
                    SimpleOption::fromArray($option),
                    $supportYes,
                    Sequence::fromArray($sequence),
                ),
                ['options' => $this->optionService->list($inquiryId)],
                ['supports' => $this->supportService->list($inquiryId)],
            ),
            Http::STATUS_CREATED
        );
    }

    /**
     * Add mulitple new options
  *
     * @param int    $inquiryId inquiry id
     * @param string $text      Options text for text inquiry
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/option/bulk')]
    public function addBulk(int $inquiryId, string $text = ''): JSONResponse
    {
        return $this->response(fn () => ['options' => $this->optionService->addBulk($inquiryId, $text)], Http::STATUS_CREATED);
    }

    /**
     * Update option
  *
     * @param int                             $optionId  option id
     * @param int                             $timestamp timestamp for dateinquiry
     * @param string                          $text      Option text for text inquiry
     * @param int duration duration of option
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}')]
    public function update(int $optionId, int $timestamp, string $text, int $duration): JSONResponse
    {
        return $this->response(fn () => ['option' => $this->optionService->update($optionId, $timestamp, $text, $duration)]);
    }

    /**
     * Delete option
  *
     * @param int $optionId option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'DELETE', url: '/option/{optionId}')]
    public function delete(int $optionId): JSONResponse
    {
        return $this->response(fn () => ['option' => $this->optionService->delete($optionId)]);
    }

    /**
     * Restore option
  *
     * @param int $optionId option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/restore')]
    public function restore(int $optionId): JSONResponse
    {
        return $this->response(fn () => ['option' => $this->optionService->delete($optionId, true)]);
    }

    /**
     * Switch option confirmation
  *
     * @param int $optionId option id
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'PUT', url: '/option/{optionId}/confirm')]
    public function confirm(int $optionId): JSONResponse
    {
        return $this->response(fn () => ['option' => $this->optionService->confirm($optionId)]);
    }

    /**
     * Reorder options
  *
     * @param int   $inquiryId option id
     * @param array $options   options in new order
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/{inquiryId}/options/reorder')]
    public function reorder(int $inquiryId, array $options): JSONResponse
    {
        return $this->response(fn () => ['options' => $this->optionService->reorder($inquiryId, $options)]);
    }

    /**
     * clone options in date inquiry
  *
     * @param int   $optionId   clone template
     * @param array $sequence   sequence of new options
     * @param bool  $supportYes support yes
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/option/{optionId}/sequence')]
    public function sequence(int $optionId, array $sequence, bool $supportYes = false): JSONResponse
    {
        return $this->response(fn () => ['options' => $this->optionService->sequence($optionId, Sequence::fromArray($sequence), $supportYes)]);
    }

    /**
     * Shift options
  *
     * @param int    $inquiryId inquiry id
     * @param int    $step      step width
     * @param string $unit      Unit for shift steps
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'POST', url: '/inquiry/{inquiryId}/shift')]
    public function shift(int $inquiryId, int $step, string $unit): JSONResponse
    {
        return $this->response(fn () => ['options' => $this->optionService->shift($inquiryId, $step, $unit)]);
    }

    /**
     * findCalendarEvents
  *
     * @param int $optionId option id
     * @param $tz       Timezone to use
     */
    #[NoAdminRequired]
    #[FrontpageRoute(verb: 'GET', url: '/option/{optionId}/events')]
    public function findCalendarEvents(int $optionId): JSONResponse
    {
        return $this->response(fn () => ['events' => $this->calendarService->getEvents($optionId)]);
    }
}
