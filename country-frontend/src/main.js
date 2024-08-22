import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/globalStore'
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
const app = createApp(App);
app.use(store);
/* Customizations for toaster plugin to show alerts. Can be centralized into a separate global file for maintainability */
const options = {
    // You can set your default options here
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
};
app.use(Toast, options);
app.mount('#app');
