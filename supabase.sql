-- ==========================================
-- TUTOR MIKE SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor
-- ==========================================

-- 1. Create Leads table (for Contact Form Enquiries)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_name TEXT NOT NULL,
    student_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    year_group TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_name TEXT NOT NULL,
    location TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Portfolio/Gallery table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- LEADS POLICIES
-- Allow anyone (public) to insert new leads via the website form
CREATE POLICY "Allow public insert" ON public.leads
    FOR INSERT WITH CHECK (true);

-- Only authenticated users (you, logged into Supabase Auth) can view, update or delete leads
CREATE POLICY "Allow authenticated read" ON public.leads
    FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.leads
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON public.leads
    FOR DELETE USING (auth.role() = 'authenticated');

-- TESTIMONIALS POLICIES
-- Allow public to ONLY see approved testimonials
CREATE POLICY "Allow public read approved" ON public.testimonials
    FOR SELECT USING (status = 'approved');
-- Admins have full access
CREATE POLICY "Allow authenticated all access" ON public.testimonials
    FOR ALL USING (auth.role() = 'authenticated');

-- PORTFOLIO POLICIES
-- Allow public to see portfolio items
CREATE POLICY "Allow public read" ON public.portfolio_projects
    FOR SELECT USING (true);
-- Admins have full access
CREATE POLICY "Allow authenticated all access" ON public.portfolio_projects
    FOR ALL USING (auth.role() = 'authenticated');
