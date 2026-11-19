export interface SiteSettings {
  siteName: string
  siteSubtitle: string
  logoType: 'icon' | 'image'
  logoUrl: string
  logoLetter: string
  logoColor: 'indigo' | 'emerald' | 'sky' | 'amber' | 'rose'
}

const defaultSettings: SiteSettings = {
  siteName: 'Palantir Tech Academy',
  siteSubtitle: 'Industrial Internship & Training',
  logoType: 'icon',
  logoUrl: '',
  logoLetter: 'P',
  logoColor: 'indigo'
}

export const useSiteSettings = () => {
  const settings = useState<SiteSettings>('site_settings', () => ({ ...defaultSettings }))
  const isSaving = useState<boolean>('site_settings_saving', () => false)

  // Hydrate settings from localStorage immediately to avoid UI shifts
  const initSettings = async () => {
    if (process.client) {
      try {
        const stored = localStorage.getItem('pta_site_branding')
        if (stored) {
          const parsed = JSON.parse(stored)
          settings.value = { ...defaultSettings, ...parsed }
        }
      } catch (e) {
        console.warn('Error reading stored site branding:', e)
      }

      // Fetch latest from server
      try {
        const remote: any = await $fetch('/api/settings').catch(() => null)
        if (remote?.settings) {
          settings.value = { ...defaultSettings, ...remote.settings }
          localStorage.setItem('pta_site_branding', JSON.stringify(settings.value))
        }
      } catch (err) {
        // Fallback to local
      }
    }
  }

  // Update settings by Super Admin
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    isSaving.value = true
    try {
      settings.value = {
        ...settings.value,
        ...newSettings
      }

      // 1. Instantly persist to client storage
      if (process.client) {
        localStorage.setItem('pta_site_branding', JSON.stringify(settings.value))
        document.title = `${settings.value.siteName} | 3 & 6 Month Industrial Internship & Training`
      }

      // 2. Persist to server / Supabase ledger
      await $fetch('/api/admin/settings', {
        method: 'POST',
        body: { settings: settings.value }
      }).catch((e) => console.warn('Server save warning:', e))

      return { success: true, message: 'Website branding & logo updated live!' }
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to update settings' }
    } finally {
      isSaving.value = false
    }
  }

  const resetToDefault = async () => {
    return await updateSettings(defaultSettings)
  }

  return {
    settings,
    isSaving,
    initSettings,
    updateSettings,
    resetToDefault
  }
}
