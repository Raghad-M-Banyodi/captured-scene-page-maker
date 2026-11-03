CREATE OR REPLACE FUNCTION public.admin_set_role(target uuid, chosen public.app_role) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
IF NOT public.account_active(auth.uid()) OR NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
IF target=auth.uid() OR NOT public.account_active(target) THEN RAISE EXCEPTION 'Role grants require an active independent account'; END IF;
INSERT INTO public.user_roles(user_id,role) VALUES(target,chosen) ON CONFLICT DO NOTHING;
IF chosen='supplier' THEN
INSERT INTO public.supplier_profiles(user_id,company_name,city,verification_status)
SELECT p.id,b.business_name,p.city,'pending' FROM public.profiles p JOIN public.business_profiles b ON b.user_id=p.id WHERE p.id=target
ON CONFLICT(user_id) DO NOTHING;
IF NOT EXISTS(SELECT 1 FROM public.supplier_profiles WHERE user_id=target) THEN RAISE EXCEPTION 'Business profile required'; END IF;
END IF;
END $$;
REVOKE ALL ON FUNCTION public.admin_set_role(uuid,public.app_role) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.admin_set_role(uuid,public.app_role) TO authenticated;
DO $qa$
DECLARE definition text; revised text;
BEGIN
SELECT pg_get_functiondef('public.recycling_action(text,jsonb)'::regprocedure) INTO definition;
revised:=replace(definition,
'IF target=uid OR NOT public.has_role(target,''buyer'') THEN RAISE EXCEPTION ''Independent approval required''; END IF;',
'IF target=uid THEN RAISE EXCEPTION ''Independent approval required''; END IF; IF (payload->>''approved'')::boolean AND NOT public.has_role(target,''buyer'') THEN RAISE EXCEPTION ''Active buyer required''; END IF;');
IF revised=definition THEN RAISE EXCEPTION 'Approval branch not found'; END IF;
definition:=revised;
revised:=replace(definition,
'IF NOT FOUND OR o.buyer_id<>uid OR o.status<>''pending'' OR o.campaign_id IS NOT NULL OR o.is_demo THEN RAISE EXCEPTION ''Ineligible order''; END IF;',
'IF NOT FOUND OR o.buyer_id<>uid THEN RAISE EXCEPTION ''Ineligible order''; END IF;');
IF revised=definition THEN RAISE EXCEPTION 'Order ownership branch not found'; END IF;
definition:=revised;
revised:=replace(definition,
'IF v.used_order_id=o.id THEN RETURN ''{}''; END IF;',
'IF v.used_order_id=o.id AND o.green_voucher_id=v.id THEN RETURN jsonb_build_object(''discount'',o.green_discount); END IF; IF o.status<>''pending'' OR o.campaign_id IS NOT NULL OR o.is_demo THEN RAISE EXCEPTION ''Ineligible order''; END IF;');
IF revised=definition THEN RAISE EXCEPTION 'Voucher replay branch not found'; END IF;
EXECUTE revised;
END $qa$;