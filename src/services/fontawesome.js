import Vue from 'vue'
import App from '../App'

/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* add some free styles */
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faTwitter)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
