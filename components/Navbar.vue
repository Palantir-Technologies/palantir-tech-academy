<template>
  <header class="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <!-- Dynamic Brand Logo & Name -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <!-- Image Logo Mode -->
        <div v-if="settings.logoType === 'image' && settings.logoUrl" class="h-10 w-10 flex-shrink-0">
          <img
            :src="settings.logoUrl"
            :alt="settings.siteName"
            class="h-10 w-10 rounded-xl object-contain border border-slate-800 bg-slate-900 p-1 shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform"
          />
        </div>

        <!-- Stylized Icon Logo Mode -->
        <div
          v-else
          :class="[
            'flex h-10 w-10 items-center justify-center rounded-xl p-0.5 shadow-lg group-hover:scale-105 transition-transform flex-shrink-0',
            logoGradient
          ]"
        >
          <div class="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
            <span :class="['font-extrabold text-transparent bg-clip-text text-lg', logoTextGradient]">
              {{ settings.logoLetter || 'P' }}
            </span>
          </div>
        </div>

        <div>
          <span class="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
            <span>{{ formattedName.first }}</span>
            <span class="text-indigo-400 font-medium">{{ formattedName.rest }}</span>
          </span>
          <span class="block text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-400 truncate max-w-[150px] sm:max-w-none">
            {{ settings.siteSubtitle || 'Industrial Internship & Training' }}
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-5 lg:gap-6 text-xs sm:text-sm font-medium text-slate-300">
        <NuxtLink to="/#programs" class="hover:text-indigo-400 transition-colors">Programs</NuxtLink>
        <NuxtLink to="/#courses" class="hover:text-indigo-400 transition-colors">Courses</NuxtLink>
        <NuxtLink to="/#curriculum" class="hover:text-indigo-400 transition-colors">Curriculum</NuxtLink>
        <NuxtLink to="/synopsis" class="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors">
          <span>✨ AI Synopsis</span>
          <span class="rounded bg-emerald-950 border border-emerald-800/60 px-1 py-0.2 text-[9px] uppercase font-bold text-emerald-400">Free</span>
        </NuxtLink>
        <NuxtLink to="/verify/PTA-CERT-2026-8941" class="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Verify Cert
        </NuxtLink>
        <NuxtLink to="/portal" class="hover:text-indigo-400 transition-colors">
          Dashboard
        </NuxtLink>
      </nav>

      <!-- Right Actions: Auth & Mobile Menu Trigger -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- If Logged In -->
        <div v-if="user" class="flex items-center gap-2">
          <!-- Profile Trigger -->
          <button
            @click="isProfileModalOpen = true"
            title="Edit Profile & Change Password"
            class="flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-950/60 hover:bg-indigo-900/60 px-2.5 py-1.5 text-xs font-semibold text-white transition-all hover:scale-105"
          >
            <div class="h-6 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 flex items-center justify-center font-bold text-[11px] text-white">
              {{ (user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase() }}
            </div>
            <div class="text-left hidden sm:block">
              <span class="block text-xs font-bold leading-tight truncate max-w-[120px]">{{ user.user_metadata?.full_name || user.email?.split('@')[0] }}</span>
              <span class="block text-[9px] text-indigo-300 font-mono leading-none">
                {{ user.email === 'extractionevolution@gmail.com' ? '👑 Super Admin' : (user.user_metadata?.role || 'Intern') }}
              </span>
            </div>
            <span class="text-slate-400 text-[10px] hidden sm:inline">⚙️</span>
          </button>

          <!-- Sign Out Button -->
          <button
            @click="signOut"
            title="Sign Out"
            class="rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-slate-400 hover:text-rose-300 hover:bg-slate-800 transition-colors text-xs font-medium"
          >
            Sign Out
          </button>
        </div>

        <!-- If Not Logged In -->
        <div v-else class="flex items-center gap-2">
          <button
            @click="$emit('open-auth')"
            class="rounded-xl border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-slate-200 transition-colors"
          >
            Sign In
          </button>
          <button
            @click="$emit('open-enroll')"
            class="rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/25 hover:from-indigo-500 hover:to-sky-400 transition-all hover:scale-105 active:scale-95"
          >
            Apply Now
          </button>
        </div>

        <!-- Mobile Menu Toggle Button (Hamburger) -->
        <button
          @click="isMobileNavOpen = !isMobileNavOpen"
          class="md:hidden rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Toggle Navigation"
        >
          <span v-if="!isMobileNavOpen" class="text-lg leading-none block">☰</span>
          <span v-else class="text-lg leading-none block">✕</span>
        </button>
      </div>
    </div>

    <!-- Mobile Slide-Down Menu Drawer -->
    <Transition name="expand">
      <div
        v-if="isMobileNavOpen"
        class="md:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-3"
      >
        <div class="grid grid-cols-2 gap-2 text-xs font-semibold">
          <NuxtLink
            to="/#programs"
            @click="isMobileNavOpen = false"
            class="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            📚 Programs
          </NuxtLink>
          <NuxtLink
            to="/#courses"
            @click="isMobileNavOpen = false"
            class="rounded-xl border border-indigo-900/60 bg-indigo-950/40 p-3 text-indigo-300 hover:text-white hover:bg-slate-800 font-bold"
          >
            🎓 30 Courses
          </NuxtLink>
          <NuxtLink
            to="/#curriculum"
            @click="isMobileNavOpen = false"
            class="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            🗺️ Curriculum
          </NuxtLink>
          <NuxtLink
            to="/synopsis"
            @click="isMobileNavOpen = false"
            class="rounded-xl border border-emerald-900/60 bg-emerald-950/40 p-3 text-emerald-300 font-bold flex items-center justify-between"
          >
            <span>✨ AI Synopsis</span>
            <span class="rounded bg-emerald-900 px-1.5 text-[9px]">Free</span>
          </NuxtLink>
          <NuxtLink
            to="/verify/PTA-CERT-2026-8941"
            @click="isMobileNavOpen = false"
            class="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-slate-300 hover:text-white hover:bg-slate-800 col-span-2 text-center"
          >
            🔍 Verify Cert
          </NuxtLink>
        </div>

        <NuxtLink
          to="/portal"
          @click="isMobileNavOpen = false"
          class="block rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 p-3 text-center text-xs font-bold text-white shadow-md shadow-indigo-600/30"
        >
          Open Dashboard →
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useSiteSettings } from '~/composables/useSiteSettings'

defineEmits(['open-enroll', 'open-auth'])

const { user, isProfileModalOpen, initAuth, signOut } = useAuth()
const { settings, initSettings } = useSiteSettings()
const isMobileNavOpen = ref(false)

onMounted(() => {
  initAuth()
  initSettings()
})

const formattedName = computed(() => {
  const name = settings.value.siteName || 'Palantir Tech Academy'
  const parts = name.trim().split(' ')
  return {
    first: parts[0] || 'Palantir',
    rest: parts.slice(1).join(' ') || 'Academy'
  }
})

const logoGradient = computed(() => {
  const color = settings.value.logoColor || 'indigo'
  const map = {
    indigo: 'bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 shadow-indigo-500/20',
    emerald: 'bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 shadow-emerald-500/20',
    sky: 'bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 shadow-sky-500/20',
    amber: 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 shadow-amber-500/20',
    rose: 'bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-400 shadow-rose-500/20'
  }
  return map[color] || map.indigo
})

const logoTextGradient = computed(() => {
  const color = settings.value.logoColor || 'indigo'
  const map = {
    indigo: 'bg-gradient-to-r from-indigo-400 to-sky-300',
    emerald: 'bg-gradient-to-r from-emerald-400 to-teal-300',
    sky: 'bg-gradient-to-r from-sky-400 to-cyan-300',
    amber: 'bg-gradient-to-r from-amber-400 to-yellow-300',
    rose: 'bg-gradient-to-r from-rose-400 to-pink-300'
  }
  return map[color] || map.indigo
})
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease-out;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
