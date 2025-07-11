import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import ToastService from 'primevue/toastservice';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';   

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(PrimeVue, {
  theme: {
    preset: Material,
    options: {
      darkModeSelector: false || 'none',
    },
  },
});

app.use(router);
app.use(ToastService);
app.mount('#app');
