<?php

declare(strict_types=1);

namespace OCA\Agora\Service;

use OCA\Agora\Db\Inquiry;
use OCA\Agora\Db\Participation;
use OCA\Agora\UserSession;
use OCP\IGroupManager;
use OCP\IUser;
use OCP\IUserSession;

class InquiryPermissionService
{
    public function __construct(
        private IGroupManager $groupManager,
        private IUserSession $userSession,
        private UserSession $userSession,
    ) {
    }

    /**
     * Check if a user can view an inquiry
     */
    public function canView(Inquiry $inquiry, ?IUser $user = null): bool
    {
        // If no user, only 'everyone' visibility is allowed
        if ($user === null) {
            return $inquiry->getVisibility() === Inquiry::VISIBILITY_EVERYONE;
        }

        $userId = $user->getUID();

        // Owner can always view
        if ($inquiry->getOwner() === $userId) {
            return true;
        }

        // Check visibility
        switch ($inquiry->getVisibility()) {
            case Inquiry::VISIBILITY_EVERYONE:
                return true;

            case Inquiry::VISIBILITY_PRIVATE:
                return $inquiry->getOwner() === $userId;

            case Inquiry::VISIBILITY_GROUPS:
                $userGroups = $this->groupManager->getUserGroupIds($user);
                return $inquiry->isVisibleToAnyGroup($userGroups);

            case Inquiry::VISIBILITY_PARTICIPANTS:
                // Check if user has participated (would need support check)
                // This would typically be handled by a separate service
                return $this->hasUserParticipated($inquiry, $userId);

            default:
                return false;
        }
    }

    /**
     * Check if a user can participate in an inquiry
     */
    public function canParticipate(Inquiry $inquiry, ?IUser $user = null): bool
    {
        // Must be able to view first
        if (!$this->canView($inquiry, $user)) {
            return false;
        }

        // If no user, only 'everyone' policies are allowed
        if ($user === null) {
            return $inquiry->getParticipationPolicy()?->isEveryone() ?? true;
        }

        $policy = $inquiry->getParticipationPolicy();

        // No policy = everyone can participate
        if ($policy === null) {
            return true;
        }

        $userId = $user->getUID();

        switch ($policy->getPolicyType()) {
            case Participation::POLICY_EVERYONE:
                return true;

            case Participation::POLICY_USERS:
                return $this->userIsInList($user, $policy->getAllowedUserIds());

            case Participation::POLICY_GROUPS:
                return $this->userIsInGroups($user, $policy->getAllowedGroupIds());

            case Participation::POLICY_LOTTERY:
                return $this->userIsInLotteryPool($user, $policy->getLotteryConfig());

            default:
                return false;
        }
    }

    /**
     * Get all permissions for a user on an inquiry
     */
    public function getPermissions(Inquiry $inquiry, ?IUser $user = null): array
    {
        $userId = $user?->getUID();
        $isOwner = $userId !== null && $inquiry->getOwner() === $userId;

        return [
            'view' => $this->canView($inquiry, $user),
            'edit' => $isOwner || $this->isDelegatedAdmin($inquiry, $user),
            'delete' => $isOwner || $this->isAdmin($user),
            'archive' => $isOwner || $this->isAdmin($user),
            'support' => $this->canSupport($inquiry, $user),
            'comment' => $this->canComment($inquiry, $user),
            'participate' => $this->canParticipate($inquiry, $user),
            'seeResults' => $this->canSeeResults($inquiry, $user),
        ];
    }

    /**
     * Check if user can support an inquiry
     */
    public function canSupport(Inquiry $inquiry, ?IUser $user = null): bool
    {
        if (!$this->canView($inquiry, $user)) {
            return false;
        }

        if ($user === null) {
            return false;
        }

        // Must have support feature enabled
        if ($inquiry->getSupportFeature() === 'none') {
            return false;
        }

        // Can't support own inquiry
        if ($inquiry->getOwner() === $user->getUID()) {
            return false;
        }

        return true;
    }

    /**
     * Check if user can comment on an inquiry
     */
    public function canComment(Inquiry $inquiry, ?IUser $user = null): bool
    {
        if (!$this->canView($inquiry, $user)) {
            return false;
        }

        if ($user === null) {
            return false;
        }

        // Must have commenting enabled
        if (!$inquiry->getAllowComment()) {
            return false;
        }

        return true;
    }

    /**
     * Check if user can see results
     */
    public function canSeeResults(Inquiry $inquiry, ?IUser $user = null): bool
    {
        // Owners and admins can always see results
        if ($user !== null) {
            $userId = $user->getUID();
            if ($inquiry->getOwner() === $userId || $this->isAdmin($user)) {
                return true;
            }
        }

        // Check show results setting
        $showResults = $inquiry->getShowResults();

        if ($showResults === Inquiry::SHOW_RESULTS_ALWAYS) {
            return $this->canView($inquiry, $user);
        }

        if ($showResults === Inquiry::SHOW_RESULTS_CLOSED) {
            return $inquiry->isExpired() && $this->canView($inquiry, $user);
        }

        // SHOW_RESULTS_NEVER
        return false;
    }

    // ============================================================
    // Private helper methods
    // ============================================================

    /**
     * Check if user is in a list of user IDs
     */
    private function userIsInList(IUser $user, array $userIds): bool
    {
        return in_array($user->getUID(), $userIds, true);
    }

    /**
     * Check if user is in any of the given groups
     */
    private function userIsInGroups(IUser $user, array $groupIds): bool
    {
        if (empty($groupIds)) {
            return false;
        }

        $userGroups = $this->groupManager->getUserGroupIds($user);
        return !empty(array_intersect($groupIds, $userGroups));
    }

    /**
     * Check if user is in lottery pool
     */
    private function userIsInLotteryPool(IUser $user, array $config): bool
    {
        $pool = $config['pool'] ?? [];
        return in_array($user->getUID(), $pool, true);
    }

    /**
     * Check if user is an admin
     */
    private function isAdmin(?IUser $user): bool
    {
        if ($user === null) {
            return false;
        }
        return $this->groupManager->isAdmin($user->getUID());
    }

    /**
     * Check if user is a delegated admin for this inquiry
     */
    private function isDelegatedAdmin(Inquiry $inquiry, ?IUser $user): bool
    {
        if ($user === null) {
            return false;
        }
        // This would check if user has admin role for this specific inquiry
        // Could be stored in a separate table or via group membership
        return false;
    }

    /**
     * Check if user has participated in this inquiry
     */
    private function hasUserParticipated(Inquiry $inquiry, string $userId): bool
    {
        // This would typically check the supports table
        // For now, return false - this would be implemented in a separate service
        return false;
    }

    /**
     * Get the current user from session
     */
    public function getCurrentUser(): ?IUser
    {
        return $this->userSession->getUser();
    }

    /**
     * Get the current user ID from session
     */
    public function getCurrentUserId(): ?string
    {
        $user = $this->getCurrentUser();
        return $user?->getUID();
    }
}
