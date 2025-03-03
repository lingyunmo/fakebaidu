// main.js
import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import store from './store';
import { createI18n } from 'vue-i18n';
import co from './locales/co.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import py from './locales/py.json';
import cl from './locales/cl.json';
import hk from './locales/hk.json';
import zh from './locales/zh.json';
import kr from './locales/kr.json';
import jp from './locales/jp.json';

// 创建包含所有语言代码的数组
const languages = ['co', 'en', 'fr', 'es', 'py', 'cl', 'hk', 'zh', 'kr', 'jp'];

// 随机选择一种语言
const randomLocale = languages[Math.floor(Math.random() * languages.length)];

// 设置 i18n
const i18n = createI18n({
    locale: randomLocale,         // 设置为随机选择的语言
    fallbackLocale: 'zh',         // 设置默认的回退语言
    messages: {
        co,
        en,
        fr,
        es,
        py,
        cl,
        hk,
        zh,
        kr,
        jp
    }
});

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(store);
app.use(i18n);
app.mount('#app');