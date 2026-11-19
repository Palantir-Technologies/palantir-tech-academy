import { useServerSupabase } from '../utils/supabase'

export default defineEventHandler(async () => {
  try {
    const supabase = useServerSupabase()
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'branding')
      .single()

    if (!error && data?.value) {
      return { success: true, settings: data.value }
    }
  } catch (err) {
    // Return default fallback
  }

  return {
    success: true,
    settings: {
      siteName: 'Palantir Tech Academy',
      siteSubtitle: 'Industrial Internship & Training',
      logoType: 'icon',
      logoUrl: '',
      logoLetter: 'P',
      logoColor: 'indigo'
    }
  }
})
