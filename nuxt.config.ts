// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_KEY || ''
    }
  },
  nitro: {
    preset: 'netlify'
  },
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
    registerType: 'autoUpdate',
    manifest: {
      name: 'PinzaFlow — WhatsApp CRM & AI Automation',
      short_name: 'PinzaFlow',
      description: 'The ultimate WhatsApp CRM for small businesses in Latin America. Manage conversations, track clients, and boost sales with AI.',
      theme_color: '#0F172A',
      background_color: '#0F172A',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      categories: ['business', 'productivity'],
      icons: [
        { src: 'icon-72x72.png', sizes: '72x72', type: 'image/png' },
        { src: 'icon-96x96.png', sizes: '96x96', type: 'image/png' },
        { src: 'icon-128x128.png', sizes: '128x128', type: 'image/png' },
        { src: 'icon-144x144.png', sizes: '144x144', type: 'image/png' },
        { src: 'icon-152x152.png', sizes: '152x152', type: 'image/png' },
        { src: 'icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icon-384x384.png', sizes: '384x384', type: 'image/png' },
        { src: 'icon-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}']
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  app: {
    head: {
      title: 'PinzaFlow — WhatsApp CRM & AI Automation',
      htmlAttrs: { lang: 'es' },
      meta: [
        { name: 'description', content: 'The ultimate WhatsApp CRM for small businesses in LatAm. Manage conversations, track clients, and boost sales with AI.' },
        { name: 'theme-color', content: '#0F172A' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'PinzaFlow' },
        { property: 'og:title', content: 'PinzaFlow — WhatsApp CRM & AI Automation' },
        { property: 'og:description', content: 'Manage WhatsApp conversations, track clients, and boost sales with AI. Built for LatAm small businesses.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/icon-512x512.png' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'PinzaFlow' },
        { name: 'twitter:description', content: 'WhatsApp CRM & AI Sales Automation for LatAm' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'mask-icon', href: '/favicon.png', color: '#22C55E' }
      ]
    }
  }
})

