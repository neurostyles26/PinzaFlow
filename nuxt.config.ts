// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@vite-pwa/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/signup', '/'],
    }
  },
  pwa: {
    manifest: {
      name: 'PinzaFlow',
      short_name: 'PinzaFlow',
      description: 'WhatsApp CRM & AI Sales Automation',
      theme_color: '#0F172A',
      background_color: '#0F172A',
      icons: [
        {
          src: 'icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  app: {
    head: {
      title: 'PinzaFlow - WhatsApp CRM & AI Automation',
      meta: [
        { name: 'description', content: 'The ultimate WhatsApp CRM for small businesses in LatAm.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
