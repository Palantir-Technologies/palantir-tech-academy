<template>
  <div>
    <!-- Floating Bottom Mobile Install Banner -->
    <Transition name="slide-up">
      <div
        v-if="showBanner"
        class="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 rounded-2xl border border-indigo-500/40 bg-slate-900/95 p-4 shadow-2xl shadow-indigo-950/60 backdrop-blur-xl animate-in fade-in"
      >
        <div class="flex items-start gap-3.5">
          <!-- Icon -->
          <div class="h-11 w-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-0.5 shadow-md flex-shrink-0">
            <div class="h-full w-full rounded-[10px] bg-slate-950 flex items-center justify-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300 text-lg">
              P
            </div>
          </div>

          <!-- Text -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h4 class="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <span>Install Academy App</span>
                <span class="rounded bg-indigo-950 border border-indigo-700/60 px-1.5 py-0.2 text-[9px] font-mono text-indigo-300">PWA</span>
              </h4>
              <button
                @click="dismissBanner"
                class="text-slate-400 hover:text-white p-1 text-xs"
                title="Dismiss"
              >
                ✕
              </button>
            </div>
            <p class="text-[11px] text-slate-300 mt-1 leading-snug">
              Install Palantir Academy on your home screen for 1-tap mobile access to your viva simulator and projects.
            </p>

            <!-- Action buttons -->
            <div class="mt-3 flex items-center gap-2">
              <button
                v-if="canPrompt"
                @click="promptInstall"
                class="rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-600/25 transition-all hover:scale-105"
              >
                📲 Install App
              </button>
              <button
                v-else-if="isIos"
                @click="showIosModal = true"
                class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md transition-all"
              >
                📲 How to Install (iOS)
              </button>
              <button
                @click="dismissBanner"
                class="rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-white"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- iOS Install Guide Modal -->
    <Teleport to="body">
      <div
        v-if="showIosModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        @click.self="showIosModal = false"
      >
        <div class="relative w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              <span>📲 Install on iPhone / iPad</span>
            </h3>
            <button @click="showIosModal = false" class="text-slate-400 hover:text-white">✕</button>
          </div>

          <p class="text-xs text-slate-300 leading-relaxed">
            Follow these 2 simple steps in Safari to add the Palantir Academy app to your home screen:
          </p>

          <div class="space-y-3 text-xs">
            <div class="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <span class="rounded-lg bg-indigo-950 border border-indigo-800 px-2 py-0.5 text-indigo-300 font-bold">1</span>
              <p class="text-slate-200">
                Tap the <strong class="text-white">Share</strong> icon (square with an arrow pointing up <span class="text-indigo-400">⎋ / 📤</span>) at the bottom of Safari.
              </p>
            </div>

            <div class="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <span class="rounded-lg bg-indigo-950 border border-indigo-800 px-2 py-0.5 text-indigo-300 font-bold">2</span>
              <p class="text-slate-200">
                Scroll down and tap <strong class="text-white">'Add to Home Screen'</strong> (➕), then tap <strong class="text-white">'Add'</strong> at top-right.
              </p>
            </div>
          </div>

          <div class="pt-2 flex justify-end">
            <button
              @click="showIosModal = false"
              class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white transition-colors"
            >
              Got It!
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showBanner = ref(false)
const canPrompt = ref(false)
const isIos = ref(false)
const showIosModal = ref(false)
let deferredPrompt = null

onMounted(() => {
  if (process.client) {
    // Check if app is already running standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator).standalone
    if (isStandalone) {
      return // Already installed
    }

    // Check if dismissed recently
    const dismissed = sessionStorage.getItem('pta_pwa_dismissed')
    if (dismissed) return

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase()
    isIos.value = /iphone|ipad|ipod/.test(userAgent)

    // Listen for native install prompt (Android/Chrome/Edge)
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      canPrompt.value = true
      showBanner.value = true
    })

    // On mobile devices, show after brief delay
    if (isIos.value || /android/.test(userAgent)) {
      setTimeout(() => {
        if (!sessionStorage.getItem('pta_pwa_dismissed')) {
          showBanner.value = true
        }
      }, 4000)
    }
  }
})

const promptInstall = async () => {
  if (!deferredPrompt) return
  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  if (outcome === 'accepted') {
    showBanner.value = false
  }
  deferredPrompt = null
  canPrompt.value = false
}

const dismissBanner = () => {
  showBanner.value = false
  if (process.client) {
    sessionStorage.setItem('pta_pwa_dismissed', 'true')
  }
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>

