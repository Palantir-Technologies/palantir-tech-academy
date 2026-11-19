-- =========================================================
-- PALANTIR TECH ACADEMY - SUPABASE DATABASE SCHEMA (IDEMPOTENT)
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
    interested_track TEXT NOT NULL,
    program_duration TEXT NOT NULL,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Enrolled', 'Closed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. USER PROFILES & RBAC TABLE
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    auth_id UUID,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'student' CHECK (role IN ('super_admin', 'admin', 'tutor', 'developer', 'employer', 'student')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'suspended')),
    college_name TEXT,
    phone TEXT,
    hired_status TEXT DEFAULT 'not_hired' CHECK (hired_status IN ('not_hired', 'in_interview', 'hired_internal_developer', 'placed_partner_employer')),
    salary_or_stipend TEXT,
    assigned_batch TEXT,
    permissions JSONB DEFAULT '{"can_grade": false, "can_issue_cert": false, "can_view_leads": false, "can_hire": false, "can_manage_users": false}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. BATCHES TABLE
CREATE TABLE IF NOT EXISTS public.batches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    batch_code TEXT UNIQUE NOT NULL,
    track_name TEXT NOT NULL,
    duration TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    tutor_name TEXT NOT NULL,
    timing TEXT DEFAULT '6:00 PM - 8:00 PM IST',
    max_capacity INT DEFAULT 30,
    status TEXT DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Ongoing', 'Completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS public.students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    enrollment_no TEXT UNIQUE NOT NULL,
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
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Graduated', 'Dropped', 'Hired')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    certificate_id TEXT UNIQUE NOT NULL,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    college_name TEXT NOT NULL,
    track_name TEXT NOT NULL,
    duration TEXT NOT NULL,
    completion_date DATE NOT NULL,
    issue_date DATE DEFAULT CURRENT_DATE,
    grade TEXT DEFAULT 'Distinction',
    capstone_project TEXT NOT NULL,
    project_url TEXT,
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. SITE SETTINGS & DYNAMIC BRANDING TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. COURSES & INDUSTRIAL TRAINING CURRICULUM TABLE (30+ COURSES)
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    duration TEXT NOT NULL,
    level TEXT DEFAULT 'Beginner to Advanced',
    description TEXT NOT NULL,
    editor_email TEXT DEFAULT 'extractionevolution@gmail.com',
    editor_name TEXT DEFAULT 'Chief Super Admin',
    enrolled_count INT DEFAULT 0,
    rating NUMERIC DEFAULT 4.9,
    status TEXT DEFAULT 'Published' CHECK (status IN ('Published', 'Draft', 'Archived')),
    badge TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Default Site Branding Seed
INSERT INTO public.site_settings (key, value)
VALUES ('branding', '{"siteName": "Palantir Tech Academy", "siteSubtitle": "Industrial Internship & Training", "logoType": "icon", "logoUrl": "", "logoLetter": "P", "logoColor": "indigo"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- =========================================================
-- SEED MASTER DATA
-- =========================================================

-- Super Admin Master Account (Real Authenticated Owner)
INSERT INTO public.user_profiles (email, full_name, role, status, permissions)
VALUES 
('extractionevolution@gmail.com', 'Chief Super Admin (Palantir)', 'super_admin', 'active', '{"can_grade": true, "can_issue_cert": true, "can_view_leads": true, "can_hire": true, "can_manage_users": true}'::jsonb)
ON CONFLICT (email) DO UPDATE 
SET role = 'super_admin', permissions = '{"can_grade": true, "can_issue_cert": true, "can_view_leads": true, "can_hire": true, "can_manage_users": true}'::jsonb;

-- Sample Batches
INSERT INTO public.batches (batch_code, track_name, duration, start_date, end_date, tutor_name, timing, max_capacity, status)
VALUES 
('PTA-2026-FS-01', 'Full-Stack Web Engineering (Nuxt 3 & Node.js)', '6 Months', '2026-06-01', '2026-11-30', 'Alex Mercer (Lead Architect)', '6:30 PM - 8:30 PM IST', 35, 'Upcoming'),
('PTA-2026-AI-01', 'Applied AI & Generative AI Systems', '3 Months', '2026-06-15', '2026-09-15', 'Dr. Sophia Vance (AI Scientist)', '7:00 PM - 9:00 PM IST', 30, 'Upcoming')
ON CONFLICT (batch_code) DO NOTHING;

-- Sample Verified Certificate
INSERT INTO public.certificates (certificate_id, student_name, college_name, track_name, duration, completion_date, grade, capstone_project, project_url)
VALUES 
('PTA-CERT-2026-8941', 'Aarav Mehta', 'Delhi Technological University (DTU)', 'Full-Stack Web Engineering', '6 Months (320 Industrial Hours)', '2026-05-15', 'Distinction (Grade A+)', 'Enterprise Multi-Tenant SaaS with Nuxt 3 & Supabase', 'https://github.com/palantir-tech/sample-capstone')
ON CONFLICT (certificate_id) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- SAFE IDEMPOTENT POLICIES (Drop if exists first to avoid error 42710)
DROP POLICY IF EXISTS "Public Read Courses" ON public.courses;
CREATE POLICY "Public Read Courses" ON public.courses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Manage Courses" ON public.courses;
CREATE POLICY "Public Manage Courses" ON public.courses FOR ALL USING (true);

DROP POLICY IF EXISTS "Public Read Site Settings" ON public.site_settings;
CREATE POLICY "Public Read Site Settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Upsert Site Settings" ON public.site_settings;
CREATE POLICY "Public Upsert Site Settings" ON public.site_settings FOR ALL USING (true);

-- SAFE IDEMPOTENT POLICIES (Drop if exists first to avoid error 42710)
DROP POLICY IF EXISTS "Public Read Certificates" ON public.certificates;
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Leads" ON public.leads;
CREATE POLICY "Public Insert Leads" ON public.leads FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Batches" ON public.batches;
CREATE POLICY "Public Read Batches" ON public.batches FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Profiles" ON public.user_profiles;
CREATE POLICY "Public Read Profiles" ON public.user_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Profiles" ON public.user_profiles;
CREATE POLICY "Public Insert Profiles" ON public.user_profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Profiles" ON public.user_profiles;
CREATE POLICY "Public Update Profiles" ON public.user_profiles FOR UPDATE USING (true);

-- Grant schema and table access to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;
