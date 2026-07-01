
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert bounded leads" ON public.leads
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND char_length(phone) BETWEEN 3 AND 30
  AND (email IS NULL OR char_length(email) <= 200)
  AND (message IS NULL OR char_length(message) <= 2000)
  AND char_length(source) <= 50
  AND language IN ('ru','kz','en')
);
