<template>
  <div class="relative overflow-hidden bg-slate-950 bg-grid-pattern">
    <!-- Ambient Radial Glows -->
    <div class="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-gradient-to-b from-indigo-500/15 via-sky-500/10 to-transparent blur-3xl"></div>

    <!-- ==================== HERO SECTION ==================== -->
    <section class="mx-auto max-w-7xl px-4 pt-20 pb-20 sm:px-6 lg:px-8 text-center relative">
      <!-- Top Announcement Pill -->
      <div class="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-950/60 px-4 py-1.5 text-xs text-indigo-300 shadow-lg shadow-indigo-500/10 backdrop-blur-xl mb-6">
        <span class="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="font-bold tracking-wide">2026 Batch Admissions Open</span>
        <span class="text-slate-600">•</span>
        <span class="text-slate-300 font-medium">100% University Semester Compliant</span>
      </div>

      <!-- Main Headline -->
      <h1 class="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl text-white leading-tight">
        Industrial Software Internship & <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300">
          College Training Center
        </span>
      </h1>

      <p class="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
        Bridge the gap between academic theory and enterprise engineering. Build production SaaS systems with senior architects, fulfill university 8th semester requirements, and receive verifiable cryptographic credentials.
      </p>

      <!-- Action CTAs -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          @click="$emit('open-enroll')"
          class="rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:to-sky-400 transition-all hover:scale-105 active:scale-95"
        >
          Apply for 2026 Batch →
        </button>
        <NuxtLink
          to="/portal"
          class="rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 px-7 py-3.5 text-sm font-semibold text-slate-200 transition-colors shadow-sm"
        >
          Explore Role Portals (Admin / Tutor / Student)
        </NuxtLink>
      </div>

      <!-- Live Enterprise Tech Stack Bar -->
      <div class="mt-14 max-w-3xl mx-auto pt-6 border-t border-slate-900 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-400">
        <span class="flex items-center gap-2">🟢 Nuxt 3 / Vue 3</span>
        <span class="flex items-center gap-2">⚡ Nitro Server</span>
        <span class="flex items-center gap-2">🐘 Supabase / PostgreSQL</span>
        <span class="flex items-center gap-2">🤖 Gemini 3.8 AI</span>
        <span class="flex items-center gap-2">🐳 Docker & CI/CD</span>
      </div>

      <!-- Metrics Ribbon -->
      <div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl mx-auto text-left">
        <div class="glass-panel rounded-2xl p-5 border border-slate-800">
          <div class="text-3xl font-extrabold text-white">320 Hrs</div>
          <div class="text-xs text-slate-400 mt-1">Live Industrial Engineering</div>
        </div>
        <div class="glass-panel rounded-2xl p-5 border border-slate-800">
          <div class="text-3xl font-extrabold text-emerald-400">100%</div>
          <div class="text-xs text-slate-400 mt-1">University Project Compliance</div>
        </div>
        <div class="glass-panel rounded-2xl p-5 border border-slate-800">
          <div class="text-3xl font-extrabold text-indigo-400">1-on-1</div>
          <div class="text-xs text-slate-400 mt-1">Senior Tech Lead Code Audits</div>
        </div>
        <div class="glass-panel rounded-2xl p-5 border border-slate-800">
          <div class="text-3xl font-extrabold text-sky-400">QR Ledger</div>
          <div class="text-xs text-slate-400 mt-1">Publicly Verifiable Credentials</div>
        </div>
      </div>
    </section>

    <!-- ==================== 3-MONTH VS 6-MONTH COMPARISON ==================== -->
    <section id="programs" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-14">
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Academically Calibrated Programs</span>
        <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Choose Your Industrial Program
        </h2>
        <p class="mt-3 text-sm text-slate-400">
          Designed specifically to sync with engineering college breaks and mandatory final-year semester requirements.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <!-- 3-Month Fast-Track -->
        <div class="glass-panel rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div>
            <div class="flex items-center justify-between">
              <span class="rounded-xl bg-indigo-950/80 border border-indigo-800/60 px-3 py-1 text-xs font-bold text-indigo-300">
                Summer / Winter Breaks
              </span>
              <span class="text-xs text-slate-400 font-medium">2nd & 3rd Year</span>
            </div>
            <h3 class="mt-5 text-2xl font-bold text-white">3-Month Fast-Track</h3>
            <p class="mt-1 text-xs text-slate-400 leading-relaxed">
              Rapid project delivery. Master the core stack, ship an end-to-end production SaaS product, and build a competitive GitHub portfolio.
            </p>

            <div class="mt-6 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-white">₹14,999</span>
              <span class="text-xs text-slate-500 line-through">₹18,000</span>
              <span class="text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded-md">Early Bird</span>
            </div>

            <ul class="mt-6 space-y-3.5 text-xs sm:text-sm text-slate-300">
              <li class="flex items-center gap-3">
                <span class="text-indigo-400 font-bold">✓</span> 160 Total Training & Project Hours
              </li>
              <li class="flex items-center gap-3">
                <span class="text-indigo-400 font-bold">✓</span> 1 Production-Grade SaaS Capstone
              </li>
              <li class="flex items-center gap-3">
                <span class="text-indigo-400 font-bold">✓</span> Verified Completion Certificate & LinkedIn Credential
              </li>
              <li class="flex items-center gap-3">
                <span class="text-indigo-400 font-bold">✓</span> Bi-weekly Mentor PR & Code Reviews
              </li>
              <li class="flex items-center gap-3 text-slate-500">
                <span>—</span> Final University Semester Thesis Kit (Included in 6-Month)
              </li>
            </ul>
          </div>

          <button
            @click="$emit('open-enroll')"
            class="mt-8 w-full rounded-xl border border-indigo-500/50 bg-indigo-950/50 py-3 text-xs sm:text-sm font-bold text-indigo-200 hover:bg-indigo-600 hover:text-white transition-all shadow-md"
          >
            Apply for 3-Month Fast-Track
          </button>
        </div>

        <!-- 6-Month Flagship (Featured) -->
        <div class="glass-panel-glow relative rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
          <div class="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 px-3.5 py-1 text-[11px] font-extrabold text-white shadow-md uppercase tracking-wider">
            Flagship Semester Program
          </div>

          <div>
            <div class="flex items-center justify-between">
              <span class="rounded-xl bg-sky-950/80 border border-sky-800/60 px-3 py-1 text-xs font-bold text-sky-300">
                Final Year Semester Training
              </span>
              <span class="text-xs text-slate-400 font-medium">7th & 8th Sem</span>
            </div>
            <h3 class="mt-5 text-2xl font-bold text-white">6-Month Comprehensive</h3>
            <p class="mt-1 text-xs text-slate-300 leading-relaxed">
              Mandatory industrial training program designed to fulfill university guidelines. Includes documentation kits, live client architecture, and placement coaching.
            </p>

            <div class="mt-6 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-white">₹24,999</span>
              <span class="text-xs text-slate-500 line-through">₹32,000</span>
              <span class="text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded-md">3-Month No-Cost EMI</span>
            </div>

            <ul class="mt-6 space-y-3.5 text-xs sm:text-sm text-slate-200">
              <li class="flex items-center gap-3">
                <span class="text-sky-400 font-bold">✓</span> 320 Industrial Hours (Meets University Criteria)
              </li>
              <li class="flex items-center gap-3">
                <span class="text-sky-400 font-bold">✓</span> <strong>University Project Kit:</strong> IEEE Thesis, Synopsis & Viva Deck
              </li>
              <li class="flex items-center gap-3">
                <span class="text-sky-400 font-bold">✓</span> 2 Enterprise Projects (1 Simulated Live Client Product)
              </li>
              <li class="flex items-center gap-3">
                <span class="text-sky-400 font-bold">✓</span> Letter of Recommendation (LOR) for Top Performers
              </li>
              <li class="flex items-center gap-3">
                <span class="text-sky-400 font-bold">✓</span> Mock Technical System Design & Placement Coaching
              </li>
            </ul>
          </div>

          <button
            @click="$emit('open-enroll')"
            class="mt-8 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:to-sky-400 transition-all"
          >
            Apply for 6-Month Flagship
          </button>
        </div>
      </div>

      <!-- Group Discount Banner -->
      <div class="mt-10 max-w-5xl mx-auto rounded-2xl border border-indigo-900/60 bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-indigo-950/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div class="flex items-center gap-3.5">
          <div class="text-3xl">👥</div>
          <div>
            <h4 class="text-sm font-bold text-white">"Study With Friends" Group Scholarship</h4>
            <p class="text-xs text-slate-400">Enroll with 2 or more friends from your college and get an instant <strong>15% group scholarship</strong> on any track.</p>
          </div>
        </div>
        <button @click="$emit('open-enroll')" class="whitespace-nowrap rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-colors">
          Claim Group Discount
        </button>
      </div>

      <!-- Interactive Merit Scholarship & Fee Calculator -->
      <div class="mt-14">
        <ScholarshipCalculator @open-enroll="$emit('open-enroll')" />
      </div>
    </section>

    <!-- ==================== INTERACTIVE SYLLABUS EXPLORER ==================== -->
    <section id="curriculum" class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-slate-900">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Production-Grade Engineering</span>
        <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Week-by-Week Curriculum Architecture
        </h2>
        <p class="mt-3 text-sm text-slate-400">
          Select a phase to explore the exact skills, architectures, and capstone deliverables.
        </p>

        <!-- Phase Tabs -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            v-for="(phase, i) in syllabusPhases"
            :key="i"
            @click="activePhase = i"
            :class="[
              'rounded-xl px-4 py-2 text-xs font-bold transition-all',
              activePhase === i
                ? 'bg-indigo-600 text-white shadow-md'
                : 'glass-panel text-slate-400 hover:text-white'
            ]"
          >
            {{ phase.tab }}
          </button>
        </div>
      </div>

      <!-- Active Phase Card -->
      <div class="glass-panel-glow max-w-4xl mx-auto rounded-3xl p-8 space-y-6">
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span class="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              {{ syllabusPhases[activePhase].duration }}
            </span>
            <h3 class="text-2xl font-bold text-white mt-1">{{ syllabusPhases[activePhase].title }}</h3>
          </div>
          <span class="rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-mono text-emerald-400">
            {{ syllabusPhases[activePhase].hours }}
          </span>
        </div>

        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {{ syllabusPhases[activePhase].description }}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div
            v-for="(topic, idx) in syllabusPhases[activePhase].topics"
            :key="idx"
            class="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 text-xs flex items-start gap-2.5"
          >
            <span class="text-indigo-400 font-bold">●</span>
            <span class="text-slate-200">{{ topic }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== VERIFICATION ENGINE SHOWCASE ==================== -->
    <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-slate-900">
      <div class="glass-panel-glow rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl">
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">University & Employer Accreditation</span>
        <h3 class="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
          Every Certificate Has a Tamper-Proof Public Verification URL
        </h3>
        <p class="mt-3 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          College evaluators and recruiters can scan the certificate's QR code to review your verified project repo, completed hours, and grade.
        </p>

        <!-- Live Lookup Input Box -->
        <div class="mt-8 max-w-md mx-auto flex items-center gap-2">
          <input
            v-model="verifyCode"
            placeholder="e.g. PTA-CERT-2026-8941"
            class="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
          <button
            @click="navigateToVerify"
            class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors shadow-md"
          >
            Verify Now
          </button>
        </div>
        <p class="mt-2 text-[11px] text-slate-500">
          Try sample certificate: <span class="text-indigo-400 font-mono cursor-pointer underline" @click="verifyCode = 'PTA-CERT-2026-8941'">PTA-CERT-2026-8941</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineEmits(['open-enroll'])

const router = useRouter()
const verifyCode = ref('PTA-CERT-2026-8941')
const activePhase = ref(0)

const navigateToVerify = () => {
  if (verifyCode.value.trim()) {
    router.push(`/verify/${verifyCode.value.trim()}`)
  }
}

const syllabusPhases = [
  {
    tab: 'Weeks 1-4: Advanced Modern JS & TS',
    duration: 'Month 1',
    hours: '60 Industrial Hours',
    title: 'Advanced JavaScript & TypeScript Architecture',
    description: 'Deep dive into asynchronous memory management, Promises, event loop, TypeScript generics, structural typing, and clean code architecture.',
    topics: [
      'ESNext Modern Features & Memory Management',
      'TypeScript Generics, Union Types & Interfaces',
      'Async Queues, Concurrency & Stream Processing',
      'Clean Code Principles & Architectural Patterns'
    ]
  },
  {
    tab: 'Weeks 5-8: Frontend (Nuxt 3 & Vue 3)',
    duration: 'Month 2',
    hours: '70 Industrial Hours',
    title: 'Enterprise Frontend Architecture with Nuxt 3',
    description: 'Master reactive state, server-side rendering (SSR), Pinia stores, composition APIs, and performant Tailwind component design.',
    topics: [
      'Vue 3 Composition API & Reactive State Patterns',
      'Nuxt 3 SSR, Hybrid Rendering & Route Middleware',
      'Pinia Store Architecture & Persistent States',
      'Tailwind CSS Systems & Responsive Design'
    ]
  },
  {
    tab: 'Weeks 9-12: Backend & Supabase (PostgreSQL)',
    duration: 'Month 3',
    hours: '70 Industrial Hours',
    title: 'High-Performance Nitro Backend & Supabase',
    description: 'Design relational database schemas, write secure Row Level Security (RLS) policies, JWT auth guards, and scalable REST API endpoints.',
    topics: [
      'Nitro Server Routes & Web Standard Streams',
      'PostgreSQL Relational Design & Indexing',
      'Supabase Auth, RBAC & Row Level Security (RLS)',
      'Token Bucket Rate Limiting & OWASP Top 10'
    ]
  },
  {
    tab: 'Weeks 13-16: DevOps & Cloud Deployment',
    duration: 'Month 4',
    hours: '60 Industrial Hours',
    title: 'Containerization, CI/CD & Cloud Orchestration',
    description: 'Package applications into Docker containers, write automated GitHub Actions CI/CD pipelines, and configure production edge deployment.',
    topics: [
      'Docker Containerization & Multi-Stage Builds',
      'GitHub Actions Automated Testing & Linting CI',
      'Redis Caching & Background BullMQ Task Queues',
      'Production Edge Hosting on Vercel'
    ]
  },
  {
    tab: 'Weeks 17-24: Live Capstone & College Viva',
    duration: 'Months 5 & 6',
    hours: '80 Industrial Hours',
    title: 'Live Enterprise Capstone & College Viva Defense',
    description: 'Build a multi-tenant production system with senior code reviews, generate your IEEE final project thesis, and defend at college viva.',
    topics: [
      'Collaborative Multi-Tenant Client Application',
      'Bi-Weekly Pull Request Audits with Senior Tech Leads',
      'IEEE 60-Page Final College Project Documentation',
      'External Viva Voce Defense Deck Preparation'
    ]
  }
]
</script>
