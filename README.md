# 🎓 Palantir Tech Academy

> **Full-Stack Industrial Training & College Internship Platform with AI Lead-Capture Chatbot & Supabase Backend.**  
> Built with **Nuxt 3**, **Vue 3**, **Tailwind CSS**, **Supabase (PostgreSQL)**, and **Google Gemini 2.0 Flash AI**.

---

## 🌟 Key Features

1. **High-Converting Academy Landing Page:**
   - 3-Month Fast-Track (160 Hours) & 6-Month Flagship (320 Hours) program tracks.
   - Full-Stack Web Engineering (Nuxt 3/Node) & Applied AI/GenAI tracks.
   - 100% University Project compliance, NOC, and semester report support.
   - 15% "Study With Friends" group discount promo.

2. **🤖 24/7 AI Admissions Counselor Chatbot (`Nova AI`):**
   - Floating corner widget built on **Google Gemini 2.0 Flash**.
   - Answers questions regarding syllabus, fees, university approval, and EMI options.
   - Automatically detects contact information (Name, College, WhatsApp, Email) and logs qualified leads into **Supabase**.

3. **📜 Public Tamper-Proof Certificate Verification Engine (`/verify/[id]`):**
   - Publicly accessible endpoint where employers and college evaluators can scan QR codes and inspect verified student projects, grades, and hours.
   - Demo Certificate ID: `PTA-CERT-2026-8941`.

4. **Multi-Role Operations Portal (`/portal`):**
   - **Admin Workspace:** View inbound chatbot leads, manage batches, and issue certificates.
   - **Tutor Workspace:** Classroom launch, code review audits, student PR grading.
   - **Student Workspace:** Progress tracker (85% viva-ready), university project documentation kit (DOCX report, PPTX viva slides, NOC letter).

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your credentials:
```env
GOOGLE_GENERATIVE_AI_API_KEY="your-free-gemini-key" # From https://aistudio.google.com/
SUPABASE_URL="https://your-project.supabase.co"      # From https://app.supabase.com/
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### 3. Initialize Supabase Database
1. Go to your [Supabase Dashboard](https://app.supabase.com/).
2. Open the **SQL Editor**.
3. Copy and paste the contents of `supabase/schema.sql` and click **Run**.
   *(This creates the `leads`, `batches`, `students`, and `certificates` tables with initial seed demo data).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐙 Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new) (e.g., `palantir-tech-academy`).
2. Run the following commands in this directory:
```bash
git init
git add .
git commit -m "feat: initial commit for Palantir Tech Academy platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/palantir-tech-academy.git
git push -u origin main
```

---

## ⚡ Deploy to Vercel

Nuxt 3 is natively optimized for zero-config Vercel deployment:

### Option 1: Via Vercel Web Dashboard (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
2. Select your imported **`palantir-tech-academy`** GitHub repository.
3. In the **Environment Variables** section, add:
   * `GOOGLE_GENERATIVE_AI_API_KEY`
   * `SUPABASE_URL`
   * `SUPABASE_ANON_KEY`
   * `SUPABASE_SERVICE_ROLE_KEY`
4. Click **Deploy**. Vercel will automatically build and publish your site with a live URL (e.g., `palantir-tech-academy.vercel.app`).

### Option 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 📁 Project Structure

```
palantir-tech-academy/
├── assets/
│   └── css/main.css            # Tailwind & global design styles
├── components/
│   ├── AICounselorWidget.vue   # Floating Gemini AI Chatbot with streaming
│   ├── EnrollModal.vue         # Direct student application modal
│   ├── Footer.vue              # Global footer & accreditation
│   └── Navbar.vue              # Top navigation bar
├── pages/
│   ├── index.vue               # Main academy landing page
│   ├── portal.vue              # Admin, Tutor, & Student role dashboard
│   └── verify/
│       └── [id].vue            # Public certificate verification route
├── server/
│   ├── api/
│   │   ├── chat.post.ts        # AI streaming endpoint (Gemini API)
│   │   ├── leads.post.ts       # Direct application submission to Supabase
│   │   └── verify/[id].get.ts  # Certificate lookup API
│   └── utils/
│       ├── academyKnowledge.ts # AI counselor persona, knowledge & rules
│       └── supabase.ts         # Supabase client wrapper & fallbacks
├── supabase/
│   └── schema.sql              # Complete PostgreSQL schema & demo seed
├── nuxt.config.ts              # Nuxt 3 & Tailwind configuration
├── package.json
└── README.md
```

