import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'
import PrimeIcon from 'primeicons/primeicons.css'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Panel from 'primevue/panel'
import Fieldset from 'primevue/fieldset'
import Sidebar from 'primevue/sidebar'
import Card from 'primevue/card'
import Menu from 'primevue/menu'
import PanelMenu from 'primevue/panelmenu'
import Divider from 'primevue/divider'
import RadioButton from 'primevue/radiobutton'
import Tooltip from 'primevue/tooltip'
import BadgeDirective from 'primevue/badgedirective'
import Avatar from 'primevue/avatar'

import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(PrimeVue)
app.use(PrimeIcon)
app.component('InputText', InputText)
app.component('Button', Button)
app.component('Panel', Panel)
app.component('Fieldset', Fieldset)
app.component('Sidebar', Sidebar)
app.component('Card1', Card)
app.component('Menu', Menu)
app.component('PanelMenu', PanelMenu)
app.component('Divider', Divider)
app.component('RadioButton', RadioButton)
app.component('Avatar', Avatar)
app.directive('tooltip', Tooltip)
app.directive('badge', BadgeDirective)
app.mount('#app')
