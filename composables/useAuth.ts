import { createClient } from '@supabase/supabase-js'

let supabaseBrowserClient: any = null

export const useAuth = () => {
  const config = useRuntimeConfig()
  const user = useState<any>('auth_user', () => null)
  const session = useState<any>('auth_session', () => null)
  const isLoading = useState<boolean>('auth_loading', () => false)
  const isAuthModalOpen = useState<boolean>('auth_modal_open', () => false)
  const isProfileModalOpen = useState<boolean>('profile_modal_open', () => false)
  const authError = useState<string | null>('auth_error', () => null)

  const persistUserToStorage = (userData: any) => {
    if (process.client) {
      if (userData) {
        try {
          localStorage.setItem('pta_auth_user', JSON.stringify(userData))
        } catch (e) {
          console.warn('Could not save user to storage:', e)
        }
      } else {
        try {
          localStorage.removeItem('pta_auth_user')
        } catch (e) {
          console.warn('Could not remove user from storage:', e)
        }
      }
    }
  }

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
        if (currentSession?.user) {
          user.value = {
            ...currentSession.user,
            user_metadata: {
              ...currentSession.user.user_metadata,
              role: currentSession.user.email === 'extractionevolution@gmail.com' ? 'super_admin' : (currentSession.user.user_metadata?.role || 'student')
            }
          }
          persistUserToStorage(user.value)
        }
      })
    }
    return supabaseBrowserClient
  }

  // Initialize session in browser with instant localStorage hydration
  const initAuth = async () => {
    if (process.server) return

    // 1. Instant synchronous hydration from localStorage to prevent navbar flickering on home page
    if (!user.value && process.client) {
      try {
        const stored = localStorage.getItem('pta_auth_user')
        if (stored) {
          user.value = JSON.parse(stored)
        }
      } catch (e) {
        console.warn('Error reading stored user:', e)
      }
    }

    const client = getClient()
    if (!client) return

    try {
      const { data } = await client.auth.getSession()
      if (data?.session?.user) {
        session.value = data.session
        const isSuperAdmin = data.session.user.email === 'extractionevolution@gmail.com'
        user.value = {
          ...data.session.user,
          user_metadata: {
            ...data.session.user.user_metadata,
            role: isSuperAdmin ? 'super_admin' : (data.session.user.user_metadata?.role || 'student')
          }
        }
        persistUserToStorage(user.value)
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
      const normalizedEmail = email.trim().toLowerCase()
      let loggedIn = false

      // 1. Attempt Supabase Auth first
      if (client) {
        try {
          const { data, error } = await client.auth.signInWithPassword({ email: normalizedEmail, password })
          if (!error && data?.user) {
            const isSuperAdmin = normalizedEmail === 'extractionevolution@gmail.com'
            user.value = {
              ...data.user,
              user_metadata: {
                ...data.user.user_metadata,
                role: isSuperAdmin ? 'super_admin' : (data.user.user_metadata?.role || 'student')
              }
            }
            session.value = data.session
            persistUserToStorage(user.value)
            isAuthModalOpen.value = false
            loggedIn = true
            return { success: true }
          }
        } catch (sbErr) {
          console.warn('Supabase auth attempt:', sbErr)
        }
      }

      // 2. Fallback to Server Auth Bridge (handles Super Admin master password and synced ledger)
      if (!loggedIn) {
        const serverAuth: any = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email: normalizedEmail, password }
        })

        if (serverAuth && serverAuth.success && serverAuth.user) {
          user.value = serverAuth.user
          session.value = {
            access_token: serverAuth.token || 'pta_token_master_' + Date.now(),
            user: serverAuth.user
          }
          persistUserToStorage(user.value)
          isAuthModalOpen.value = false
          authError.value = null
          return { success: true }
        } else {
          throw new Error(serverAuth?.error || 'Invalid login credentials. Please check your credentials.')
        }
      }

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
      const isSuperAdmin = email.trim().toLowerCase() === 'extractionevolution@gmail.com'
      const assignedRole = isSuperAdmin ? 'super_admin' : 'student'

      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata.full_name,
            college_name: metadata.college_name || 'Engineering College',
            role: assignedRole
          }
        }
      })
      if (error) throw error

      if (data.user) {
        user.value = {
          ...data.user,
          user_metadata: {
            ...data.user.user_metadata,
            role: assignedRole
          }
        }
        session.value = data.session
        persistUserToStorage(user.value)
      }
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

  // Update Profile Details (Full Name, College, Phone)
  const updateProfile = async (details: { full_name?: string; college_name?: string; phone?: string }) => {
    isLoading.value = true
    const client = getClient()
    try {
      if (client && session.value) {
        const { data, error } = await client.auth.updateUser({
          data: {
            ...user.value?.user_metadata,
            full_name: details.full_name || user.value?.user_metadata?.full_name,
            college_name: details.college_name !== undefined ? details.college_name : user.value?.user_metadata?.college_name,
            phone: details.phone !== undefined ? details.phone : user.value?.user_metadata?.phone
          }
        })
        if (error) throw error
        if (data?.user) {
          user.value = {
            ...data.user,
            user_metadata: {
              ...user.value?.user_metadata,
              ...data.user.user_metadata
            }
          }
          persistUserToStorage(user.value)
        }
      } else {
        // Update local state if in demo mode
        user.value = {
          ...user.value,
          user_metadata: {
            ...user.value?.user_metadata,
            full_name: details.full_name || user.value?.user_metadata?.full_name,
            college_name: details.college_name !== undefined ? details.college_name : user.value?.user_metadata?.college_name,
            phone: details.phone !== undefined ? details.phone : user.value?.user_metadata?.phone
          }
        }
        persistUserToStorage(user.value)
      }
      return { success: true, message: 'Profile updated successfully!' }
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to update profile.' }
    } finally {
      isLoading.value = false
    }
  }

  // Update Password
  const updatePassword = async (newPassword: string) => {
    isLoading.value = true
    const client = getClient()
    try {
      if (!newPassword || newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long.')
      }

      const email = user.value?.email || 'extractionevolution@gmail.com'

      // 1. Sync with server persistent database
      const res: any = await $fetch('/api/auth/update-password', {
        method: 'POST',
        body: { email, password: newPassword }
      })

      // 2. If active Supabase session exists, also update Supabase Auth
      if (client && session.value?.access_token && !session.value.access_token.startsWith('pta_')) {
        try {
          await client.auth.updateUser({ password: newPassword })
        } catch (sbErr) {
          console.warn('Supabase updateUser non-fatal notice:', sbErr)
        }
      }

      return { success: true, message: res?.message || 'Password updated and synchronized successfully!' }
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to update password.' }
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
    } catch (err) {
      console.warn('Sign out error:', err)
    } finally {
      user.value = null
      session.value = null
      persistUserToStorage(null)
      isLoading.value = false
      if (isProfileModalOpen.value) isProfileModalOpen.value = false
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
        role: 'student',
        phone: '+91 98765 43210'
      }
    }
    session.value = {
      access_token: 'pta_demo_token_' + Date.now(),
      user: user.value
    }
    persistUserToStorage(user.value)
    isAuthModalOpen.value = false
  }

  // Quick Super Admin Login (Master Control)
  const loginAsSuperAdmin = () => {
    user.value = {
      id: 'super-admin-master-001',
      email: 'extractionevolution@gmail.com',
      aud: 'authenticated',
      role: 'authenticated',
      user_metadata: {
        full_name: 'Chief Super Admin (Palantir)',
        role: 'super_admin',
        college_name: 'Palantir Tech Academy HQ',
        phone: '+91 98700 00001',
        permissions: {
          can_grade: true,
          can_issue_cert: true,
          can_view_leads: true,
          can_hire: true,
          can_manage_users: true
        }
      }
    }
    session.value = {
      access_token: 'pta_master_session_' + Date.now(),
      user: user.value
    }
    persistUserToStorage(user.value)
    isAuthModalOpen.value = false
  }

  return {
    user,
    session,
    isLoading,
    isAuthModalOpen,
    isProfileModalOpen,
    authError,
    initAuth,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    updateProfile,
    updatePassword,
    signOut,
    loginAsDemoStudent,
    loginAsSuperAdmin
  }
}
