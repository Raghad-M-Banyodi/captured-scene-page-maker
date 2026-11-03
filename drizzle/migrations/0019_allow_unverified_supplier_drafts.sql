CREATE OR REPLACE FUNCTION public.validate_product_marketplace()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
DECLARE tier jsonb; previous_qty integer:=0; previous_price numeric;
BEGIN
IF jsonb_typeof(NEW.volume_discounts)<>'array' OR jsonb_array_length(NEW.volume_discounts)>10 THEN RAISE EXCEPTION 'Invalid discounts'; END IF;
previous_price:=NEW.price;
FOR tier IN SELECT value FROM jsonb_array_elements(NEW.volume_discounts) LOOP
  IF (tier->>'min_quantity')::numeric<>trunc((tier->>'min_quantity')::numeric) OR (tier->>'min_quantity')::integer<=previous_qty OR (tier->>'min_quantity')::integer<NEW.moq OR (tier->>'unit_price')::numeric<=0 OR (tier->>'unit_price')::numeric>=previous_price OR tier->>'min_quantity' IS NULL OR tier->>'unit_price' IS NULL THEN RAISE EXCEPTION 'Invalid discount tier'; END IF;
  previous_qty:=(tier->>'min_quantity')::integer;
  previous_price:=(tier->>'unit_price')::numeric;
END LOOP;
IF NEW.status='published' AND (NOT NEW.non_plastic OR NEW.material NOT IN ('bagasse','kraft','wood','cardboard','cotton','beeswax') OR length(trim(NEW.composition))=0 OR NOT EXISTS(SELECT 1 FROM public.supplier_profiles WHERE id=NEW.supplier_id AND verification_status='approved')) THEN RAISE EXCEPTION 'Only eligible non-plastic packaging from approved suppliers may be published'; END IF;
IF TG_OP='UPDATE' AND current_user='authenticated' AND NOT public.has_role(auth.uid(),'admin') AND OLD.status='published' AND (NEW.composition,NEW.non_plastic,NEW.category_slug) IS DISTINCT FROM (OLD.composition,OLD.non_plastic,OLD.category_slug) THEN NEW.status:='pending'; END IF;
RETURN NEW;
END
$function$;