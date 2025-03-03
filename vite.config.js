import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    server: {
		hmr: {
      overlay: false,
    },
        port:80,
        host:'0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, 'api'),
                logLevel: 'debug'  // 添加这一行来调试
            },
            '/v1': {
                target: 'https://www.u13735.nyat.app:20566',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/v1/, 'v1'),
                logLevel: 'debug'  // 添加这一行来调试
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});