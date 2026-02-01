/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import NcUserBubble from '@nextcloud/vue/components/NcUserBubble'
import { h } from 'vue'
import { Icon } from '@iconify/vue'
import type { Component } from 'vue'

// -------------------------------
import FolderMultiple from '@iconify-icons/mdi/folder-multiple'
import Forum from '@iconify-icons/mdi/forum'
import GestureTap from '@iconify-icons/mdi/gesture-tap'
import HandHeart from '@iconify-icons/mdi/hand-heart'
import FileTree from '@iconify-icons/mdi/file-tree'
import AlertCircle from '@iconify-icons/mdi/alert-circle'
import Bank from '@iconify-icons/mdi/bank'
import CommentAlert from '@iconify-icons/mdi/comment-alert'
import Gavel from '@iconify-icons/mdi/gavel'
import OfficeBuilding from '@iconify-icons/mdi/office-building'
import Seal from '@iconify-icons/mdi/seal'
import ClipboardText from '@iconify-icons/mdi/clipboard-text'
import BriefcaseCheck from '@iconify-icons/mdi/briefcase-check'
import ChartBar from '@iconify-icons/mdi/chart-bar'
import Map from '@iconify-icons/mdi/map'
import RocketLaunch from '@iconify-icons/mdi/rocket-launch'
import BookOpenVariant from '@iconify-icons/mdi/book-open-variant'
import Library from '@iconify-icons/mdi/library'
import AccountVoice from '@iconify-icons/mdi/account-voice'
import ClipboardCheck from '@iconify-icons/mdi/clipboard-check'
import Bullhorn from '@iconify-icons/mdi/bullhorn'
import Check from '@iconify-icons/mdi/check'
import TransformRotate from '@iconify-icons/mdi/rotate-right'
import Save from '@iconify-icons/mdi/content-save'
import AnonymousIcon from '@iconify-icons/mdi/incognito'
import TownHall from '@iconify-icons/mdi/town-hall'
import ViewListOutline from '@iconify-icons/mdi/view-list-outline'
import CommentQuote from '@iconify-icons/mdi/comment-quote'
import HomeGroup from '@iconify-icons/mdi/home-group'
import AccountMultipleCheck from '@iconify-icons/mdi/account-multiple-check'
import LightbulbOn from '@iconify-icons/mdi/lightbulb-on'
import Newspaper from '@iconify-icons/mdi/newspaper'
import Megaphone from '@iconify-icons/mdi/megaphone'
import ClipboardList from '@iconify-icons/mdi/clipboard-list'
import HelpCircle from '@iconify-icons/mdi/help-circle'
import Wrench from '@iconify-icons/mdi/wrench'


import Update from '@iconify-icons/mdi/update'
import Calendar from '@iconify-icons/mdi/calendar'
import PublishOff from '@iconify-icons/mdi/publish-off'
import Archive from '@iconify-icons/mdi/archive'
import Lock from '@iconify-icons/mdi/lock'
import ClockOutline from '@iconify-icons/mdi/clock-outline'
import CalendarEnd from '@iconify-icons/mdi/calendar-end'
import Cancel from '@iconify-icons/mdi/cancel'
import EyeOutline from '@iconify-icons/mdi/eye-outline'
import Magnify from '@iconify-icons/mdi/magnify'
import AlertCircleOutline from '@iconify-icons/mdi/alert-circle-outline'
import ForumOutline from '@iconify-icons/mdi/forum-outline'
import Offer from '@iconify-icons/mdi/offer'
import CogOutline from '@iconify-icons/mdi/cog-outline'
import PlayOutline from '@iconify-icons/mdi/play-outline'
import Plus from '@iconify-icons/mdi/plus'
import Star from '@iconify-icons/mdi/star'
import LockOpen from '@iconify-icons/mdi/lock-open'
import Pencil from '@iconify-icons/mdi/pencil'
import Heart from '@iconify-icons/mdi/heart'
import ThumbUp from '@iconify-icons/mdi/thumb-up'
import ThumbDown from '@iconify-icons/mdi/thumb-down'
import AccountMultiple from '@iconify-icons/mdi/account-multiple'
import ContactIcon from '@iconify-icons/mdi/card-account-details'
import EmailIcon from '@iconify-icons/mdi/email'
import ShareIcon from '@iconify-icons/mdi/share-variant'
import ContactGroupIcon from '@iconify-icons/mdi/account-group-outline'
import CircleIcon from '@iconify-icons/mdi/google-circles-extended'
import DeletedUserIcon from '@iconify-icons/mdi/account-off'
import InquiryGroupIcon from '@iconify-icons/mdi/code-braces'
import ChevronDown from '@iconify-icons/mdi/chevron-down'
import ChevronUp from '@iconify-icons/mdi/chevron-up'
import BarChart from '@iconify-icons/mdi/bar-chart'

import CommentIcon from '@iconify-icons/mdi/comment'
import CommentProcessing from '@iconify-icons/mdi/comment-processing'
import AccountCheck from '@iconify-icons/mdi/account-check'
import ShieldCrown from '@iconify-icons/mdi/shield-crown'
import Key from '@iconify-icons/mdi/key'
import Earth from '@iconify-icons/mdi/earth'
import Home from '@iconify-icons/mdi/home'
import Alphabetical from '@iconify-icons/mdi/alphabetical'
import Type from '@iconify-icons/mdi/format-letter-case'
import Creation from '@iconify-icons/mdi/file-plus'
import Gesture from '@iconify-icons/mdi/gesture-double-tap'
import AccountCircle from '@iconify-icons/mdi/account-circle-outline'
import SortDescending from '@iconify-icons/mdi/sort-descending'
import SortAscending from '@iconify-icons/mdi/sort-ascending'
import WrenchOutline from '@iconify-icons/mdi/wrench-outline'


// Navigation Icons (Iconify MDI)
import Cog from '@iconify-icons/mdi/cog'
import AccountStar from '@iconify-icons/mdi/account-star'
import FormatListBulleted from '@iconify-icons/mdi/format-list-bulleted'
import LockCheck from '@iconify-icons/mdi/lock-check'
import ArrowRight from '@iconify-icons/mdi/arrow-right'
import ArrowDown from '@iconify-icons/mdi/arrow-down'
import AccountGroup from '@iconify-icons/mdi/account-group'
import Delete from '@iconify-icons/mdi/delete'
import ArrowLeft from '@iconify-icons/mdi/arrow-left'
import Minus from '@iconify-icons/mdi/minus'
import Transfer from '@iconify-icons/mdi/account-switch-outline'
import FileDocumentEdit from '@iconify-icons/mdi/file-document-edit'
import MessageText from '@iconify-icons/mdi/message-text' 
import Recycle from '@iconify-icons/mdi/recycle'
import CheckboxBlankOutline from '@iconify-icons/mdi/checkbox-blank-outline'
import CheckboxMarkedOutline from '@iconify-icons/mdi/checkbox-marked-outline'
import DotsVertical from '@iconify-icons/mdi/dots-vertical'
import AccountClock from '@iconify-icons/mdi/account-clock'
import Flag from '@iconify-icons/mdi/flag'
import CheckCircle from '@iconify-icons/mdi/check-circle'
import Scale from '@iconify-icons/mdi/scale-balance'
import Layers from '@iconify-icons/mdi/layers'
import BookOpen from '@iconify-icons/mdi/book-open-page-variant'
import CalendarMultiselect from '@iconify-icons/mdi/calendar-multiselect'
import UsersCog from '@iconify-icons/mdi/account-cog'
import Close from '@iconify-icons/mdi/close'
import Download from '@iconify-icons/mdi/download'
import Upload from '@iconify-icons/mdi/upload'
import Refresh from '@iconify-icons/mdi/refresh'
import Bell from '@iconify-icons/mdi/bell'
import BellOutline from '@iconify-icons/mdi/bell-outline'
import ChevronRight from '@iconify-icons/mdi/chevron-right'
import ChevronLeft from '@iconify-icons/mdi/chevron-left'
import Filter from '@iconify-icons/mdi/filter'
import Export from '@iconify-icons/mdi/export'
import Import from '@iconify-icons/mdi/import'

// -------------------------------
// User related icons
// -------------------------------
import AccountEdit from '@iconify-icons/mdi/account-edit'
import Logout from '@iconify-icons/mdi/logout'
import Undo from '@iconify-icons/mdi/undo'
import EmailEditOutline from '@iconify-icons/mdi/email-edit-outline'
import Table from '@iconify-icons/mdi/table'
import FormatListBulletedSquare from '@iconify-icons/mdi/format-list-bulleted-square'
import FormatListNumbered from '@iconify-icons/mdi/format-list-numbered'
import SortClockAscendingOutline from '@iconify-icons/mdi/sort-clock-ascending-outline'

// -------------------------------
// Information / Config related icons
// -------------------------------
import InformationVariant from '@iconify-icons/mdi/information-variant'
import FileDocument from '@iconify-icons/mdi/file-document'
import ClipboardTextMultiple from '@iconify-icons/mdi/clipboard-text-multiple'
import CalendarMultiple from '@iconify-icons/mdi/calendar-multiple'
import CalendarBlank from '@iconify-icons/mdi/calendar-blank'
import CalendarPlusOutline from '@iconify-icons/mdi/calendar-plus-outline'
import Reply from '@iconify-icons/mdi/reply'

// -------------------------------
// Share related icons
// -------------------------------
import QrCode from '@iconify-icons/mdi/qrcode'
import ClipboardArrowLeftOutline from '@iconify-icons/mdi/clipboard-arrow-left-outline'
import EmailArrowRight from '@iconify-icons/mdi/email-arrow-right'
import EmailAlert from '@iconify-icons/mdi/email-alert'
import EmailMultipleOutline from '@iconify-icons/mdi/email-multiple-outline'

import ChatOutline from '@iconify-icons/mdi/chat-outline'
import FormTextbox from '@iconify-icons/mdi/form-textbox'
import Menu from '@iconify-icons/mdi/menu'

import School from '@iconify-icons/mdi/school'
import BabyFace from '@iconify-icons/mdi/baby-face'
import TagMultiple from '@iconify-icons/mdi/tag-multiple'
import MapMarkerRadius from '@iconify-icons/mdi/map-marker-radius'


import Link from '@iconify-icons/mdi/link'
import LinkVariant from '@iconify-icons/mdi/link-variant'
import Poll from '@iconify-icons/mdi/poll'
import CardsPlaying from '@iconify-icons/mdi/cards-playing'
import Cash from '@iconify-icons/mdi/cash'
import CashMultiple from '@iconify-icons/mdi/cash-multiple'
import IdCard from '@iconify-icons/mdi/id-card'
import DragHorizontal from '@iconify-icons/mdi/drag-horizontal'
import InboxRemove from '@iconify-icons/mdi/inbox-remove'
import NoteText from '@iconify-icons/mdi/note-text'
import Presentation from '@iconify-icons/mdi/presentation'
import Flask from '@iconify-icons/mdi/flask'
import Microscope from '@iconify-icons/mdi/microscope'
import ShieldCheck from '@iconify-icons/mdi/shield-check'
import BookEducation from '@iconify-icons/mdi/book-education'
import Domain from '@iconify-icons/mdi/domain'
import AccountMultiplePlus from '@iconify-icons/mdi/account-multiple-plus'
import LeafCircle from '@iconify-icons/mdi/leaf-circle'
import RobotExcited from '@iconify-icons/mdi/robot-excited'
import TrendingUp from '@iconify-icons/mdi/trending-up'
import SwapHorizontal from '@iconify-icons/mdi/swap-horizontal'
import Application from '@iconify-icons/mdi/application'
import MessageReply from '@iconify-icons/mdi/message-reply'
import Monitor from '@iconify-icons/mdi/monitor'
import LaptopAccount from '@iconify-icons/mdi/laptop-account'

// Facility Management icons
import Leaf from '@iconify-icons/mdi/leaf'
import Desk from '@iconify-icons/mdi/desk'
import Tools from '@iconify-icons/mdi/tools'
import OfficeBuildingCog from '@iconify-icons/mdi/office-building-cog'
import Parking from '@iconify-icons/mdi/parking'
import Hammer from '@iconify-icons/mdi/hammer'
import Thermometer from '@iconify-icons/mdi/thermometer'
import Water from '@iconify-icons/mdi/water'
import Fire from '@iconify-icons/mdi/fire'
import Bike from '@iconify-icons/mdi/bike'
import EvStation from '@iconify-icons/mdi/ev-station'
import Bus from '@iconify-icons/mdi/bus'
import CarMultiple from '@iconify-icons/mdi/car-multiple'

// -------------------------------
// -------------------------------
export const makeIconComponent = (icon: Component, color = '#000', size = 24) => ({
  name: `Icon-${icon.name || 'custom'}`,
  render() {
    return h(Icon, {
        icon,
        color,
        width: size,
        height: size,
    })
  },
})
export const InquiryGeneralIcons: Record<string, Component> = {
    Description: makeIconComponent(NoteText, '#1976D2'),
    Category: makeIconComponent(TagMultiple, '#5E35B1'),
    Location: makeIconComponent(MapMarkerRadius, '#2E7D32'),
    Wrench: makeIconComponent(Wrench, '#607D8B'),
    WrenchOutline: makeIconComponent(WrenchOutline, '#607D8B'),
    Empty: makeIconComponent(InboxRemove, '#999'),
    Drag: makeIconComponent(DragHorizontal, '#999'),
    FolderMultiple: makeIconComponent(FolderMultiple, '#546E7A'),
    IdCard: makeIconComponent(IdCard, '#546E7A'),
    Newspaper:              makeIconComponent(Newspaper, '#546E7A'),
    Megaphone:              makeIconComponent(Megaphone, '#C62828'),
    ClipboardList:          makeIconComponent(ClipboardList, '#283593'),
    Question: makeIconComponent(HelpCircle, '#999'),
    CheckCircle: makeIconComponent(CheckCircle, '#4CAF50'),
    Scale: makeIconComponent(Scale, '#795548'),
    Layers: makeIconComponent(Layers, '#5D4037'),
    Users: makeIconComponent(AccountGroup, '#2196F3'),
    HomeGroup: makeIconComponent(HomeGroup, '#795548'),
    BookOpen: makeIconComponent(BookOpen, '#3949AB'),
    MessageSquare: makeIconComponent(ChatOutline, '#1565C0'),
    UsersCog: makeIconComponent(UsersCog, '#607D8B'),
    CommentProcessing: makeIconComponent(CommentProcessing, '#FF5722'),
    Plus: makeIconComponent(Plus, '#4CAF50'),
    Share: makeIconComponent(ShareIcon, '#03A9F4'),
    Update: makeIconComponent(Update, '#FF9800'),
    HandHeart: makeIconComponent(HandHeart, '#FF9800'),
    Archive: makeIconComponent(Archive, '#607D8B'),
    Archives: makeIconComponent(Archive, '#607D8B'),
    Delete: makeIconComponent(Delete, '#F44336'),
    Back: makeIconComponent(ArrowLeft, '#2196F3'),
    Minus: makeIconComponent(Minus, '#9E9E9E'),
    Offer: makeIconComponent(Offer, '#03A9F4'),
    Restore: makeIconComponent(Recycle, '#009688'),
    Transfer: makeIconComponent(Transfer, '#3F51B5'),
    Home: makeIconComponent(Home, '#795548'),
    Alphabetical: makeIconComponent(Alphabetical, '#673AB7'),
    Type: makeIconComponent(Type, '#3F51B5'),
    AccountCircle: makeIconComponent(AccountCircle, '#2196F3'),
    AccountCog: makeIconComponent(UsersCog, '#2196F3'),
    AccountMultiple: makeIconComponent(AccountMultiple, '#4CAF50'),
    SortAscending: makeIconComponent(SortAscending, '#1E88E5'),
    SortDescending: makeIconComponent(SortDescending, '#1565C0'),
    Gesture: makeIconComponent(Gesture, '#7E57C2'),
    GestureTap: makeIconComponent(GestureTap, '#7E57C2'),
    Activity: makeIconComponent(LightbulbOn, '#FF9800'),
    ChartBar: makeIconComponent(ChartBar, '#5C6BC0'),
    BriefcaseCheck: makeIconComponent(BriefcaseCheck, '#43A047'),
    Map: makeIconComponent(Map, '#2196F3'),
    FileTree: makeIconComponent(FileTree, '#2196F3'),
    RocketLaunch: makeIconComponent(RocketLaunch, '#E91E63'),
    Gavel: makeIconComponent(Gavel, '#9C27B0'),
    OfficeBuilding: makeIconComponent(OfficeBuilding, '#546E7A'),
    Seal: makeIconComponent(Seal, '#FF9800'),
    ClipboardText: makeIconComponent(ClipboardText, '#00BCD4'),
    Comment: makeIconComponent(CommentIcon, '#2196F3'),
    Thumb: makeIconComponent(ThumbUp, '#1976D2'),
    TownHall: makeIconComponent(TownHall, '#1976D2'),
    Talk: makeIconComponent(ChatOutline, '#0097A7'),
    CommentAlert: makeIconComponent(CommentAlert, '#0097A7'),
    Collectives: makeIconComponent(AccountGroup, '#6D4C41'),
    Form: makeIconComponent(FormTextbox, '#8E24AA'),
    Menu: makeIconComponent(Menu, '#455A64'),
    Unpublished: makeIconComponent(PublishOff, '#757575'),
    Archived: makeIconComponent(Archive, '#78909C'),
    Closed: makeIconComponent(Lock, '#D32F2F'),
    ClockOutline: makeIconComponent(ClockOutline, '#FFA000'),
    Creation: makeIconComponent(Creation, '#FFB300'),
    Suggestion: makeIconComponent(Offer, '#388E3C'),
    Expiration: makeIconComponent(CalendarEnd, '#C2185B'),
    Attachment: makeIconComponent(FileDocument, '#37474F'),
    FileDocument: makeIconComponent(FileDocument, '#37474F'),
    BookOpenVariant: makeIconComponent(BookOpenVariant, '#3949AB'),
    Library: makeIconComponent(Library, '#5D4037'),
    AccountVoice: makeIconComponent(AccountVoice, '#5E35B1'),
    ClipboardCheck: makeIconComponent(ClipboardCheck, '#2E7D32'),
    AlertCircle: makeIconComponent(AlertCircle, '#C62828'),
    AlertOctagon: makeIconComponent(AlertCircleOutline, '#B71C1C'),
    Forum: makeIconComponent(Forum, '#1565C0'),
    FileDocumentEdit: makeIconComponent(FileDocumentEdit, '#283593'),
    Flag: makeIconComponent(Flag, '#283593'),
    Flash: makeIconComponent(LightbulbOn, '#283593'),
    InteractiveSpace: makeIconComponent(AccountGroup, '#2E7D32'),
    BabyFace: makeIconComponent(BabyFace, '#AD1457'),
    School: makeIconComponent(School, '#2E7D32'),
    HomeCity: makeIconComponent(Home, '#4E342E'),
    CalendarMultiselect: makeIconComponent(CalendarMultiselect, '#1B5E20'),
    City: makeIconComponent(OfficeBuilding, '#37474F'),
    LinkIcon: makeIconComponent(LinkVariant, '#1976D2'),
    AccountTie: makeIconComponent(AccountVoice, '#4527A0'),
    AccountBalance: makeIconComponent(Bank, '#263238'),
    Bank: makeIconComponent(Bank, '#263238'),
    AccountGroup: makeIconComponent(AccountGroup, '#00695C'),
    AccountMultipleCheck: makeIconComponent(AccountMultipleCheck, '#1B5E20'),
    LightbulbOn: makeIconComponent(LightbulbOn, '#F57C00'),
    Bullhorn: makeIconComponent(Bullhorn, '#EF6C00'),
    Check: makeIconComponent(Check, '#689F38'),
    CommentQuote: makeIconComponent(CommentQuote, '#7B1FA2'),
    ViewListOutline: makeIconComponent(ViewListOutline, '#0D47A1'),
    Table: makeIconComponent(Table, '#4E342E'),
    ChevronDown: makeIconComponent(ChevronDown, '#5D4037'),
    Reply: makeIconComponent(Reply, '#1976D2'),
    Transform: makeIconComponent(TransformRotate, '#6A1B9A'),
    Save: makeIconComponent(Save, '#2E7D32'),
    WaitingApproval: makeIconComponent(AccountClock, '#1B5E20'),
    Link: makeIconComponent(Link, '#2196F3'),
    LinkVariant: makeIconComponent(LinkVariant, '#2196F3'),
    ArrowDown: makeIconComponent(ArrowDown, '#546E7A'),
    Poll: makeIconComponent(Poll, '#4CAF50'),
    Deck: makeIconComponent(CardsPlaying, '#FF9800'),
    Money: makeIconComponent(Cash, '#4CAF50'),
    Add: makeIconComponent(Plus, '#4CAF50'),
    BarChart: makeIconComponent(BarChart, '#4CAF50'),
    Document: makeIconComponent(FileDocument, '#607D8B'),
    Presentation: makeIconComponent(Presentation, '#5D4037'),
    Settings: makeIconComponent(Cog, '#455A64'),
    Close: makeIconComponent(Close, '#F44336'),
    Download: makeIconComponent(Download, '#2196F3'),
    Upload: makeIconComponent(Upload, '#4CAF50'),
    Refresh: makeIconComponent(Refresh, '#FF9800'),
    Bell: makeIconComponent(Bell, '#FFA000'),
    BellOutline: makeIconComponent(BellOutline, '#FFA000'),
    ChevronRight: makeIconComponent(ChevronRight, '#5D4037'),
    ChevronLeft: makeIconComponent(ChevronLeft, '#5D4037'),
    Filter: makeIconComponent(Filter, '#5E35B1'),
    Export: makeIconComponent(Export, '#388E3C'),
    Import: makeIconComponent(Import, '#7B1FA2'),
    Group: makeIconComponent(AccountGroup, '#0097A7'),
    Paste: makeIconComponent(ClipboardTextMultiple, '#5D4037'),
    Calendar: makeIconComponent(Calendar, '#3949AB'),
    Updated: makeIconComponent(Update, '#FF8F00'),
    // Template-specific icons
    CashMultiple: makeIconComponent(CashMultiple, '#4CAF50'),
    Flask: makeIconComponent(Flask, '#00897B'),
    Microscope: makeIconComponent(Microscope, '#1565C0'),
    ShieldCheck: makeIconComponent(ShieldCheck, '#2E7D32'),
    BookEducation: makeIconComponent(BookEducation, '#5E35B1'),
    Domain: makeIconComponent(Domain, '#546E7A'),
    AccountMultiplePlus: makeIconComponent(AccountMultiplePlus, '#00897B'),
    LeafCircle: makeIconComponent(LeafCircle, '#388E3C'),
    RobotExcited: makeIconComponent(RobotExcited, '#7B1FA2'),
    TrendingUp: makeIconComponent(TrendingUp, '#43A047'),
    SwapHorizontal: makeIconComponent(SwapHorizontal, '#FF9800'),
    Application: makeIconComponent(Application, '#1976D2'),
    MessageReply: makeIconComponent(MessageReply, '#0288D1'),
    Cog: makeIconComponent(Cog, '#607D8B'),
    Lightbulb: makeIconComponent(LightbulbOn, '#F57C00'),
    Monitor: makeIconComponent(Monitor, '#1565C0'),
    LaptopAccount: makeIconComponent(LaptopAccount, '#0288D1'),
    // Facility Management icons
    Leaf: makeIconComponent(Leaf, '#4CAF50'),
    Desk: makeIconComponent(Desk, '#795548'),
    Tools: makeIconComponent(Tools, '#607D8B'),
    OfficeBuildingCog: makeIconComponent(OfficeBuildingCog, '#546E7A'),
    Parking: makeIconComponent(Parking, '#1976D2'),
    CarParking: makeIconComponent(Parking, '#1976D2'),
    Hammer: makeIconComponent(Hammer, '#795548'),
    Thermometer: makeIconComponent(Thermometer, '#F44336'),
    Water: makeIconComponent(Water, '#2196F3'),
    Fire: makeIconComponent(Fire, '#FF5722'),
    Bike: makeIconComponent(Bike, '#4CAF50'),
    EvStation: makeIconComponent(EvStation, '#4CAF50'),
    Bus: makeIconComponent(Bus, '#FF9800'),
    CarMultiple: makeIconComponent(CarMultiple, '#607D8B'),
}

export const ShareIcons: Record<string, Component> = {
    Share: makeIconComponent(ShareIcon, '#03A9F4'),
    QrCode: makeIconComponent(QrCode, '#5E35B1'),
    CopyLink: makeIconComponent(ClipboardArrowLeftOutline, '#455A64'),
    SendByEmail: makeIconComponent(EmailArrowRight, '#1565C0'),
    EmailAlert: makeIconComponent(EmailAlert, '#D32F2F'),
    BulkMail: makeIconComponent(EmailMultipleOutline, '#F57C00'),
    Lock: makeIconComponent(Lock, '#5D4037'),
    Unlock: makeIconComponent(LockOpen, '#388E3C'),
    Delete: makeIconComponent(Delete, '#D32F2F'),
    Restore: makeIconComponent(Recycle, '#00897B'),
    AdminGrant: makeIconComponent(ShieldCrown, '#FF8F00'),
    AdminRevoke: makeIconComponent(ShieldCrown, '#757575'),
}

export const InformationIcons: Record<string, Component> = {
    Info: makeIconComponent(InformationVariant, '#1976D2'),
    Activity: makeIconComponent(LightbulbOn, '#FFA000'),
    Attachment: makeIconComponent(FileDocument, '#37474F'),
    Paste: makeIconComponent(ClipboardTextMultiple, '#5D4037'),
    Calendar: makeIconComponent(Calendar, '#3949AB'),
    CalendarMultiple: makeIconComponent(CalendarMultiple, '#2E7D32'),
    CalendarBlank: makeIconComponent(CalendarBlank, '#1565C0'),
    CalendarAdd: makeIconComponent(CalendarPlusOutline, '#FF8F00'),
    CalendarEnd: makeIconComponent(CalendarEnd, '#C2185B'),
}

export const UserIcons: Record<string, Component> = {
    Settings: makeIconComponent(Cog, '#455A64'),
    EditAccount: makeIconComponent(AccountEdit, '#1976D2'),
    EditEmail: makeIconComponent(EmailEditOutline, '#303F9F'),
    Logout: makeIconComponent(Logout, '#D32F2F'),
    Reset: makeIconComponent(Undo, '#FFA000'),
    ListView: makeIconComponent(ViewListOutline, '#1565C0'),
    TableView: makeIconComponent(Table, '#5D4037'),
    SortByOriginal: makeIconComponent(FormatListBulletedSquare, '#00897B'),
    SortByRank: makeIconComponent(FormatListNumbered, '#388E3C'),
    SortByDate: makeIconComponent(SortClockAscendingOutline, '#5E35B1'),
}

export const OptionIcons: Record<string, Component> = {
    Delete: makeIconComponent(Delete, '#D32F2F'),
    Restore: makeIconComponent(Recycle, '#00897B'),
    Confirm: makeIconComponent(CheckboxBlankOutline, '#1976D2'),
    Unconfirm: makeIconComponent(CheckboxMarkedOutline, '#388E3C'),
    Drag: makeIconComponent(DotsVertical, '#757575'),
}

export const NavigationIcons: Record<string, Component> = {
    Administration: makeIconComponent(ShieldCrown, '#FF8F00'),
    Settings: makeIconComponent(Cog, '#455A64'),
    Relevant: makeIconComponent(Star, '#FFA000'),
    MyInquiries: makeIconComponent(AccountStar, '#3949AB'),
    Private: makeIconComponent(Lock, '#D32F2F'),
    Participated: makeIconComponent(AccountCheck, '#00897B'),
    Open: makeIconComponent(Earth, '#388E3C'),
    All: makeIconComponent(FormatListBulleted, '#1565C0'),
    Closed: makeIconComponent(LockCheck, '#5D4037'),
    Archive: makeIconComponent(Archive, '#757575'),
    GoTo: makeIconComponent(ArrowRight, '#5E35B1'),
    Group: makeIconComponent(AccountGroup, '#0097A7'),
    Add: makeIconComponent(Plus, '#388E3C'),
    Moderate: makeIconComponent(MessageText, '#1565C0'),
    Home: makeIconComponent(Home, '#795548'),
    Users: makeIconComponent(AccountGroup, '#2196F3'),
    ChevronDown: makeIconComponent(ChevronDown, '#5D4037'),
    ChevronUp: makeIconComponent(ChevronUp, '#1565C'),
}

export const BadgeIcons: Record<string, Component> = {
    Comments: makeIconComponent(CommentIcon, '#1565C0'),
    Supports: makeIconComponent(ThumbUp, '#388E3C'),
    Participants: makeIconComponent(AccountMultipleCheck, '#5E35B1'),
    Participated: makeIconComponent(AccountCheck, '#00897B'),
    Admin: makeIconComponent(ShieldCrown, '#FF8F00'),
    Private: makeIconComponent(Key, '#D32F2F'),
    Open: makeIconComponent(Earth, '#388E3C'),
    Archived: makeIconComponent(Archive, '#455A64'),
    Expiration: makeIconComponent(CalendarEnd, '#D32F2F'),
    Closed: makeIconComponent(Lock, '#5D4037'),
}

export const getBadgeIcon = (name: string) => BadgeIcons[name] || BadgeIcons.Comments

export const StatusIcons: Record<string, Component> = {
    Unpublished: makeIconComponent(PublishOff, '#757575'),
    Archived: makeIconComponent(Archive, '#455A64'),
    Closed: makeIconComponent(Lock, '#5D4037'),
    Creation: makeIconComponent(ClockOutline, '#FFA000'),
    Expiration: makeIconComponent(CalendarEnd, '#D32F2F'),
    Updated: makeIconComponent(Update, '#FF8F00'),
    Calendar: makeIconComponent(Calendar, '#3949AB'),
    ClockOutline: makeIconComponent(ClockOutline, '#1565C0'),
    Cancel: makeIconComponent(Cancel, '#D32F2F'),
    Offer: makeIconComponent(Offer, '#388E3C'),
    Check: makeIconComponent(Check, '#757575'),
    EyeOutline: makeIconComponent(EyeOutline, '#7B1FA2'),
    Magnify: makeIconComponent(Magnify, '#303F9F'),
    AlertCircleOutline: makeIconComponent(AlertCircleOutline, '#E64A19'),
    ForumOutline: makeIconComponent(ForumOutline, '#5E35B1'),
    CogOutline: makeIconComponent(CogOutline, '#455A64'),
    PlayOutline: makeIconComponent(PlayOutline, '#558B2F'),
    Plus: makeIconComponent(Plus, '#0097A7'),
    Star: makeIconComponent(Star, '#FFD600'),
    Lock: makeIconComponent(Lock, '#5D4037'),
    LockOpen: makeIconComponent(LockOpen, '#388E3C'),
    Pencil: makeIconComponent(Pencil, '#FF8F00'),
    Heart: makeIconComponent(Heart, '#C2185B'),
    ThumbUp: makeIconComponent(ThumbUp, '#388E3C'),
    ThumbDown: makeIconComponent(ThumbDown, '#D32F2F'),
    AccountMultiple: makeIconComponent(AccountMultiple, '#7B1FA2'),
    AdminIcon: makeIconComponent(ShieldCrown, '#F9A825'),
    LinkIcon: makeIconComponent(LinkVariant, '#1976D2'),
    ContactIcon: makeIconComponent(ContactIcon, '#2E7D32'),
    EmailIcon: makeIconComponent(EmailIcon, '#FF8F00'),
    ShareIcon: makeIconComponent(ShareIcon, '#0288D1'),
    ContactGroupIcon: makeIconComponent(ContactGroupIcon, '#7B1FA2'),
    CircleIcon: makeIconComponent(CircleIcon, '#00ACC1'),
    DeletedUserIcon: makeIconComponent(DeletedUserIcon, '#D32F2F'),
    AnonymousIcon: makeIconComponent(AnonymousIcon, '#757575'),
    InquiryGroupIcon: makeIconComponent(InquiryGroupIcon, '#5E35B1'),
    Draft: makeIconComponent(FileDocumentEdit, '#6A1B9A'),
    Default: makeIconComponent(FileDocumentEdit, '#757575'),
}

export const getStatusIcon = (iconName: string) => StatusIcons[iconName] || StatusIcons.Default

export const userIcon = NcUserBubble
