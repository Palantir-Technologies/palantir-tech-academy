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
        <div class="flex items-center rounded-xl border border-slate-800 bg-slate-900/90 p-1 shadow-inner overflow-x-auto">
          <button
            v-for="role in ['Super Admin', 'Admin', 'Tutor', 'Student']"
            :key="role"
            @click="activeRole = role"
            :class="[
              'rounded-lg px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap',
              activeRole === role
                ? role === 'Super Admin'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            ]"
          >
            <span>{{ role === 'Super Admin' ? '👑 Super Admin' : role === 'Admin' ? '🛡️ Admin' : role === 'Tutor' ? '👨‍🏫 Tutor' : '🎓 Student' }}</span>
            <span
              v-if="role === 'Super Admin'"
              class="rounded-full bg-amber-950 border border-amber-700/60 px-1.5 text-[9px] text-amber-300 font-mono"
            >
              Master
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
              <span
                :class="[
                  'rounded border px-2 py-0.2 text-[10px] font-bold',
                  user.user_metadata?.role === 'super_admin'
                    ? 'bg-amber-950 text-amber-400 border-amber-800/60'
                    : 'bg-emerald-950 text-emerald-400 border-emerald-800/60'
                ]"
              >
                {{ user.user_metadata?.role === 'super_admin' ? '👑 Chief Super Admin' : 'Verified Intern' }}
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">
              {{ user.email }} • Full System Clearance
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            v-if="user.user_metadata?.role !== 'super_admin'"
            @click="loginAsSuperAdmin"
            class="rounded-xl border border-amber-500/50 bg-amber-950/40 hover:bg-amber-900/40 px-3.5 py-1.5 text-xs font-bold text-amber-300 transition-colors"
          >
            Switch to Super Admin Account 👑
          </button>
          <NuxtLink
            to="/verify/PTA-CERT-2026-8941"
            class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white transition-colors"
          >
            Public Credential Registry →
          </NuxtLink>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- 👑 SUPER ADMIN COMMAND HUB (MASTER CONTROL) -->
      <!-- ============================================================ -->
      <div v-if="activeRole === 'Super Admin'" class="space-y-8">
        <!-- Super Admin Metrics Banner -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="glass-panel rounded-2xl p-5 border border-amber-500/30 hover:border-amber-500/50 transition-all">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>Managed User Accounts</span>
              <span class="text-amber-400 font-semibold bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-full text-[10px]">Master Ledger</span>
            </div>
            <div class="text-3xl font-extrabold text-white mt-2">{{ managedUsers.length }}</div>
            <p class="text-[11px] text-slate-400 mt-1">Students, Tutors, Developers, Employers</p>
          </div>

          <div class="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>Internal Hires (Students → Devs)</span>
              <span class="text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full text-[10px]">Hired @ Palantir</span>
            </div>
            <div class="text-3xl font-extrabold text-emerald-400 mt-2">
              {{ managedUsers.filter(u => u.hired_status === 'hired_internal_developer').length }}
            </div>
            <p class="text-[11px] text-slate-400 mt-1">Paid Junior Developer Interns</p>
          </div>

          <div class="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>Active Faculty & Tutors</span>
              <span class="text-indigo-400 font-semibold bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded-full text-[10px]">Staff</span>
            </div>
            <div class="text-3xl font-extrabold text-indigo-400 mt-2">
              {{ managedUsers.filter(u => u.role === 'tutor').length }}
            </div>
            <p class="text-[11px] text-slate-400 mt-1">Assigned with grading powers</p>
          </div>

          <div class="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>Partner Employers</span>
              <span class="text-sky-400 font-semibold bg-sky-950/60 border border-sky-800/40 px-2 py-0.5 rounded-full text-[10px]">Corporate</span>
            </div>
            <div class="text-3xl font-extrabold text-sky-400 mt-2">
              {{ managedUsers.filter(u => u.role === 'employer').length }}
            </div>
            <p class="text-[11px] text-slate-400 mt-1">Hiring access to student pool</p>
          </div>
        </div>

        <!-- Super Admin Sub Tabs -->
        <div class="flex items-center gap-3 border-b border-slate-800 pb-3">
          <button
            v-for="tab in ['User Directory & Role Hierarchy', '+ Create User / Invite Staff', 'Student Talent & Hiring Desk']"
            :key="tab"
            @click="superAdminTab = tab"
            :class="[
              'rounded-xl px-4 py-2 text-xs font-bold transition-all',
              superAdminTab === tab
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <!-- SUBTAB 1: User Directory & Permissions Management -->
        <div v-if="superAdminTab === 'User Directory & Role Hierarchy'" class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <span>👑 Super Admin User & Role Matrix</span>
                <span class="rounded bg-amber-950 text-amber-400 border border-amber-800/60 px-2 py-0.2 text-[10px] font-bold">
                  Master Privileges
                </span>
              </h3>
              <p class="text-xs text-slate-400">Pause accounts, promote students to developers, or customize granular permissions</p>
            </div>

            <!-- Filter by Role -->
            <div class="flex items-center gap-2">
              <select
                v-model="roleFilter"
                class="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="developer">Developers</option>
                <option value="tutor">Tutors</option>
                <option value="employer">Employers</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>

          <!-- Users Directory Table -->
          <div class="overflow-x-auto rounded-2xl border border-slate-800/80">
            <table class="w-full text-left text-xs text-slate-300">
              <thead class="border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th class="py-3.5 px-4">User</th>
                  <th class="py-3.5 px-4">Role & Placement Status</th>
                  <th class="py-3.5 px-4">Account Status</th>
                  <th class="py-3.5 px-4">Custom Permissions / Powers</th>
                  <th class="py-3.5 px-4 text-right">Master Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 bg-slate-950/40">
                <tr v-for="(u, idx) in filteredManagedUsers" :key="idx" class="hover:bg-slate-900/40 transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="font-bold text-white text-xs">{{ u.full_name }}</div>
                    <div class="text-slate-400 font-mono text-[11px]">{{ u.email }}</div>
                    <div v-if="u.college_name" class="text-slate-500 text-[10px] mt-0.5">{{ u.college_name }}</div>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-1.5">
                      <span
                        :class="[
                          'rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                          u.role === 'super_admin' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          u.role === 'developer' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          u.role === 'tutor' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                          u.role === 'employer' ? 'bg-sky-950 text-sky-300 border border-sky-800' :
                          'bg-slate-900 text-slate-300 border border-slate-800'
                        ]"
                      >
                        {{ u.role }}
                      </span>
                    </div>
                    <div v-if="u.hired_status === 'hired_internal_developer'" class="text-[10px] text-emerald-400 font-bold mt-1">
                      💼 Hired Developer @ Palantir ({{ u.salary_or_stipend || '₹45,000/mo' }})
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <button
                      @click="toggleUserPause(u)"
                      :class="[
                        'rounded-full px-2.5 py-0.5 text-[10px] font-bold border transition-colors',
                        u.status === 'active'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800/60'
                          : 'bg-red-950 text-red-400 border-red-800/60'
                      ]"
                    >
                      {{ u.status === 'active' ? '🟢 Active' : '⏸️ Paused' }}
                    </button>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="flex flex-wrap gap-1">
                      <span
                        v-if="u.permissions?.can_grade"
                        class="rounded bg-indigo-950/80 border border-indigo-800/50 px-1.5 py-0.2 text-[9px] text-indigo-300 font-medium"
                      >
                        Grade PRs
                      </span>
                      <span
                        v-if="u.permissions?.can_issue_cert"
                        class="rounded bg-sky-950/80 border border-sky-800/50 px-1.5 py-0.2 text-[9px] text-sky-300 font-medium"
                      >
                        Issue Certs
                      </span>
                      <span
                        v-if="u.permissions?.can_view_leads"
                        class="rounded bg-emerald-950/80 border border-emerald-800/50 px-1.5 py-0.2 text-[9px] text-emerald-300 font-medium"
                      >
                        View Leads
                      </span>
                      <span
                        v-if="u.permissions?.can_hire"
                        class="rounded bg-amber-950/80 border border-amber-800/50 px-1.5 py-0.2 text-[9px] text-amber-300 font-medium"
                      >
                        Hiring
                      </span>
                      <span
                        v-if="u.permissions?.can_manage_users"
                        class="rounded bg-rose-950/80 border border-rose-800/50 px-1.5 py-0.2 text-[9px] text-rose-300 font-bold"
                      >
                        Super Admin
                      </span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                      <!-- Promote / Demote -->
                      <button
                        @click="openPromoteModal(u)"
                        class="rounded-lg bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 px-2.5 py-1 text-[11px] font-bold text-white transition-colors"
                      >
                        Promote / Hire 🚀
                      </button>

                      <!-- Permissions -->
                      <button
                        @click="openPermissionsModal(u)"
                        class="rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[11px] font-semibold text-slate-300 transition-colors"
                      >
                        Powers ⚙️
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- SUBTAB 2: Create User / Invite Staff Form -->
        <div v-else-if="superAdminTab === '+ Create User / Invite Staff'" class="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6">
          <div>
            <h3 class="text-lg font-bold text-white">Create New Staff Member or Partner Account</h3>
            <p class="text-xs text-slate-400">Instantly provision Tutors, Developers, Employers, or Admins with custom powers</p>
          </div>

          <form @submit.prevent="createNewUser" class="space-y-4 text-xs max-w-2xl">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input
                  v-model="newUserForm.full_name"
                  required
                  placeholder="e.g. David Chen"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label class="block text-slate-300 font-semibold mb-1">Email Address *</label>
                <input
                  v-model="newUserForm.email"
                  type="email"
                  required
                  placeholder="e.g. david.chen@palantir.academy"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Assign Role *</label>
                <select
                  v-model="newUserForm.role"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white"
                >
                  <option value="tutor">Tutor / Senior Instructor</option>
                  <option value="developer">Internal Software Developer</option>
                  <option value="employer">Partner Employer / Hiring Manager</option>
                  <option value="admin">Operations Admin</option>
                  <option value="student">Student / Intern</option>
                </select>
              </div>

              <div>
                <label class="block text-slate-300 font-semibold mb-1">Monthly Salary / Stipend</label>
                <input
                  v-model="newUserForm.salary_or_stipend"
                  placeholder="e.g. ₹55,000/month"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white"
                />
              </div>
            </div>

            <!-- Custom Powers Checkbox Matrix -->
            <div class="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
              <label class="block text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                Grant Custom Powers & Privileges
              </label>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="newUserForm.permissions.can_grade" class="rounded text-indigo-600" />
                  <span class="text-slate-300">Can Audit & Grade Student PRs</span>
                </label>

                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="newUserForm.permissions.can_issue_cert" class="rounded text-indigo-600" />
                  <span class="text-slate-300">Can Issue Cryptographic Certificates</span>
                </label>

                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="newUserForm.permissions.can_view_leads" class="rounded text-indigo-600" />
                  <span class="text-slate-300">Can Access Inbound Lead CRM</span>
                </label>

                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="newUserForm.permissions.can_hire" class="rounded text-indigo-600" />
                  <span class="text-slate-300">Can Review & Send Hiring Offers</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              class="rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 px-6 py-2.5 font-bold text-white shadow-lg shadow-amber-600/20 transition-all"
            >
              Provision Account & Grant Powers →
            </button>
          </form>
        </div>

        <!-- SUBTAB 3: Student Talent & Hiring Desk -->
        <div v-else class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-5">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-white">Top 10% Student Talent Pool & Internal Hiring</h3>
              <p class="text-xs text-slate-400">Review outstanding interns and hire them directly as internal developers at Palantir Tech Academy</p>
            </div>
            <span class="rounded-full bg-emerald-950 border border-emerald-800/60 px-3 py-1 text-xs font-bold text-emerald-400">
              Direct Placement Engine
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              v-for="(student, idx) in candidateStudents"
              :key="idx"
              class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-base font-bold text-white">{{ student.name }}</h4>
                  <p class="text-xs text-slate-400">{{ student.college }} • Grade: {{ student.grade }}</p>
                </div>
                <span class="font-mono text-xs text-emerald-400 font-bold bg-emerald-950 border border-emerald-800/60 px-2 py-0.5 rounded-lg">
                  {{ student.attendance }}% Attendance
                </span>
              </div>

              <div class="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs space-y-1">
                <span class="text-[11px] text-slate-500 font-semibold block">Verified Capstone:</span>
                <p class="text-slate-200 font-medium">{{ student.capstone }}</p>
                <a :href="student.github" target="_blank" class="text-sky-400 text-[11px] underline block pt-0.5">
                  Inspect Verified GitHub PRs →
                </a>
              </div>

              <!-- Hire Button Action -->
              <div class="pt-2 flex items-center justify-between">
                <span class="text-xs text-slate-400">Recommended Offer: ₹45,000/mo</span>
                <button
                  @click="hireStudentAsDeveloper(student)"
                  class="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
                >
                  Hire as Junior Developer 💼
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- 1. ADMIN WORKSPACE -->
      <!-- ============================================================ -->
      <div v-else-if="activeRole === 'Admin'" class="space-y-8">
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
                <input v-model="newCert.student_name" required placeholder="e.g. Aarav Mehta" class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white" />
              </div>
              <div>
                <label class="block text-slate-300 font-semibold mb-1">College / University</label>
                <input v-model="newCert.college_name" required placeholder="e.g. Delhi Technological University (DTU)" class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-300 font-semibold mb-1">Program Duration</label>
                  <select v-model="newCert.duration" class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white">
                    <option value="6 Months (320 Industrial Hours)">6 Months (320 Hours)</option>
                    <option value="3 Months (160 Industrial Hours)">3 Months (160 Hours)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-slate-300 font-semibold mb-1">Performance Grade</label>
                  <select v-model="newCert.grade" class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white">
                    <option value="Distinction (Grade A+)">Distinction (Grade A+)</option>
                    <option value="Honors (Grade A)">Honors (Grade A)</option>
                    <option value="First Class (Grade B+)">First Class (Grade B+)</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Capstone Project Title</label>
                <input v-model="newCert.capstone_project" required placeholder="e.g. Enterprise Multi-Tenant SaaS with Nuxt 3 & Supabase" class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white" />
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

        <!-- AI VIVA VOCE EXAMINER SIMULATOR -->
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

    <!-- ============================================================ -->
    <!-- MODALS: PROMOTION/HIRING & CUSTOM POWERS MODAL -->
    <!-- ============================================================ -->

    <!-- 1. Promote / Hire Modal -->
    <div v-if="isPromoteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div @click="isPromoteModalOpen = false" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-lg rounded-3xl border border-amber-500/40 bg-slate-900 p-6 sm:p-8 shadow-2xl text-slate-100 space-y-5">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span class="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Super Admin Master Action</span>
            <h3 class="text-lg font-bold text-white mt-0.5">Promote / Hire User: {{ selectedUser?.full_name }}</h3>
          </div>
          <button @click="isPromoteModalOpen = false" class="text-slate-400 hover:text-white">✕</button>
        </div>

        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-slate-300 mb-1">Target Role Transition</label>
            <select v-model="targetRole" class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white">
              <option value="developer">Internal Software Developer (Hired Employee)</option>
              <option value="tutor">Tutor / Technical Mentor</option>
              <option value="admin">Operations Admin</option>
              <option value="student">Student / Intern</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold text-slate-300 mb-1">Employment / Placement Status</label>
            <select v-model="targetHiredStatus" class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white">
              <option value="hired_internal_developer">Hired as Internal Developer @ Palantir Academy</option>
              <option value="placed_partner_employer">Placed at Partner Employer (ApexCloud)</option>
              <option value="not_hired">Standard Active Role</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold text-slate-300 mb-1">Monthly Salary / Stipend</label>
            <input
              v-model="targetSalary"
              placeholder="e.g. ₹45,000/month"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white"
            />
          </div>

          <div class="rounded-xl border border-amber-900/40 bg-amber-950/20 p-3 text-[11px] text-amber-300">
            💡 <strong>Promoting to Developer</strong> automatically updates their portal privileges and issues an internal employment letter.
          </div>

          <button
            @click="confirmPromotion"
            class="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 py-2.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all"
          >
            Confirm Promotion & Update Role →
          </button>
        </div>
      </div>
    </div>

    <!-- 2. Custom Permissions Modal -->
    <div v-if="isPermissionsModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div @click="isPermissionsModalOpen = false" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md rounded-3xl border border-indigo-500/40 bg-slate-900 p-6 sm:p-8 shadow-2xl text-slate-100 space-y-5">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Granular Security Powers</span>
            <h3 class="text-lg font-bold text-white mt-0.5">{{ selectedUser?.full_name }}</h3>
          </div>
          <button @click="isPermissionsModalOpen = false" class="text-slate-400 hover:text-white">✕</button>
        </div>

        <div class="space-y-3.5 text-xs">
          <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700">
            <input type="checkbox" v-model="selectedUserPermissions.can_grade" class="rounded text-indigo-600" />
            <div>
              <span class="font-bold text-white block">Audit & Grade Student PRs</span>
              <span class="text-[11px] text-slate-400">Allows approving pull requests and issuing grades</span>
            </div>
          </label>

          <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700">
            <input type="checkbox" v-model="selectedUserPermissions.can_issue_cert" class="rounded text-indigo-600" />
            <div>
              <span class="font-bold text-white block">Issue Cryptographic Certificates</span>
              <span class="text-[11px] text-slate-400">Allows generating public verifiable credentials</span>
            </div>
          </label>

          <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700">
            <input type="checkbox" v-model="selectedUserPermissions.can_view_leads" class="rounded text-indigo-600" />
            <div>
              <span class="font-bold text-white block">View Inbound Leads CRM</span>
              <span class="text-[11px] text-slate-400">Access to phone numbers and student inquiries</span>
            </div>
          </label>

          <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700">
            <input type="checkbox" v-model="selectedUserPermissions.can_hire" class="rounded text-indigo-600" />
            <div>
              <span class="font-bold text-white block">Talent Pool Hiring Powers</span>
              <span class="text-[11px] text-slate-400">Send job offers directly to top students</span>
            </div>
          </label>

          <button
            @click="savePermissions"
            class="w-full mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 font-bold text-white shadow-lg shadow-indigo-600/30 transition-all"
          >
            Save Granted Powers
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

defineEmits(['open-enroll'])

const { user, isAuthModalOpen, loginAsDemoStudent, loginAsSuperAdmin } = useAuth()

const activeRole = ref('Super Admin')
const adminTab = ref('Inbound Leads Pipeline')
const superAdminTab = ref('User Directory & Role Hierarchy')
const roleFilter = ref('all')
const leadSearch = ref('')

// Super Admin Managed Users
const managedUsers = ref([
  {
    id: 'u1',
    full_name: 'Chief Super Admin (Palantir)',
    email: 'extractionevolution@gmail.com',
    role: 'super_admin',
    status: 'active',
    hired_status: 'not_hired',
    permissions: { can_grade: true, can_issue_cert: true, can_view_leads: true, can_hire: true, can_manage_users: true }
  },
  {
    id: 'u2',
    full_name: 'Aarav Mehta',
    email: 'aarav.mehta@dtu.ac.in',
    college_name: 'DTU (8th Sem)',
    role: 'developer',
    status: 'active',
    hired_status: 'hired_internal_developer',
    salary_or_stipend: '₹45,000/month',
    permissions: { can_grade: true, can_issue_cert: false, can_view_leads: false, can_hire: false }
  },
  {
    id: 'u3',
    full_name: 'Alex Mercer',
    email: 'alex.mercer@palantir.academy',
    role: 'tutor',
    status: 'active',
    assigned_batch: 'PTA-2026-FS-01',
    permissions: { can_grade: true, can_issue_cert: false, can_view_leads: false, can_hire: false }
  },
  {
    id: 'u4',
    full_name: 'Dr. Sophia Vance',
    email: 'sophia.vance@palantir.academy',
    role: 'tutor',
    status: 'active',
    assigned_batch: 'PTA-2026-AI-01',
    permissions: { can_grade: true, can_issue_cert: false, can_view_leads: false, can_hire: false }
  },
  {
    id: 'u5',
    full_name: 'ApexCloud Hiring Partner',
    email: 'recruiting@apexcloud.io',
    role: 'employer',
    status: 'active',
    permissions: { can_grade: false, can_issue_cert: false, can_view_leads: false, can_hire: true }
  },
  {
    id: 'u6',
    full_name: 'Sneha Patel',
    email: 'sneha.patel@vit.ac.in',
    college_name: 'VIT Vellore (7th Sem)',
    role: 'student',
    status: 'active',
    hired_status: 'not_hired',
    permissions: { can_grade: false, can_issue_cert: false, can_view_leads: false, can_hire: false }
  }
])

const filteredManagedUsers = computed(() => {
  if (roleFilter.value === 'all') return managedUsers.value
  return managedUsers.value.filter(u => u.role === roleFilter.value)
})

// Toggle user pause / active status
const toggleUserPause = async (u) => {
  u.status = u.status === 'active' ? 'paused' : 'active'
  try {
    await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_status', userId: u.id, status: u.status })
    })
  } catch (e) {
    console.warn('Status toggle saved locally:', e)
  }
}

// Promotion / Hiring Modal
const isPromoteModalOpen = ref(false)
const selectedUser = ref(null)
const targetRole = ref('developer')
const targetHiredStatus = ref('hired_internal_developer')
const targetSalary = ref('₹45,000/month')

const openPromoteModal = (u) => {
  selectedUser.value = u
  targetRole.value = u.role === 'student' ? 'developer' : u.role
  targetHiredStatus.value = u.role === 'student' ? 'hired_internal_developer' : 'not_hired'
  targetSalary.value = u.salary_or_stipend || '₹45,000/month'
  isPromoteModalOpen.value = true
}

const confirmPromotion = async () => {
  if (!selectedUser.value) return
  selectedUser.value.role = targetRole.value
  selectedUser.value.hired_status = targetHiredStatus.value
  selectedUser.value.salary_or_stipend = targetSalary.value

  // Grant appropriate powers
  if (targetRole.value === 'developer') {
    selectedUser.value.permissions = {
      can_grade: true,
      can_issue_cert: false,
      can_view_leads: false,
      can_hire: false
    }
  }

  isPromoteModalOpen.value = false
  alert(`Success: ${selectedUser.value.full_name} has been transitioned to ${targetRole.value.toUpperCase()}!`)
}

// Custom Permissions Modal
const isPermissionsModalOpen = ref(false)
const selectedUserPermissions = ref({})

const openPermissionsModal = (u) => {
  selectedUser.value = u
  selectedUserPermissions.value = { ...u.permissions }
  isPermissionsModalOpen.value = true
}

const savePermissions = () => {
  if (!selectedUser.value) return
  selectedUser.value.permissions = { ...selectedUserPermissions.value }
  isPermissionsModalOpen.value = false
  alert(`Custom privileges updated for ${selectedUser.value.full_name}`)
}

// Create New User Form
const newUserForm = ref({
  full_name: '',
  email: '',
  role: 'tutor',
  salary_or_stipend: '₹55,000/month',
  permissions: {
    can_grade: true,
    can_issue_cert: false,
    can_view_leads: false,
    can_hire: false
  }
})

const createNewUser = () => {
  managedUsers.value.push({
    id: `u-${Date.now()}`,
    full_name: newUserForm.value.full_name,
    email: newUserForm.value.email,
    role: newUserForm.value.role,
    status: 'active',
    salary_or_stipend: newUserForm.value.salary_or_stipend,
    permissions: { ...newUserForm.value.permissions }
  })

  alert(`Account provisioned for ${newUserForm.value.full_name} (${newUserForm.value.role})!`)
  superAdminTab.value = 'User Directory & Role Hierarchy'
}

// Candidate Students for Direct Hiring
const candidateStudents = ref([
  {
    name: 'Sneha Patel',
    college: 'VIT Vellore (7th Sem)',
    grade: 'A+ (Distinction)',
    attendance: 94,
    capstone: 'Docker Containerized Task Worker Pool with BullMQ & Redis',
    github: 'https://github.com/palantir-tech/sample-capstone'
  },
  {
    name: 'Karthik Rao',
    college: 'BITS Pilani (8th Sem)',
    grade: 'A (Honors)',
    attendance: 90,
    capstone: 'High-Throughput WebSockets Gateway with Nitro & Redis Pub/Sub',
    github: 'https://github.com/palantir-tech/sample-capstone'
  }
])

const hireStudentAsDeveloper = (student) => {
  managedUsers.value.push({
    id: `u-${Date.now()}`,
    full_name: student.name,
    email: `${student.name.toLowerCase().replace(' ', '.')}@palantir.academy`,
    college_name: student.college,
    role: 'developer',
    status: 'active',
    hired_status: 'hired_internal_developer',
    salary_or_stipend: '₹45,000/month',
    permissions: { can_grade: true, can_issue_cert: false, can_view_leads: false, can_hire: false }
  })

  alert(`🎉 Congratulations! ${student.name} has been hired as an Internal Junior Developer at Palantir Tech Academy (₹45,000/month)!`)
  superAdminTab.value = 'User Directory & Role Hierarchy'
}

// Normal Admin State
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
  'What is the architectural difference between authentication and authorization in your Supabase JWT security model?'
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
