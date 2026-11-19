<template>
  <div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mb-8 text-center">
      <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 mb-4 transition-colors">
        ← Back to Palantir Tech Academy
      </NuxtLink>
      <h1 class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
        Official Credential Verification
      </h1>
      <p class="mt-2 text-xs sm:text-sm text-slate-400">
        Public verification record for Palantir Tech Academy Industrial Training & Internships.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="flex flex-col items-center justify-center p-16 space-y-4">
      <div class="h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
      <p class="text-xs text-slate-400">Verifying credential against Supabase database...</p>
    </div>

    <!-- Certificate Found -->
    <div v-else-if="certData?.found && certData?.certificate" class="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
      <!-- Verified Top Banner -->
      <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-3.5 flex items-center justify-between text-white text-xs sm:text-sm font-semibold shadow-inner">
        <div class="flex items-center gap-2">
          <span class="flex h-3 w-3 rounded-full bg-white animate-ping"></span>
          <span>✓ VERIFIED ACADEMIC CREDENTIAL • ACTIVE & AUTHENTIC</span>
        </div>
        <span class="font-mono text-xs opacity-90">ID: {{ certData.certificate.certificate_id }}</span>
      </div>

      <div class="p-6 sm:p-10 space-y-8">
        <!-- Student & Program Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <span class="text-xs font-semibold uppercase tracking-wider text-indigo-400">Awarded To</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {{ certData.certificate.student_name }}
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">
              {{ certData.certificate.college_name }}
            </p>
          </div>

          <div class="flex flex-col sm:items-end">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Performance Grade</span>
            <div class="mt-1 inline-flex items-center gap-1.5 rounded-xl bg-indigo-950/80 border border-indigo-700/60 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-indigo-300">
              <span>🏆 {{ certData.certificate.grade }}</span>
            </div>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div class="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
            <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Technical Track
            </span>
            <span class="text-base font-bold text-white">{{ certData.certificate.track_name }}</span>
          </div>

          <div class="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
            <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Industrial Training Duration
            </span>
            <span class="text-base font-bold text-white">{{ certData.certificate.duration }}</span>
          </div>

          <div class="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
            <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Completion Date
            </span>
            <span class="text-base font-bold text-white">{{ certData.certificate.completion_date }}</span>
          </div>

          <div class="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
            <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Issuing Authority
            </span>
            <span class="text-base font-bold text-white">Palantir Tech Academy Academic Board</span>
          </div>
        </div>

        <!-- Capstone Project Audit -->
        <div class="rounded-2xl border border-indigo-900/40 bg-indigo-950/20 p-5">
          <span class="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 block mb-1">
            Verified Capstone Project
          </span>
          <p class="text-base font-bold text-white">{{ certData.certificate.capstone_project }}</p>
          <a
            v-if="certData.certificate.project_url"
            :href="certData.certificate.project_url"
            target="_blank"
            class="mt-2 inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold underline"
          >
            <span>Inspect Verified GitHub Repository</span> →
          </a>
        </div>

        <!-- Compliance & Security Notice -->
        <div class="flex items-center justify-between border-t border-slate-800 pt-6 text-[11px] text-slate-500">
          <span>🛡️ Tamper-proof record verified against Palantir Tech Academy Supabase ledger.</span>
          <button @click="printCertificate" class="text-indigo-400 hover:text-indigo-300 font-semibold">
            Print Official Verification Dossier
          </button>
        </div>
      </div>
    </div>

    <!-- Certificate Not Found -->
    <div v-else class="rounded-3xl border border-red-900/60 bg-red-950/20 p-12 text-center max-w-lg mx-auto space-y-4">
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-3xl">
        ✕
      </div>
      <h3 class="text-xl font-bold text-white">Certificate Not Found</h3>
      <p class="text-xs text-slate-400 leading-relaxed">
        No active certificate matched ID <code class="text-red-300 font-mono">{{ route.params.id }}</code> in the Palantir Tech Academy registry.
      </p>
      <NuxtLink to="/verify/PTA-CERT-2026-8941" class="inline-block rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-500">
        Try Sample Certificate (PTA-CERT-2026-8941)
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const certId = route.params.id

const { data: certData, pending } = await useFetch(`/api/verify/${certId}`)

const printCertificate = () => {
  if (process.client) {
    window.print()
  }
}
</script>

