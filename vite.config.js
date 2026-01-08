import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    server :{
        port: 8000,
        host: "127.0.0.1",
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                privacy: resolve(__dirname, 'privacy.html'),
            },
        },
    },
})