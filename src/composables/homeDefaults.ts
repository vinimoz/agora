import type { HomeConfig } from '../stores/appSettings'

export const HOME_DEFAULTS: HomeConfig = {
  sections: ['hero', 'news', 'current', 'spaces', 'services', 'explore', 'agenda', 'promo'],
  hero: {
    actions: [
      { key: 'participate', label: 'Participate', icon: 'CheckCircle',   color: '#16a34a', hint: 'Give your opinion' },
      { key: 'decide',      label: 'Decide',      icon: 'Scale',         color: '#7c3aed', hint: 'Vote and deliberate' },
      { key: 'propose',     label: 'Propose',     icon: 'Lightbulb',     color: '#f59e0b', hint: 'Share your ideas' },
      { key: 'debate',      label: 'Debate',      icon: 'MessageSquare', color: '#0ea5e9', hint: 'Exchange with others' },
    ],
  },
  services: [
    { key: 'request', label: 'Service request', icon: 'Document' },
    { key: 'report',  label: 'Report',          icon: 'AlertCircle' },
    { key: 'booking', label: 'Booking',         icon: 'Calendar' },
    { key: 'other',   label: 'Other requests',  icon: 'MapMarker' },
  ],
  relevance: {
    tiers: [
      { key: 'for_you', label: 'For you' },
      { key: 'local',   label: 'Near you' },
      { key: 'region',  label: 'Your area' },
      { key: 'public',  label: 'Discover' },
    ],
    weights: {
      owner: 100, participant: 60, space: 40,
      city: 30, municipality: 15, activePhase: 20, new: 10,
    },
  },
}
