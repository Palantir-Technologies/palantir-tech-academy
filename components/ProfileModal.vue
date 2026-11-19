<template>
  <Teleport to="body">
    <div
      v-if="isProfileModalOpen && user"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      @click.self="isProfileModalOpen = false"
    >
      <div class="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
        <!-- Close Button -->
        <button
          @click="isProfileModalOpen = false"
          class="absolute top-5 right-5 h-8 w-8 rounded-full border border-slate-800 bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        <!-- Header -->
        <div class="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
          <div class="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-0.5 shadow-lg shadow-indigo-600/30 flex-shrink-0">
            <div class="h-full w-full rounded-[14px] bg-slate-950 flex items-center justify-center font-extrabold text-white text-xl">
              {{ (user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase() }}
            </div>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-lg font-bold text-white truncate">
                {{ user.user_metadata?.full_name || user.email?.split('@')[0] }}
              </h2>
              <span
                :class="[
                  'rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase',
                  userRole === 'super_admin' ? 'bg-amber-950 text-amber-300 border border-amber-700/80' :
                  userRole === 'tutor' ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/80' :
                  userRole === 'developer' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/80' :
                  'bg-sky-950 text-sky-300 border border-sky-700/80'
                ]"
              >
                {{ userRole === 'super_admin' ? '👑 Master Super Admin' : userRole === 'tutor' ? '👨‍🏫 Faculty / Tutor' : userRole === 'developer' ? '💼 Junior Developer' : '🎓 Student Intern' }}
              </span>
            </div>
            <p class="text-xs text-slate-400 font-mono mt-0.5 truncate">{{ user.email }}</p>
          </div>
        </div>

        <!-- Notification Banner -->
        <div v-if="feedbackMsg" :class="['mb-4 p-3 rounded-xl text-xs font-semibold flex items-center gap-2', isError ? 'bg-red-950/80 border border-red-800 text-red-300' : 'bg-emerald-950/80 border border-emerald-800 text-emerald-300']">
          <span>{{ isError ? '⚠️' : '✅' }}</span>
          <span>{{ feedbackMsg }}</span>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex items-center gap-2 border-b border-slate-800 pb-3 mb-5">
          <button
            @click="activeTab = 'info'"
            :class="[
              'rounded-xl px-3 py-1.5 text-xs font-bold transition-all',
              activeTab === 'info' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            ]"
          >
            Personal Details
          </button>
          <button
            @click="activeTab = 'password'"
            :class="[
              'rounded-xl px-3 py-1.5 text-xs font-bold transition-all',
              activeTab === 'password' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            ]"
          >
            Change Password
          </button>
          <button
            @click="activeTab = 'role'"
            :class="[
              'rounded-xl px-3 py-1.5 text-xs font-bold transition-all',
              activeTab === 'role' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            ]"
          >
            Clearance & Powers
          </button>
        </div>

        <!-- Tab 1: Personal Details Form -->
        <form v-if="activeTab === 'info'" @submit.prevent="handleSaveProfile" class="space-y-4 text-xs">
          <div>
            <label class="block text-slate-300 font-semibold mb-1">Full Legal Name</label>
            <input
              v-model="profileForm.fullName"
              required
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label class="block text-slate-300 font-semibold mb-1">College / University / Company</label>
            <input
              v-model="profileForm.collegeName"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. Delhi Technological University (DTU)"
            />
          </div>

          <div>
            <label class="block text-slate-300 font-semibold mb-1">Phone Number</label>
            <input
              v-model="profileForm.phone"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              placeholder="+91 98765 43210"
            />
          </div>

          <div class="pt-2 flex justify-end gap-3">
            <button
              type="button"
              @click="isProfileModalOpen = false"
              class="rounded-xl border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : 'Save Profile Changes' }}
            </button>
          </div>
        </form>

        <!-- Tab 2: Change Password Form -->
        <form v-else-if="activeTab === 'password'" @submit.prevent="handleChangePassword" class="space-y-4 text-xs">
          <div>
            <label class="block text-slate-300 font-semibold mb-1">New Password (min 6 characters)</label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              required
              minlength="6"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-slate-300 font-semibold mb-1">Confirm New Password</label>
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              required
              minlength="6"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <p class="text-[11px] text-slate-400">
            Once updated, your Supabase Auth session will remain securely active with your updated password.
          </p>

          <div class="pt-2 flex justify-end gap-3">
            <button
              type="button"
              @click="isProfileModalOpen = false"
              class="rounded-xl border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              {{ saving ? 'Updating...' : 'Update Password' }}
            </button>
          </div>
        </form>

        <!-- Tab 3: Clearance & Powers -->
        <div v-else-if="activeTab === 'role'" class="space-y-4 text-xs">
          <div class="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-slate-400 font-medium">Clearance Level</span>
              <span class="font-bold text-white uppercase">{{ userRole }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400 font-medium">Account ID</span>
              <span class="font-mono text-[10px] text-slate-400 truncate max-w-[200px]">{{ user.id }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400 font-medium">Account Status</span>
              <span class="text-emerald-400 font-bold flex items-center gap-1.5">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Active
              </span>
            </div>
          </div>

          <div>
            <h4 class="text-slate-300 font-bold mb-2">Assigned System Powers:</h4>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="(hasPower, powerName) in userPowers"
                :key="powerName"
                class="rounded-xl border border-slate-800/80 bg-slate-950/40 p-2.5 flex items-center gap-2"
              >
                <span>{{ hasPower ? '✅' : '🔒' }}</span>
                <span :class="[hasPower ? 'text-slate-200 font-semibold' : 'text-slate-500']">
                  {{ formatPowerName(powerName) }}
                </span>
              </div>
            </div>
          </div>

          <div class="pt-2 flex justify-end">
            <button
              type="button"
              @click="isProfileModalOpen = false"
              class="rounded-xl border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user, isProfileModalOpen, updateProfile, updatePassword } = useAuth()

const activeTab = ref('info')
const saving = ref(false)
const feedbackMsg = ref('')
const isError = ref(false)

const profileForm = ref({
  fullName: '',
  collegeName: '',
  phone: ''
})

const passwordForm = ref({
  newPassword: '',
  confirmPassword: ''
})

watch(
  () => [isProfileModalOpen.value, user.value],
  () => {
    if (user.value) {
      profileForm.value = {
        fullName: user.value.user_metadata?.full_name || '',
        collegeName: user.value.user_metadata?.college_name || '',
        phone: user.value.user_metadata?.phone || ''
      }
      feedbackMsg.value = ''
      passwordForm.value = { newPassword: '', confirmPassword: '' }
    }
  },
  { immediate: true }
)

const userRole = computed(() => {
  if (user.value?.email === 'extractionevolution@gmail.com') return 'super_admin'
  return user.value?.user_metadata?.role || 'student'
})

const userPowers = computed(() => {
  const isSuperAdmin = userRole.value === 'super_admin'
  const isTutor = userRole.value === 'tutor'
  const isDev = userRole.value === 'developer'
  
  return {
    manage_users: isSuperAdmin,
    issue_certificates: isSuperAdmin || user.value?.user_metadata?.permissions?.can_issue_cert,
    grade_assignments: isSuperAdmin || isTutor || isDev || user.value?.user_metadata?.permissions?.can_grade,
    view_leads: isSuperAdmin || user.value?.user_metadata?.permissions?.can_view_leads,
    hire_interns: isSuperAdmin || userRole.value === 'employer' || user.value?.user_metadata?.permissions?.can_hire
  }
})

const formatPowerName = (key) => {
  const map = {
    manage_users: 'Super Admin Control',
    issue_certificates: 'Issue Certificates',
    grade_assignments: 'Code Review & Grading',
    view_leads: 'Inbound Leads CRM',
    hire_interns: 'Hire & Offer Letters'
  }
  return map[key] || key
}

const handleSaveProfile = async () => {
  saving.value = true
  feedbackMsg.value = ''
  isError.value = false

  const res = await updateProfile({
    full_name: profileForm.value.fullName,
    college_name: profileForm.value.collegeName,
    phone: profileForm.value.phone
  })

  saving.value = false
  if (res.success) {
    feedbackMsg.value = 'Profile updated successfully!'
    setTimeout(() => {
      feedbackMsg.value = ''
    }, 4000)
  } else {
    isError.value = true
    feedbackMsg.value = res.error || 'Failed to update profile.'
  }
}

const handleChangePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    isError.value = true
    feedbackMsg.value = 'Passwords do not match. Please verify.'
    return
  }

  saving.value = true
  feedbackMsg.value = ''
  isError.value = false

  const res = await updatePassword(passwordForm.value.newPassword)
  saving.value = false

  if (res.success) {
    feedbackMsg.value = 'Password changed successfully!'
    passwordForm.value = { newPassword: '', confirmPassword: '' }
    setTimeout(() => {
      feedbackMsg.value = ''
    }, 4000)
  } else {
    isError.value = true
    feedbackMsg.value = res.error || 'Failed to update password.'
  }
}
</script>

