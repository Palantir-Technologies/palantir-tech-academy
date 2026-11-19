import { createClient } from '@supabase/supabase-js'

let supabaseClient: any = null

export const useServerSupabase = () => {
  if (supabaseClient) return supabaseClient

  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.supabaseServiceKey || config.public.supabaseAnonKey

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes('mock-palantir-academy')) {
    try {
      supabaseClient = createClient(supabaseUrl, supabaseKey)
      return supabaseClient
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e)
    }
  }

  // Graceful fallback mock client for development before keys are configured
  return {
    from: (table: string) => ({
      insert: async (data: any) => {
        console.log(`[Supabase Mock Insert into ${table}]:`, data)
        return { data, error: null }
      },
      select: (query?: string) => ({
        eq: (col: string, val: any) => ({
          single: async () => {
            if (table === 'certificates') {
              return {
                data: {
                  certificate_id: val,
                  student_name: 'Aarav Mehta',
                  college_name: 'Delhi Technological University (DTU)',
                  track_name: 'Full-Stack Web Engineering (Nuxt 3 & Node.js)',
                  duration: '6 Months (320 Industrial Hours)',
                  completion_date: '2026-05-15',
                  grade: 'Distinction (Grade A+)',
                  capstone_project: 'Enterprise Multi-Tenant SaaS with Nuxt 3 & Supabase',
                  project_url: 'https://github.com/palantir-tech/sample-capstone',
                  is_revoked: false
                },
                error: null
              }
            }
            return { data: null, error: null }
          }
        }),
        order: () => Promise.resolve({ data: [], error: null })
      })
    })
  }
}
