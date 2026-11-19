<template>
  <footer class="border-t border-slate-900 bg-slate-950 pt-16 pb-12 text-slate-400">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
        <div class="md:col-span-2 space-y-4">
          <!-- Dynamic Logo & Name -->
          <div class="flex items-center gap-2.5">
            <div v-if="settings.logoType === 'image' && settings.logoUrl" class="h-8 w-8 flex-shrink-0">
              <img :src="settings.logoUrl" :alt="settings.siteName" class="h-8 w-8 rounded-lg object-contain border border-slate-800 bg-slate-900" />
            </div>
            <div v-else class="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
              {{ settings.logoLetter || 'P' }}
            </div>
            <span class="text-lg font-bold text-white">{{ settings.siteName || 'Palantir Tech Academy' }}</span>
          </div>

          <p class="text-sm text-slate-400 leading-relaxed max-w-md">
            Bridging the gap between engineering college curriculums and high-scale production systems. Providing accredited 3-month & 6-month industrial internship programs for ambitious software engineers.
          </p>
          <div class="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-900/60 px-3 py-1.5 rounded-lg w-fit">
            <span>🛡️ 100% University Compliant Industrial Training & NOC Certification</span>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">Programs</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#programs" class="hover:text-indigo-400 transition-colors">3-Month Fast-Track Web</a></li>
            <li><a href="#programs" class="hover:text-indigo-400 transition-colors">6-Month Comprehensive Web</a></li>
            <li><a href="#programs" class="hover:text-indigo-400 transition-colors">Applied AI & GenAI Systems</a></li>
            <li><a href="#compliance" class="hover:text-indigo-400 transition-colors">Final Semester Project Kit</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">Credentials & Portals</h4>
          <ul class="space-y-2.5 text-sm">
            <li><NuxtLink to="/verify/PTA-CERT-2026-8941" class="hover:text-indigo-400 transition-colors">Certificate Verification</NuxtLink></li>
            <li><NuxtLink to="/portal" class="hover:text-indigo-400 transition-colors">Super Admin Command Hub</NuxtLink></li>
            <li><NuxtLink to="/synopsis" class="hover:text-indigo-400 transition-colors">AI Project Synopsis</NuxtLink></li>
            <li><NuxtLink to="/portal" class="hover:text-indigo-400 transition-colors">Student Learning Hub</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="mt-12 border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 {{ settings.siteName || 'Palantir Tech Academy' }}. All rights reserved.</p>
        <div class="flex items-center gap-6">
          <span class="hover:text-slate-400">Terms of Training</span>
          <span class="hover:text-slate-400">Privacy Policy</span>
          <span class="hover:text-slate-400">ISO / University Accreditation</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useSiteSettings } from '~/composables/useSiteSettings'

const { settings } = useSiteSettings()
</script>
