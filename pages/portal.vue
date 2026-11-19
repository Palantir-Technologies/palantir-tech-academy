<template>
  <div class="min-h-screen bg-slate-950 bg-grid-pattern text-slate-100 pb-20">
    <!-- Top Enterprise Dashboard Bar -->
    <div class="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-16 z-30">
      <div class="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <!-- Breadcrumb & Workspace Status -->
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-bold text-sm">
            ⚡
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-slate-400">Palantir Academy</span>
              <span class="text-slate-600">/</span>
              <span class="text-xs font-bold text-white uppercase tracking-wider">{{ activeRole }} Hub</span>
            </div>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-[11px] text-slate-400 font-medium">Supabase Cloud Ledger Connected</span>
            </div>
          </div>
        </div>

        <!-- Role Workspace Switcher -->
        <div class="flex items-center rounded-xl border border-slate-800 bg-slate-900/90 p-1 shadow-inner">
          <button
            v-for="role in ['Admin', 'Tutor', 'Student']"
            :key="role"
            @click="activeRole = role"
            :class="[
              'rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all flex items-center gap-2',
              activeRole === role
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            ]"
          >
            <span>{{ role === 'Admin' ? '🛡️ Admin' : role === 'Tutor' ? '👨‍🏫 Tutor' : '🎓 Student' }}</span>
            <span
              v-if="role === 'Admin'"
              class="rounded-full bg-indigo-950 px-1.5 py-0.2 text-[10px] text-indigo-300 font-mono"
            >
              {{ leads.length }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 space-y-8">
      <!-- User Profile Banner (If Logged In) -->
      <div v-if="user" class="glass-panel-glow rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-0.5 shadow-md">
            <div class="h-full w-full rounded-[14px] bg-slate-950 flex items-center justify-center font-extrabold text-white text-base">
              {{ (user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase() }}
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-bold text-white">{{ user.user_metadata?.full_name || user.email?.split('@')[0] }}</h3>
              <span class="rounded bg-emerald-950 border border-emerald-800/60 px-2 py-0.2 text-[10px] font-bold text-emerald-400">
                Verified Intern
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">
              {{ user.user_metadata?.college_name || 'Engineering University' }} • {{ user.email }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLink
            to="/verify/PTA-CERT-2026-8941"
            class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white transition-colors"
          >
            Inspect Verified Credential →
          </NuxtLink>
        </div>
      </div>

      <!-- If Guest / Not Logged In Notice -->
      <div v-else class="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border border-indigo-900/40">
        <div class="flex items-center gap-2 text-slate-300">
          <span>👋 Browsing as guest visitor. Sign in with Google or your college email to link your project submissions!</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="isAuthModalOpen = true"
            class="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 font-bold text-white transition-colors"
          >
            Sign In / Sign Up
          </button>
          <button
            @click="loginAsDemoStudent"
            class="rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 font-semibold text-slate-300"
          >
            Demo Student Mode
          </button>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- 1. ADMIN WORKSPACE -->
      <!-- ============================================================ -->
      <div v-if="activeRole === 'Admin'" class="space-y-8">
        <!-- KPI Analytics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>Total Inbound Leads</span>
              <span class="text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full text-[10px]">+28.4%</span>
            </div>
            <div class="text-3xl font-extrabold text-white mt-2">{{ leads.length }}</div>
            <p class="text-[11px] text-slate-500 mt-1">Real-time AI Chatbot capture</p>
          </div>

          <div class="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>Active Interns</span>
              <span class="text-indigo-400 font-semibold bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded-full text-[10px]">4 Batches</span>
            </div>
            <div class="text-3xl font-extrabold text-indigo-400 mt-2">128</div>
            <p class="text-[11px] text-slate-500 mt-1">Full-Stack & Applied AI Tracks</p>
          </div>

          <div class="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>Verified Credentials</span>
              <span class="text-sky-400 font-semibold bg-sky-950/60 border border-sky-800/40 px-2 py-0.5 rounded-full text-[10px]">100% QR</span>
            </div>
            <div class="text-3xl font-extrabold text-sky-400 mt-2">114</div>
            <p class="text-[11px] text-slate-500 mt-1">Publicly verifiable records</p>
          </div>

          <div class="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>College MoUs</span>
              <span class="text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full text-[10px]">18 Campus</span>
            </div>
            <div class="text-3xl font-extrabold text-emerald-400 mt-2">18</div>
            <p class="text-[11px] text-slate-500 mt-1">DTU, VIT, BITS, SRM, MIT</p>
          </div>
        </div>

        <!-- Admin Sub-Navigation Tabs -->
        <div class="flex items-center gap-3 border-b border-slate-800 pb-3">
          <button
            v-for="tab in ['Inbound Leads Pipeline', 'Batches & Cohorts', 'Credential Issuer']"
            :key="tab"
            @click="adminTab = tab"
            :class="[
              'rounded-xl px-4 py-2 text-xs font-semibold transition-all',
              adminTab === tab
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <!-- TAB 1: Inbound Leads Pipeline -->
        <div v-if="adminTab === 'Inbound Leads Pipeline'" class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <span>🤖 Inbound Student Leads & Counseling Desk</span>
              </h3>
              <p class="text-xs text-slate-400">Leads captured live via the website AI Counselor widget</p>
            </div>

            <!-- Search & Filter Controls -->
            <div class="flex items-center gap-2.5">
              <input
                v-model="leadSearch"
                placeholder="Search by student, college, phone..."
                class="rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-56 sm:w-64"
              />
              <button
                @click="$emit('open-enroll')"
                class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 text-xs font-semibold text-white whitespace-nowrap shadow-md transition-colors"
              >
                + New Lead
              </button>
            </div>
          </div>

          <!-- Leads Table -->
          <div class="overflow-x-auto rounded-2xl border border-slate-800/80">
            <table class="w-full text-left text-xs text-slate-300">
              <thead class="border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th class="py-3.5 px-4">Student</th>
                  <th class="py-3.5 px-4">College & Year</th>
                  <th class="py-3.5 px-4">Contact</th>
                  <th class="py-3.5 px-4">Program & Track</th>
                  <th class="py-3.5 px-4">Status</th>
                  <th class="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 bg-slate-950/40">
                <tr v-for="(lead, i) in filteredLeads" :key="i" class="hover:bg-slate-900/40 transition-colors">
                  <td class="py-3.5 px-4 font-semibold text-white">
                    <div class="flex items-center gap-2">
                      <div class="h-7 w-7 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-bold text-indigo-300 text-[11px]">
                        {{ lead.name.charAt(0) }}
                      </div>
                      <span>{{ lead.name }}</span>
                    </div>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="text-slate-200 font-medium block">{{ lead.college }}</span>
                    <span class="text-[11px] text-slate-500">{{ lead.year }}</span>
                  </td>
                  <td class="py-3.5 px-4 font-mono text-[11px]">
                    <div class="text-indigo-300">{{ lead.phone }}</div>
                    <div class="text-slate-400">{{ lead.email }}</div>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="inline-block rounded-md bg-slate-900 border border-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300">
                      {{ lead.track }} • {{ lead.duration }}
                    </span>
                  </td>
                  <td class="py-3.5 px-4">
                    <button
                      @click="cycleLeadStatus(lead)"
                      :class="[
                        'rounded-full px-2.5 py-0.5 text-[10px] font-bold border transition-colors',
                        lead.status === 'Enrolled'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800/60'
                          : lead.status === 'Contacted'
                          ? 'bg-sky-950 text-sky-300 border-sky-800/60'
                          : 'bg-amber-950 text-amber-300 border-amber-800/60'
                      ]"
                    >
                      {{ lead.status }} ↻
                    </button>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <a
                      :href="`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`"
                      target="_blank"
                      class="inline-flex items-center gap-1 rounded-lg bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/40 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- TAB 2: Batches & Cohorts -->
        <div v-else-if="adminTab === 'Batches & Cohorts'" class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-5">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-white">Active Cohorts & Capacity Matrix</h3>
              <p class="text-xs text-slate-400">Monitor batch enrollment limits and assigned mentors</p>
            </div>
            <button class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white">
              + Launch New Batch
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div v-for="(batch, idx) in demoBatches" :key="idx" class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
              <div class="flex items-center justify-between">
                <span class="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-2.5 py-1 rounded-lg">
                  {{ batch.code }}
                </span>
                <span class="rounded-full bg-emerald-950 border border-emerald-800/50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  {{ batch.status }}
                </span>
              </div>
              <div>
                <h4 class="text-base font-bold text-white">{{ batch.track }}</h4>
                <p class="text-xs text-slate-400 mt-0.5">Tutor: {{ batch.tutor }} • Timing: {{ batch.timing }}</p>
              </div>

              <!-- Capacity Meter -->
              <div>
                <div class="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span>Enrolled Seats</span>
                  <span class="font-bold text-white">{{ batch.enrolled }} / {{ batch.capacity }}</span>
                </div>
                <div class="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-400"
                    :style="{ width: `${(batch.enrolled / batch.capacity) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 3: Credential Issuer -->
        <div v-else class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-6">
          <div>
            <h3 class="text-lg font-bold text-white">Cryptographic Certificate Generator</h3>
            <p class="text-xs text-slate-400">Instantly generate verifiable credentials published to the public verification endpoint</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Issue Form -->
            <form @submit.prevent="generateCertificate" class="space-y-4 text-xs">
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Student Full Name</label>
                <input v-model="newCert.student_name" required placeholder="e.g. Aarav Mehta" class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white" />
              </div>
              <div>
                <label class="block text-slate-300 font-semibold mb-1">College / University</label>
                <input v-model="newCert.college_name" required placeholder="e.g. Delhi Technological University (DTU)" class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-300 font-semibold mb-1">Program Duration</label>
                  <select v-model="newCert.duration" class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white">
                    <option value="6 Months (320 Industrial Hours)">6 Months (320 Hours)</option>
                    <option value="3 Months (160 Industrial Hours)">3 Months (160 Hours)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-slate-300 font-semibold mb-1">Performance Grade</label>
                  <select v-model="newCert.grade" class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white">
                    <option value="Distinction (Grade A+)">Distinction (Grade A+)</option>
                    <option value="Honors (Grade A)">Honors (Grade A)</option>
                    <option value="First Class (Grade B+)">First Class (Grade B+)</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Capstone Project Title</label>
                <input v-model="newCert.capstone_project" required placeholder="e.g. Enterprise Multi-Tenant SaaS with Nuxt 3 & Supabase" class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white" />
              </div>
              <button
                type="submit"
                class="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 py-2.5 font-bold text-white shadow-lg hover:from-indigo-500 hover:to-sky-400 transition-all"
              >
                Sign & Publish Certificate to Ledger →
              </button>
            </form>

            <!-- Certificate Live Preview -->
            <div class="rounded-2xl border-2 border-indigo-500/40 bg-gradient-to-br from-slate-900 to-indigo-950/40 p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div class="flex items-center justify-between text-[11px] text-slate-400">
                  <span class="font-mono text-indigo-400">ID: PTA-CERT-2026-8941</span>
                  <span class="text-emerald-400 font-bold">✓ VERIFIED AUTHENTIC</span>
                </div>
                <h4 class="text-xl font-extrabold text-white mt-4">{{ newCert.student_name || 'Student Name' }}</h4>
                <p class="text-xs text-slate-400">{{ newCert.college_name || 'University Name' }}</p>

                <div class="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                  <p class="text-slate-300"><strong class="text-white">Track:</strong> Full-Stack Web Engineering</p>
                  <p class="text-slate-300"><strong class="text-white">Duration:</strong> {{ newCert.duration }}</p>
                  <p class="text-slate-300"><strong class="text-white">Grade:</strong> {{ newCert.grade }}</p>
                  <p class="text-slate-300"><strong class="text-white">Capstone:</strong> {{ newCert.capstone_project }}</p>
                </div>
              </div>

              <NuxtLink
                to="/verify/PTA-CERT-2026-8941"
                class="mt-6 text-center rounded-xl bg-slate-800 hover:bg-slate-700 py-2 text-xs font-semibold text-sky-400 transition-colors"
              >
                Inspect Public Verification Portal View →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- 2. TUTOR WORKSPACE -->
      <!-- ============================================================ -->
      <div v-else-if="activeRole === 'Tutor'" class="space-y-8">
        <!-- Live Classroom Card -->
        <div class="glass-panel-glow rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div class="inline-flex items-center gap-1.5 rounded-full bg-emerald-950 border border-emerald-800/60 px-3 py-1 text-xs font-bold text-emerald-400 mb-2">
              <span class="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LIVE INDUSTRIAL CLASSROOM READY</span>
            </div>
            <h2 class="text-2xl font-extrabold text-white">Cohort: PTA-2026-FS-01</h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Today's Session: <strong>Building Real-Time Microservice Event Buses with Nuxt Nitro & Redis BullMQ</strong>.
            </p>
            <span class="text-xs text-slate-400 block mt-2">Scheduled: 6:30 PM - 8:30 PM IST • Mentor: Alex Mercer</span>
          </div>

          <button class="whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-emerald-600/30 transition-all hover:scale-105">
            Launch Google Meet Studio →
          </button>
        </div>

        <!-- Attendance & Code Review Split -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Daily Attendance Register -->
          <div class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold text-white">Daily Attendance Register</h3>
                <p class="text-xs text-slate-400">Click avatar to toggle Present/Absent</p>
              </div>
              <span class="text-xs font-semibold text-emerald-400">Average: 92%</span>
            </div>

            <div class="space-y-2.5">
              <div
                v-for="(student, idx) in demoStudents"
                :key="idx"
                class="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3 flex items-center justify-between text-xs"
              >
                <div class="flex items-center gap-3">
                  <button
                    @click="student.present = !student.present"
                    :class="[
                      'h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors',
                      student.present ? 'bg-emerald-600 text-white' : 'bg-red-950 text-red-400 border border-red-800'
                    ]"
                  >
                    {{ student.present ? '✓' : '✕' }}
                  </button>
                  <div>
                    <span class="font-semibold text-white block">{{ student.name }}</span>
                    <span class="text-[11px] text-slate-400">{{ student.college }}</span>
                  </div>
                </div>
                <span class="font-mono text-xs font-semibold text-slate-300">{{ student.attendance }}% Attended</span>
              </div>
            </div>
          </div>

          <!-- Pending PR Reviews -->
          <div class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-4">
            <h3 class="text-base font-bold text-white">Capstone GitHub PR Code Audits</h3>
            <p class="text-xs text-slate-400">Review student implementations before granting milestone passes</p>

            <div class="space-y-3 text-xs">
              <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-white">PR #18: Supabase RLS policies and JWT session refresh</span>
                  <span class="rounded bg-indigo-950 text-indigo-300 px-2 py-0.5 text-[10px] font-mono">Aarav Mehta</span>
                </div>
                <p class="text-slate-400 text-xs">Fixed memory leaks in SSE data streaming channel and implemented multi-role route guards.</p>
                <div class="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <button class="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 font-bold text-white transition-colors">
                    Approve (Grade A+)
                  </button>
                  <button class="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 font-semibold text-slate-300">
                    Request Revisions
                  </button>
                </div>
              </div>

              <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-white">PR #12: Docker compose & Redis BullMQ background workers</span>
                  <span class="rounded bg-indigo-950 text-indigo-300 px-2 py-0.5 text-[10px] font-mono">Sneha Patel</span>
                </div>
                <p class="text-slate-400 text-xs">Configured containerized worker nodes and production health checks.</p>
                <div class="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <button class="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 font-bold text-white transition-colors">
                    Approve (Grade A)
                  </button>
                  <button class="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 font-semibold text-slate-300">
                    Request Revisions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- 3. STUDENT WORKSPACE -->
      <!-- ============================================================ -->
      <div v-else class="space-y-8">
        <!-- Student Identity & Progress Header -->
        <div class="glass-panel-glow rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span class="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Intern ID: {{ user?.user_metadata?.enrollment_no || 'PTA2026001' }}
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {{ user?.user_metadata?.full_name || 'Aarav Mehta' }}
            </h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-0.5">
              {{ user?.user_metadata?.college_name || 'Delhi Technological University (DTU)' }} • 8th Semester • 6-Month Industrial Track
            </p>
          </div>

          <!-- Progress Ring & Cert Link -->
          <div class="flex items-center gap-4">
            <div class="text-right">
              <span class="text-xs text-slate-400 block">Industrial Completion</span>
              <span class="text-xl font-extrabold text-emerald-400">85% Viva-Ready</span>
            </div>
            <NuxtLink
              to="/verify/PTA-CERT-2026-8941"
              class="rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
            >
              View Official Certificate 🏆
            </NuxtLink>
          </div>
        </div>

        <!-- AI VIVA VOCE EXAMINER SIMULATOR (NEW FEATURE) -->
        <div class="glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-5 border border-indigo-500/40">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-1.5 rounded-full bg-indigo-950 border border-indigo-700/60 px-3 py-1 text-xs font-bold text-indigo-300 mb-2">
                <span>🤖 AI External Examiner</span>
                <span class="text-emerald-400">• Viva Voce Prep</span>
              </div>
              <h3 class="text-xl font-extrabold text-white">University Project Viva Simulator</h3>
              <p class="text-xs text-slate-300 mt-0.5">
                Practice answering external examiners' tough questions on your capstone project before your final university defense.
              </p>
            </div>
            <button
              @click="generateVivaQuestion"
              :disabled="isGeneratingViva"
              class="whitespace-nowrap rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all"
            >
              {{ isGeneratingViva ? 'Examiner is thinking...' : 'Ask Me A Viva Question 🎯' }}
            </button>
          </div>

          <!-- Active Question Card -->
          <div v-if="vivaQuestion" class="rounded-2xl border border-indigo-800/80 bg-slate-900/80 p-5 space-y-4">
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-400">External Examiner Question:</span>
              <p class="text-sm font-bold text-white mt-1">{{ vivaQuestion }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-semibold text-slate-300">Your Technical Answer:</label>
              <textarea
                v-model="vivaAnswer"
                rows="3"
                placeholder="Explain the architectural reasoning, tradeoffs, and code implementation..."
                class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              ></textarea>
            </div>

            <div class="flex justify-end">
              <button
                @click="evaluateVivaAnswer"
                :disabled="!vivaAnswer.trim() || isEvaluatingViva"
                class="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white disabled:opacity-50 transition-colors"
              >
                {{ isEvaluatingViva ? 'Grading Answer...' : 'Submit to Examiner for Grade (A+ / A)' }}
              </button>
            </div>

            <!-- Grade Feedback -->
            <div v-if="vivaFeedback" class="rounded-xl border border-emerald-900/60 bg-emerald-950/30 p-4 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-emerald-400">Examiner Evaluation:</span>
                <span class="font-bold text-white bg-emerald-900/80 px-2.5 py-0.5 rounded-lg">{{ vivaFeedback.grade }}</span>
              </div>
              <p class="text-slate-300 leading-relaxed">{{ vivaFeedback.critique }}</p>
              <p class="text-indigo-300 font-semibold">Tip for College Viva: {{ vivaFeedback.tip }}</p>
            </div>
          </div>
        </div>

        <!-- 6-Phase Curriculum Roadmap Stepper -->
        <div class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-4">
          <h3 class="text-base font-bold text-white">Industrial Curriculum Roadmap</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div v-for="(step, idx) in studentRoadmap" :key="idx" class="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-mono text-[10px] text-slate-500">W{{ step.weeks }}</span>
                <span :class="step.done ? 'text-emerald-400' : 'text-indigo-400'">{{ step.done ? '✓' : '●' }}</span>
              </div>
              <h5 class="font-bold text-white text-xs mt-1">{{ step.title }}</h5>
              <p class="text-[10px] text-slate-400 leading-tight">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <!-- University Submission Dossier Center -->
        <div class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-5">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <span>📁 University Semester Documentation Kit</span>
                <span class="rounded-full bg-emerald-950 border border-emerald-800 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold">
                  100% University Compliant
                </span>
              </h3>
              <p class="text-xs text-slate-400">Pre-approved deliverables ready for external college examiners and guide signatures</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-colors">
              <div class="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">📄</div>
              <div>
                <h4 class="font-bold text-white text-sm">IEEE Project Report (DOCX)</h4>
                <p class="text-[11px] text-slate-400 mt-1">60-page pre-written academic thesis with ER diagrams, sequence flows, and verified source code.</p>
              </div>
              <button class="text-xs text-indigo-400 font-bold hover:text-indigo-300 block pt-1">Download DOCX File ↓</button>
            </div>

            <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-colors">
              <div class="h-10 w-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg">📊</div>
              <div>
                <h4 class="font-bold text-white text-sm">Viva Presentation (PPTX)</h4>
                <p class="text-[11px] text-slate-400 mt-1">18-slide architectural walkthrough customized for college external viva defenses.</p>
              </div>
              <button class="text-xs text-sky-400 font-bold hover:text-sky-300 block pt-1">Download PPTX Deck ↓</button>
            </div>

            <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-colors">
              <div class="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">🛡️</div>
              <div>
                <h4 class="font-bold text-white text-sm">Industrial NOC & LOR Letter</h4>
                <p class="text-[11px] text-slate-400 mt-1">Official Palantir Tech Academy seal letter certifying 320 completed industrial training hours.</p>
              </div>
              <button class="text-xs text-emerald-400 font-bold hover:text-emerald-300 block pt-1">Download PDF Letter ↓</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

defineEmits(['open-enroll'])

const { user, isAuthModalOpen, loginAsDemoStudent } = useAuth()

const activeRole = ref('Admin')
const adminTab = ref('Inbound Leads Pipeline')
const leadSearch = ref('')

const leads = ref([
  {
    name: 'Rohan Verma',
    college: 'VIT Vellore',
    year: '3rd Year CSE',
    phone: '+91 9876543210',
    email: 'rohan.verma@vit.ac.in',
    track: 'Full-Stack Web',
    duration: '6 Months',
    status: 'New'
  },
  {
    name: 'Ananya Deshmukh',
    college: 'BITS Pilani',
    year: '4th Year CS',
    phone: '+91 9811223344',
    email: 'ananya@pilani.bits.ac.in',
    track: 'Applied AI & GenAI',
    duration: '6 Months',
    status: 'Contacted'
  },
  {
    name: 'Kabir Singh',
    college: 'Delhi Technological Univ (DTU)',
    year: '2nd Year IT',
    phone: '+91 9988776655',
    email: 'kabir@dtu.ac.in',
    track: 'Full-Stack Web',
    duration: '3 Months',
    status: 'Enrolled'
  },
  {
    name: 'Pooja Iyer',
    college: 'SRM Institute Chennai',
    year: '3rd Year CSE',
    phone: '+91 9844556677',
    email: 'pooja.i@srmist.edu.in',
    track: 'Applied AI & GenAI',
    duration: '6 Months',
    status: 'New'
  }
])

const filteredLeads = computed(() => {
  if (!leadSearch.value.trim()) return leads.value
  const q = leadSearch.value.toLowerCase()
  return leads.value.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.college.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.track.toLowerCase().includes(q)
  )
})

const cycleLeadStatus = (lead) => {
  if (lead.status === 'New') lead.status = 'Contacted'
  else if (lead.status === 'Contacted') lead.status = 'Enrolled'
  else lead.status = 'New'
}

const demoBatches = [
  {
    code: 'PTA-2026-FS-01',
    track: 'Full-Stack Web Engineering (Nuxt 3 & Node)',
    tutor: 'Alex Mercer (Senior Tech Lead)',
    timing: '6:30 PM - 8:30 PM IST',
    enrolled: 32,
    capacity: 35,
    status: 'Ongoing'
  },
  {
    code: 'PTA-2026-AI-01',
    track: 'Applied AI & Generative AI Systems',
    tutor: 'Dr. Sophia Vance (AI Scientist)',
    timing: '7:00 PM - 9:00 PM IST',
    enrolled: 28,
    capacity: 30,
    status: 'Ongoing'
  },
  {
    code: 'PTA-2026-FS-02',
    track: 'Full-Stack Fast-Track (Summer Cohort)',
    tutor: 'David Chen (DevOps Architect)',
    timing: '10:00 AM - 1:00 PM IST (Weekends)',
    enrolled: 18,
    capacity: 30,
    status: 'Upcoming'
  }
]

const newCert = ref({
  student_name: 'Aarav Mehta',
  college_name: 'Delhi Technological University (DTU)',
  duration: '6 Months (320 Industrial Hours)',
  grade: 'Distinction (Grade A+)',
  capstone_project: 'Enterprise Multi-Tenant SaaS with Nuxt 3 & Supabase'
})

const generateCertificate = () => {
  alert(`Certificate generated and registered for ${newCert.value.student_name}!`)
}

const demoStudents = ref([
  { name: 'Aarav Mehta', college: 'DTU (8th Sem)', attendance: 96, present: true },
  { name: 'Sneha Patel', college: 'VIT Vellore (7th Sem)', attendance: 92, present: true },
  { name: 'Karthik Rao', college: 'BITS Pilani (8th Sem)', attendance: 88, present: true },
  { name: 'Simran Kaur', college: 'Thapar University (8th Sem)', attendance: 84, present: false }
])

const studentRoadmap = [
  { weeks: '1-4', title: 'ESNext & TS Architecture', desc: 'Interfaces, async queues, design patterns', done: true },
  { weeks: '5-8', title: 'Vue 3 & Nuxt 3 SSR', desc: 'Nitro engines, state stores, Tailwind', done: true },
  { weeks: '9-12', title: 'PostgreSQL & Supabase', desc: 'RLS security, migrations, auth tokens', done: true },
  { weeks: '13-16', title: 'DevOps & CI/CD', desc: 'Docker Compose, GitHub Actions, Vercel', done: true },
  { weeks: '17-20', title: 'Live Client Capstone', desc: 'Multi-tenant architecture & billing', done: false },
  { weeks: '21-24', title: 'College Viva & Demo Day', desc: 'IEEE project thesis, mentor defense', done: false }
]

// AI Viva Simulator State
const isGeneratingViva = ref(false)
const isEvaluatingViva = ref(false)
const vivaQuestion = ref('Why did you choose PostgreSQL with Row Level Security (RLS) over MongoDB for your multi-tenant SaaS capstone project, and how does it prevent cross-tenant data leakage?')
const vivaAnswer = ref('')
const vivaFeedback = ref(null)

const sampleQuestions = [
  'How does Server-Side Rendering (SSR) in Nuxt 3 optimize Core Web Vitals compared to a traditional Single Page Application (SPA)?',
  'Explain how you prevent Race Conditions when multiple users reserve the same internship cohort seat at the exact same millisecond.',
  'What is the architectural difference between authentication and authorization in your Supabase JWT security model?',
  'Why did you decouple your background email and PDF certificate workers using BullMQ queues rather than executing them synchronously inside the HTTP handler?'
]

const generateVivaQuestion = () => {
  isGeneratingViva.value = true
  vivaFeedback.value = null
  vivaAnswer.value = ''
  setTimeout(() => {
    const nextQ = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)]
    vivaQuestion.value = nextQ
    isGeneratingViva.value = false
  }, 600)
}

const evaluateVivaAnswer = () => {
  isEvaluatingViva.value = true
  setTimeout(() => {
    vivaFeedback.value = {
      grade: 'Grade A+ (Distinction)',
      critique: 'Excellent technical clarity! You correctly highlighted ACID transactional guarantees, row-level tenant filtering, and performance indexes.',
      tip: 'When presenting to the external university examiner, sketch the tenant isolation database diagram on the whiteboard first—professors love visual architectural proof.'
    }
    isEvaluatingViva.value = false
  }, 800)
}
</script>
