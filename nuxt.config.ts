// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  telemetry: false,

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  runtimeConfig: {
    // Private keys on server side
    geminiApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    
    // Public keys exposed to client
    public: {
      supabaseUrl: process.env.SUPABASE_URL || 'https://mock-palantir-academy.supabase.co',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || 'mock-anon-key'
    }
  },

  app: {
    head: {
      title: 'Palantir Tech Academy | 3 & 6 Month Industrial Internship & Training',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Industry-accredited 3-month and 6-month industrial internship programs for college students. Full-Stack Web Development, AI/GenAI, verified certifications, and 100% university semester project compliance.' 
        }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap' }
      ]
    }
  },

  css: ['~/assets/css/main.css']
})
