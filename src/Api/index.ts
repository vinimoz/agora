/**
 * SPDX-FileCopyrightText: 2023 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export type ApiEmailAdressList = {
  displayName: string;
  emailAddress: string;
  combined: string;
};

export { default as ActivityAPI } from './modules/activity.ts';
export { default as AdminAPI } from './modules/admin.ts';
export { default as AppSettingsAPI } from './modules/appSettings.ts';
export { default as CalendarAPI } from './modules/calendar.ts';
export { default as CommentsAPI } from './modules/comments.ts';
export { default as OptionsAPI } from './modules/options.ts';
export { default as InquiriesAPI } from './modules/inquiries.ts';
export { default as InquiryGroupsAPI } from './modules/inquiryGroups.ts';
export { default as PublicAPI } from './modules/public.ts';
export { default as SharesAPI } from './modules/shares.ts';
export { default as UserSettingsAPI } from './modules/userSettings.ts';
export { default as ValidatorAPI } from './modules/validators.ts';
export { default as SupportsAPI } from './modules/supports.ts';
export { default as SessionAPI } from './modules/session.ts';
export { default as AttachmentsAPI } from './modules/attachments.ts';
