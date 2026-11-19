<template>
  <header class="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
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
      <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
        <NuxtLink to="/#programs" class="hover:text-indigo-400 transition-colors">Programs</NuxtLink>
        <NuxtLink to="/#curriculum" class="hover:text-indigo-400 transition-colors">Curriculum</NuxtLink>
        <NuxtLink to="/#compliance" class="hover:text-indigo-400 transition-colors">University Approval</NuxtLink>
        <NuxtLink to="/verify/PTA-CERT-2026-8941" class="hover:text-indigo-400 transition-colors flex items-center gap-1">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Verify Certificate
        </NuxtLink>
        <NuxtLink to="/portal" class="text-indigo-300 hover:text-white transition-colors bg-indigo-950/60 border border-indigo-800/50 px-3 py-1 rounded-lg text-xs font-semibold">
          Role Portals Demo
        </NuxtLink>
      </nav>

      <!-- CTA Action -->
      <div class="flex items-center gap-3">
        <button
          @click="$emit('open-enroll')"
          class="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:from-indigo-500 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Apply for 2026 Batch
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
defineEmits(['open-enroll'])
</script>
