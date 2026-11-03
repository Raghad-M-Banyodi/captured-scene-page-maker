-- Private rankings include account identifiers and are called only by trusted
-- security-definer reward/public-board functions, never directly by clients.
REVOKE ALL ON FUNCTION public.recycling_rankings(date) FROM PUBLIC,anon,authenticated;
-- Trigger-only functions are never callable as application APIs.
REVOKE ALL ON FUNCTION public.admin_audit_change() FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.sync_group_completion() FROM PUBLIC,anon,authenticated;
-- Protected group mutations and membership checks require authentication.
REVOKE ALL ON FUNCTION public.create_group_campaign(jsonb) FROM PUBLIC,anon;
REVOKE ALL ON FUNCTION public.manage_group_campaign(uuid,text) FROM PUBLIC,anon;
REVOKE ALL ON FUNCTION public.join_group_campaign(uuid,integer,jsonb) FROM PUBLIC,anon;
REVOKE ALL ON FUNCTION public.group_buyer_eligible() FROM PUBLIC,anon;
REVOKE ALL ON FUNCTION public.joined_group_campaign(uuid) FROM PUBLIC,anon;
REVOKE ALL ON FUNCTION public.recycling_access(uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.create_group_campaign(jsonb),public.manage_group_campaign(uuid,text),public.join_group_campaign(uuid,integer,jsonb),public.group_buyer_eligible(),public.joined_group_campaign(uuid),public.recycling_access(uuid) TO authenticated;