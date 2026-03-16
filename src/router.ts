/**
 * SPDX-FileCopyrightText: 2019 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { RouteLocationNormalized, RouteRecordRaw, createWebHistory, createRouter } from 'vue-router'

import { getCurrentUser } from '@nextcloud/auth'
import { generateUrl } from '@nextcloud/router'
import { getCookieValue, Logger, setCookie } from './helpers/index.ts'
import { loadContext } from './composables/context.ts'
import { AxiosError } from 'axios'

import Navigation from './views/Navigation.vue'
import NavigationMenu from './views/NavigationMenu.vue'
import NavigationGroup from './views/NavigationGroup.vue'

import Forbidden from './views/Forbidden.vue'
import List from './views/InquiryList.vue'
import Menu from './views/InquiryMenu.vue'
import NotFound from './views/NotFound.vue'
import InquiryView from './views/InquiryView.vue'
import GroupView from './views/InquiryGroupView.vue'
import GroupList from './views/InquiryGroupList.vue'
import Group from './views/InquiryGroup.vue'

import SideBar from './views/SideBar.vue'
import SideBarInquiryGroup from './views/SideBarInquiryGroup.vue'

import { useInquiryStore } from './stores/inquiry.ts'
import { useSessionStore } from './stores/session.ts'

async function validateToken(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  const sessionStore = useSessionStore()
  
  if (to.name === from.name && sessionStore.isLoaded) {
    return true
  }
  
  try {
    await sessionStore.loadShare()

    // if the user is logged in, reroute to the inquiry page
    if (getCurrentUser()) {
      return {
        name: 'inquiry',
        params: {
          id: sessionStore.share.inquiryId,
        },
      }
    }
  } catch (error) {
    if (getCurrentUser()) {
      if ((error as AxiosError).response?.status === 403) {
        // User has no access
        return { name: 'forbidden' }
      }
      // in case of other errors, reroute internal user to the not found page
      return { name: 'notfound' }
    }

    // external users will get redirected to the login page
    window.location.replace(generateUrl('login'))
  }

  // Continue for external users
  //
  if (sessionStore.share.type === 'public') {
    // Check, if user has a personal token from the user's client stored cookie
    // matching the public token
    const personalToken = getCookieValue(to.params.token as string)

    if (personalToken) {
      // participant has already access to the inquiry and a private token
      // extend expiry time for 30 days after successful access
      const cookieExpiration = 30 * 24 * 60 * 1000
      setCookie(to.params.token as string, personalToken, cookieExpiration)

      // reroute to the public inquiry page using the personal token
      return {
        name: 'publicInquiry',
        params: {
          token: personalToken,
        },
      }
    }
  }

  // finally load the inquiry
  const inquiryStore = useInquiryStore()
  inquiryStore.load()
}

const routes: RouteRecordRaw[] = [
  {
    name: 'group-archived',
    path: '/groups/archived',
    components: {
      default: GroupList,
      navigation: NavigationGroup,
    },
      props: {
        default: true,
        navigation: false,  
    },
    meta: {
      listPage: true,
    },
  },

  {
    name: 'list',
    path: '/list/:type?',
    components: {
      default: List,
      navigation: Navigation,
    },
    props: true,
    meta: {
      listPage: true,
    },
  },
  {
    name: 'menu',
    path: '/',
    components: {
      default: Menu,
      navigation: NavigationMenu,
    },
    props: true,
    meta: {
	    listPage: true,
        noReload: true,
    },
  },
   {
    name: 'group-list',
    path: '/groups/:slug?',
    components: {
      default: Group,  
      navigation: NavigationGroup,
    },
     props: {
       default: true,
       navigation: false,
    },
    meta: {
      groupPage: true,
    },
  },
  {
	  name: 'notfound',
	  path: '/not-found',
	  components: {
		  default: NotFound,
		  navigation: Navigation,
	  },
	  meta: {
		  errorPage: true,
	  },
  },
  {
	  name: 'forbidden',
	  path: '/forbidden',
	  components: {
		  default: Forbidden,
		  navigation: Navigation,
	  },
	  meta: {
		  errorPage: true,
	  },
  },
  {
	  name: 'group',
	  path: '/group/:id',
	  components: {
		  default: GroupView,
		  navigation: NavigationGroup,
		  sidebar: SideBarInquiryGroup,
	  },
      props: {
        default: true,
        navigation: false,  
    },
	  meta: {
		  groupPage: true,
		  listPage: true,
	  },
  },
  {
      name: 'page',
      path: '/page/inquiry/:id',
      components: {
          default: InquiryView,
          navigation: Navigation,
          sidebar: SideBar,
      },
      props: true,
      meta: {
          inquiryPage: true,
      },
  },
  {
	  name: 'inquiry',
	  path: '/inquiry/:id',
	  components: {
		  default: InquiryView,
		  navigation: Navigation,
		  sidebar: SideBar,
	  },
	  props: true,
	  meta: {
		  inquiryPage: true,
	  },
  },
  {
	  name: 'publicInquiry',
	  path: '/s/:token',
	  components: {
		  default: InquiryView,
		  sidebar: SideBar,
	  },
	  beforeEnter: (to, from) => validateToken(to, from),
		  props: true,
	  meta: {
		  publicPage: true,
		  inquiryPage: true,
	  },
  },
  {
	  path: '/:pathMatch(.*)*',
	  redirect: {
		  name: 'notfound',
	  },
  },
]

const router = createRouter({
	history: createWebHistory(generateUrl('/apps/agora')),
	routes,
	linkActiveClass: 'active',
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
	const sessionStore = useSessionStore()
	let forceReload = false


/*        console.group('Router Navigation to:', to.path)
        console.log('Route name:', to.name)
        console.log('Route params:', to.params)
        console.log('Session store exists:', !!sessionStore)
*/


	// if the previous and the requested routes have the same name and
	// the watcher is active, we can do a cheap loading
	const cheapLoading =
		to.name === from.name &&
		sessionStore.watcher.mode !== 'noInquirying' &&
		sessionStore.watcher.status !== 'stopped'

	if (to.name === 'login') {
		forceReload = true
	}
     
    // first load app context -> session and preferences
    try {
        await loadContext(to, cheapLoading, forceReload)

    } catch (error) {
        Logger.error('Could not load context', { error })
        
        if (to.name === 'inquiry') {
            Logger.warn('Allowing navigation to inquiry despite context error')
            return true
        }
        

        if (!sessionStore.userStatus.isLoggedin) {
            // if the user is not logged in, redirect to the login page
            window.location.replace(generateUrl('login'))
            return false
        }

        // if context can't be loaded, redirect to not found page
        return {
            name: 'notfound',
        }
    }
    return true
})

export { router }
