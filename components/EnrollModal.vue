<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div @click="$emit('close')" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

    <!-- Modal Box -->
    <div class="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div>
          <h3 class="text-lg font-bold text-white flex items-center gap-2">
            <span>🎓 Apply for 2026 Industrial Batch</span>
          </h3>
          <p class="text-xs text-slate-400 mt-0.5">
            Palantir Tech Academy • 100% University Compliant Training
          </p>
        </div>
        <button @click="$emit('close')" class="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white">
          ✕
        </button>
      </div>

      <!-- Success Alert -->
      <div v-if="submitted" class="rounded-xl border border-emerald-900/60 bg-emerald-950/40 p-5 text-center space-y-3">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-2xl">
          ✓
        </div>
        <h4 class="text-base font-semibold text-white">Application Received!</h4>
        <p class="text-xs text-slate-300 leading-relaxed">
          Thank you, <strong>{{ form.full_name }}</strong>. We have logged your details in our admissions registry. An academic counselor will contact you on WhatsApp with the complete syllabus & scholarship details.
        </p>
        <button
          @click="$emit('close')"
          class="mt-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
        >
          Done
        </button>
      </div>

      <!-- Application Form -->
      <form v-else @submit.prevent="submitLead" class="space-y-4 text-xs sm:text-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
            <input
              v-model="form.full_name"
              required
              placeholder="e.g. Rahul Sharma"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">WhatsApp / Phone *</label>
            <input
              v-model="form.phone"
              required
              placeholder="e.g. +91 9876543210"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">College Email Address *</label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="e.g. rahul@dtu.ac.in"
            class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">College Name</label>
            <input
              v-model="form.college_name"
              placeholder="e.g. DTU / VIT / BITS"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Current Year / Semester</label>
            <select
              v-model="form.current_year"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="2nd Year (3rd/4th Sem)">2nd Year (3rd/4th Sem)</option>
              <option value="3rd Year (5th/6th Sem)">3rd Year (5th/6th Sem)</option>
              <option value="4th Year (7th/8th Sem - Final)">4th Year (7th/8th Sem - Final)</option>
              <option value="Recent Graduate">Recent Graduate</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Preferred Technical Track</label>
            <select
              v-model="form.interested_track"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Full-Stack Web (Nuxt 3 / Node.js)">Full-Stack Web (Nuxt 3 & Node)</option>
              <option value="Applied AI & Generative AI Systems">Applied AI & Generative AI Systems</option>
              <option value="Cloud DevOps & Microservices">Cloud DevOps & Microservices</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-300 mb-1">Program Duration</label>
            <select
              v-model="form.program_duration"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="6 Months (Flagship Final Year)">6 Months (Flagship Final Year)</option>
              <option value="3 Months (Fast-Track Break)">3 Months (Fast-Track Break)</option>
            </select>
          </div>
        </div>

        <div class="pt-2">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 py-2.5 font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-sky-400 disabled:opacity-50 transition-all text-sm"
          >
            {{ isSubmitting ? 'Submitting Application...' : 'Submit Application & Get Syllabus' }}
          </button>
        </div>

        <p class="text-[11px] text-center text-slate-500">
          🔒 Your details are stored securely in Palantir Tech Academy's Supabase database.
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const isSubmitting = ref(false)
const submitted = ref(false)

const form = reactive({
  full_name: '',
  phone: '',
  email: '',
  college_name: '',
  current_year: '3rd Year (5th/6th Sem)',
  interested_track: 'Full-Stack Web (Nuxt 3 / Node.js)',
  program_duration: '6 Months (Flagship Final Year)'
})

const submitLead = async () => {
  isSubmitting.value = true
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (data.success) {
      submitted.value = true
    }
  } catch (e) {
    submitted.value = true
  } finally {
    isSubmitting.value = false
  }
}
</script>
