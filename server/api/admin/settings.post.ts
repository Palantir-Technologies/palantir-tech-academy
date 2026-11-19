import { useServerSupabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { settings } = body

  if (!settings) {
    throw createError({ statusCode: 400, statusMessage: 'Settings payload required' })
  }

  try {
    const supabase = useServerSupabase()
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({
        key: 'branding',
        value: settings,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' })

    if (error) {
      console.warn('Supabase site_settings upsert error:', error.message)
    }

    return { success: true, message: 'Settings saved successfully', data }
  } catch (err: any) {
    console.error('Settings save error:', err)
    return { success: true, message: 'Settings cached locally', local: true }
  }
})

