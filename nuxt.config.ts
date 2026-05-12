// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    googleAiApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
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
      exclude: ['/signup', '/', '/features', '/demo', '/about', '/forgot-password', '/reset-password'],
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'PinFlowser — Tu clouser inteligente siempre activo',
      short_name: 'PinFlowser',
      description: 'The ultimate WhatsApp CRM and AI Sales Clouser for small businesses in Latin America. Automate conversations and close more sales with AI.',
      theme_color: '#0F172A',
      background_color: '#0F172A',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      categories: ['business', 'productivity', 'sales'],
      icons: [
        { src: 'icon-72x72.png', sizes: '72x72', type: 'image/png' },
        { src: 'icon-96x96.png', sizes: '96x96', type: 'image/png' },
        { src: 'icon-128x128.png', sizes: '128x128', type: 'image/png' },
        { src: 'icon-144x144.png', sizes: '144x144', type: 'image/png' },
        { src: 'icon-152x152.png', sizes: '152x152', type: 'image/png' },
        { src: 'icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icon-384x384.png', sizes: '384x384', type: 'image/png' },
        { src: 'PinFlowSer-PWA.png', sizes: '512x512', type: 'image/png' },
        { src: 'PinFlowSer-PWA.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
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
      title: 'PinFlowser — Tu clouser inteligente siempre activo',
      htmlAttrs: { lang: 'es' },
      meta: [
        { name: 'description', content: 'The ultimate WhatsApp CRM and AI Sales Clouser for LatAm. Automate conversations and close more sales with AI.' },
        { name: 'theme-color', content: '#0F172A' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'PinFlowser' },
        { property: 'og:title', content: 'PinFlowser — Tu clouser inteligente siempre activo' },
        { property: 'og:description', content: 'Transform WhatsApp conversations into automated sales with our AI Sales Clouser platform.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/icon-512x512.png' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'PinFlowser' },
        { name: 'twitter:description', content: 'WhatsApp CRM & AI Sales Clouser for LatAm' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/PinFlowSer-PWA.png' },
        { rel: 'apple-touch-icon', href: '/PinFlowSer-PWA.png' }
      ]
    }
  }
})

