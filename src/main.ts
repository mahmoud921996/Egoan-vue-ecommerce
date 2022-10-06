import { createApp,defineAsyncComponent } from 'vue';
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import BaseSpinner from './components/Ui/BaseSpinner.vue';
import BaseCard from './components/Ui/BaseCard.vue';
import BaseButton from './components/Ui/BaseButton.vue';


const app=createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate)


const BaseDialogue = defineAsyncComponent(() =>
  import("./components/Ui/BaseDialogue.vue")
);
app.component('base-spinner' , BaseSpinner)
app.component('base-card' , BaseCard)
app.component('base-dialogue' , BaseDialogue)
app.component('base-button' , BaseButton)
app.use(router)
app.use(pinia)
app.mount('#app')
