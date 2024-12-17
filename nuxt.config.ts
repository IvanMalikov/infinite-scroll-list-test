// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  plugins: ["~/plugins/vue-query.ts"],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/'
  },
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
})