<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
    <!-- Navigation Bar with Dynamic Branding & Auth State -->
    <Navbar
      @open-enroll="isEnrollModalOpen = true"
      @open-auth="isAuthModalOpen = true"
    />

    <!-- Main Page Router View -->
    <main class="flex-1">
      <NuxtPage
        @open-enroll="isEnrollModalOpen = true"
        @open-auth="isAuthModalOpen = true"
      />
    </main>

    <!-- Global Footer -->
    <Footer />

    <!-- 24/7 AI Counselor Chatbot Widget (Floating at bottom-right) -->
    <AICounselorWidget @open-enroll="isEnrollModalOpen = true" />

    <!-- Application / Lead Capture Modal -->
    <EnrollModal
      :isOpen="isEnrollModalOpen"
      @close="isEnrollModalOpen = false"
    />

    <!-- Student Auth Modal (Google & Email/Password) -->
    <AuthModal />

    <!-- User Profile & Security Settings Modal -->
    <ProfileModal />

    <!-- Mobile Web App Install (PWA) Banner -->
    <MobileInstallBanner />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useSiteSettings } from '~/composables/useSiteSettings'

const isEnrollModalOpen = ref(false)
const { isAuthModalOpen, initAuth } = useAuth()
const { initSettings } = useSiteSettings()

onMounted(() => {
  initAuth()
  initSettings()
})
</script>
