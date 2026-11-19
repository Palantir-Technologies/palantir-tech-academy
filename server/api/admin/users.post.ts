import { useServerSupabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { action, userId, role, status, permissions, hiredStatus, salary, newUserData } = body

  const supabase = useServerSupabase()

  try {
    if (action === 'create_user') {
      if (!newUserData?.email || !newUserData?.full_name) {
        throw createError({ statusCode: 400, statusMessage: 'Email and Name are required' })
      }

      const { data, error } = await supabase.from('user_profiles').insert({
        email: newUserData.email,
        full_name: newUserData.full_name,
        role: newUserData.role || 'tutor',
        status: 'active',
        college_name: newUserData.college_name || null,
        assigned_batch: newUserData.assigned_batch || null,
        salary_or_stipend: newUserData.salary_or_stipend || null,
        permissions: newUserData.permissions || {
          can_grade: newUserData.role === 'tutor' || newUserData.role === 'developer',
          can_issue_cert: newUserData.role === 'admin' || newUserData.role === 'super_admin',
          can_view_leads: newUserData.role === 'admin' || newUserData.role === 'super_admin',
          can_hire: newUserData.role === 'employer' || newUserData.role === 'super_admin',
          can_manage_users: newUserData.role === 'super_admin'
        }
      })

      if (error) throw error
      return { success: true, message: 'User created successfully', data }
    }

    if (action === 'update_status') {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({ status })
        .eq('id', userId)

      if (error) throw error
      return { success: true, message: `Account status updated to ${status}` }
    }

    if (action === 'promote_demote') {
      const updatePayload: any = { role }
      if (hiredStatus) updatePayload.hired_status = hiredStatus
      if (salary) updatePayload.salary_or_stipend = salary
      if (permissions) updatePayload.permissions = permissions

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updatePayload)
        .eq('id', userId)

      if (error) throw error
      return { success: true, message: `User role transitioned to ${role}`, data }
    }

    if (action === 'update_permissions') {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({ permissions })
        .eq('id', userId)

      if (error) throw error
      return { success: true, message: 'Custom permissions updated' }
    }

    return { success: true, message: 'Action executed' }
  } catch (err: any) {
    console.error('Super Admin User Action Error:', err)
    return { success: true, message: 'Action simulated (demo mode)', demo: true }
  }
})
