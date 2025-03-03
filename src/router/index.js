import {createRouter, createWebHashHistory} from 'vue-router';
import * as Components from '../components/index.js';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Components.HomePage,
        activeIndex: '1',
    },
    {
        path: '/news',
        name: 'News',
        component: Components.NewsPage,
    },
    {
        path: '/forum',
        name: 'ForumHome',
        component: Components.ForumHome
    },
    {
        path: '/forum/:id',
        name: 'ForumPost',
        component: Components.ForumPost
    },
    {
        path: '/submit',
        name: 'Submit',
        component: Components.SubmitPage,
    },
    {
        path: '/chatWithMe',
        name: 'ChatWithMe',
        component: Components.ChatWithMe,
    },
    {
        path: '/chatgpt',
        name: 'Chatgpt',
        component: Components.chatgpt,
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Components.ContactPage,
    },
    {
        path: '/help',
        name: 'Help',
        component: Components.HelpPage,
    },
    {
        path: '/bilibili',
        name: 'Bilibili',
        component: Components.Bilibili,
    },
    {
        path: '/login',
        name: 'Login',
        component: Components.LoginPage,
    },
    {
        path: '/news/:id',
        name: 'NewsDetail',
        component: Components.NewsDetail
    },
    {
        path: '/greet',
        name: 'Greet',
        component: Components.Greet,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Components.Admin,
    },
    {
        path: '/adminC',
        name: 'AdminC',
        component: Components.AdminColorful,
    },
    {
        path: '/error',
        name: 'Error',
        component: Components.Error
    },
    {
        path: '/toggle',
        name: 'Toggle',
        component: Components.Toggle
    },
    {
        path: '/qrcode',
        name: 'QRcode',
        component: Components.QRcode
    },
    {
        path: '/adminChange',
        name: 'AdminChange',
        component: Components.AdminChange
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Components.Logout
    },
    {
        path: '/lottery',
        name: 'Lottery',
        component: Components.Lottery
    },
    {
        path:'/project',
        name:'Project',
        component: Components.Project
    },
    {
        path:'/adminProject',
        name:'AdminProject',
        component: Components.AdminProject
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;