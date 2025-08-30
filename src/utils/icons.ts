/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import NcUserBubble from '@nextcloud/vue/components/NcUserBubble';
import { h } from 'vue';
import { Icon } from '@iconify/vue';
import type { Component } from 'vue';

// -------------------------------
// Import local des icônes @iconify-icons/mdi
// -------------------------------
import LightbulbOn from '@iconify-icons/mdi/lightbulb-on';
import Forum from '@iconify-icons/mdi/forum';
import HandHeart from '@iconify-icons/mdi/hand-heart';
import FileTree from '@iconify-icons/mdi/file-tree';
import AlertCircle from '@iconify-icons/mdi/alert-circle';
import Bank from '@iconify-icons/mdi/bank';

import Update from '@iconify-icons/mdi/update';
import Calendar from '@iconify-icons/mdi/calendar';
import PublishOff from '@iconify-icons/mdi/publish-off';
import Archive from '@iconify-icons/mdi/archive';
import Lock from '@iconify-icons/mdi/lock';
import ClockOutline from '@iconify-icons/mdi/clock-outline';
import CalendarEnd from '@iconify-icons/mdi/calendar-end';
import Cancel from '@iconify-icons/mdi/cancel';
import Check from '@iconify-icons/mdi/check';
import EyeOutline from '@iconify-icons/mdi/eye-outline';
import Magnify from '@iconify-icons/mdi/magnify';
import AlertCircleOutline from '@iconify-icons/mdi/alert-circle-outline';
import ForumOutline from '@iconify-icons/mdi/forum-outline';
import Offer from '@iconify-icons/mdi/offer';
import CogOutline from '@iconify-icons/mdi/cog-outline';
import PlayOutline from '@iconify-icons/mdi/play-outline';
import Plus from '@iconify-icons/mdi/plus';
import Star from '@iconify-icons/mdi/star';
import LockOpen from '@iconify-icons/mdi/lock-open';
import Pencil from '@iconify-icons/mdi/pencil';
import Heart from '@iconify-icons/mdi/heart';
import ThumbUp from '@iconify-icons/mdi/thumb-up';
import ThumbDown from '@iconify-icons/mdi/thumb-down';
import AccountMultiple from '@iconify-icons/mdi/account-multiple';
import LinkIcon from '@iconify-icons/mdi/link-variant';
import ContactIcon from '@iconify-icons/mdi/card-account-details';
import EmailIcon from '@iconify-icons/mdi/email';
import ShareIcon from '@iconify-icons/mdi/share-variant';
import ContactGroupIcon from '@iconify-icons/mdi/account-group-outline';
import GroupIcon from '@iconify-icons/mdi/account-multiple';
import CircleIcon from '@iconify-icons/mdi/google-circles-extended';
import DeletedUserIcon from '@iconify-icons/mdi/account-off';
import AnoymousIcon from '@iconify-icons/mdi/incognito';
import InquiryGroupIcon from '@iconify-icons/mdi/code-braces';

import CommentIcon from '@iconify-icons/mdi/comment';
import AccountMultipleCheck from '@iconify-icons/mdi/account-multiple-check';
import AccountCheck from '@iconify-icons/mdi/account-check';
import ShieldCrown from '@iconify-icons/mdi/shield-crown';
import Key from '@iconify-icons/mdi/key';
import Earth from '@iconify-icons/mdi/earth';

// Navigation Icons (Iconify MDI)
import ShieldCrown from '@iconify-icons/mdi/shield-crown';
import Cog from '@iconify-icons/mdi/cog';
import AccountStar from '@iconify-icons/mdi/account-star';
import FormatListBulleted from '@iconify-icons/mdi/format-list-bulleted';
import LockCheck from '@iconify-icons/mdi/lock-check';
import ArrowRight from '@iconify-icons/mdi/arrow-right';
import AccountGroup from '@iconify-icons/mdi/account-group';
import CommentQuote from '@iconify-icons/mdi/comment-quote';
// src/icons/InquiryGeneralIcons.ts
import Archive from '@iconify-icons/mdi/archive';
import Delete from '@iconify-icons/mdi/delete';
import ArrowLeft from '@iconify-icons/mdi/arrow-left';
import Minus from '@iconify-icons/mdi/minus';
import Restore from '@iconify-icons/mdi/recycle';
import Transfer from '@iconify-icons/mdi/account-switch-outline';
import FileDocumentEdit from '@iconify-icons/mdi/file-document-edit';


import Comment from '@iconify-icons/mdi/comment';
import ChatOutline from '@iconify-icons/mdi/chat-outline';
import FormTextbox from '@iconify-icons/mdi/form-textbox';
import Menu from '@iconify-icons/mdi/menu';

// -------------------------------
// Helper pour créer un composant Vue à partir d'une icône importée
// -------------------------------
export const makeIconComponent = (
  icon: Component,
  color = '#000',
  size = 24
) => ({
  name: `Icon-${icon.name || 'custom'}`,
  render() {
    return h(Icon, {
      icon,
      color,
      width: size,
      height: size
    });
  }
});

export const InquiryGeneralIcons: Record<string, Component> = {
  archive: makeIconComponent(Archive, '#607D8B'),
  delete: makeIconComponent(Delete, '#F44336'),
  back: makeIconComponent(ArrowLeft, '#2196F3'),
  minus: makeIconComponent(Minus, '#9E9E9E'),
  plus: makeIconComponent(Plus, '#4CAF50'),
  restore: makeIconComponent(Restore, '#009688'),
  transfer: makeIconComponent(Transfer, '#3F51B5'),

  comment: makeIconComponent(Comment, '#2196F3'),
  talk: makeIconComponent(ChatOutline, '#00BCD4'),
  collectives: makeIconComponent(AccountGroup, '#795548'),
  form: makeIconComponent(FormTextbox, '#9C27B0'),
  menu: makeIconComponent(Menu, '#607D8B'),

  unpublished: makeIconComponent(PublishOff, '#9E9E9E'),
  archived: makeIconComponent(Archive, '#9E9E9E'),
  closed: makeIconComponent(Lock, '#F44336'),
  creation: makeIconComponent(ClockOutline, '#FFC107'),
  suggestions: makeIconComponent(Offer, '#4CAF50'),
  expiration: makeIconComponent(CalendarEnd, '#E91E63')
};

// Navigation icons map
export const NavigationIcons: Record<string, Component> = {
  administration: makeIconComponent(ShieldCrown, '#FF9800'),
  settings: makeIconComponent(Cog, '#607D8B'),
  relevant: makeIconComponent(Star, '#FFC107'),
  myInquiries: makeIconComponent(AccountStar, '#3F51B5'),
  private: makeIconComponent(Lock, '#F44336'),
  participated: makeIconComponent(AccountCheck, '#009688'),
  open: makeIconComponent(Earth, '#4CAF50'),
  all: makeIconComponent(FormatListBulleted, '#2196F3'),
  closed: makeIconComponent(LockCheck, '#795548'),
  archived: makeIconComponent(Archive, '#9E9E9E'),
  goTo: makeIconComponent(ArrowRight, '#673AB7'),
  group: makeIconComponent(AccountGroup, '#00BCD4'),
  add: makeIconComponent(Plus, '#4CAF50')
};

export const BadgeIcons: Record<string, Component> = {
  comments: makeIconComponent(CommentIcon, '#2196F3'),
  supports: makeIconComponent(ThumbUp, '#4CAF50'),
  participants: makeIconComponent(AccountMultipleCheck, '#673AB7'),
  participated: makeIconComponent(AccountCheck, '#009688'),
  admin: makeIconComponent(ShieldCrown, '#FF9800'),
  private: makeIconComponent(Key, '#F44336'),
  open: makeIconComponent(Earth, '#4CAF50'),
  archived: makeIconComponent(Archive, '#607D8B'),
  expiration: makeIconComponent(CalendarEnd, '#F44336'),
  closed: makeIconComponent(Lock, '#795548')
};

// -------------------------------
export const getBadgeIcon = (name: string) =>
  BadgeIcons[name] || BadgeIcons.comments;

// -------------------------------
export const InquiryIcons: Record<string, Component> = {
  proposal: makeIconComponent(LightbulbOn, '#FFC107'),
  debate: makeIconComponent(Forum, '#2196F3'),
  petition: makeIconComponent(HandHeart, '#E91E63'),
  project: makeIconComponent(FileTree, '#4CAF50'),
  grievance: makeIconComponent(AlertCircle, '#F44336'),
  suggestion: makeIconComponent(CommentQuote, '#9C27B0'),
  official: makeIconComponent(Bank, '#3F51B5')
};

// -------------------------------
export const InquiryTypesUI: Record<
  string,
  { label: string; icon: Component }
> = {
  proposal: { label: 'Proposal', icon: InquiryIcons.proposal },
  debate: { label: 'Debate', icon: InquiryIcons.debate },
  petition: { label: 'Petition', icon: InquiryIcons.petition },
  project: { label: 'Project', icon: InquiryIcons.project },
  grievance: { label: 'Grievance', icon: InquiryIcons.grievance },
  suggestion: { label: 'Suggestion', icon: InquiryIcons.suggestion },
  official: { label: 'Official', icon: InquiryIcons.official }
};

// -------------------------------
export const StateIcons: Record<string, Component> = {
  unpublished: makeIconComponent(PublishOff, '#9E9E9E'),
  archived: makeIconComponent(Archive, '#607D8B'),
  closed: makeIconComponent(Lock, '#795548'),
  creation: makeIconComponent(ClockOutline, '#FF9800'),
  expiration: makeIconComponent(CalendarEnd, '#F44336'),
};

// -------------------------------
export const StatusIcons: Record<string, Component> = {
  Updated: makeIconComponent(Update, '#FF9800'),
  Calendar: makeIconComponent(Calendar, '#3F51B5'),
  ClockOutline: makeIconComponent(ClockOutline, '#2196F3'),
  Cancel: makeIconComponent(Cancel, '#F44336'),
  Offer: makeIconComponent(Offer, '#009688'),
  Check: makeIconComponent(Check, '#4CAF50'),
  EyeOutline: makeIconComponent(EyeOutline, '#9C27B0'),
  Magnify: makeIconComponent(Magnify, '#3F51B5'),
  AlertCircleOutline: makeIconComponent(AlertCircleOutline, '#FF5722'),
  ForumOutline: makeIconComponent(ForumOutline, '#673AB7'),
  CogOutline: makeIconComponent(CogOutline, '#607D8B'),
  PlayOutline: makeIconComponent(PlayOutline, '#8BC34A'),
  Plus: makeIconComponent(Plus, '#00BCD4'),
  Star: makeIconComponent(Star, '#FFD700'),
  Lock: makeIconComponent(Lock, '#795548'),
  LockOpen: makeIconComponent(LockOpen, '#4CAF50'),
  Pencil: makeIconComponent(Pencil, '#FF9800'),
  Heart: makeIconComponent(Heart, '#E91E63'),
  ThumbUp: makeIconComponent(ThumbUp, '#4CAF50'),
  ThumbDown: makeIconComponent(ThumbDown, '#F44336'),
  AccountMultiple: makeIconComponent(AccountMultiple, '#4CAF50'),
  AdminIcon: makeIconComponent(ShieldCrown, '#FBC02D'),
  LinkIcon: makeIconComponent(LinkIcon, '#2196F3'),
  ContactIcon: makeIconComponent(ContactIcon, '#4CAF50'),
  EmailIcon: makeIconComponent(EmailIcon, '#FF9800'),
  ShareIcon: makeIconComponent(ShareIcon, '#03A9F4'),
  ContactGroupIcon: makeIconComponent(ContactGroupIcon, '#9C27B0'),
  GroupIcon: makeIconComponent(GroupIcon, '#4CAF50'),
  CircleIcon: makeIconComponent(CircleIcon, '#00BCD4'),
  DeletedUserIcon: makeIconComponent(DeletedUserIcon, '#F44336'),
  AnoymousIcon: makeIconComponent(AnoymousIcon, '#9E9E9E'),
  InquiryGroupIcon: makeIconComponent(InquiryGroupIcon, '#673AB7'),
  Draft: makeIconComponent(FileDocumentEdit, '#6E3ABE'),
  default: makeIconComponent(FileDocumentEdit, '#9E9E9E')
};

// -------------------------------
// Helper pour récupérer un status icon avec fallback
// -------------------------------
export const getStatusIcon = (iconName: string) =>
  StatusIcons[iconName] || StatusIcons.default;

// -------------------------------
// Export user bubble (avatar)
// -------------------------------
export const userIcon = NcUserBubble;
