
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'

import {auth} from '../services/firebase/base'
import user from '../models/User'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      user
    },
    mutations: {
      ...vuexfireMutations
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
