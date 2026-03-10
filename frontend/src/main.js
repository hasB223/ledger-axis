import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { i18n } from './i18n';
import { useUiStore } from './stores/uiStore';
import './styles.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

const uiStore = useUiStore(pinia);
uiStore.initialize();
i18n.global.locale.value = uiStore.locale;

app.use(i18n);
app.use(router);
app.mount('#app');
