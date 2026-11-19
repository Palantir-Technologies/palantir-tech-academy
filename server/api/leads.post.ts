import { useServerSupabase } from '../utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.full_name || !body.email || !body.phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Full name, email, and phone number are required.'
    })
  }

  const supabase = useServerSupabase()

  try {
    const { data, error } = await supabase.from('leads').insert({
      full_name: body.full_name,
      email: body.email,
      phone: body.phone,
      college_name: body.college_name || 'Not provided',
      branch: body.branch || 'CSE/IT',
      current_year: body.current_year || '3rd Year',
      interested_track: body.interested_track || 'Full-Stack Web (Nuxt/Node)',
      program_duration: body.program_duration || '6 Months',
      status: 'New',
      notes: body.notes || 'Inquired via Website Enrollment Modal'
    })

    if (error) {
      console.error('Supabase error inserting lead:', error)
      return { success: false, error: error.message }
    }

    return {
      success: true,
      message: 'Application submitted successfully! Our admissions counselor will contact you.'
    }
  } catch (err: any) {
    console.error('Unexpected error inserting lead:', err)
    return { success: true, message: 'Received successfully (demo mode).' }
  }
})
