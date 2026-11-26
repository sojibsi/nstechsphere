-- ==============================================================================
-- NS TECHSPHERE DATABASE SEED DATA
-- Default Categories, Brands, Products, Menus, Settings, Pages
-- ==============================================================================

-- 1. Roles & Permissions
INSERT INTO roles (id, name, description) VALUES
    ('00000000-0000-0000-0000-000000000001', 'super_admin', 'Full platform access and management'),
    ('00000000-0000-0000-0000-000000000002', 'product_manager', 'Catalog, pricing, and category manager'),
    ('00000000-0000-0000-0000-000000000003', 'order_manager', 'Order fulfillment and customer support')
ON CONFLICT (id) DO NOTHING;

-- 2. Brands
INSERT INTO brands (id, name, slug, logo_url, description, sort_order) VALUES
    ('10000000-0000-0000-0000-000000000001', 'Apple', 'apple', '/images/brands/apple.svg', 'Leading innovator in personal technology and consumer electronics', 1),
    ('10000000-0000-0000-0000-000000000002', 'Samsung', 'samsung', '/images/brands/samsung.svg', 'World-class smartphones, displays, and home smart technology', 2),
    ('10000000-0000-0000-0000-000000000003', 'Sony', 'sony', '/images/brands/sony.svg', 'Pioneering premium audio, cameras, and gaming entertainment', 3),
    ('10000000-0000-0000-0000-000000000004', 'DJI', 'dji', '/images/brands/dji.svg', 'Industry standard camera drones and handheld camera stabilizers', 4),
    ('10000000-0000-0000-0000-000000000005', 'Anker', 'anker', '/images/brands/anker.svg', 'World leader in mobile charging and audio technology', 5),
    ('10000000-0000-0000-0000-000000000006', 'Logitech', 'logitech', '/images/brands/logitech.svg', 'Precision computer peripherals, keyboards, and productivity tools', 6)
ON CONFLICT (id) DO NOTHING;

-- 3. Categories
INSERT INTO categories (id, name, name_bn, slug, description, sort_order) VALUES
    ('20000000-0000-0000-0000-000000000001', 'Smartphones & Tablets', 'স্মার্টফোন ও ট্যাবলেট', 'smartphones-tablets', 'Flagship smartphones, iPads, and accessories', 1),
    ('20000000-0000-0000-0000-000000000002', 'Audio & Sound', 'অডিও ও সাউন্ড', 'audio-sound', 'Wireless earbuds, noise-cancelling headphones, and soundbars', 2),
    ('20000000-0000-0000-0000-000000000003', 'Smart Wearables', 'স্মার্ট ওয়্যারেবল', 'smart-wearables', 'Smartwatches, fitness trackers, and smart bands', 3),
    ('20000000-0000-0000-0000-000000000004', 'Computer & Accessories', 'কম্পিউটার ও এক্সেসরিজ', 'computer-accessories', 'Keyboards, docks, mice, cables, and chargers', 4),
    ('20000000-0000-0000-0000-000000000005', 'Photography & Drones', 'ফটোগ্রাফি ও ড্রোন', 'photography-drones', 'Drones, gimbals, action cameras, and gear', 5),
    ('20000000-0000-0000-0000-000000000006', 'Smart Home & Power', 'স্মার্ট হোম ও পাওয়ার', 'smart-home-power', 'Power banks, smart plugs, fast charging adapters', 6)
ON CONFLICT (id) DO NOTHING;

-- 4. Products
INSERT INTO products (
    id, name, name_bn, slug, sku, brand_id, short_description, full_description, full_description_bn,
    regular_price, sale_price, stock_quantity, stock_status, warranty, is_featured, status, tags, specifications
) VALUES
    (
        '30000000-0000-0000-0000-000000000001',
        'iPhone 16 Pro Max 256GB - Titanium',
        'আইফোন ১৬ প্রো ম্যাক্স ২৫৬জিবি - টাইটানিয়াম',
        'iphone-16-pro-max-256gb-titanium',
        'APL-IP16PM-256',
        '10000000-0000-0000-0000-000000000001',
        'Engineered with Grade 5 titanium, A18 Pro chip, 48MP Fusion camera system with 5x Telephoto.',
        'The iPhone 16 Pro Max features a strong and light titanium design with larger 6.9-inch Super Retina XDR display, Camera Control, 4K 120 fps Dolby Vision recording, and unprecedented battery life.',
        'আইফোন ১৬ প্রো ম্যাক্সে রয়েছে শক্তিশালী ও হালকা টাইটানিয়াম ডিজাইন, ৬.৯ ইঞ্চির সুপার রেটিনা এক্সডিআর ডিসপ্লে, ক্যামেরা কন্ট্রোল এবং এ১৮ প্রো চিপ।',
        189000.00,
        179900.00,
        18,
        'in_stock',
        '1 Year Official Apple Warranty',
        TRUE,
        'published',
        ARRAY['apple', 'iphone', 'flagship', 'pro-max'],
        '[{"key": "Display", "value": "6.9-inch Super Retina XDR OLED 120Hz"}, {"key": "Processor", "value": "Apple A18 Pro (3nm)"}, {"key": "Main Camera", "value": "48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto"}, {"key": "Battery", "value": "Up to 33 hours video playback"}, {"key": "Charging", "value": "MagSafe up to 25W with 30W adapter"}]'::jsonb
    ),
    (
        '30000000-0000-0000-0000-000000000002',
        'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
        'সোনি ডব্লিউএইচ-১০০০এক্সএম৫ ওয়্যারলেস হেডফোন',
        'sony-wh-1000xm5-wireless-headphones',
        'SNY-WH1000XM5-BLK',
        '10000000-0000-0000-0000-000000000003',
        'Industry-leading active noise cancellation with two processors and 8 microphones.',
        'The Sony WH-1000XM5 wireless noise cancelling headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation and crystal-clear call quality.',
        'শিল্প-সেরা অ্যাক্টিভ নয়েজ ক্যান্সেলেশন, ৩০ ঘণ্টার ব্যাটারি লাইফ এবং ক্রিস্টাল ক্লিয়ার কল কোয়ালিটি।',
        42500.00,
        38900.00,
        25,
        'in_stock',
        '1 Year Brand Warranty',
        TRUE,
        'published',
        ARRAY['sony', 'headphones', 'anc', 'audio'],
        '[{"key": "Battery Life", "value": "Up to 30 hours (ANC on)"}, {"key": "Weight", "value": "250g"}, {"key": "Bluetooth", "value": "Version 5.2 with LDAC, AAC, SBC"}, {"key": "Quick Charge", "value": "3 min charge gives 3 hours playback"}]'::jsonb
    ),
    (
        '30000000-0000-0000-0000-000000000003',
        'Apple Watch Ultra 2 GPS + Cellular 49mm',
        'অ্যাপল ওয়াচ আল্ট্রা ২ জিপিএস + সেলুলার ৪৯মিমি',
        'apple-watch-ultra-2-gps-cellular-49mm',
        'APL-AWU2-49',
        '10000000-0000-0000-0000-000000000001',
        'The most rugged and capable Apple Watch. Built for endurance, outdoor adventure, and water sports.',
        'Apple Watch Ultra 2 is crafted with a lightweight titanium case, precision dual-frequency GPS, up to 36 hours of battery life, and the brightest Apple display ever at 3000 nits.',
        'সবচেয়ে মজবুত ও শক্তিশালী অ্যাপল ওয়াচ। টাইটানিয়াম কেস, ৩০০০ নিটস ডিসপ্লে এবং ৩৬ ঘণ্টার ব্যাটারি।',
        98000.00,
        92500.00,
        12,
        'in_stock',
        '1 Year Official Apple Warranty',
        TRUE,
        'published',
        ARRAY['apple', 'smartwatch', 'ultra', 'fitness'],
        '[{"key": "Case Size", "value": "49mm Titanium Case"}, {"key": "Display Brightness", "value": "Up to 3000 nits"}, {"key": "Water Resistance", "value": "100m, Recreational dive to 40m"}, {"key": "Sensors", "value": "ECG, Blood Oxygen, Depth Gauge, Temperature"}]'::jsonb
    ),
    (
        '30000000-0000-0000-0000-000000000004',
        'DJI Mini 4 Pro Fly More Combo Plus',
        'ডিজেআই মিনি ৪ প্রো ফ্লাই মোর কম্বো প্লাস',
        'dji-mini-4-pro-fly-more-combo-plus',
        'DJI-M4P-FMC',
        '10000000-0000-0000-0000-000000000004',
        'Under 249g ultra-light folding drone with Omnidirectional Active Obstacle Sensing and 4K/60fps HDR.',
        'DJI Mini 4 Pro integrates powerful imaging capabilities, omnidirectional obstacle sensing, ActiveTrack 360 with the new Trace Mode, and 20km FHD video transmission.',
        '২৪৯ গ্রামের কম ওজনের ভাঁজযোগ্য ড্রোন, সর্বমুখী বাধা শনাক্তকরণ সেন্সর এবং ৪কে ৬০এফপিএস এইচডিআর ভিডিও।',
        145000.00,
        138000.00,
        8,
        'in_stock',
        '1 Year Official Warranty',
        TRUE,
        'published',
        ARRAY['dji', 'drone', '4k', 'aerial'],
        '[{"key": "Takeoff Weight", "value": "< 249g"}, {"key": "Flight Time", "value": "Up to 45 mins with Intelligent Battery Plus"}, {"key": "Video Resolution", "value": "4K/60fps HDR, 4K/100fps Slow Motion"}, {"key": "Transmission", "value": "DJI O4 up to 20km"}]'::jsonb
    ),
    (
        '30000000-0000-0000-0000-000000000005',
        'Anker Prime 27,650mAh Power Bank (250W)',
        'অ্যাংকার প্রাইম ২৭,৬৫০ মিলিঅ্যাম্পিয়ার পাওয়ার ব্যাংক (২৫০ ওয়াট)',
        'anker-prime-27650mah-power-bank-250w',
        'ANK-PRIME-250W',
        '10000000-0000-0000-0000-000000000005',
        'Massive 250W multi-device fast output with intelligent digital display and companion app.',
        'Equipped with two USB-C ports and one USB-A port, you can charge two laptops simultaneously at 140W each, delivering a staggering 250W total output in a compact carry-on approved size.',
        '২৫০ ওয়াট মাল্টি-ডিভাইস ফাস্ট আউটপুট, স্মার্ট ডিজিটাল ডিসপ্লে এবং বিশাল ২৭,৬৫০ মিলিঅ্যাম্পিয়ার ধারণক্ষমতা।',
        19500.00,
        17200.00,
        35,
        'in_stock',
        '18 Months Brand Warranty',
        TRUE,
        'published',
        ARRAY['anker', 'powerbank', 'fast-charging', 'type-c'],
        '[{"key": "Capacity", "value": "27,650mAh (99.54Wh)"}, {"key": "Total Output", "value": "250W Max"}, {"key": "Ports", "value": "2x USB-C (140W max each), 1x USB-A (65W)"}, {"key": "Smart Display", "value": "Real-time wattage, battery percentage, recharge time"}]'::jsonb
    ),
    (
        '30000000-0000-0000-0000-000000000006',
        'Logitech MX Master 3S Wireless Performance Mouse',
        'লজিটেক এমএক্স মাস্টার ৩এস ওয়্যারলেস মাউস',
        'logitech-mx-master-3s-mouse',
        'LOG-MX3S-GRY',
        '10000000-0000-0000-0000-000000000006',
        '8K DPI track-on-glass optical sensor, Quiet Clicks, and MagSpeed electromagnetic scrolling.',
        'Logitech MX Master 3S is remastered for ultimate tactility, performance, and flow. Quiet Click switches offer a satisfying tactile feel with 90% less click noise.',
        'কাচের উপরেও মসৃণভাবে চলার ৮কে ডিপিআই সেন্সর, নিরব ক্লিক সুইচ এবং ম্যাগস্পিড দ্রুত স্ক্রোলিং হুইল।',
        13500.00,
        11900.00,
        40,
        'in_stock',
        '1 Year Brand Warranty',
        FALSE,
        'published',
        ARRAY['logitech', 'mouse', 'productivity', 'bluetooth'],
        '[{"key": "Sensor", "value": "Darkfield 8000 DPI"}, {"key": "Connectivity", "value": "Bluetooth Low Energy + Logi Bolt USB Receiver"}, {"key": "Battery", "value": "Up to 70 days on full charge"}, {"key": "Compatibility", "value": "Windows, macOS, iPadOS, Linux"}]'::jsonb
    )
ON CONFLICT (id) DO NOTHING;

-- Map Categories to Products
INSERT INTO product_categories (product_id, category_id) VALUES
    ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001'),
    ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002'),
    ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000003'),
    ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000005'),
    ('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000006'),
    ('30000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000004')
ON CONFLICT DO NOTHING;

-- Product Images
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order) VALUES
    ('30000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop', 'iPhone 16 Pro Max Natural Titanium', TRUE, 1),
    ('30000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop', 'Sony WH-1000XM5 Matte Black', TRUE, 1),
    ('30000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop', 'Apple Watch Ultra 2 Titanium', TRUE, 1),
    ('30000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1000&auto=format&fit=crop', 'DJI Mini 4 Pro Drone in Flight', TRUE, 1),
    ('30000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1609592424368-24151fa796ea?q=80&w=1000&auto=format&fit=crop', 'Anker Prime High Capacity Power Bank', TRUE, 1),
    ('30000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1000&auto=format&fit=crop', 'Logitech MX Master 3S Mouse', TRUE, 1)
ON CONFLICT DO NOTHING;

-- Product Variants
INSERT INTO product_variants (id, product_id, sku, name, attributes, price, stock) VALUES
    ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'APL-IP16PM-256-NT', '256GB / Natural Titanium', '{"color": "Natural Titanium", "storage": "256GB"}'::jsonb, 179900.00, 10),
    ('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001', 'APL-IP16PM-512-BT', '512GB / Black Titanium', '{"color": "Black Titanium", "storage": "512GB"}'::jsonb, 205000.00, 8),
    ('40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000002', 'SNY-WH1000XM5-BLK', 'Matte Black', '{"color": "Black"}'::jsonb, 38900.00, 15),
    ('40000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000002', 'SNY-WH1000XM5-SLV', 'Silver White', '{"color": "Silver"}'::jsonb, 38900.00, 10)
ON CONFLICT DO NOTHING;

-- 5. Menus
INSERT INTO menus (id, name, location) VALUES
    ('50000000-0000-0000-0000-000000000001', 'Main Storefront Navigation', 'header'),
    ('50000000-0000-0000-0000-000000000002', 'Footer Quick Links', 'footer')
ON CONFLICT (id) DO NOTHING;

INSERT INTO menu_items (menu_id, title, title_bn, url, sort_order) VALUES
    ('50000000-0000-0000-0000-000000000001', 'Home', 'হোম', '/', 1),
    ('50000000-0000-0000-0000-000000000001', 'Smartphones', 'স্মার্টফোন', '/category/smartphones-tablets', 2),
    ('50000000-0000-0000-0000-000000000001', 'Audio & Sound', 'অডিও', '/category/audio-sound', 3),
    ('50000000-0000-0000-0000-000000000001', 'Smart Wearables', 'স্মার্ট ওয়াচ', '/category/smart-wearables', 4),
    ('50000000-0000-0000-0000-000000000001', 'Computer & Office', 'কম্পিউটার', '/category/computer-accessories', 5),
    ('50000000-0000-0000-0000-000000000001', 'Photography & Drones', 'ড্রোন ও ক্যামেরা', '/category/photography-drones', 6),
    ('50000000-0000-0000-0000-000000000001', 'Deals & Offers', 'বিশেষ অফার', '/deals', 7)
ON CONFLICT DO NOTHING;

-- 6. Coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, max_discount_amount, is_active) VALUES
    ('WELCOME10', 'Enjoy 10% discount on first gadget purchase', 'percentage', 10.00, 2000.00, 2500.00, TRUE),
    ('DHAKAFREE', 'Free delivery on orders over ৳5000', 'fixed', 60.00, 5000.00, 60.00, TRUE)
ON CONFLICT (code) DO NOTHING;

-- 7. Homepage Sections
INSERT INTO homepage_sections (section_key, title, title_bn, subtitle, subtitle_bn, is_enabled, sort_order) VALUES
    ('hero_banner', 'Future of Technology', 'প্রযুক্তির ভবিষ্যৎ', 'Uncompromising performance & pure minimalism.', 'সেরা সব আধুনিক ইলেকট্রনিক্স ও গ্যাজেটস।', TRUE, 1),
    ('shop_by_category', 'Shop by Category', 'ক্যাটাগরি অনুযায়ী কেনাকাটা', 'Explore our curated technology departments', 'আপনার প্রয়োজনীয় ক্যাটাগরি বেছে নিন', TRUE, 2),
    ('featured_products', 'Featured Tech Gear', 'নির্বাচিত গ্যাজেটস', 'Handpicked flagship devices with genuine brand warranty', 'অরিজিনাল ওয়ারেন্টিসহ প্রিমিয়াম পণ্যসমূহ', TRUE, 3),
    ('brand_showcase', 'Authorized Brands', 'অফিশিয়াল ব্র্যান্ডসমূহ', 'Direct authorized partners and imported devices', 'বিশ্ববিখ্যাত টেক ব্র্যান্ড পার্টনার', TRUE, 4),
    ('special_offers', 'Limited Time Deals', 'বিশেষ ছাড় ও অফার', 'Exclusive BDT savings on high-demand electronics', 'সীমিত সময়ের জন্য আকর্ষণীয় মূল্যছাড়', TRUE, 5)
ON CONFLICT (section_key) DO NOTHING;

-- 8. Website Settings
INSERT INTO website_settings (key, value) VALUES
    ('general', '{
        "brand_name": "NS TechSphere",
        "tagline": "Explore the World of Technology.",
        "email": "support@nstechsphere.store",
        "phone": "+880 9612 000 000",
        "whatsapp": "+8801700000000",
        "address": "Motijheel Commercial Area, Dhaka-1000, Bangladesh",
        "currency": "BDT",
        "currency_symbol": "৳"
    }'::jsonb),
    ('shipping', '{
        "inside_dhaka_fee": 70,
        "outside_dhaka_fee": 130,
        "free_shipping_threshold": 25000
    }'::jsonb),
    ('payment', '{
        "cod_enabled": true,
        "bkash_enabled": false,
        "nagad_enabled": false,
        "sslcommerz_enabled": false
    }'::jsonb),
    ('social', '{
        "facebook": "https://facebook.com/nstechsphere",
        "instagram": "https://instagram.com/nstechsphere",
        "youtube": "https://youtube.com/@nstechsphere"
    }'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 9. CMS Static Pages
INSERT INTO pages (title, title_bn, slug, content, content_bn, is_published) VALUES
    (
        'About Us',
        'আমাদের সম্পর্কে',
        'about-us',
        'NS TechSphere is the premier tech lifestyle and authentic electronics retailer in Bangladesh. Delivering genuine gadgets, smart wearables, audio gear, and accessories backed by official warranty.',
        'NS TechSphere বাংলাদেশের শীর্ষস্থানীয় প্রযুক্তি লাইফস্টাইল ও অরিজিনাল ইলেকট্রনিক্স পণ্যের বিশ্বস্ত প্রতিষ্ঠান।',
        TRUE
    ),
    (
        'Shipping & Delivery Policy',
        'ডেলিভারি পলিসি',
        'shipping-policy',
        'We offer express 24-48 hours delivery inside Dhaka and 48-72 hours nationwide courier delivery across all 64 districts in Bangladesh.',
        'ঢাকার ভেতরে ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে সারা বাংলাদেশে ৪৮-৭২ ঘণ্টার মধ্যে নির্ভরযোগ্য কুরিয়ারের মাধ্যমে ডেলিভারি করা হয়।',
        TRUE
    ),
    (
        'Return & Refund Policy',
        'রিটার্ন ও রিফান্ড নীতি',
        'return-policy',
        'Customers can request a replacement or return within 7 calendar days of receipt if the product has manufacturing defects or does not match specifications.',
        'পণ্য প্রাপ্তির ৭ দিনের মধ্যে যে কোনো উৎপাদনগত ত্রুটি দেখা দিলে রিপ্লেসমেন্ট বা রিফান্ডের নিশ্চয়তা রয়েছে।',
        TRUE
    ),
    (
        'Terms & Conditions',
        'শর্তাবলী',
        'terms-and-conditions',
        'All purchases made on NS TechSphere are subject to authentic inventory verification and standard consumer protection laws of Bangladesh.',
        'NS TechSphere-এ কেনাকাটার সকল ক্ষেত্রে বাংলাদেশের প্রচলিত ই-কমার্স ও ভোক্তা অধিকার আইন প্রযোজ্য।',
        TRUE
    ),
    (
        'Privacy Policy',
        'গোপনীয়তা নীতি',
        'privacy-policy',
        'We value your privacy and implement strict technical and database measures to protect customer addresses, phone numbers, and transaction details.',
        'আমরা আপনার তথ্যের গোপনীয়তাকে সম্মান করি এবং কোনো ব্যক্তিগত তথ্য তৃতীয় পক্ষের কাছে হস্তান্তর করি না।',
        TRUE
    )
ON CONFLICT (slug) DO NOTHING;
