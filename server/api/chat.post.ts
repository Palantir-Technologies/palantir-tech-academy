import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import { PALANTIR_ACADEMY_KNOWLEDGE } from '../utils/academyKnowledge'
import { useServerSupabase } from '../utils/supabase'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)
  const config = useRuntimeConfig()
  const apiKey = config.geminiApiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY

  // Check if student shared contact details (heuristic parser for lead capture)
  const lastUserMsg = messages?.filter((m: any) => m.role === 'user').pop()?.content || ''
  const emailMatch = lastUserMsg.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
  const phoneMatch = lastUserMsg.match(/(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b\d{10}\b/)

  if (emailMatch || phoneMatch) {
    // Asynchronously save lead to Supabase
    try {
      const supabase = useServerSupabase()
      await supabase.from('leads').insert({
        full_name: 'Chatbot Inquirer',
        email: emailMatch ? emailMatch[0] : 'Not specified',
        phone: phoneMatch ? phoneMatch[0] : 'Not specified',
        interested_track: 'Inquired via AI Chatbot',
        program_duration: 'Pending Counseling',
        status: 'New',
        notes: `Extracted from chat message: "${lastUserMsg.substring(0, 300)}"`
      })
    } catch (err) {
      console.warn('Failed to auto-save lead from chat:', err)
    }
  }

  // If Gemini API Key is configured, use live streaming AI
  if (apiKey && apiKey !== 'your-gemini-api-key-here') {
    try {
      const result = streamText({
        model: google('gemini-2.0-flash'),
        system: PALANTIR_ACADEMY_KNOWLEDGE,
        messages,
      })
      return result.toDataStreamResponse()
    } catch (err: any) {
      console.error('Gemini API Error:', err)
      // Fallback to simulated counselor stream below if API call fails
    }
  }

  // Simulated streaming counselor response when running locally without API key configured yet
  const simulatedResponses = [
    `Welcome to **Palantir Tech Academy**! 🚀\n\nWe offer **3-Month Fast-Track** and **6-Month Comprehensive Industrial Internships** in **Full-Stack Web Engineering (Nuxt 3 / Node.js)** and **Applied AI & GenAI Systems**.\n\nOur 6-month program includes **100% university semester project compliance**, verified certification, and live capstone projects.\n\nWhich technical track or duration are you interested in exploring?`,
    `Great choice! In our **6-Month Industrial Program**, you will build two production-grade applications with code reviews from senior engineers. We also provide complete university project documentation (synopsis, report, and viva slides).\n\nFees are ₹24,999 (with a special ₹19,999 college discount and 3-month no-cost EMI).\n\nMay I know your **Name**, **College**, and **WhatsApp number** so I can share the syllabus PDF with you?`,
    `Thank you! I have registered your inquiry with our admissions desk. Our senior academic counselor will reach out via WhatsApp with the detailed syllabus, project list, and scholarship confirmation.\n\nDo you have any questions about our batch timings or certificate verification?`
  ]

  const userMessageCount = messages?.filter((m: any) => m.role === 'user').length || 1
  const replyText = simulatedResponses[Math.min(userMessageCount - 1, simulatedResponses.length - 1)]

  // Return formatted stream compatible with useChat
  const encoder = new TextEncoder()
  const customReadable = new ReadableStream({
    async start(controller) {
      // Data stream protocol format: 0:"text chunk"\n
      const words = replyText.split(' ')
      for (const word of words) {
        controller.enqueue(encoder.encode(`0:${JSON.stringify(word + ' ')}\n`))
        await new Promise((r) => setTimeout(r, 25))
      }
      controller.enqueue(encoder.encode(`d:{"finishReason":"stop"}\n`))
      controller.close()
    }
  })

  return new Response(customReadable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Vercel-AI-Data-Stream': 'v1'
    }
  })
})
