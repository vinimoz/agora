import type { HomeConfig } from '../Types/appSettings.types.ts'
import type { HeroRoute } from '../Types/appSettings.types.ts'
import type { OrganizationType } from '../Types/experience.types'
import heroImg from '../assets/img/hero.jpg'
import promoImg from '../assets/img/promo.jpg'

// ------------------------------------------------------------
// Default hero routes.
//
// These reproduce the exact destinations the old hardcoded switch in
// ExperienceRenderer produced, so shipping this change is a no-op for
// existing installs. Admins can override any of them per-tenant via
// homeConfig.hero.actions[].route once the DB table lands.
// ------------------------------------------------------------
const HERO_ROUTES = {
  participate: {
    name: 'explore',
    params: { type: 'relevant' },
    query: { filter: 'for_you' },
  } as HeroRoute,

  decide: {
    name: 'explore',
    params: { type: 'relevant' },
    query: { filter: 'to_vote' },
  } as HeroRoute,

  propose: {
    name: 'home',
    params: { type: 'proposal' },
    query: { viewMode: 'create' },
  } as HeroRoute,

  debate: {
    name: 'explore',
    params: { type: 'relevant' },
    query: { filter: 'debates' },
  } as HeroRoute,
} satisfies Record<'participate' | 'decide' | 'propose' | 'debate', HeroRoute>

// ------------------------------------------------------------
// Per-org-type templates.
//
// Every template carries the same shape as HomeConfig. Differences are
// limited to hero copy, promo copy, service tiles, and the *labels* of
// relevance tiers. Tier *keys* stay identical across all org types —
// useRelevance scoring is keyed by tier key, not by tier label.
// ------------------------------------------------------------

const municipalityDefaults: HomeConfig = {
  sections: ['hero', 'news', 'current', 'spaces', 'services', 'explore', 'agenda', 'promo'],

  hero: {
    cityName: 'Take back your authority',
    tagline: "Together, let's build tomorrow",
    title: 'Welcome to Agora',
    subtitle: 'Your civic space for a more direct and participatory democracy',
    backgroundUrl: heroImg,
    showWeather: false,
    weather: { temp: 27, location: 'Moorea' },
    actions: [
      {
        key: 'participate',
        label: 'Participate',
        icon: 'CheckCircle',
        color: '#16a34a',
        hint: 'Give your opinion',
        route: HERO_ROUTES.participate,
      },
      {
        key: 'decide',
        label: 'Decide',
        icon: 'Scale',
        color: '#7c3aed',
        hint: 'Vote and deliberate',
        route: HERO_ROUTES.decide,
      },
      {
        key: 'propose',
        label: 'Propose',
        icon: 'Lightbulb',
        color: '#f59e0b',
        hint: 'Share your ideas',
        route: HERO_ROUTES.propose,
      },
      {
        key: 'debate',
        label: 'Debate',
        icon: 'MessageSquare',
        color: '#0ea5e9',
        hint: 'Exchange with others',
        route: HERO_ROUTES.debate,
      },
    ],
  },
    sectionLabels: {
 	 news: 'City news',
	  services: 'Your online services',
 	 explore: 'Explore / Participate',
    },

  promo: {
    title: "Together, let's build tomorrow",
    text: 'Participate in the life of your community!',
    cta: 'Discover',
    imageUrl: promoImg,
  },

  relevance: {
    tiers: [
      { key: 'for_you', label: 'For you' },
      { key: 'local', label: 'Near you' },
      { key: 'region', label: 'Your area' },
      { key: 'public', label: 'Discover' },
    ],
    weights: {
      owner: 100,
      participant: 60,
      space: 40,
      locality: 30,
      region: 15,
      activePhase: 20,
      new: 10,
    },
  },
}

const universityDefaults: HomeConfig = {
  sections: ['hero', 'news', 'current', 'spaces', 'services', 'explore', 'agenda', 'promo'],

  hero: {
    cityName: 'Your campus, your voice',
    tagline: 'Participate in campus life',
    title: 'Welcome to your university',
    subtitle: 'Shape the decisions that affect your studies and student life',
    backgroundUrl: heroImg,
    showWeather: false,
    weather: { temp: 22, location: 'Campus' },
    actions: [
      {
        key: 'participate',
        label: 'Participate',
        icon: 'CheckCircle',
        color: '#16a34a',
        hint: 'Get involved on campus',
        route: HERO_ROUTES.participate,
      },
      {
        key: 'decide',
        label: 'Vote',
        icon: 'Scale',
        color: '#7c3aed',
        hint: 'Student elections & consultations',
        route: HERO_ROUTES.decide,
      },
      {
        key: 'propose',
        label: 'Submit idea',
        icon: 'Lightbulb',
        color: '#f59e0b',
        hint: 'Share a proposal with your faculty',
        route: HERO_ROUTES.propose,
      },
      {
        key: 'debate',
        label: 'Discuss',
        icon: 'MessageSquare',
        color: '#0ea5e9',
        hint: 'Exchange with peers',
        route: HERO_ROUTES.debate,
      },
    ],
  },
    sectionLabels: {
  news: 'Campus announcements',
  services: 'Student services',
  explore: 'Get involved',
  agenda: 'Academic calendar',
},

  promo: {
    title: 'Get involved in student life',
    text: 'Your student union needs you — join a commission, propose a project, vote on the budget.',
    cta: 'Explore',
    imageUrl: promoImg,
  },


  relevance: {
    tiers: [
      { key: 'for_you', label: 'For you' },
      { key: 'local', label: 'Your faculty' },
      { key: 'region', label: 'Your campus' },
      { key: 'public', label: 'Discover' },
    ],
    weights: {
      owner: 100,
      participant: 60,
      space: 40,
      locality: 30,
      region: 15,
      activePhase: 20,
      new: 10,
    },
  },
}

const associationDefaults: HomeConfig = {
  sections: ['hero', 'news', 'current', 'spaces', 'services', 'explore', 'agenda', 'promo'],

  hero: {
    cityName: 'Your association, your voice',
    tagline: 'Get involved',
    title: 'Welcome to your association',
    subtitle: 'Shape the projects and decisions that matter to your community',
    backgroundUrl: heroImg,
    showWeather: false,
    weather: { temp: 20, location: '' },
    actions: [
      {
        key: 'participate',
        label: 'Participate',
        icon: 'CheckCircle',
        color: '#16a34a',
        hint: 'Join the conversation',
        route: HERO_ROUTES.participate,
      },
      {
        key: 'decide',
        label: 'Vote',
        icon: 'Scale',
        color: '#7c3aed',
        hint: 'Take part in decisions',
        route: HERO_ROUTES.decide,
      },
      {
        key: 'propose',
        label: 'Propose',
        icon: 'Lightbulb',
        color: '#f59e0b',
        hint: 'Submit a project',
        route: HERO_ROUTES.propose,
      },
      {
        key: 'debate',
        label: 'Discuss',
        icon: 'MessageSquare',
        color: '#0ea5e9',
        hint: 'Exchange with members',
        route: HERO_ROUTES.debate,
      },
    ],
  },
    sectionLabels: {
  news: 'Association news',
  services: 'Member services',
  explore: 'Get involved',
  agenda: 'Upcoming events',
},

  promo: {
    title: 'Support the association',
    text: 'Become a member, donate, or volunteer — every contribution counts.',
    cta: 'Join',
    imageUrl: promoImg,
  },


  relevance: {
    tiers: [
      { key: 'for_you', label: 'For you' },
      { key: 'local', label: 'Your chapter' },
      { key: 'region', label: 'Your region' },
      { key: 'public', label: 'Discover' },
    ],
    weights: {
      owner: 100,
      participant: 60,
      space: 40,
      locality: 30,
      region: 15,
      activePhase: 20,
      new: 10,
    },
  },
}

const cooperativeDefaults: HomeConfig = {
  sections: ['hero', 'news', 'current', 'spaces', 'services', 'explore', 'agenda', 'promo'],

  hero: {
    cityName: 'Your co-op, your decisions',
    tagline: 'Decide together',
    title: 'Welcome to your cooperative',
    subtitle: 'One member, one vote — shape how your co-op runs',
    backgroundUrl: heroImg,
    showWeather: false,
    weather: { temp: 18, location: '' },
    actions: [
      {
        key: 'participate',
        label: 'Participate',
        icon: 'CheckCircle',
        color: '#16a34a',
        hint: 'Join a working group',
        route: HERO_ROUTES.participate,
      },
      {
        key: 'decide',
        label: 'Decide',
        icon: 'Scale',
        color: '#7c3aed',
        hint: 'Vote on resolutions',
        route: HERO_ROUTES.decide,
      },
      {
        key: 'propose',
        label: 'Propose',
        icon: 'Lightbulb',
        color: '#f59e0b',
        hint: 'Submit a motion',
        route: HERO_ROUTES.propose,
      },
      {
        key: 'debate',
        label: 'Discuss',
        icon: 'MessageSquare',
        color: '#0ea5e9',
        hint: 'Debate with members',
        route: HERO_ROUTES.debate,
      },
    ],
  },

    sectionLabels: {
  news: 'Co-op news',
  services: 'Member services',
  explore: 'Get involved',
  agenda: 'Meetings & assemblies',
},
  promo: {
    title: 'Governance is a shared responsibility',
    text: 'Review the annual report, attend the general assembly, vote on budgets.',
    cta: 'Participate',
    imageUrl: promoImg,
  },


  relevance: {
    tiers: [
      { key: 'for_you', label: 'For you' },
      { key: 'local', label: 'Your working group' },
      { key: 'region', label: 'Your branch' },
      { key: 'public', label: 'Discover' },
    ],
    weights: {
      owner: 100,
      participant: 60,
      space: 40,
      locality: 30,
      region: 15,
      activePhase: 20,
      new: 10,
    },
  },
}

const companyDefaults: HomeConfig = {
  sections: ['hero', 'news', 'current', 'spaces', 'services', 'explore', 'agenda', 'promo'],

  hero: {
    cityName: 'Your workplace, your voice',
    tagline: 'Have your say',
    title: 'Welcome to your company space',
    subtitle: 'Share ideas, give feedback, and participate in the decisions that affect you',
    backgroundUrl: heroImg,
    showWeather: false,
    weather: { temp: 20, location: '' },
    actions: [
      {
        key: 'participate',
        label: 'Participate',
        icon: 'CheckCircle',
        color: '#16a34a',
        hint: 'Give your feedback',
        route: HERO_ROUTES.participate,
      },
      {
        key: 'decide',
        label: 'Vote',
        icon: 'Scale',
        color: '#7c3aed',
        hint: 'Take part in decisions',
        route: HERO_ROUTES.decide,
      },
      {
        key: 'propose',
        label: 'Propose',
        icon: 'Lightbulb',
        color: '#f59e0b',
        hint: 'Share an improvement',
        route: HERO_ROUTES.propose,
      },
      {
        key: 'debate',
        label: 'Discuss',
        icon: 'MessageSquare',
        color: '#0ea5e9',
        hint: 'Exchange with colleagues',
        route: HERO_ROUTES.debate,
      },
    ],
  },

    	sectionLabels: {
  news: 'Company announcements',
  services: 'Employee services',
  explore: 'Get involved',
  agenda: 'Events & meetings',
},

  promo: {
    title: 'Your voice shapes the company',
    text: 'Propose ideas, comment on projects, and vote on what comes next.',
    cta: 'Get involved',
    imageUrl: promoImg,
  },

  relevance: {
    tiers: [
      { key: 'for_you', label: 'For you' },
      { key: 'local', label: 'Your team' },
      { key: 'region', label: 'Your department' },
      { key: 'public', label: 'Discover' },
    ],
    weights: {
      owner: 100,
      participant: 60,
      space: 40,
      locality: 30,
      region: 15,
      activePhase: 20,
      new: 10,
    },
  },
}

// ------------------------------------------------------------
// Resolver
// ------------------------------------------------------------

export const HOME_TEMPLATES: Record<OrganizationType, HomeConfig> = {
  municipality: municipalityDefaults,
  university: universityDefaults,
  association: associationDefaults,
  cooperative: cooperativeDefaults,
  company: companyDefaults,
}

/**
 * Backwards-compatible alias.
 *
 * Any code that still imports HOME_DEFAULTS (e.g. tests, storybook
 * fixtures) keeps working. New code should import HOME_TEMPLATES or
 * call getHomeTemplate(orgType).
 */
export const HOME_DEFAULTS = HOME_TEMPLATES.municipality

export function getHomeTemplate(type: OrganizationType = 'municipality'): HomeConfig {
  return HOME_TEMPLATES[type] ?? HOME_TEMPLATES.municipality
}
