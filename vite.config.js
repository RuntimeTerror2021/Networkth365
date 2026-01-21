import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    server :{
        port: 5173,
        host: "localhost",
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