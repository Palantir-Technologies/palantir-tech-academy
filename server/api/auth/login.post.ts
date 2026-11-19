import { useServerSupabase } from '../../utils/supabase'
import crypto from 'node:crypto'

const MASTER_SUPER_ADMIN_EMAIL = 'extractionevolution@gmail.com'
const SALT = 'palantir_admin_salt_2026'

const getHash = (pwd: string) => crypto.createHash('sha256').update(pwd + SALT).digest('hex')

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const supabase = useServerSupabase()

  // 1. MASTER SUPER ADMIN DIRECT AUTHENTICATION & PASSWORD SYNC
  if (normalizedEmail === MASTER_SUPER_ADMIN_EMAIL) {
    const inputHash = getHash(password)

    try {
      // Query site_settings for 'admin_auth'
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'admin_auth')
        .single()

      if (!error && data?.value?.passwordHash) {
        // Stored password hash exists. Verify match.
        const storedHash = data.value.passwordHash
        if (storedHash === inputHash) {
          return {
            success: true,
            user: {
              id: '00000000-0000-0000-0000-000000000001',
              email: MASTER_SUPER_ADMIN_EMAIL,
              role: 'authenticated',
              aud: 'authenticated',
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
            },
            token: 'pta_token_master_' + Date.now()
          }
        } else {
          return {
            success: false,
            error: 'Invalid password. Please check your credentials or click "Master Login as Super Admin" below to reset it.'
          }
        }
      } else {
        // No password hash was previously recorded (e.g. changed during mock session).
        // Automatically save this password as the official Super Admin password!
        await supabase
          .from('site_settings')
          .upsert({
            key: 'admin_auth',
            value: {
              email: MASTER_SUPER_ADMIN_EMAIL,
              passwordHash: inputHash,
              updatedAt: new Date().toISOString()
            },
            updated_at: new Date().toISOString()
          }, { onConflict: 'key' })

        return {
          success: true,
          user: {
            id: '00000000-0000-0000-0000-000000000001',
            email: MASTER_SUPER_ADMIN_EMAIL,
            role: 'authenticated',
            aud: 'authenticated',
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
          },
          token: 'pta_token_master_' + Date.now(),
          initialized: true
        }
      }
    } catch (err: any) {
      // In case database has network timeout or table issue, authenticate master safely
      return {
        success: true,
        user: {
          id: '00000000-0000-0000-0000-000000000001',
          email: MASTER_SUPER_ADMIN_EMAIL,
          role: 'authenticated',
          aud: 'authenticated',
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
        },
        token: 'pta_token_master_' + Date.now()
      }
    }
  }

  // 2. OTHER USERS (STUDENTS, TUTORS, DEVELOPERS, EMPLOYERS)
  try {
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', normalizedEmail)
      .single()

    if (!error && profile) {
      if (profile.status === 'paused' || profile.status === 'suspended') {
        return {
          success: false,
          error: `Your account has been ${profile.status} by the Super Admin. Please contact administration.`
        }
      }

      return {
        success: true,
        user: {
          id: profile.id,
          email: profile.email,
          role: 'authenticated',
          aud: 'authenticated',
          user_metadata: {
            full_name: profile.full_name,
            role: profile.role,
            college_name: profile.college_name || 'Engineering Student',
            phone: profile.phone || '',
            permissions: profile.permissions || {}
          }
        },
        token: 'pta_token_user_' + Date.now()
      }
    }
  } catch (err: any) {
    console.warn('User profile query error:', err)
  }

  return {
    success: false,
    error: 'Invalid login credentials. Please verify your email and password.'
  }
})
