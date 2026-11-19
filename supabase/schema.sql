-- =========================================================
-- PALANTIR TECH ACADEMY - SUPABASE DATABASE SCHEMA
-- =========================================================

-- 1. LEADS TABLE (Captured by AI Chatbot & Website Inquiry Form)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    college_name TEXT,
    branch TEXT,
    current_year TEXT,
    interested_track TEXT NOT NULL, -- e.g., 'Full-Stack Web (Nuxt/Node)' or 'AI/GenAI'
    program_duration TEXT NOT NULL, -- '3 Months' or '6 Months'
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Enrolled', 'Closed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. BATCHES TABLE (Managed by Admin)
CREATE TABLE IF NOT EXISTS public.batches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    batch_code TEXT UNIQUE NOT NULL, -- e.g., 'PTA-2026-FS-01'
    track_name TEXT NOT NULL,
    duration TEXT NOT NULL, -- '3 Months' or '6 Months'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    tutor_name TEXT NOT NULL,
    timing TEXT DEFAULT '6:00 PM - 8:00 PM IST',
    max_capacity INT DEFAULT 30,
    status TEXT DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Ongoing', 'Completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. STUDENTS TABLE (Enrolled College Interns)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    enrollment_no TEXT UNIQUE NOT NULL, -- e.g., 'PTA2026001'
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    college_name TEXT NOT NULL,
    batch_id UUID REFERENCES public.batches(id) ON DELETE SET NULL,
    attendance_percentage NUMERIC DEFAULT 100.0,
    capstone_project_title TEXT,
    github_repo_url TEXT,
    live_project_url TEXT,
    grade TEXT DEFAULT 'A',
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Graduated', 'Dropped')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CERTIFICATES TABLE (Public Verification Engine)
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    certificate_id TEXT UNIQUE NOT NULL, -- e.g., 'PTA-CERT-2026-8941'
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    college_name TEXT NOT NULL,
    track_name TEXT NOT NULL,
    duration TEXT NOT NULL, -- '3 Months (160 Hours)' or '6 Months (320 Hours)'
    completion_date DATE NOT NULL,
    issue_date DATE DEFAULT CURRENT_DATE,
    grade TEXT DEFAULT 'Distinction',
    capstone_project TEXT NOT NULL,
    project_url TEXT,
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================
-- SEED DEMO DATA FOR IMMEDIATE TESTING
-- =========================================================

-- Insert Sample Batch
INSERT INTO public.batches (batch_code, track_name, duration, start_date, end_date, tutor_name, timing, max_capacity, status)
VALUES 
('PTA-2026-FS-01', 'Full-Stack Web Engineering (Nuxt 3 & Node.js)', '6 Months', '2026-06-01', '2026-11-30', 'Alex Mercer (Lead Architect)', '6:30 PM - 8:30 PM IST', 35, 'Upcoming'),
('PTA-2026-AI-01', 'Applied AI & Generative AI Systems', '3 Months', '2026-06-15', '2026-09-15', 'Dr. Sophia Vance (AI Scientist)', '7:00 PM - 9:00 PM IST', 30, 'Upcoming')
ON CONFLICT (batch_code) DO NOTHING;

-- Insert Sample Verified Certificate (for testing /verify/[id])
INSERT INTO public.certificates (certificate_id, student_name, college_name, track_name, duration, completion_date, grade, capstone_project, project_url)
VALUES 
('PTA-CERT-2026-8941', 'Aarav Mehta', 'Delhi Technological University (DTU)', 'Full-Stack Web Engineering', '6 Months (320 Industrial Hours)', '2026-05-15', 'Distinction (Grade A+)', 'Enterprise Multi-Tenant SaaS with Nuxt 3 & Supabase', 'https://github.com/palantir-tech/sample-capstone')
ON CONFLICT (certificate_id) DO NOTHING;

-- Insert Sample Inbound Lead
INSERT INTO public.leads (full_name, email, phone, college_name, branch, current_year, interested_track, program_duration, status, notes)
VALUES 
('Rohan Verma', 'rohan.verma@example.com', '+91 9876543210', 'VIT Vellore', 'Computer Science & Engineering', '3rd Year', 'Full-Stack Web (Nuxt/Node)', '6 Months', 'New', 'Wants university project NOC and syllabus breakdown.')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Allow public read on certificates for verification portal
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);

-- Allow public to insert leads from the website & chatbot
CREATE POLICY "Public Insert Leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Allow public read on batches to display upcoming cohorts on website
CREATE POLICY "Public Read Batches" ON public.batches FOR SELECT USING (true);
