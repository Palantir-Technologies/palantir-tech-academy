import { useServerSupabase } from '../../utils/supabase'

export default defineEventHandler(async () => {
  const supabase = useServerSupabase()

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Always ensure Master Super Admin is present
    const masterAdmin = {
      id: 'master-owner',
      full_name: 'Chief Super Admin (Palantir)',
      email: 'extractionevolution@gmail.com',
      role: 'super_admin',
      status: 'active',
      hired_status: 'not_hired',
      permissions: { can_grade: true, can_issue_cert: true, can_view_leads: true, can_hire: true, can_manage_users: true }
    }

    const realUsers = (data && data.length > 0) ? data : [masterAdmin]
    const hasMaster = realUsers.some((u: any) => u.email === 'extractionevolution@gmail.com')
    if (!hasMaster) {
      realUsers.unshift(masterAdmin)
    }

    return {
      success: true,
      data: realUsers
    }
  } catch (err: any) {
    return {
      success: true,
      data: [
        {
          id: 'master-owner',
          full_name: 'Chief Super Admin (Palantir)',
          email: 'extractionevolution@gmail.com',
          role: 'super_admin',
          status: 'active',
          hired_status: 'not_hired',
          permissions: { can_grade: true, can_issue_cert: true, can_view_leads: true, can_hire: true, can_manage_users: true }
        }
      ]
    }
  }
})

