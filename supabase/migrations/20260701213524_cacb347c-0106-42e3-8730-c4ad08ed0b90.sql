REVOKE SELECT, UPDATE, DELETE ON public.leads FROM anon, authenticated, PUBLIC;
GRANT ALL ON public.leads TO service_role;