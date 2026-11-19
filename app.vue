<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
    <!-- Navigation Bar -->
    <Navbar @open-enroll="isEnrollModalOpen = true" />

    <!-- Main Page Router View -->
    <main class="flex-1">
      <NuxtPage @open-enroll="isEnrollModalOpen = true" />
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isEnrollModalOpen = ref(false)
</script>

