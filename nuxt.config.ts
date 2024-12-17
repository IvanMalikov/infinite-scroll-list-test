// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  target: 'static',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  plugins: ["~/plugins/vue-query.ts"],
  app: {
    baseURL: '/infinite-scroll-test/', // Replace with your GitHub repository name
  }
})