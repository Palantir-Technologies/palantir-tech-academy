<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-8 mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-white tracking-tight">
          Palantir Role-Based Management Portal
        </h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">
          Switch between Admin, Tutor, and Student workspaces to test platform operations.
        </p>
      </div>

      <!-- Role Switcher Tabs -->
      <div class="flex items-center rounded-2xl border border-slate-800 bg-slate-900/90 p-1.5 shadow-lg">
        <button
          v-for="role in ['Admin', 'Tutor', 'Student']"
          :key="role"
          @click="activeRole = role"
          :class="[
            'rounded-xl px-4 py-2 text-xs font-bold transition-all',
            activeRole === role
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200'
          ]"
        >
          {{ role }} View
        </button>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- 1. ADMIN WORKSPACE -->
    <!-- ========================================== -->
    <div v-if="activeRole === 'Admin'" class="space-y-8">
      <!-- Admin Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span class="text-xs text-slate-400">Total Inbound Leads</span>
          <div class="text-2xl font-bold text-white mt-1">48</div>
          <span class="text-[11px] text-emerald-400 font-medium">+14 this week via AI Chatbot</span>
        </div>
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span class="text-xs text-slate-400">Active Batches</span>
          <div class="text-2xl font-bold text-indigo-400 mt-1">4 Batches</div>
          <span class="text-[11px] text-slate-400">120 Total Enrolled Interns</span>
        </div>
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span class="text-xs text-slate-400">Certificates Issued</span>
          <div class="text-2xl font-bold text-sky-400 mt-1">112</div>
          <span class="text-[11px] text-slate-400">100% QR Verified</span>
        </div>
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <span class="text-xs text-slate-400">University Partnerships</span>
          <div class="text-2xl font-bold text-emerald-400 mt-1">18 Colleges</div>
          <span class="text-[11px] text-slate-400">DTU, VIT, BITS, SRM</span>
        </div>
      </div>

      <!-- Recent AI Chatbot Inquiries Table -->
      <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <span>🤖 Recent AI Chatbot & Website Leads</span>
              <span class="rounded-full bg-emerald-950 border border-emerald-800 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold">
                Live Supabase Feed
              </span>
            </h3>
            <p class="text-xs text-slate-400">Automated lead capture from the floating website counselor</p>
          </div>
          <button @click="$emit('open-enroll')" class="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500">
            + Manual Lead Entry
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-300">
            <thead class="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-950/40">
              <tr>
                <th class="py-3 px-3">Student Name</th>
                <th class="py-3 px-3">College & Year</th>
                <th class="py-3 px-3">Contact (WhatsApp / Email)</th>
                <th class="py-3 px-3">Track & Duration</th>
                <th class="py-3 px-3">Status</th>
                <th class="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60">
              <tr v-for="(lead, idx) in demoLeads" :key="idx" class="hover:bg-slate-800/30">
                <td class="py-3 px-3 font-semibold text-white">{{ lead.name }}</td>
                <td class="py-3 px-3">{{ lead.college }} ({{ lead.year }})</td>
                <td class="py-3 px-3 font-mono text-[11px]">{{ lead.phone }}<br/>{{ lead.email }}</td>
                <td class="py-3 px-3">
                  <span class="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-indigo-300 font-medium">
                    {{ lead.track }} • {{ lead.duration }}
                  </span>
                </td>
                <td class="py-3 px-3">
                  <span class="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                    {{ lead.status }}
                  </span>
                </td>
                <td class="py-3 px-3">
                  <button class="text-indigo-400 hover:text-indigo-300 font-semibold">Contact on WhatsApp</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Certificate Generator Form -->
      <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <h3 class="text-base font-bold text-white flex items-center gap-2">
          <span>📜 Issue Verified Industrial Certificate</span>
        </h3>
        <p class="text-xs text-slate-400">Generates unique ID and publishes immediately to the public verification endpoint</p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
          <input placeholder="Student Full Name" class="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white" />
          <input placeholder="College / University Name" class="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white" />
          <input placeholder="Capstone Project Title" class="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white" />
        </div>
        <div class="flex justify-end">
          <NuxtLink to="/verify/PTA-CERT-2026-8941" class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-colors">
            Generate & View Sample Certificate →
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- 2. TUTOR WORKSPACE -->
    <!-- ========================================== -->
    <div v-else-if="activeRole === 'Tutor'" class="space-y-8">
      <div class="rounded-2xl border border-indigo-900/40 bg-indigo-950/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Instructor: Alex Mercer (Senior Tech Lead)</span>
          <h2 class="text-xl font-bold text-white mt-1">Today's Live Industrial Session</h2>
          <p class="text-xs text-slate-400">Batch: PTA-2026-FS-01 (Full-Stack Nuxt 3 & Microservices) • 6:30 PM - 8:30 PM IST</p>
        </div>
        <button class="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition-all">
          Launch Google Meet Classroom →
        </button>
      </div>

      <!-- Pending PR Reviews & Assignments -->
      <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <h3 class="text-base font-bold text-white">Pending Student GitHub PR Reviews</h3>
        <p class="text-xs text-slate-400">Code audits required for student capstone milestone sign-off</p>

        <div class="space-y-3 text-xs">
          <div class="rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="font-semibold text-white">PR #14: Implemented Supabase RLS policies and JWT session refresh</span>
              <p class="text-slate-400 text-[11px] mt-0.5">Submitted by: Aarav Mehta (DTU) • Milestone 3 of 6</p>
            </div>
            <div class="flex items-center gap-2">
              <button class="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 font-semibold text-white">
                Approve & Grade (A+)
              </button>
              <button class="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 font-semibold text-slate-300">
                Request Changes
              </button>
            </div>
          </div>

          <div class="rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="font-semibold text-white">PR #08: Docker compose setup for PostgreSQL and Redis job queues</span>
              <p class="text-slate-400 text-[11px] mt-0.5">Submitted by: Sneha Patel (VIT) • Milestone 4 of 6</p>
            </div>
            <div class="flex items-center gap-2">
              <button class="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 font-semibold text-white">
                Approve & Grade (A)
              </button>
              <button class="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 font-semibold text-slate-300">
                Request Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- 3. STUDENT WORKSPACE -->
    <!-- ========================================== -->
    <div v-else class="space-y-8">
      <!-- Student Progress Header -->
      <div class="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span class="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Enrolled Student: Aarav Mehta (PTA2026001)</span>
            <h2 class="text-2xl font-bold text-white mt-1">6-Month Full-Stack Industrial Internship</h2>
            <p class="text-xs text-slate-400 mt-0.5">College: Delhi Technological University (DTU) • 8th Semester</p>
          </div>

          <div class="flex items-center gap-3">
            <NuxtLink
              to="/verify/PTA-CERT-2026-8941"
              class="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-400 transition-all"
            >
              View Official Certificate 🏆
            </NuxtLink>
          </div>
        </div>

        <!-- Progress Tracker Bar -->
        <div class="mt-6 pt-6 border-t border-slate-800/80">
          <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Overall Industrial Training Completion</span>
            <span class="font-bold text-indigo-400">85% (Ready for Viva)</span>
          </div>
          <div class="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full w-[85%]"></div>
          </div>
        </div>
      </div>

      <!-- University Project Kit Download Cards -->
      <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-bold text-white">📁 Final University Semester Documentation Kit</h3>
            <p class="text-xs text-slate-400">Pre-approved templates for college viva, internal guides, and project defense</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div class="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <span class="text-xl">📄</span>
            <h4 class="font-bold text-white">Project Report (IEEE Format)</h4>
            <p class="text-[11px] text-slate-400">60-page pre-written technical document with ER diagrams & code snippets.</p>
            <button class="text-indigo-400 font-semibold hover:text-indigo-300 block pt-1">Download DOCX ↓</button>
          </div>

          <div class="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <span class="text-xl">📊</span>
            <h4 class="font-bold text-white">Viva Presentation Deck</h4>
            <p class="text-[11px] text-slate-400">18-slide architecture walkthrough designed for college external examiners.</p>
            <button class="text-indigo-400 font-semibold hover:text-indigo-300 block pt-1">Download PPTX ↓</button>
          </div>

          <div class="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <span class="text-xl">🛡️</span>
            <h4 class="font-bold text-white">Industrial Training NOC & LOR</h4>
            <p class="text-[11px] text-slate-400">Official company seal letter confirming 320 hours completed.</p>
            <button class="text-indigo-400 font-semibold hover:text-indigo-300 block pt-1">Download PDF ↓</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['open-enroll'])

const activeRole = ref('Admin')

const demoLeads = [
  {
    name: 'Rohan Verma',
    college: 'VIT Vellore',
    year: '3rd Year',
    phone: '+91 9876543210',
    email: 'rohan.verma@vit.ac.in',
    track: 'Full-Stack Web (Nuxt/Node)',
    duration: '6 Months',
    status: 'New'
  },
  {
    name: 'Ananya Deshmukh',
    college: 'BITS Pilani',
    year: '4th Year',
    phone: '+91 9811223344',
    email: 'ananya@pilani.bits.ac.in',
    track: 'Applied AI & GenAI Systems',
    duration: '6 Months',
    status: 'Contacted'
  },
  {
    name: 'Kabir Singh',
    college: 'Delhi Technological Univ (DTU)',
    year: '2nd Year',
    phone: '+91 9988776655',
    email: 'kabir@dtu.ac.in',
    track: 'Full-Stack Web (Nuxt/Node)',
    duration: '3 Months',
    status: 'New'
  }
]
</script>

