<template>
  <div class="glass-panel-glow max-w-5xl mx-auto rounded-3xl p-6 sm:p-10 border border-indigo-500/30 space-y-8">
    <div class="text-center max-w-2xl mx-auto space-y-2">
      <div class="inline-flex items-center gap-1.5 rounded-full bg-emerald-950 border border-emerald-800/60 px-3.5 py-1 text-xs font-bold text-emerald-400">
        <span>💰 60-Second College Merit Calculator</span>
      </div>
      <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
        Calculate Your Tuition Grant & No-Cost EMI
      </h3>
      <p class="text-xs sm:text-sm text-slate-400">
        Palantir Tech Academy awards automatic merit scholarships based on university academic standing and group enrollments.
      </p>
    </div>

    <!-- Calculator Controls Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      <!-- 1. Duration -->
      <div class="space-y-1.5">
        <label class="font-bold text-slate-300 uppercase tracking-wider text-[11px]">1. Program Duration</label>
        <select v-model="duration" class="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-white focus:border-indigo-500 focus:outline-none">
          <option value="6-Month">6-Month Flagship (320 Hours)</option>
          <option value="3-Month">3-Month Fast-Track (160 Hours)</option>
        </select>
      </div>

      <!-- 2. Track -->
      <div class="space-y-1.5">
        <label class="font-bold text-slate-300 uppercase tracking-wider text-[11px]">2. Technical Track</label>
        <select v-model="track" class="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-white focus:border-indigo-500 focus:outline-none">
          <option value="Full-Stack Web">Full-Stack Web (Nuxt/Node)</option>
          <option value="Applied AI">Applied AI & GenAI Systems</option>
        </select>
      </div>

      <!-- 3. CGPA -->
      <div class="space-y-1.5">
        <label class="font-bold text-slate-300 uppercase tracking-wider text-[11px]">3. Current CGPA / %</label>
        <select v-model="cgpaTier" class="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-white focus:border-indigo-500 focus:outline-none">
          <option value="high">Above 8.5 CGPA (High Merit)</option>
          <option value="mid">7.5 to 8.5 CGPA (Merit)</option>
          <option value="standard">Under 7.5 CGPA (Standard)</option>
        </select>
      </div>

      <!-- 4. Friends -->
      <div class="space-y-1.5">
        <label class="font-bold text-slate-300 uppercase tracking-wider text-[11px]">4. Friends Group</label>
        <select v-model="isGroup" class="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-white focus:border-indigo-500 focus:outline-none">
          <option :value="false">Individual Enrollment</option>
          <option :value="true">Group of 2+ Friends (15% Off)</option>
        </select>
      </div>
    </div>

    <!-- Live Calculation Output Banner -->
    <div class="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-inner">
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-400">Original Tuition:</span>
          <span class="text-xs text-slate-500 line-through">₹{{ baseFee.toLocaleString() }}</span>
          <span class="rounded bg-emerald-950 border border-emerald-800 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
            -₹{{ totalScholarship.toLocaleString() }} Scholarship Granted
          </span>
        </div>
        <div class="flex items-baseline gap-3">
          <span class="text-3xl sm:text-4xl font-extrabold text-white">₹{{ finalFee.toLocaleString() }}</span>
          <span class="text-xs text-sky-400 font-bold">
            (or ₹{{ emiAmount.toLocaleString() }}/month for 3 Months No-Cost EMI)
          </span>
        </div>
        <p class="text-[11px] text-slate-400">Includes all training hours, mentor PR code reviews, and IEEE university project report kit.</p>
      </div>

      <button
        @click="$emit('open-enroll')"
        class="whitespace-nowrap rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all"
      >
        Lock In Scholarship Fee →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineEmits(['open-enroll'])

const duration = ref('6-Month')
const track = ref('Full-Stack Web')
const cgpaTier = ref('high')
const isGroup = ref(false)

const baseFee = computed(() => {
  return duration.value === '6-Month' ? 24999 : 14999
})

const meritDiscount = computed(() => {
  if (cgpaTier.value === 'high') return duration.value === '6-Month' ? 4000 : 2500
  if (cgpaTier.value === 'mid') return duration.value === '6-Month' ? 2000 : 1500
  return 1000
})

const groupDiscount = computed(() => {
  return isGroup.value ? Math.round(baseFee.value * 0.15) : 0
})

const totalScholarship = computed(() => {
  return meritDiscount.value + groupDiscount.value
})

const finalFee = computed(() => {
  return Math.max(baseFee.value - totalScholarship.value, 8000)
})

const emiAmount = computed(() => {
  return Math.round(finalFee.value / 3)
})
</script>
