// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  target: 'static',
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  plugins: ["~/plugins/vue-query.ts"],
  api: {
    baseURL: '/infinite-scroll-list/'
  }
})