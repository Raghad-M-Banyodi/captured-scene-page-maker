ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'recycling';
ALTER TABLE public.recycling_partners ADD COLUMN IF NOT EXISTS accepted_materials text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.recycling_partners ADD CONSTRAINT recycling_partners_materials_check CHECK (accepted_materials <@ ARRAY['paper','cardboard','aluminum']::text[]);