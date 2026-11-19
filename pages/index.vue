<template>
  <div class="relative overflow-hidden">
    <!-- Ambient Background Glows -->
    <div class="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 bg-gradient-to-b from-indigo-500/20 via-sky-500/10 to-transparent blur-3xl"></div>

    <!-- ==================== HERO SECTION ==================== -->
    <section class="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 text-center">
      <!-- Announcement Pill -->
      <div class="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs text-indigo-300 shadow-sm backdrop-blur-md mb-6">
        <span class="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="font-medium">2026 College Batch Admissions Open</span>
        <span class="text-slate-500">•</span>
        <span class="text-slate-400">100% University Semester Compliant</span>
      </div>

      <!-- Main Headline -->
      <h1 class="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
        Industrial Software Internship & <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-300">College Training Center</span>
      </h1>

      <p class="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
        Stop watching outdated tutorials. Build production SaaS systems with senior engineering leads, complete mandatory university projects, and earn verifiable cryptographic credentials.
      </p>

      <!-- CTAs -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          @click="$emit('open-enroll')"
          class="rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:to-sky-400 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Enroll for 2026 Batch →
        </button>
        <NuxtLink
          to="/portal"
          class="rounded-xl border border-slate-800 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
        >
          Explore Role Portals (Admin/Tutor/Student)
        </NuxtLink>
      </div>

      <!-- Trust Badges Grid -->
      <div class="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl mx-auto text-left">
        <div class="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
          <div class="text-2xl font-bold text-white">320 Hrs</div>
          <div class="text-xs text-slate-400 mt-0.5">Hands-on Industrial Code</div>
        </div>
        <div class="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
          <div class="text-2xl font-bold text-emerald-400">100%</div>
          <div class="text-xs text-slate-400 mt-0.5">University Project Approval</div>
        </div>
        <div class="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
          <div class="text-2xl font-bold text-indigo-400">1-on-1</div>
          <div class="text-xs text-slate-400 mt-0.5">Senior Tech Lead Reviews</div>
        </div>
        <div class="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
          <div class="text-2xl font-bold text-sky-400">QR Verified</div>
          <div class="text-xs text-slate-400 mt-0.5">Permanent Public Certificates</div>
        </div>
      </div>
    </section>

    <!-- ==================== 3-MONTH VS 6-MONTH COMPARISON ==================== -->
    <section id="programs" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-400">Tailored for College Cycles</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Choose Your Industrial Program
        </p>
        <p class="mt-3 text-sm text-slate-400">
          Whether you need a quick summer skill upgrade or a mandatory 6-month final-semester internship, we have you covered.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <!-- 3-Month Fast-Track Card -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-7 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div class="flex items-center justify-between">
              <span class="rounded-lg bg-indigo-950/80 border border-indigo-800/50 px-2.5 py-1 text-xs font-semibold text-indigo-300">
                Summer / Winter Breaks
              </span>
              <span class="text-xs text-slate-400">2nd & 3rd Year</span>
            </div>
            <h3 class="mt-4 text-2xl font-bold text-white">3-Month Fast-Track</h3>
            <p class="mt-1 text-xs text-slate-400 leading-relaxed">
              Rapid project-based mastery. Learn the core stack, ship an end-to-end capstone application, and build an exceptional GitHub portfolio.
            </p>

            <div class="mt-6 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-white">₹14,999</span>
              <span class="text-xs text-slate-400 line-through">₹18,000</span>
              <span class="text-xs text-emerald-400 font-medium">Early Bird</span>
            </div>

            <ul class="mt-6 space-y-3 text-xs sm:text-sm text-slate-300">
              <li class="flex items-center gap-2.5">
                <span class="text-indigo-400">✓</span> 160 Total Training & Project Hours
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-indigo-400">✓</span> 1 Production-Grade Capstone Project
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-indigo-400">✓</span> Verified Completion Certificate & LinkedIn Credential
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-indigo-400">✓</span> Bi-weekly Mentor PR & Code Reviews
              </li>
              <li class="flex items-center gap-2.5 text-slate-500">
                <span>—</span> University Final Semester Project Dossier (6-Month only)
              </li>
            </ul>
          </div>

          <button
            @click="$emit('open-enroll')"
            class="mt-8 w-full rounded-xl border border-indigo-600/60 bg-indigo-950/40 py-3 text-xs sm:text-sm font-semibold text-indigo-200 hover:bg-indigo-600 hover:text-white transition-all"
          >
            Apply for 3-Month Track
          </button>
        </div>

        <!-- 6-Month Flagship Card (Featured) -->
        <div class="relative rounded-2xl border-2 border-indigo-500 bg-gradient-to-b from-slate-900 via-indigo-950/30 to-slate-900 p-7 flex flex-col justify-between shadow-xl shadow-indigo-500/10">
          <div class="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 px-3 py-0.5 text-[11px] font-bold text-white shadow-md uppercase tracking-wider">
            Flagship Semester Program
          </div>

          <div>
            <div class="flex items-center justify-between">
              <span class="rounded-lg bg-sky-950/80 border border-sky-800/50 px-2.5 py-1 text-xs font-semibold text-sky-300">
                Final Year Semester Training
              </span>
              <span class="text-xs text-slate-400">7th & 8th Sem</span>
            </div>
            <h3 class="mt-4 text-2xl font-bold text-white">6-Month Comprehensive</h3>
            <p class="mt-1 text-xs text-slate-400 leading-relaxed">
              Mandatory industrial training program designed to fulfill university guidelines. Includes documentation kits, live client architecture, and placement coaching.
            </p>

            <div class="mt-6 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-white">₹24,999</span>
              <span class="text-xs text-slate-400 line-through">₹32,000</span>
              <span class="text-xs text-emerald-400 font-medium">3-Month No-Cost EMI Available</span>
            </div>

            <ul class="mt-6 space-y-3 text-xs sm:text-sm text-slate-200">
              <li class="flex items-center gap-2.5">
                <span class="text-sky-400 font-bold">✓</span> 320 Industrial Hours (Meets University Criteria)
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-sky-400 font-bold">✓</span> <strong>University Project Kit:</strong> Report, Synopsis, Viva Deck & NOC
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-sky-400 font-bold">✓</span> 2 Enterprise Projects (1 Simulated Live Client Product)
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-sky-400 font-bold">✓</span> Letter of Recommendation (LOR) for Top Performers
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-sky-400 font-bold">✓</span> Mock Technical Interviews & Placement Assistance
              </li>
            </ul>
          </div>

          <button
            @click="$emit('open-enroll')"
            class="mt-8 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-sky-400 transition-all"
          >
            Apply for 6-Month Flagship
          </button>
        </div>
      </div>

      <!-- Group Discount Banner -->
      <div class="mt-10 max-w-5xl mx-auto rounded-xl border border-indigo-900/50 bg-indigo-950/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div class="flex items-center gap-3">
          <div class="text-2xl">👥</div>
          <div>
            <h4 class="text-sm font-bold text-white">"Study With Friends" Group Scholarship</h4>
            <p class="text-xs text-slate-400">Enroll with 2 or more batchmates from your college and get an instant <strong>15% group discount</strong> on all tracks.</p>
          </div>
        </div>
        <button @click="$emit('open-enroll')" class="whitespace-nowrap rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-colors">
          Claim Group Discount
        </button>
      </div>
    </section>

    <!-- ==================== CURRICULUM TRACKS ==================== -->
    <section id="curriculum" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-slate-900">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-400">High-Demand Engineering Tracks</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What You Will Master
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Track 1: Full-Stack Web -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-4">
            <div class="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">🌐</div>
            <div>
              <h3 class="text-xl font-bold text-white">Full-Stack Modern Web Engineering</h3>
              <p class="text-xs text-slate-400">Nuxt 3 • Vue 3 • TypeScript • Node.js • Supabase • Docker</p>
            </div>
          </div>

          <div class="space-y-4 text-xs sm:text-sm text-slate-300">
            <div class="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
              <span class="font-semibold text-white block mb-1">Phase 1: Modern Frontend Architecture</span>
              <p class="text-xs text-slate-400">Vue 3 Composition API, Nuxt 3 SSR, Pinia state management, Tailwind CSS, component patterns.</p>
            </div>
            <div class="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
              <span class="font-semibold text-white block mb-1">Phase 2: High-Performance Backend & Databases</span>
              <p class="text-xs text-slate-400">Nitro server routes, PostgreSQL schema design, Supabase Auth & RLS security, REST APIs.</p>
            </div>
            <div class="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
              <span class="font-semibold text-white block mb-1">Phase 3: DevOps & Enterprise Capstone</span>
              <p class="text-xs text-slate-400">Docker containerization, GitHub Actions CI/CD pipelines, multi-tenant SaaS deployment on Vercel.</p>
            </div>
          </div>
        </div>

        <!-- Track 2: AI & GenAI Systems -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-4">
            <div class="h-10 w-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg">🤖</div>
            <div>
              <h3 class="text-xl font-bold text-white">Applied AI & Generative AI Systems</h3>
              <p class="text-xs text-slate-400">Python • PyTorch • Gemini 2.0 API • RAG • Vector DBs • LangChain</p>
            </div>
          </div>

          <div class="space-y-4 text-xs sm:text-sm text-slate-300">
            <div class="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
              <span class="font-semibold text-white block mb-1">Phase 1: Python Engineering & Core ML</span>
              <p class="text-xs text-slate-400">NumPy, Pandas, Scikit-Learn pipelines, regression, classification, data validation & feature engineering.</p>
            </div>
            <div class="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
              <span class="font-semibold text-white block mb-1">Phase 2: LLMs, Prompt Engineering & Agents</span>
              <p class="text-xs text-slate-400">Google Gemini API integration, multimodal vision models, structured outputs, function calling & tools.</p>
            </div>
            <div class="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
              <span class="font-semibold text-white block mb-1">Phase 3: Production RAG & MLOps</span>
              <p class="text-xs text-slate-400">Vector search (Chroma / Pinecone), hybrid embeddings, chunking strategies, FastAPI serving, Streamlit/Nuxt UI.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== VERIFICATION ENGINE SHOWCASE ==================== -->
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-slate-900">
      <div class="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl">
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Public Trust & University Verification</span>
        <h3 class="mt-2 text-2xl sm:text-3xl font-bold text-white">
          Every Certificate Has a Tamper-Proof Public Verification URL
        </h3>
        <p class="mt-3 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Employers and college professors can scan the QR code on your certificate to instantly verify your project repo, duration, and grade.
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
            class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors"
          >
            Verify Now
          </button>
        </div>
        <p class="mt-2 text-[11px] text-slate-500">
          Try demo code: <span class="text-indigo-400 font-mono cursor-pointer" @click="verifyCode = 'PTA-CERT-2026-8941'">PTA-CERT-2026-8941</span>
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

const navigateToVerify = () => {
  if (verifyCode.value.trim()) {
    router.push(`/verify/${verifyCode.value.trim()}`)
  }
}
</script>
