import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
        loggedInUser: null, // 初始化用户信息为 null
        token: null,        // 初始化 token 为 null
        error: null,        // 初始化错误信息为 null
    },
    mutations: {
        SET_USER(state, { user, token }) {
            state.loggedInUser = user; // 设置用户信息
            state.token = token;       // 设置 token
        },
        SET_ERROR(state, error) {
            state.error = error;       // 设置错误信息
        },
        CLEAR_USER(state) {
            state.loggedInUser = null; // 清空用户信息
            state.token = null;        // 清空 token
            state.error = null;        // 清空错误信息
        },
    },
    actions: {
        async login({ commit }, { username, password }) {
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    commit('SET_ERROR', errorData.message || '请求失败');
                    return false; // 登录失败
                }

                const data = await response.json();
                if (data.success && data.token) {
                    commit('SET_USER', { user: data.user, token: data.token });
                    return true; // 登录成功
                } else {
                    commit('SET_ERROR', data.message);
                    return false; // 登录失败
                }
            } catch (error) {
                commit('SET_ERROR', '登录失败，请稍后重试');
                return false; // 登录失败
            }
        },
        logout({ commit }) {
            commit('CLEAR_USER'); // 清空用户信息
        },
    },
    getters: {
        loggedInUser(state) {
            return state.loggedInUser; // 获取用户信息
        },
        token(state) {
            return state.token; // 获取 token
        },
        error(state) {
            return state.error; // 获取错误信息
        },
    },
    plugins: [
        createPersistedState({
            paths: ['loggedInUser', 'token'], // 持久化 loggedInUser 和 token
            storage: window.localStorage,     // 使用 localStorage 作为存储方式
        }),
    ],
});
