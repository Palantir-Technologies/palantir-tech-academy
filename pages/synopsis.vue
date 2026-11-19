<template>
  <div class="min-h-screen bg-slate-950 bg-grid-pattern text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-4xl space-y-8">
      <!-- Breadcrumb & Header -->
      <div class="text-center space-y-3">
        <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
          ← Back to Palantir Tech Academy
        </NuxtLink>
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1 text-xs text-emerald-300 mx-auto block w-fit">
          <span>✨ 100% Free College Student Tool</span>
          <span>•</span>
          <span>IEEE Standard Pre-Approved</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          AI University Project Synopsis & Title Generator
        </h1>
        <p class="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Generate IEEE-compliant project titles, problem statements, architectures, and viva defense angles tailored for engineering college guide approvals (B.Tech / MCA / BCA).
        </p>
      </div>

      <!-- Generator Card Form -->
      <div class="glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            1. Select Your Project Domain
          </label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <button
              v-for="d in domains"
              :key="d"
              @click="selectedDomain = d"
              :class="[
                'rounded-xl border px-3 py-2 text-xs font-semibold text-left transition-all',
                selectedDomain === d
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              ]"
            >
              {{ d }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            2. Specific Keywords or Features You'd Like to Include
          </label>
          <input
            v-model="keywords"
            placeholder="e.g. Real-time WebSockets, Microservices, Supabase RLS, Gemini 3.8 AI"
            class="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <button
          @click="generateSynopsis"
          :disabled="isLoading"
          class="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-600 py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all"
        >
          {{ isLoading ? 'AI Senior Architect is Generating Synopsis...' : 'Generate IEEE University Synopsis →' }}
        </button>
      </div>

      <!-- Generated Result Container -->
      <div v-if="synopsisResult" class="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Generated Result</span>
            <h3 class="text-xl font-bold text-white mt-0.5">University Project Submission Dossier</h3>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="copySynopsis"
              class="rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors"
            >
              {{ copied ? '✓ Copied!' : 'Copy Markdown' }}
            </button>
            <button
              @click="printSynopsis"
              class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 text-xs font-bold text-white transition-colors"
            >
              Print / Save PDF
            </button>
          </div>
        </div>

        <!-- Rendered Markdown Content -->
        <div class="prose prose-invert prose-indigo max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
          <div v-html="formattedSynopsis"></div>
        </div>

        <!-- Call to Action Banner -->
        <div class="rounded-2xl border border-indigo-900/60 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 class="text-sm font-bold text-white">Want to Build This Exact Project with Senior Tech Leads?</h4>
            <p class="text-xs text-slate-400">Join Palantir Tech Academy's 6-Month Industrial Program. We provide full code reviews, documentation, and viva prep.</p>
          </div>
          <button
            @click="$emit('open-enroll')"
            class="whitespace-nowrap rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:scale-105 transition-all"
          >
            Apply for 2026 Batch
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineEmits(['open-enroll'])

const domains = [
  'Full-Stack Cloud SaaS',
  'Applied AI & GenAI Systems',
  'Fintech & Payment Gateways',
  'Healthcare & IoT Systems',
  'DevOps & Microservices',
  'EdTech & Collaboration'
]

const selectedDomain = ref('Full-Stack Cloud SaaS')
const keywords = ref('Multi-tenant isolation, Supabase RLS, Nuxt 3 SSR, Docker')
const isLoading = ref(false)
const synopsisResult = ref('')
const copied = ref(false)

const generateSynopsis = async () => {
  isLoading.value = true
  synopsisResult.value = ''
  try {
    const res = await fetch('/api/synopsis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain: selectedDomain.value,
        keywords: keywords.value
      })
    })
    const data = await res.json()
    if (data?.synopsis) {
      synopsisResult.value = data.synopsis
    }
  } catch (e) {
    console.error('Failed to generate synopsis:', e)
  } finally {
    isLoading.value = false
  }
}

const formattedSynopsis = computed(() => {
  if (!synopsisResult.value) return ''
  return synopsisResult.value
    .replace(/### (.*?)\n/g, '<h3 class="text-lg font-bold text-white mt-6 mb-2 text-indigo-300">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
    .replace(/\n- (.*?)\n/g, '<li class="ml-4 list-disc text-slate-300">$1</li>')
    .replace(/\n/g, '<br/>')
})

const copySynopsis = () => {
  if (process.client && synopsisResult.value) {
    navigator.clipboard.writeText(synopsisResult.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}

const printSynopsis = () => {
  if (process.client) {
    window.print()
  }
}
</script>
