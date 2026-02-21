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
                products: resolve(__dirname, 'products.html'),
                gallery: resolve(__dirname, 'gallery.html'),
                partnership: resolve(__dirname, 'partnership.html'),
                googlefdc71d92237b6a52: resolve(__dirname, "googlefdc71d92237b6a52.html")
            },
        },
    },
})