import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Material,
        options: {
          darkModeSelector: false || 'none',
      }
    }
 });
app.use(router)

app.mount('#app')
