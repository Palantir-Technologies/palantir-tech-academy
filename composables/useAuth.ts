import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'

let supabaseBrowserClient: any = null

export const useAuth = () => {
  const config = useRuntimeConfig()
  const user = useState<any>('auth_user', () => null)
  const session = useState<any>('auth_session', () => null)
  const isLoading = useState<boolean>('auth_loading', () => false)
  const isAuthModalOpen = useState<boolean>('auth_modal_open', () => false)
  const authError = useState<string | null>('auth_error', () => null)

  const getClient = () => {
    if (process.server) return null
    if (supabaseBrowserClient) return supabaseBrowserClient

    const url = config.public.supabaseUrl
    const anonKey = config.public.supabaseAnonKey

    if (url && anonKey) {
      supabaseBrowserClient = createClient(url, anonKey)
      
      // Auto-listen to auth state changes in browser
      supabaseBrowserClient.auth.onAuthStateChange((_event: any, currentSession: any) => {
        session.value = currentSession
        user.value = currentSession?.user || null
      })
    }
    return supabaseBrowserClient
  }

  // Initialize session in browser
  const initAuth = async () => {
    if (process.server) return
    const client = getClient()
    if (!client) return

    try {
      const { data } = await client.auth.getSession()
      if (data?.session) {
        session.value = data.session
        user.value = data.session.user
      }
    } catch (err) {
      console.warn('Auth session check:', err)
    }
  }

  // Sign In with Email & Password
  const signInWithEmail = async (email: string, password: string) => {
    isLoading.value = true
    authError.value = null
    const client = getClient()

    try {
      if (!client) throw new Error('Supabase client not initialized')
      const { data, error } = await client.auth.signInWithPassword({ email, password })
      if (error) throw error

      user.value = data.user
      session.value = data.session
      isAuthModalOpen.value = false
      return { success: true }
    } catch (err: any) {
      authError.value = err.message || 'Failed to sign in. Please check your credentials.'
      return { success: false, error: authError.value }
    } finally {
      isLoading.value = false
    }
  }

  // Sign Up with Email & Password + Profile Data
  const signUpWithEmail = async (email: string, password: string, metadata: { full_name: string; college_name?: string }) => {
    isLoading.value = true
    authError.value = null
    const client = getClient()

    try {
      if (!client) throw new Error('Supabase client not initialized')
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata.full_name,
            college_name: metadata.college_name || 'Engineering College',
            role: 'student'
          }
        }
      })
      if (error) throw error

      user.value = data.user
      session.value = data.session
      isAuthModalOpen.value = false
      return { success: true, user: data.user }
    } catch (err: any) {
      authError.value = err.message || 'Failed to sign up.'
      return { success: false, error: authError.value }
    } finally {
      isLoading.value = false
    }
  }

  // Sign In With Google OAuth
  const signInWithGoogle = async () => {
    isLoading.value = true
    authError.value = null
    const client = getClient()

    try {
      if (!client) throw new Error('Supabase client not initialized')
      const redirectOrigin = process.client ? window.location.origin : ''
      const { error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${redirectOrigin}/portal`
        }
      })
      if (error) throw error
    } catch (err: any) {
      authError.value = err.message || 'Google OAuth failed.'
    } finally {
      isLoading.value = false
    }
  }

  // Sign Out
  const signOut = async () => {
    isLoading.value = true
    const client = getClient()
    try {
      if (client) await client.auth.signOut()
      user.value = null
      session.value = null
    } catch (err) {
      console.warn('Sign out error:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Quick Demo Student Login (for instant evaluation)
  const loginAsDemoStudent = () => {
    user.value = {
      id: 'demo-student-001',
      email: 'aarav.mehta@dtu.ac.in',
      user_metadata: {
        full_name: 'Aarav Mehta',
        college_name: 'Delhi Technological University (DTU)',
        current_year: '8th Semester (Final Year)',
        enrolled_track: 'Full-Stack Web Engineering (6 Months)',
        enrollment_no: 'PTA2026001',
        attendance: 94,
        grade: 'Distinction (A+)',
        role: 'student'
      }
    }
    isAuthModalOpen.value = false
  }

  // Quick Super Admin Login (Master Control)
  const loginAsSuperAdmin = () => {
    user.value = {
      id: 'super-admin-master-001',
      email: 'extractionevolution@gmail.com',
      user_metadata: {
        full_name: 'Chief Super Admin (Palantir)',
        role: 'super_admin',
        permissions: {
          can_grade: true,
          can_issue_cert: true,
          can_view_leads: true,
          can_hire: true,
          can_manage_users: true
        }
      }
    }
    isAuthModalOpen.value = false
  }

  return {
    user,
    session,
    isLoading,
    isAuthModalOpen,
    authError,
    initAuth,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    loginAsDemoStudent,
    loginAsSuperAdmin
  }
}

