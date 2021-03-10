import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'
import PrimeIcon from 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import BadgeDirective from 'primevue/badgedirective'

import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(PrimeVue)
app.use(PrimeIcon)
app.use(ToastService);
app.directive('tooltip', Tooltip)
app.directive('badge', BadgeDirective)
app.mount('#app')
