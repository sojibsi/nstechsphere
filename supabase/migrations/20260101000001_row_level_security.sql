-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation & Zero Trust Architecture
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin/staff
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profiles: Customers can view and edit their own profile; Admins can view all
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id OR is_admin());

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. Catalog (Brands, Categories, Products, Variants, Images): Public read for active/published
CREATE POLICY "Public read active brands" ON brands
    FOR SELECT USING (is_active = TRUE OR is_admin());

CREATE POLICY "Admin write brands" ON brands
    FOR ALL USING (is_admin());

CREATE POLICY "Public read active categories" ON categories
    FOR SELECT USING (is_active = TRUE OR is_admin());

CREATE POLICY "Admin write categories" ON categories
    FOR ALL USING (is_admin());

CREATE POLICY "Public read published products" ON products
    FOR SELECT USING (status = 'published' OR is_admin());

CREATE POLICY "Admin write products" ON products
    FOR ALL USING (is_admin());

CREATE POLICY "Public read product categories" ON product_categories
    FOR SELECT USING (TRUE);

CREATE POLICY "Admin write product categories" ON product_categories
    FOR ALL USING (is_admin());

CREATE POLICY "Public read product images" ON product_images
    FOR SELECT USING (TRUE);

CREATE POLICY "Admin write product images" ON product_images
    FOR ALL USING (is_admin());

CREATE POLICY "Public read product variants" ON product_variants
    FOR SELECT USING (is_active = TRUE OR is_admin());

CREATE POLICY "Admin write product variants" ON product_variants
    FOR ALL USING (is_admin());

-- 3. Navigation: Public read for active items
CREATE POLICY "Public read menus" ON menus
    FOR SELECT USING (is_active = TRUE OR is_admin());

CREATE POLICY "Admin write menus" ON menus
    FOR ALL USING (is_admin());

CREATE POLICY "Public read menu items" ON menu_items
    FOR SELECT USING (is_active = TRUE OR is_admin());

CREATE POLICY "Admin write menu items" ON menu_items
    FOR ALL USING (is_admin());

-- 4. Commerce (Carts, Orders, Addresses, Wishlists): Customer isolated
CREATE POLICY "Users can manage own cart" ON carts
    FOR ALL USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Users can manage own cart items" ON cart_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM carts
            WHERE carts.id = cart_items.cart_id
            AND (carts.user_id = auth.uid() OR is_admin())
        )
    );

CREATE POLICY "Users view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Anyone can insert orders" ON orders
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admin update orders" ON orders
    FOR UPDATE USING (is_admin());

CREATE POLICY "Users view own order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND (orders.user_id = auth.uid() OR is_admin())
        )
    );

CREATE POLICY "Users manage own addresses" ON addresses
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own wishlist" ON wishlists
    FOR ALL USING (auth.uid() = user_id);

-- 5. Reviews: Public read approved, authenticated users can insert
CREATE POLICY "Public read approved reviews" ON reviews
    FOR SELECT USING (is_approved = TRUE OR is_admin());

CREATE POLICY "Authenticated users submit reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin manage reviews" ON reviews
    FOR ALL USING (is_admin());

-- 6. CMS & Settings: Public read, Admin write
CREATE POLICY "Public read published pages" ON pages
    FOR SELECT USING (is_published = TRUE OR is_admin());

CREATE POLICY "Admin manage pages" ON pages
    FOR ALL USING (is_admin());

CREATE POLICY "Public read active banners" ON banners
    FOR SELECT USING (is_active = TRUE OR is_admin());

CREATE POLICY "Admin manage banners" ON banners
    FOR ALL USING (is_admin());

CREATE POLICY "Public read homepage sections" ON homepage_sections
    FOR SELECT USING (is_enabled = TRUE OR is_admin());

CREATE POLICY "Admin manage homepage sections" ON homepage_sections
    FOR ALL USING (is_admin());

CREATE POLICY "Public read settings" ON website_settings
    FOR SELECT USING (TRUE);

CREATE POLICY "Admin manage settings" ON website_settings
    FOR ALL USING (is_admin());

CREATE POLICY "Admin view activity logs" ON activity_logs
    FOR SELECT USING (is_admin());
