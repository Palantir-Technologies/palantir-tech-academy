import { useServerSupabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const certificateId = getRouterParam(event, 'id')

  if (!certificateId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Certificate ID is required.'
    })
  }

  const supabase = useServerSupabase()

  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('certificate_id', certificateId.toUpperCase().trim())
      .single()

    if (error || !data) {
      // Check if it's the demo certificate ID
      if (certificateId.toUpperCase().trim() === 'PTA-CERT-2026-8941') {
        return {
          found: true,
          certificate: {
            certificate_id: 'PTA-CERT-2026-8941',
            student_name: 'Aarav Mehta',
            college_name: 'Delhi Technological University (DTU)',
            track_name: 'Full-Stack Web Engineering (Nuxt 3 & Node.js)',
            duration: '6 Months (320 Industrial Hours)',
            completion_date: '2026-05-15',
            grade: 'Distinction (Grade A+)',
            capstone_project: 'Enterprise Multi-Tenant SaaS with Nuxt 3 & Supabase',
            project_url: 'https://github.com/palantir-tech/sample-capstone',
            is_revoked: false
          }
        }
      }

      return {
        found: false,
        message: 'No active certificate found matching this verification code.'
      }
    }

    return {
      found: true,
      certificate: data
    }
  } catch (err: any) {
    return {
      found: false,
      message: 'Failed to query certificate records.'
    }
  }
})
