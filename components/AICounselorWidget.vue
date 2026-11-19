<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col items-end">
    <!-- Chat Window Container -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="isOpen"
        class="mb-3 w-[92vw] sm:w-[410px] h-[550px] max-h-[82vh] rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-slate-100"
      >
        <!-- Chat Header -->
        <div class="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 font-bold text-white shadow-md shadow-indigo-500/20 text-sm">
              <span>P</span>
              <span class="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-400"></span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-sm text-white">Nova AI</span>
                <span class="rounded bg-indigo-950 border border-indigo-800/60 px-1.5 py-0.2 text-[10px] font-medium text-indigo-300">
                  Admissions
                </span>
              </div>
              <p class="text-[11px] text-slate-400 flex items-center gap-1">
                <span>Palantir Tech Counselor</span> • <span class="text-emerald-400">Online</span>
              </p>
            </div>
          </div>

          <div class="flex items-center gap-1">
            <button
              @click="clearChat"
              title="Clear conversation"
              class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              @click="isOpen = false"
              class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Chat Messages Area -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-3 text-xs sm:text-sm">
          <!-- Welcome card if messages are empty -->
          <div v-if="messages.length === 0" class="space-y-3">
            <div class="rounded-xl border border-indigo-900/40 bg-indigo-950/20 p-3.5 text-slate-300 space-y-2">
              <p class="font-medium text-white flex items-center gap-1.5">
                👋 Hello! Welcome to Palantir Tech Academy.
              </p>
              <p class="text-xs text-slate-400 leading-relaxed">
                I am your 24/7 admissions assistant. Ask me anything about our <strong>3-Month & 6-Month Industrial Internships</strong>, syllabi, university project documentation, and group scholarships!
              </p>
            </div>

            <div class="space-y-1.5 pt-1">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Popular Questions:</span>
              <div class="flex flex-col gap-1.5">
                <button
                  v-for="(chip, idx) in promptChips"
                  :key="idx"
                  @click="sendPrompt(chip)"
                  class="text-left rounded-lg border border-slate-800 bg-slate-800/60 hover:bg-slate-800 px-3 py-2 text-xs text-slate-300 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>{{ chip }}</span>
                  <span class="text-indigo-400">→</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Message bubbles -->
          <div
            v-for="(m, i) in messages"
            :key="i"
            :class="m.role === 'user' ? 'flex justify-end' : 'flex justify-start'"
          >
            <div
              :class="[
                'max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed',
                m.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-sm'
              ]"
            >
              <div class="whitespace-pre-wrap" v-html="formatMessage(m.content)"></div>
            </div>
          </div>

          <!-- Loading indicator -->
          <div v-if="isLoading" class="flex justify-start">
            <div class="bg-slate-800/90 text-slate-400 border border-slate-700/60 rounded-2xl rounded-bl-none px-4 py-2 flex items-center gap-1.5 text-xs">
              <span class="h-2 w-2 rounded-full bg-indigo-400 animate-ping"></span>
              <span>Nova is typing...</span>
            </div>
          </div>
        </div>

        <!-- Quick Lead Form Prompt Overlay when intent is detected -->
        <div v-if="showLeadCaptureNotice" class="border-t border-indigo-900/50 bg-indigo-950/40 px-3.5 py-2 flex items-center justify-between text-xs text-indigo-300">
          <span>✨ Inquiring about syllabus or admission?</span>
          <button @click="$emit('open-enroll')" class="underline font-semibold hover:text-white">
            Fast Apply Here
          </button>
        </div>

        <!-- Message Input Bar -->
        <form @submit.prevent="handleSend" class="border-t border-slate-800 bg-slate-950/90 p-3">
          <div class="flex items-center gap-2">
            <input
              v-model="inputQuery"
              placeholder="Ask about syllabus, fees, or university NOC..."
              :disabled="isLoading"
              class="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
            />
            <button
              type="submit"
              :disabled="isLoading || !inputQuery.trim()"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </Transition>

    <!-- Floating Action Button -->
    <button
      @click="isOpen = !isOpen"
      class="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
    >
      <span v-if="!isOpen" class="relative flex h-full w-full items-center justify-center">
        <!-- Chat Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <!-- Ping Badge -->
        <span class="absolute -top-1 -right-1 flex h-4 w-4">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-4 w-4 bg-indigo-500 border-2 border-slate-950"></span>
        </span>
      </span>

      <!-- Close Icon when open -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

defineEmits(['open-enroll'])

const isOpen = ref(false)
const inputQuery = ref('')
const isLoading = ref(false)
const chatContainer = ref(null)
const showLeadCaptureNotice = ref(false)

const promptChips = [
  'What is in the 6-Month Full-Stack syllabus?',
  'How does 100% University Approval work?',
  'What are the fees, EMI & group discounts?',
  'How do we get verified certificates?'
]

const messages = ref([])

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

watch(messages, () => {
  scrollToBottom()
}, { deep: true })

const sendPrompt = (text) => {
  inputQuery.value = text
  handleSend()
}

const handleSend = async () => {
  const query = inputQuery.value.trim()
  if (!query || isLoading.value) return

  // Append user message
  messages.value.push({ role: 'user', content: query })
  inputQuery.value = ''
  isLoading.value = true

  // Check if query sounds like contact info or high intent
  if (query.includes('@') || query.match(/\d{10}/) || query.toLowerCase().includes('fee') || query.toLowerCase().includes('syllabus')) {
    showLeadCaptureNotice.value = true
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages.value })
    })

    if (!response.ok) throw new Error('Network error')

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let assistantMsg = { role: 'assistant', content: '' }
    messages.value.push(assistantMsg)

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      // Parse data stream protocol: 0:"token" or plain text
      const lines = chunk.split('\n')
      for (const line of lines) {
        if (line.startsWith('0:')) {
          try {
            const token = JSON.parse(line.substring(2))
            assistantMsg.content += token
          } catch (e) {
            assistantMsg.content += line.substring(2)
          }
        } else if (!line.startsWith('d:') && !line.startsWith('e:')) {
          assistantMsg.content += line
        }
      }
      scrollToBottom()
    }
  } catch (err) {
    messages.value.push({
      role: 'assistant',
      content: 'I am currently processing high volume of admissions inquiries. Please feel free to click **Fast Apply** or ask about our upcoming batches!'
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

const clearChat = () => {
  messages.value = []
  showLeadCaptureNotice.value = false
}

const formatMessage = (text) => {
  if (!text) return ''
  // Basic markdown formatting for bold and lists
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
}
</script>
