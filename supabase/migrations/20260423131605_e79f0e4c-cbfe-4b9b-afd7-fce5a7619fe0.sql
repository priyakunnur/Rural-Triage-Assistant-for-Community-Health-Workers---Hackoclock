
CREATE TABLE public.patient_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  place TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  triage TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.patient_assessments ENABLE ROW LEVEL SECURITY;

-- Public can submit assessments (no auth required for this app)
CREATE POLICY "Anyone can insert assessments"
ON public.patient_assessments
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND age BETWEEN 0 AND 130
  AND gender IN ('male','female','other')
  AND char_length(place) BETWEEN 1 AND 200
  AND triage IN ('home','clinic','emergency')
);
