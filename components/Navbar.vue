<template>
  <header class="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
          <div class="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
            <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300 text-lg">P</span>
          </div>
        </div>
        <div>
          <span class="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
            Palantir <span class="text-indigo-400 font-medium">Tech Academy</span>
          </span>
          <span class="block text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Industrial Internship & Training
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
        <NuxtLink to="/#programs" class="hover:text-indigo-400 transition-colors">Programs</NuxtLink>
        <NuxtLink to="/#curriculum" class="hover:text-indigo-400 transition-colors">Curriculum</NuxtLink>
        <NuxtLink to="/synopsis" class="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors">
          <span>✨ AI Project Synopsis</span>
          <span class="rounded bg-emerald-950 border border-emerald-800/60 px-1 py-0.2 text-[9px] uppercase font-bold text-emerald-400">Free</span>
        </NuxtLink>
        <NuxtLink to="/verify/PTA-CERT-2026-8941" class="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Verify Cert
        </NuxtLink>
        <NuxtLink to="/portal" class="text-indigo-300 hover:text-white transition-colors bg-indigo-950/60 border border-indigo-800/50 px-3 py-1.5 rounded-lg text-xs font-semibold">
          Role Portals
        </NuxtLink>
      </nav>

      <!-- Auth Actions -->
      <div class="flex items-center gap-2.5">
        <!-- If Logged In -->
        <div v-if="user" class="flex items-center gap-2">
          <NuxtLink
            to="/portal"
            class="flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-950/40 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-900/40 transition-colors"
          >
            <div class="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-[11px] text-white">
              {{ (user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase() }}
            </div>
            <span class="hidden sm:inline">{{ user.user_metadata?.full_name || user.email?.split('@')[0] }}</span>
          </NuxtLink>

          <button
            @click="signOut"
            title="Sign Out"
            class="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs"
          >
            Sign Out
          </button>
        </div>

        <!-- If Not Logged In -->
        <div v-else class="flex items-center gap-2">
          <button
            @click="$emit('open-auth')"
            class="rounded-xl border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors"
          >
            Sign In / Sign Up
          </button>
          <button
            @click="$emit('open-enroll')"
            class="rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/25 hover:from-indigo-500 hover:to-sky-400 transition-all hover:scale-105 active:scale-95"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

defineEmits(['open-enroll', 'open-auth'])

const { user, signOut } = useAuth()
</script>
