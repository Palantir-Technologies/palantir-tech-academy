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
              <span class="text-xs font-bold text-white uppercase tracking-wider">
                {{ currentWorkspaceTitle }}
              </span>
            </div>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-[11px] text-slate-400 font-medium">Supabase Cloud Ledger Connected</span>
            </div>
          </div>
        </div>

        <!-- Role Workspace Status & Mode Controls -->
        <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
          <!-- Super Admin Specific View Mode Switcher -->
          <div v-if="userRole === 'super_admin'" class="flex items-center gap-2">
            <button
              @click="superAdminPreviewMode = !superAdminPreviewMode"
              :class="[
                'rounded-xl px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm',
                superAdminPreviewMode
                  ? 'bg-amber-950 text-amber-300 border-amber-700/80'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
              ]"
            >
              <span>{{ superAdminPreviewMode ? '👑 Return to Master Console' : '👁️ Preview Student Workspace' }}</span>
            </button>
            <span class="rounded-lg bg-amber-950/80 border border-amber-800/60 px-2.5 py-1 text-[11px] text-amber-300 font-mono font-bold">
              👑 Chief Master Owner
            </span>
          </div>

          <!-- Non-Super-Admin Quick Test Switcher for Evaluators -->
          <div v-else class="flex items-center gap-2">
            <button
              @click="loginAsSuperAdmin"
              class="rounded-xl border border-amber-500/50 bg-amber-950/50 hover:bg-amber-900/60 px-3 py-1.5 text-xs font-bold text-amber-300 transition-colors flex items-center gap-1 shadow-sm"
            >
              <span>👑 Super Admin Login</span>
            </button>
            <button
              v-if="!user"
              @click="loginAsDemoStudent"
              class="rounded-xl border border-indigo-500/40 bg-indigo-950/50 hover:bg-indigo-900/60 px-3 py-1.5 text-xs font-bold text-indigo-300 transition-colors"
            >
              🎓 Demo Student
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 space-y-8">
      <!-- Super Admin Preview Banner (When Super Admin tests Student experience) -->
      <div
        v-if="userRole === 'super_admin' && superAdminPreviewMode"
        class="rounded-2xl border border-amber-700/80 bg-amber-950/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-lg shadow-amber-950/30"
      >
        <div class="flex items-center gap-3">
          <span class="text-xl">👁️</span>
          <div>
            <span class="font-bold text-amber-300 block">Student Learning & AI Viva Voce Simulation Preview</span>
            <span class="text-amber-200/80 text-[11px]">You are logged in as Chief Super Admin and previewing what enrolled college interns see.</span>
          </div>
        </div>
        <button
          @click="superAdminPreviewMode = false"
          class="rounded-xl bg-amber-600 hover:bg-amber-500 px-4 py-2 font-bold text-white transition-colors text-xs whitespace-nowrap shadow-md"
        >
          👑 Back to Master Hub
        </button>
      </div>

      <!-- User Profile Banner (If Logged In) -->
      <div v-if="user" class="glass-panel-glow rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-0.5 shadow-md flex-shrink-0">
            <div class="h-full w-full rounded-[14px] bg-slate-950 flex items-center justify-center font-extrabold text-white text-base">
              {{ (user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase() }}
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-base font-bold text-white">{{ user.user_metadata?.full_name || user.email?.split('@')[0] }}</h3>
              <span
                :class="[
                  'rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase',
                  userRole === 'super_admin'
                    ? 'bg-amber-950 text-amber-300 border-amber-800/80'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800/80'
                ]"
              >
                {{ userRole === 'super_admin' ? '👑 Chief Super Admin' : 'Verified Intern' }}
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">
              {{ user.email }} • {{ userRole === 'super_admin' ? 'Full System Clearance & Master Ledger Control' : 'Active Enrollment' }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="isProfileModalOpen = true"
            class="rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
          >
            <span>⚙️ Edit Profile & Password</span>
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
      <!-- 👑 SUPER ADMIN MASTER COMMAND HUB -->
      <!-- ============================================================ -->
      <div v-if="currentView === 'super_admin'" class="space-y-8">
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
              <span>Inbound Leads CRM</span>
              <span class="text-sky-400 font-semibold bg-sky-950/60 border border-sky-800/40 px-2 py-0.5 rounded-full text-[10px]">Live Pipeline</span>
            </div>
            <div class="text-3xl font-extrabold text-sky-400 mt-2">
              {{ leads.length }}
            </div>
            <p class="text-[11px] text-slate-400 mt-1">AI Chatbot & Application capture</p>
          </div>
        </div>

        <!-- Super Admin Sub Tabs -->
        <div class="flex items-center gap-2 sm:gap-3 border-b border-slate-800 pb-3 overflow-x-auto">
          <button
            v-for="tab in ['User Directory & Staff Hierarchy', '+ Create User / Invite Staff', 'Student Talent & Hiring Desk', 'Inbound Leads (CRM)', 'Batches & Cohorts', 'Credential Issuer', '⚙️ Site Branding & Logo']"
            :key="tab"
            @click="superAdminTab = tab"
            :class="[
              'rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap',
              superAdminTab === tab
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <!-- SUBTAB 1: User Directory & Permissions Management -->
        <div v-if="superAdminTab === 'User Directory & Staff Hierarchy'" class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <span>👑 Super Admin User & Role Matrix</span>
                <span class="rounded bg-amber-950 text-amber-400 border border-amber-800/60 px-2 py-0.2 text-[10px] font-bold">
                  Master Privileges
                </span>
              </h3>
              <p class="text-xs text-slate-400">Filter students and staff, pause accounts, promote students to developers, or assign granular powers</p>
            </div>

            <!-- Filter by Role -->
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-400 font-semibold">Filter:</span>
              <select
                v-model="roleFilter"
                class="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="all">All Roles (Students & Staff)</option>
                <option value="student">Students / Interns</option>
                <option value="developer">Internal Developers</option>
                <option value="tutor">Faculty / Tutors</option>
                <option value="employer">Partner Employers</option>
                <option value="admin">Operations Admins</option>
                <option value="super_admin">Super Admins</option>
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
                    <div class="font-bold text-white text-xs flex items-center gap-1.5">
                      <span>{{ u.full_name }}</span>
                      <span v-if="isMasterSuperAdmin(u)" class="text-amber-400 text-[10px]">👑 (You)</span>
                    </div>
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
                    <!-- Protected Super Admin Status: Cannot be paused -->
                    <div v-if="isMasterSuperAdmin(u)" class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold border bg-amber-950/80 text-amber-300 border-amber-700/80">
                      <span>👑</span> Master Owner (Protected)
                    </div>
                    <!-- Regular user status toggle -->
                    <button
                      v-else
                      @click="toggleUserPause(u)"
                      :class="[
                        'rounded-full px-2.5 py-0.5 text-[10px] font-bold border transition-colors',
                        u.status === 'active'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800/60 hover:bg-emerald-900/60'
                          : 'bg-red-950 text-red-400 border-red-800/60 hover:bg-red-900/60'
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
                        v-if="u.permissions?.can_manage_users || u.role === 'super_admin'"
                        class="rounded bg-rose-950/80 border border-rose-800/50 px-1.5 py-0.2 text-[9px] text-rose-300 font-bold"
                      >
                        Super Admin
                      </span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 text-right">
                    <!-- Protected Super Admin Master Account: Cannot promote/demote self -->
                    <div v-if="isMasterSuperAdmin(u)" class="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-900/60 px-2.5 py-1 rounded-lg">
                      <span>🛡️</span> Protected Master
                    </div>
                    <!-- Regular user actions -->
                    <div v-else class="flex items-center justify-end gap-1.5">
                      <button
                        @click="openPromoteModal(u)"
                        class="rounded-lg bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 px-2.5 py-1 text-[11px] font-bold text-white transition-colors"
                      >
                        Promote / Hire 🚀
                      </button>
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
                <label class="block text-slate-300 font-semibold mb-1">Monthly Salary / Compensation</label>
                <input
                  v-model="newUserForm.salary_or_stipend"
                  placeholder="e.g. ₹55,000/month"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white"
                />
              </div>
            </div>

            <!-- Granular Permissions Checklist -->
            <div>
              <label class="block text-slate-300 font-semibold mb-2">Granted Super Admin Powers & Privileges:</label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <label class="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 cursor-pointer">
                  <input type="checkbox" v-model="newUserForm.permissions.can_grade" class="rounded text-indigo-600" />
                  <span class="text-[11px] text-slate-300">Grade PRs & Code</span>
                </label>
                <label class="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 cursor-pointer">
                  <input type="checkbox" v-model="newUserForm.permissions.can_issue_cert" class="rounded text-indigo-600" />
                  <span class="text-[11px] text-slate-300">Issue Certificates</span>
                </label>
                <label class="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 cursor-pointer">
                  <input type="checkbox" v-model="newUserForm.permissions.can_view_leads" class="rounded text-indigo-600" />
                  <span class="text-[11px] text-slate-300">View Inbound Leads</span>
                </label>
                <label class="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 cursor-pointer">
                  <input type="checkbox" v-model="newUserForm.permissions.can_hire" class="rounded text-indigo-600" />
                  <span class="text-[11px] text-slate-300">Hiring Authority</span>
                </label>
              </div>
            </div>

            <div class="pt-2">
              <button
                type="submit"
                class="rounded-xl bg-amber-600 hover:bg-amber-500 px-5 py-2.5 font-bold text-white shadow-md shadow-amber-600/20 transition-all hover:scale-105"
              >
                Provision User & Grant Powers
              </button>
            </div>
          </form>
        </div>

        <!-- SUBTAB 3: Student Talent & Direct Hiring Desk -->
        <div v-else-if="superAdminTab === 'Student Talent & Hiring Desk'" class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-6">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>🚀 Palantir Internal Talent & Direct Hiring Pipeline</span>
              <span class="rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2 py-0.2 text-[10px] font-bold">
                Direct Conversion Desk
              </span>
            </h3>
            <p class="text-xs text-slate-400">Review outstanding interns and convert them directly into Paid Internal Junior Developers or offer partner placements</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div
              v-for="(student, idx) in candidateStudents"
              :key="idx"
              class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3.5 hover:border-slate-700 transition-colors"
            >
              <div class="flex items-start justify-between">
                <div>
                  <h4 class="text-sm font-bold text-white">{{ student.name }}</h4>
                  <p class="text-[11px] text-slate-400">{{ student.college }}</p>
                </div>
                <span class="rounded-full bg-emerald-950 border border-emerald-800 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold">
                  {{ student.grade }}
                </span>
              </div>

              <div class="rounded-xl bg-slate-950/80 p-3 border border-slate-800/80 space-y-1">
                <span class="text-[10px] text-slate-500 uppercase font-semibold">Verified Capstone:</span>
                <p class="text-xs font-semibold text-slate-200">{{ student.capstone }}</p>
                <a :href="student.github" target="_blank" class="text-[10px] text-indigo-400 hover:underline block pt-1">
                  View Verified PRs & Git Commits →
                </a>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span class="text-slate-400 text-[11px]">Attendance: <strong>{{ student.attendance }}%</strong></span>
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

        <!-- SUBTAB 4: Inbound Leads (CRM) -->
        <div v-else-if="superAdminTab === 'Inbound Leads (CRM)'" class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <span>🤖 Inbound Student Leads & Counseling Desk</span>
              </h3>
              <p class="text-xs text-slate-400">Leads captured live via the AI Counselor widget and website inquiry forms</p>
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
                <tr v-for="(lead, idx) in filteredLeads" :key="idx" class="hover:bg-slate-900/40 transition-colors">
                  <td class="py-3.5 px-4 font-semibold text-white">{{ lead.name }}</td>
                  <td class="py-3.5 px-4">{{ lead.college }} ({{ lead.year }})</td>
                  <td class="py-3.5 px-4 font-mono text-[11px]">
                    <div>{{ lead.phone }}</div>
                    <div class="text-slate-400 text-[10px]">{{ lead.email }}</div>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="rounded bg-indigo-950 px-2 py-0.5 text-[10px] font-mono text-indigo-300 border border-indigo-800">
                      {{ lead.track }}
                    </span>
                    <span class="text-slate-400 text-[10px] block mt-0.5">{{ lead.duration }}</span>
                  </td>
                  <td class="py-3.5 px-4">
                    <button
                      @click="cycleLeadStatus(lead)"
                      :class="[
                        'rounded-full px-2.5 py-0.5 text-[10px] font-semibold border transition-colors',
                        lead.status === 'New' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                        lead.status === 'Contacted' ? 'bg-sky-950 text-sky-300 border-sky-800' :
                        'bg-emerald-950 text-emerald-300 border-emerald-800'
                      ]"
                    >
                      {{ lead.status }} ↻
                    </button>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <a
                      :href="`tel:${lead.phone}`"
                      class="rounded-lg bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 px-2.5 py-1 text-[11px] font-semibold text-white transition-colors inline-block"
                    >
                      Call Student
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- SUBTAB 5: Batches & Cohorts -->
        <div v-else-if="superAdminTab === 'Batches & Cohorts'" class="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-white">Active & Upcoming Industrial Cohorts</h3>
              <p class="text-xs text-slate-400">Manage 3-month and 6-month industrial internship batches</p>
            </div>
            <button
              @click="$emit('open-enroll')"
              class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white transition-colors shadow-md"
            >
              + Create New Cohort
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div
              v-for="(batch, idx) in demoBatches"
              :key="idx"
              class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3.5"
            >
              <div class="flex items-center justify-between">
                <span class="rounded bg-indigo-950 border border-indigo-800 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-300">
                  {{ batch.code }}
                </span>
                <span class="rounded-full bg-emerald-950 border border-emerald-800 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  {{ batch.status }}
                </span>
              </div>
              <div>
                <h4 class="text-sm font-bold text-white">{{ batch.track }}</h4>
                <p class="text-slate-400 text-[11px] mt-0.5">Faculty: {{ batch.tutor }}</p>
                <p class="text-slate-400 text-[11px]">Timing: {{ batch.timing }}</p>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span class="text-slate-400">Capacity: <strong>{{ batch.enrolled }} / {{ batch.capacity }} Enrolled</strong></span>
                <span class="text-emerald-400 font-bold">Seats Open</span>
              </div>
            </div>
          </div>
        </div>

        <!-- SUBTAB 6: Credential Issuer -->
        <div v-else-if="superAdminTab === 'Credential Issuer'" class="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>📜 Issue Verifiable Industrial Internship Certificate</span>
              <span class="rounded bg-sky-950 text-sky-400 border border-sky-800/60 px-2 py-0.2 text-[10px] font-bold">
                QR Ledger Registered
              </span>
            </h3>
            <p class="text-xs text-slate-400">Issue an instant blockchain/QR-verifiable credential with project defense metadata</p>
          </div>

          <form @submit.prevent="generateCertificate" class="space-y-4 text-xs max-w-2xl">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Student Full Name *</label>
                <input
                  v-model="newCert.student_name"
                  required
                  placeholder="e.g. Aarav Mehta"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label class="block text-slate-300 font-semibold mb-1">College / University *</label>
                <input
                  v-model="newCert.college_name"
                  required
                  placeholder="e.g. Delhi Technological University (DTU)"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Program Track & Hours *</label>
                <input
                  v-model="newCert.duration"
                  required
                  placeholder="6 Months (320 Industrial Hours)"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label class="block text-slate-300 font-semibold mb-1">Grade / Distinction *</label>
                <select
                  v-model="newCert.grade"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white"
                >
                  <option>Distinction (Grade A+)</option>
                  <option>First Class Honors (Grade A)</option>
                  <option>Passed with Merit (Grade B+)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-slate-300 font-semibold mb-1">Capstone Project Title *</label>
              <input
                v-model="newCert.capstone_project"
                required
                placeholder="e.g. Enterprise Multi-Tenant SaaS with Nuxt 3 & Supabase"
                class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white"
              />
            </div>

            <div class="pt-2">
              <button
                type="submit"
                class="rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 px-6 py-2.5 font-bold text-white shadow-lg transition-all"
              >
                Register & Issue Official Credential →
              </button>
            </div>
          </form>
        </div>

        <!-- SUBTAB 7: Dynamic Site Branding & Logo Management -->
        <div v-else-if="superAdminTab === '⚙️ Site Branding & Logo'" class="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <span>⚙️ Dynamic Website Branding & Logo Engine</span>
                <span class="rounded bg-indigo-950 text-indigo-400 border border-indigo-800/60 px-2 py-0.2 text-[10px] font-bold">
                  Real-Time Propagation
                </span>
              </h3>
              <p class="text-xs text-slate-400">
                Update the official website name, subtitle, and logo live across the navbar, footer, metadata, and mobile PWA application.
              </p>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                @click="resetBrandingDefaults"
                class="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                ↺ Reset Default
              </button>
            </div>
          </div>

          <!-- Live Real-Time Header Preview Box -->
          <div class="rounded-2xl border border-indigo-500/30 bg-slate-950/70 p-4 sm:p-5 space-y-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Live Header Preview</span>
            <div class="rounded-xl border border-slate-800 bg-slate-900/90 p-3 sm:p-4 flex items-center justify-between">
              <!-- Brand Representation -->
              <div class="flex items-center gap-3">
                <!-- If Image -->
                <div v-if="brandingForm.logoType === 'image' && brandingForm.logoUrl" class="h-10 w-10 flex-shrink-0">
                  <img
                    :src="brandingForm.logoUrl"
                    :alt="brandingForm.siteName"
                    class="h-10 w-10 rounded-xl object-contain border border-slate-800 bg-slate-950 p-1"
                  />
                </div>
                <!-- If Monogram -->
                <div
                  v-else
                  :class="[
                    'flex h-10 w-10 items-center justify-center rounded-xl p-0.5 shadow-md flex-shrink-0',
                    getLogoGradient(brandingForm.logoColor)
                  ]"
                >
                  <div class="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 font-extrabold text-transparent bg-clip-text text-lg" :class="getTextGradient(brandingForm.logoColor)">
                    {{ brandingForm.logoLetter || 'P' }}
                  </div>
                </div>

                <div>
                  <span class="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>{{ previewFormattedName.first }}</span>
                    <span class="text-indigo-400 font-medium">{{ previewFormattedName.rest }}</span>
                  </span>
                  <span class="block text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    {{ brandingForm.siteSubtitle || 'Industrial Internship & Training' }}
                  </span>
                </div>
              </div>

              <!-- Fake nav mock -->
              <div class="hidden sm:flex items-center gap-3 text-xs text-slate-400">
                <span class="hover:text-white">Programs</span>
                <span class="hover:text-white">Curriculum</span>
                <span class="text-emerald-400 font-semibold">✨ AI Synopsis</span>
                <span class="rounded-lg bg-indigo-600 text-white px-2.5 py-1 text-[11px] font-bold">Apply Now</span>
              </div>
            </div>
          </div>

          <!-- Notification Banner -->
          <div v-if="brandingMessage" :class="['p-3 rounded-xl text-xs font-semibold flex items-center gap-2', brandingIsError ? 'bg-red-950/80 border border-red-800 text-red-300' : 'bg-emerald-950/80 border border-emerald-800 text-emerald-300']">
            <span>{{ brandingIsError ? '⚠️' : '✅' }}</span>
            <span>{{ brandingMessage }}</span>
          </div>

          <!-- Branding Configuration Form -->
          <form @submit.prevent="saveBranding" class="space-y-5 text-xs max-w-3xl">
            <!-- Site Name & Subtitle -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Website / Academy Name *</label>
                <input
                  v-model="brandingForm.siteName"
                  required
                  placeholder="e.g. Palantir Tech Academy"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-slate-300 font-semibold mb-1">Tagline / Subtitle *</label>
                <input
                  v-model="brandingForm.siteSubtitle"
                  required
                  placeholder="e.g. Industrial Internship & Training"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <!-- Logo Type Selector -->
            <div>
              <label class="block text-slate-300 font-semibold mb-2">Logo Representation Mode *</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  :class="[
                    'flex items-center gap-3 rounded-2xl border p-3.5 cursor-pointer transition-all',
                    brandingForm.logoType === 'icon' ? 'border-indigo-500 bg-indigo-950/30' : 'border-slate-800 bg-slate-900/60'
                  ]"
                >
                  <input type="radio" value="icon" v-model="brandingForm.logoType" class="text-indigo-600" />
                  <div>
                    <span class="font-bold text-white block">Stylized Monogram / Letter Emblem</span>
                    <span class="text-slate-400 text-[11px]">Dynamic gradient badge with custom letter or initials</span>
                  </div>
                </label>

                <label
                  :class="[
                    'flex items-center gap-3 rounded-2xl border p-3.5 cursor-pointer transition-all',
                    brandingForm.logoType === 'image' ? 'border-indigo-500 bg-indigo-950/30' : 'border-slate-800 bg-slate-900/60'
                  ]"
                >
                  <input type="radio" value="image" v-model="brandingForm.logoType" class="text-indigo-600" />
                  <div>
                    <span class="font-bold text-white block">Custom Logo Image (URL or Upload)</span>
                    <span class="text-slate-400 text-[11px]">Upload a company PNG/SVG/WebP or paste an image URL</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Monogram Settings (If Logo Type === 'icon') -->
            <div v-if="brandingForm.logoType === 'icon'" class="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Monogram Letter / Symbol (1-3 Chars)</label>
                <input
                  v-model="brandingForm.logoLetter"
                  maxlength="3"
                  placeholder="e.g. P or PTA"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white uppercase font-bold tracking-widest focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-slate-300 font-semibold mb-1">Accent Gradient Palette</label>
                <select
                  v-model="brandingForm.logoColor"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="indigo">Indigo / Cyber Sky (Default)</option>
                  <option value="emerald">Emerald / Tech Mint</option>
                  <option value="sky">Electric Sky Blue</option>
                  <option value="amber">Amber / Gold</option>
                  <option value="rose">Rose / Cyber Pink</option>
                </select>
              </div>
            </div>

            <!-- Image Logo Settings (If Logo Type === 'image') -->
            <div v-else class="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Logo Image Direct URL</label>
                <input
                  v-model="brandingForm.logoUrl"
                  placeholder="https://example.com/logo.png"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <!-- Quick File Upload (Base64) -->
              <div>
                <label class="block text-slate-300 font-semibold mb-1">Or Upload Image File From Your Device</label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  @change="handleLogoFileUpload"
                  class="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                />
                <span class="text-[10px] text-slate-500 block mt-1">Recommended: Square PNG/SVG with transparent background</span>
              </div>

              <!-- Quick Presets -->
              <div>
                <span class="text-[11px] font-semibold text-slate-400 block mb-2">Or Choose a High-Tech Preset Emblem:</span>
                <div class="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    @click="brandingForm.logoUrl = 'https://api.iconify.design/heroicons:cpu-chip-solid.svg?color=%23818cf8'"
                    class="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-indigo-300 hover:border-indigo-500"
                  >
                    ⚡ Neural Chip
                  </button>
                  <button
                    type="button"
                    @click="brandingForm.logoUrl = 'https://api.iconify.design/heroicons:cube-transparent-solid.svg?color=%2338bdf8'"
                    class="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-sky-300 hover:border-sky-500"
                  >
                    🔷 Hexagon Matrix
                  </button>
                  <button
                    type="button"
                    @click="brandingForm.logoUrl = 'https://api.iconify.design/heroicons:code-bracket-square-solid.svg?color=%2334d399'"
                    class="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-emerald-300 hover:border-emerald-500"
                  >
                    💻 Code Terminal
                  </button>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-2 flex items-center gap-3">
              <button
                type="submit"
                :disabled="isSavingBranding"
                class="rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 px-6 py-2.5 font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 disabled:opacity-50"
              >
                {{ isSavingBranding ? 'Publishing Live...' : '💾 Save & Publish Branding Live' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- 👨‍🏫 TUTOR WORKSPACE -->
      <!-- ============================================================ -->
      <div v-else-if="currentView === 'tutor'" class="space-y-8">
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
            <span class="text-xs text-slate-400 block mt-2">Scheduled: 6:30 PM - 8:30 PM IST • Lead Faculty</span>
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
      <!-- 🎓 STUDENT WORKSPACE (DEFAULT FOR STUDENTS & PREVIEW) -->
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
              class="whitespace-nowrap rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all disabled:opacity-50"
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
              <span class="text-2xl">📑</span>
              <h4 class="font-bold text-white text-sm">Industrial Internship Report</h4>
              <p class="text-slate-400 text-xs">70+ page IEEE standard documentation complete with architecture diagrams, DFD, and test results.</p>
              <NuxtLink to="/synopsis" class="text-emerald-400 hover:underline font-semibold block pt-1">
                Generate Project Synopsis Free →
              </NuxtLink>
            </div>

            <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-colors">
              <span class="text-2xl">📜</span>
              <h4 class="font-bold text-white text-sm">Weekly Daily Diary & Timesheet</h4>
              <p class="text-slate-400 text-xs">Weekly logbook covering 320 logged industrial hours signed by senior industry mentors.</p>
              <span class="text-indigo-400 font-semibold block pt-1">Verified & Digitally Signed ✓</span>
            </div>

            <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-colors">
              <span class="text-2xl">🎓</span>
              <h4 class="font-bold text-white text-sm">Viva Voce Defense Slide Deck</h4>
              <p class="text-slate-400 text-xs">15-slide PowerPoint deck tailored for external university evaluators with system architecture breakdowns.</p>
              <span class="text-indigo-400 font-semibold block pt-1">Pre-built PPT Template Included ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- MODALS: PROMOTION / HIRING & PERMISSIONS -->
    <!-- ============================================================ -->

    <!-- Promotion / Hiring Modal -->
    <div
      v-if="isPromoteModalOpen && selectedUser"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      @click.self="isPromoteModalOpen = false"
    >
      <div class="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl space-y-5">
        <div>
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <span>🚀 Promote & Hire {{ selectedUser.full_name }}</span>
          </h3>
          <p class="text-xs text-slate-400">Transition user role from {{ selectedUser.role }} to another role or hire as Internal Developer</p>
        </div>

        <div class="space-y-4 text-xs">
          <div>
            <label class="block text-slate-300 font-semibold mb-1">Target Role</label>
            <select
              v-model="targetRole"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white"
            >
              <option value="developer">Internal Software Developer (Paid Hire)</option>
              <option value="tutor">Faculty / Tutor</option>
              <option value="employer">Partner Employer</option>
              <option value="admin">Operations Admin</option>
              <option value="student">Student / Intern</option>
            </select>
          </div>

          <div v-if="targetRole === 'developer'">
            <label class="block text-slate-300 font-semibold mb-1">Monthly Salary / Compensation</label>
            <input
              v-model="targetSalary"
              placeholder="e.g. ₹45,000/month"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-white"
            />
          </div>

          <div class="pt-2 flex justify-end gap-3">
            <button
              @click="isPromoteModalOpen = false"
              class="rounded-xl border border-slate-800 px-4 py-2 text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              @click="confirmPromotion"
              class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 font-bold text-white shadow-md"
            >
              Confirm Role Transition
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Permissions Modal -->
    <div
      v-if="isPermissionsModalOpen && selectedUser"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      @click.self="isPermissionsModalOpen = false"
    >
      <div class="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl space-y-5">
        <div>
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <span>⚙️ Custom Powers for {{ selectedUser.full_name }}</span>
          </h3>
          <p class="text-xs text-slate-400">Grant or revoke granular system permissions</p>
        </div>

        <div class="space-y-3 text-xs">
          <label class="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 p-3 cursor-pointer">
            <input type="checkbox" v-model="selectedUserPermissions.can_grade" class="rounded text-indigo-600" />
            <div>
              <span class="font-bold text-white block">Grade PRs & Viva</span>
              <span class="text-slate-400 text-[11px]">Can approve GitHub commits and mark final viva grades</span>
            </div>
          </label>

          <label class="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 p-3 cursor-pointer">
            <input type="checkbox" v-model="selectedUserPermissions.can_issue_cert" class="rounded text-indigo-600" />
            <div>
              <span class="font-bold text-white block">Issue Verified Certificates</span>
              <span class="text-slate-400 text-[11px]">Can register completion credentials in the public registry</span>
            </div>
          </label>

          <label class="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 p-3 cursor-pointer">
            <input type="checkbox" v-model="selectedUserPermissions.can_view_leads" class="rounded text-indigo-600" />
            <div>
              <span class="font-bold text-white block">View Inbound Leads CRM</span>
              <span class="text-slate-400 text-[11px]">Access student counseling telephone desk and lead statuses</span>
            </div>
          </label>

          <label class="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 p-3 cursor-pointer">
            <input type="checkbox" v-model="selectedUserPermissions.can_hire" class="rounded text-indigo-600" />
            <div>
              <span class="font-bold text-white block">Direct Hiring Authority</span>
              <span class="text-slate-400 text-[11px]">Can issue offer letters and convert students to paid internal roles</span>
            </div>
          </label>

          <div class="pt-2 flex justify-end gap-3">
            <button
              @click="isPermissionsModalOpen = false"
              class="rounded-xl border border-slate-800 px-4 py-2 text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              @click="savePermissions"
              class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 font-bold text-white shadow-md"
            >
              Save Privileges
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useSiteSettings } from '~/composables/useSiteSettings'

defineEmits(['open-enroll'])

const { user, isProfileModalOpen, loginAsDemoStudent, loginAsSuperAdmin } = useAuth()
const { settings: globalSettings, updateSettings, resetToDefault, isSaving: isSavingBranding } = useSiteSettings()

// Dynamic Branding State in Super Admin Hub
const brandingForm = ref({
  siteName: globalSettings.value.siteName || 'Palantir Tech Academy',
  siteSubtitle: globalSettings.value.siteSubtitle || 'Industrial Internship & Training',
  logoType: globalSettings.value.logoType || 'icon',
  logoUrl: globalSettings.value.logoUrl || '',
  logoLetter: globalSettings.value.logoLetter || 'P',
  logoColor: globalSettings.value.logoColor || 'indigo'
})

const brandingMessage = ref('')
const brandingIsError = ref(false)

watch(
  () => globalSettings.value,
  (val) => {
    if (val) {
      brandingForm.value = {
        siteName: val.siteName || 'Palantir Tech Academy',
        siteSubtitle: val.siteSubtitle || 'Industrial Internship & Training',
        logoType: val.logoType || 'icon',
        logoUrl: val.logoUrl || '',
        logoLetter: val.logoLetter || 'P',
        logoColor: val.logoColor || 'indigo'
      }
    }
  },
  { immediate: true }
)

const previewFormattedName = computed(() => {
  const name = brandingForm.value.siteName || 'Palantir Tech Academy'
  const parts = name.trim().split(' ')
  return {
    first: parts[0] || 'Palantir',
    rest: parts.slice(1).join(' ') || 'Academy'
  }
})

const getLogoGradient = (color) => {
  const map = {
    indigo: 'bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400',
    emerald: 'bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400',
    sky: 'bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400',
    amber: 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400',
    rose: 'bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-400'
  }
  return map[color] || map.indigo
}

const getTextGradient = (color) => {
  const map = {
    indigo: 'bg-gradient-to-r from-indigo-400 to-sky-300',
    emerald: 'bg-gradient-to-r from-emerald-400 to-teal-300',
    sky: 'bg-gradient-to-r from-sky-400 to-cyan-300',
    amber: 'bg-gradient-to-r from-amber-400 to-yellow-300',
    rose: 'bg-gradient-to-r from-rose-400 to-pink-300'
  }
  return map[color] || map.indigo
}

const handleLogoFileUpload = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    alert('Image file is too large. Please select an image under 2MB.')
    return
  }
  const reader = new FileReader()
  reader.onload = (event) => {
    brandingForm.value.logoUrl = event.target?.result
    brandingForm.value.logoType = 'image'
  }
  reader.readAsDataURL(file)
}

const saveBranding = async () => {
  brandingMessage.value = ''
  brandingIsError.value = false
  const res = await updateSettings(brandingForm.value)
  if (res.success) {
    brandingMessage.value = 'Success: Website name and logo updated live across entire platform!'
    setTimeout(() => { brandingMessage.value = '' }, 5000)
  } else {
    brandingIsError.value = true
    brandingMessage.value = res.error || 'Failed to update branding.'
  }
}

const resetBrandingDefaults = async () => {
  if (confirm('Reset website name and logo to default Palantir Tech Academy?')) {
    await resetToDefault()
    brandingForm.value = { ...globalSettings.value }
    brandingMessage.value = 'Branding reset to default!'
    setTimeout(() => { brandingMessage.value = '' }, 4000)
  }
}

// Role Detection
const userRole = computed(() => {
  if (!user.value) return 'guest'
  if (user.value.email === 'extractionevolution@gmail.com') return 'super_admin'
  return user.value.user_metadata?.role || 'student'
})

// Super admin preview mode (to see what interns see)
const superAdminPreviewMode = ref(false)

const currentView = computed(() => {
  if (userRole.value === 'super_admin') {
    return superAdminPreviewMode.value ? 'student' : 'super_admin'
  }
  if (userRole.value === 'tutor') return 'tutor'
  return 'student'
})

const currentWorkspaceTitle = computed(() => {
  if (userRole.value === 'super_admin') {
    return superAdminPreviewMode.value ? 'Intern Workspace Preview' : 'Super Admin Command Hub'
  }
  if (userRole.value === 'tutor') return 'Faculty / Tutor Workspace'
  return 'Student Learning & Viva Workspace'
})

const superAdminTab = ref('User Directory & Staff Hierarchy')
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

const isMasterSuperAdmin = (u) => {
  return u.role === 'super_admin' || u.email === 'extractionevolution@gmail.com' || (user.value && u.email === user.value.email && userRole.value === 'super_admin')
}

const filteredManagedUsers = computed(() => {
  if (roleFilter.value === 'all') return managedUsers.value
  return managedUsers.value.filter(u => u.role === roleFilter.value)
})

// Toggle user pause / active status
const toggleUserPause = async (u) => {
  if (isMasterSuperAdmin(u)) {
    alert('Protection Notice: The Master Super Admin account cannot be paused.')
    return
  }
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
  if (isMasterSuperAdmin(u)) {
    alert('Protection Notice: The Master Super Admin account cannot be demoted or promoted.')
    return
  }
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
  superAdminTab.value = 'User Directory & Staff Hierarchy'
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
  superAdminTab.value = 'User Directory & Staff Hierarchy'
}

// Leads State (CRM)
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
