<template>
  <div v-if="isAuthModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div @click="isAuthModalOpen = false" class="absolute inset-0 bg-slate-950/80 backdrop-blur-md"></div>

    <!-- Modal Card -->
    <div class="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-slate-100">
      <!-- Close Button -->
      <button
        @click="isAuthModalOpen = false"
        class="absolute top-5 right-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
      >
        ✕
      </button>

      <!-- Brand & Mode Tabs -->
      <div class="text-center mb-6">
        <div class="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-0.5 shadow-lg shadow-indigo-500/20 mb-3">
          <div class="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950 font-extrabold text-indigo-400 text-base">
            P
          </div>
        </div>
        <h3 class="text-xl font-extrabold text-white">Palantir Student Portal</h3>
        <p class="text-xs text-slate-400 mt-1">Access your semester projects, attendance & verified certificate</p>

        <!-- Toggle Tabs -->
        <div class="mt-4 flex rounded-xl border border-slate-800 bg-slate-950 p-1">
          <button
            @click="mode = 'signin'"
            :class="[
              'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all',
              mode === 'signin' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            ]"
          >
            Sign In
          </button>
          <button
            @click="mode = 'signup'"
            :class="[
              'flex-1 py-1.5 text-xs font-bold rounded-lg transition-all',
              mode === 'signup' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            ]"
          >
            Create Account
          </button>
        </div>
      </div>

      <!-- Error Alert -->
      <div v-if="authError" class="mb-4 rounded-xl border border-red-900/60 bg-red-950/40 p-3 text-xs text-red-300">
        <div class="flex items-start gap-2">
          <span class="text-base leading-none">⚠️</span>
          <div class="flex-1">
            <span>{{ authError }}</span>
            <div v-if="form.email.toLowerCase().includes('extractionevolution')" class="mt-2 pt-2 border-t border-red-900/40 flex items-center justify-between">
              <span class="text-[11px] text-amber-300">Super Admin instant access:</span>
              <button
                type="button"
                @click="loginAsSuperAdmin"
                class="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline"
              >
                Access Master Dashboard →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Google OAuth Button -->
      <button
        @click="signInWithGoogle"
        :disabled="isLoading"
        class="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-700/80 bg-slate-800/80 hover:bg-slate-800 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <!-- Google SVG Icon -->
        <svg class="h-4 w-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
        <span>Continue with Google</span>
      </button>

      <!-- Divider -->
      <div class="relative my-5">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-slate-800"></div>
        </div>
        <div class="relative flex justify-center text-[10px] uppercase tracking-wider">
          <span class="bg-slate-900 px-3 text-slate-500 font-semibold">Or with college email</span>
        </div>
      </div>

      <!-- Email / Password Form -->
      <form @submit.prevent="handleSubmit" class="space-y-3.5 text-xs sm:text-sm">
        <div v-if="mode === 'signup'">
          <label class="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
          <input
            v-model="form.full_name"
            required
            placeholder="e.g. Rahul Sharma"
            class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div v-if="mode === 'signup'">
          <label class="block text-xs font-semibold text-slate-300 mb-1">College / University</label>
          <input
            v-model="form.college_name"
            placeholder="e.g. DTU / VIT / BITS"
            class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="e.g. student@college.edu"
            class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 py-2.5 font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-sky-400 disabled:opacity-50 transition-all text-xs sm:text-sm"
        >
          {{ isLoading ? 'Authenticating...' : mode === 'signin' ? 'Sign In to Dashboard' : 'Create Student Account' }}
        </button>
      </form>

      <!-- Instant Demo Bypass Buttons -->
      <div class="mt-5 pt-4 border-t border-slate-800/80 space-y-2 text-center">
        <button
          @click="loginAsSuperAdmin"
          class="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center justify-center gap-1.5 mx-auto transition-colors"
        >
          <span>👑 Master Login as Super Admin (extractionevolution@gmail.com)</span> →
        </button>
        <button
          @click="loginAsDemoStudent"
          class="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center justify-center gap-1 mx-auto transition-colors"
        >
          <span>🚀 Instant Preview as Demo Student (Aarav Mehta)</span> →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuth } from '~/composables/useAuth'

const {
  isAuthModalOpen,
  isLoading,
  authError,
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  loginAsDemoStudent,
  loginAsSuperAdmin
} = useAuth()

const mode = ref('signin')

const form = reactive({
  full_name: '',
  college_name: '',
  email: '',
  password: ''
})

const handleSubmit = async () => {
  const router = useRouter()
  const route = useRoute()

  if (mode.value === 'signin') {
    const res = await signInWithEmail(form.email, form.password)
    if (res?.success) {
      if (route.path !== '/portal') {
        router.push('/portal')
      }
    }
  } else {
    const res = await signUpWithEmail(form.email, form.password, {
      full_name: form.full_name,
      college_name: form.college_name
    })
    if (res?.success) {
      if (route.path !== '/portal') {
        router.push('/portal')
      }
    }
  }
}
</script>

