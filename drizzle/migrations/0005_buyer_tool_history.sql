CREATE TABLE public.buyer_tool_sessions(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL,kind text NOT NULL CHECK(kind IN ('advisor','cost','impact')),inputs jsonb NOT NULL,results jsonb NOT NULL,created_at timestamptz NOT NULL DEFAULT now(),CHECK(octet_length(inputs::text)<=20000),CHECK(octet_length(results::text)<=100000));
GRANT SELECT,INSERT,DELETE ON public.buyer_tool_sessions TO authenticated; GRANT ALL ON public.buyer_tool_sessions TO service_role;
ALTER TABLE public.buyer_tool_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY buyer_session_read ON public.buyer_tool_sessions FOR SELECT TO authenticated USING(user_id=auth.uid() AND public.has_role(auth.uid(),'buyer'));
CREATE POLICY buyer_session_insert ON public.buyer_tool_sessions FOR INSERT TO authenticated WITH CHECK(user_id=auth.uid() AND public.has_role(auth.uid(),'buyer'));
CREATE POLICY buyer_session_delete ON public.buyer_tool_sessions FOR DELETE TO authenticated USING(user_id=auth.uid() AND public.has_role(auth.uid(),'buyer'));
CREATE INDEX buyer_session_history ON public.buyer_tool_sessions(user_id,kind,created_at DESC);