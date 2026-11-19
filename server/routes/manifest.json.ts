import { useServerSupabase } from '../utils/supabase'

export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'application/manifest+json')
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=3600')

  let siteName = 'Palantir Tech Academy'
  let siteSubtitle = 'Industrial Internship & Training'

  try {
    const supabase = useServerSupabase()
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'branding')
      .single()

    if (data?.value?.siteName) {
      siteName = data.value.siteName
      siteSubtitle = data.value.siteSubtitle || siteSubtitle
    }
  } catch (e) {
    // Fallback to default
  }

  return {
    name: `${siteName} - ${siteSubtitle}`,
    short_name: siteName,
    description: `${siteName} Industrial Training & College Internship Platform with AI Viva Simulator`,
    start_url: '/',
    id: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#4f46e5',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['education', 'productivity', 'business']
  }
})
