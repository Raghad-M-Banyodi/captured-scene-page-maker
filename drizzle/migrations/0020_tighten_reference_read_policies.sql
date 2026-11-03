DROP POLICY IF EXISTS green_consent_read ON public.green_supplier_consent;
CREATE POLICY green_consent_read ON public.green_supplier_consent FOR SELECT TO authenticated USING (public.account_active(auth.uid()));
DROP POLICY IF EXISTS recycling_settings_read ON public.recycling_settings;
CREATE POLICY recycling_settings_read ON public.recycling_settings FOR SELECT TO authenticated USING (public.account_active(auth.uid()));
DROP POLICY IF EXISTS category_read ON public.product_categories;
CREATE POLICY category_read ON public.product_categories FOR SELECT TO anon, authenticated USING (
  EXISTS (SELECT 1 FROM public.products p WHERE p.category_id = product_categories.id AND public.public_product(p.id))
  OR (auth.uid() IS NOT NULL AND public.account_active(auth.uid()))
);