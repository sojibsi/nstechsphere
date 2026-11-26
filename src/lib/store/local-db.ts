import {
  Product,
  Category,
  Brand,
  Order,
  Coupon,
  WebsiteSettings,
  MenuItem,
  Review,
  StaticPage,
  ActivityLog,
  OrderStatus,
  PaymentStatus,
} from '@/types';
import { generateOrderNumber } from '@/lib/utils';

// Default initial website settings for NS TechSphere
const initialSettings: WebsiteSettings = {
  general: {
    brand_name: 'NS TechSphere',
    tagline: 'Explore the World of Technology.',
    email: 'support@nstechsphere.store',
    phone: '01642603236',
    whatsapp: '01642603236',
    address: 'Motijheel Commercial Area, Dhaka 1000, Bangladesh',
    currency: 'BDT',
    currency_symbol: '৳',
    logo_url: '/images/ns-logo.jpg',
  },
  security: {
    admin_email: 'admin@nstechsphere.store',
    admin_password: 'admin',
  },
  shipping: {
    inside_dhaka_fee: 70,
    outside_dhaka_fee: 130,
    free_shipping_threshold: 25000,
  },
  payment: {
    cod_enabled: true,
    bkash_enabled: false,
    nagad_enabled: false,
    sslcommerz_enabled: false,
  },
  social: {
    facebook: 'https://www.facebook.com/nstechsphere',
    instagram: 'https://www.instagram.com/nstechsphere/',
    youtube: 'https://www.youtube.com/@nstechsphere',
  },
};

const initialBrands: Brand[] = [
  {
    id: 'b-apple',
    name: 'Apple',
    slug: 'apple',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    description: 'Leading innovator in personal technology, Mac, iPhone, and wearables.',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'b-samsung',
    name: 'Samsung',
    slug: 'samsung',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    description: 'Global benchmark in displays, smartphones, and smart home appliances.',
    is_active: true,
    sort_order: 2,
  },
  {
    id: 'b-sony',
    name: 'Sony',
    slug: 'sony',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
    description: 'Pioneering premium studio audio, noise-cancelling headphones, and gaming.',
    is_active: true,
    sort_order: 3,
  },
  {
    id: 'b-anker',
    name: 'Anker',
    slug: 'anker',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Anker_Innovations_logo.svg',
    description: 'Global leader in fast charging, power banks, and high-performance hubs.',
    is_active: true,
    sort_order: 4,
  },
  {
    id: 'b-logitech',
    name: 'Logitech',
    slug: 'logitech',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logitech_logo.svg',
    description: 'World-renowned precision desktop productivity, keyboards, and mice.',
    is_active: true,
    sort_order: 5,
  },
  {
    id: 'b-dji',
    name: 'DJI',
    slug: 'dji',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/DJI_logo.svg',
    description: 'World benchmark in drone photography, action cameras, and gimbals.',
    is_active: true,
    sort_order: 6,
  },
];

// 9 Comprehensive Main Categories & Nested Subcategories as requested
const initialCategories: Category[] = [
  {
    id: 'cat-mobile-accessories',
    name: 'Mobile Accessories',
    name_bn: 'মোবাইল এক্সেসরিজ',
    slug: 'mobile-accessories',
    description: 'Chargers, adapters, USB cables, cases, stands, and screen protectors',
    image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop',
    is_active: true,
    sort_order: 1,
    subcategories: [
      { id: 'sub-chargers', name: 'Chargers & Adapters', name_bn: 'চার্জার ও এডাপ্টার', slug: 'chargers-adapters', is_active: true, sort_order: 1 },
      { id: 'sub-cables', name: 'USB Cables', name_bn: 'ইউএসবি ক্যাবল', slug: 'usb-cables', is_active: true, sort_order: 2 },
      { id: 'sub-powerbanks', name: 'Power Banks', name_bn: 'পাওয়ার ব্যাংক', slug: 'power-banks', is_active: true, sort_order: 3 },
      { id: 'sub-holders', name: 'Phone Holders & Stands', name_bn: 'ফোন হোল্ডার ও স্ট্যান্ড', slug: 'phone-holders-stands', is_active: true, sort_order: 4 },
      { id: 'sub-protectors', name: 'Screen Protectors', name_bn: 'স্ক্রিন প্রটেক্টর', slug: 'screen-protectors', is_active: true, sort_order: 5 },
      { id: 'sub-cases', name: 'Mobile Cases & Covers', name_bn: 'মোবাইল কেস ও কভার', slug: 'mobile-cases-covers', is_active: true, sort_order: 6 },
    ],
  },
  {
    id: 'cat-smart-gadgets',
    name: 'Smart Gadgets',
    name_bn: 'স্মার্ট গ্যাজেটস',
    slug: 'smart-gadgets',
    description: 'Smart watches, wireless earbuds, bluetooth headphones, and portable gadgets',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    is_active: true,
    sort_order: 2,
    subcategories: [
      { id: 'sub-smartwatches', name: 'Smart Watches', name_bn: 'স্মার্ট ওয়াচ', slug: 'smart-watches', is_active: true, sort_order: 1 },
      { id: 'sub-earbuds', name: 'Wireless Earbuds', name_bn: 'ওয়্যারলেস এয়ারবাডস', slug: 'wireless-earbuds', is_active: true, sort_order: 2 },
      { id: 'sub-headphones', name: 'Bluetooth Headphones', name_bn: 'ব্লুটুথ হেডফোন', slug: 'bluetooth-headphones', is_active: true, sort_order: 3 },
      { id: 'sub-speakers', name: 'Bluetooth Speakers', name_bn: 'ব্লুটুথ স্পিকার', slug: 'bluetooth-speakers', is_active: true, sort_order: 4 },
      { id: 'sub-trackers', name: 'Smart Trackers', name_bn: 'স্মার্ট ট্র্যাকার', slug: 'smart-trackers', is_active: true, sort_order: 5 },
      { id: 'sub-portable', name: 'Portable Gadgets', name_bn: 'পোর্টেবল গ্যাজেটস', slug: 'portable-gadgets', is_active: true, sort_order: 6 },
    ],
  },
  {
    id: 'cat-computer-laptop',
    name: 'Computer & Laptop Accessories',
    name_bn: 'কম্পিউটার ও ল্যাপটপ এক্সেসরিজ',
    slug: 'computer-laptop-accessories',
    description: 'Keyboards, mouse, laptop stands, USB hubs, webcams, and storage devices',
    image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop',
    is_active: true,
    sort_order: 3,
    subcategories: [
      { id: 'sub-keyboards', name: 'Keyboards', name_bn: 'কিবোর্ড', slug: 'keyboards', is_active: true, sort_order: 1 },
      { id: 'sub-mouse', name: 'Mouse', name_bn: 'মাউস', slug: 'mouse', is_active: true, sort_order: 2 },
      { id: 'sub-stands', name: 'Laptop Stands', name_bn: 'ল্যাপটপ স্ট্যান্ড', slug: 'laptop-stands', is_active: true, sort_order: 3 },
      { id: 'sub-hubs', name: 'USB Hubs', name_bn: 'ইউএসবি হাব', slug: 'usb-hubs', is_active: true, sort_order: 4 },
      { id: 'sub-webcams', name: 'Webcams', name_bn: 'ওয়েবক্যাম', slug: 'webcams', is_active: true, sort_order: 5 },
      { id: 'sub-storage', name: 'Storage Devices', name_bn: 'স্টোরেজ ডিভাইস', slug: 'storage-devices', is_active: true, sort_order: 6 },
    ],
  },
  {
    id: 'cat-gaming',
    name: 'Gaming Accessories',
    name_bn: 'গেমিং এক্সেসরিজ',
    slug: 'gaming-accessories',
    description: 'Controllers, headsets, mechanical keyboards, RGB accessories, and gear',
    image_url: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=800&auto=format&fit=crop',
    is_active: true,
    sort_order: 4,
    subcategories: [
      { id: 'sub-controllers', name: 'Gaming Controllers', name_bn: 'গেমিং কন্ট্রোলার', slug: 'gaming-controllers', is_active: true, sort_order: 1 },
      { id: 'sub-gheadsets', name: 'Gaming Headsets', name_bn: 'গেমিং হেডসেট', slug: 'gaming-headsets', is_active: true, sort_order: 2 },
      { id: 'sub-gkeyboards', name: 'Gaming Keyboards', name_bn: 'গেমিং কিবোর্ড', slug: 'gaming-keyboards', is_active: true, sort_order: 3 },
      { id: 'sub-gmouse', name: 'Gaming Mouse', name_bn: 'গেমিং মাউস', slug: 'gaming-mouse', is_active: true, sort_order: 4 },
      { id: 'sub-rgb', name: 'RGB Accessories', name_bn: 'আরজিবি এক্সেসরিজ', slug: 'rgb-accessories', is_active: true, sort_order: 5 },
      { id: 'sub-ggadgets', name: 'Gaming Gadgets', name_bn: 'গেমিং গ্যাজেট', slug: 'gaming-gadgets', is_active: true, sort_order: 6 },
    ],
  },
  {
    id: 'cat-smart-home',
    name: 'Smart Home & Security',
    name_bn: 'স্মার্ট হোম ও সিকিউরিটি',
    slug: 'smart-home-security',
    description: 'Smart bulbs, plugs, security cameras, smart sensors, and controllers',
    image_url: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop',
    is_active: true,
    sort_order: 5,
    subcategories: [
      { id: 'sub-bulbs', name: 'Smart Bulbs', name_bn: 'স্মার্ট বাল্ব', slug: 'smart-bulbs', is_active: true, sort_order: 1 },
      { id: 'sub-plugs', name: 'Smart Plugs', name_bn: 'স্মার্ট প্লাগ', slug: 'smart-plugs', is_active: true, sort_order: 2 },
      { id: 'sub-cameras', name: 'Security Cameras', name_bn: 'সিকিউরিটি ক্যামেরা', slug: 'security-cameras', is_active: true, sort_order: 3 },
      { id: 'sub-sensors', name: 'Sensors', name_bn: 'সেন্সর', slug: 'sensors', is_active: true, sort_order: 4 },
      { id: 'sub-controllers-home', name: 'Smart Home Controllers', name_bn: 'হোম কন্ট্রোলার', slug: 'home-controllers', is_active: true, sort_order: 5 },
    ],
  },
  {
    id: 'cat-audio-entertainment',
    name: 'Audio & Entertainment',
    name_bn: 'অডিও ও এন্টারটেইনমেন্ট',
    slug: 'audio-entertainment',
    description: 'Hi-Fi speakers, studio microphones, headphones, and streaming gear',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    is_active: true,
    sort_order: 6,
    subcategories: [
      { id: 'sub-speakers-audio', name: 'Speakers', name_bn: 'স্পিকার', slug: 'speakers', is_active: true, sort_order: 1 },
      { id: 'sub-mics', name: 'Microphones', name_bn: 'মাইক্রোফোন', slug: 'microphones', is_active: true, sort_order: 2 },
      { id: 'sub-hps', name: 'Headphones', name_bn: 'হেডফোন', slug: 'headphones', is_active: true, sort_order: 3 },
      { id: 'sub-audio-acc', name: 'Audio Accessories', name_bn: 'অডিও এক্সেসরিজ', slug: 'audio-accessories', is_active: true, sort_order: 4 },
    ],
  },
  {
    id: 'cat-lifestyle-electronics',
    name: 'Home & Lifestyle Electronics',
    name_bn: 'হোম ও লাইফস্টাইল ইলেকট্রনিক্স',
    slug: 'home-lifestyle-electronics',
    description: 'Mini appliances, portable fans, electronic tools, and rechargeable devices',
    image_url: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=800&auto=format&fit=crop',
    is_active: true,
    sort_order: 7,
    subcategories: [
      { id: 'sub-mini-appliances', name: 'Mini Appliances', name_bn: 'মিনি অ্যাপ্লায়েন্সেস', slug: 'mini-appliances', is_active: true, sort_order: 1 },
      { id: 'sub-fans', name: 'Portable Fans', name_bn: 'পোর্টেবল ফ্যান', slug: 'portable-fans', is_active: true, sort_order: 2 },
      { id: 'sub-tools', name: 'Electronic Tools', name_bn: 'ইলেকট্রনিক টুলস', slug: 'electronic-tools', is_active: true, sort_order: 3 },
      { id: 'sub-rechargeable', name: 'Rechargeable Devices', name_bn: 'রিচার্জেবল ডিভাইস', slug: 'rechargeable-devices', is_active: true, sort_order: 4 },
    ],
  },
  {
    id: 'cat-photography-creator',
    name: 'Photography & Content Creation',
    name_bn: 'ফটোগ্রাফি ও কনটেন্ট ক্রিয়েশন',
    slug: 'photography-content-creation',
    description: 'Tripods, ring lights, camera microphones, gimbals, and creator kits',
    image_url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop',
    is_active: true,
    sort_order: 8,
    subcategories: [
      { id: 'sub-tripods', name: 'Tripods', name_bn: 'ট্রাইপড', slug: 'tripods', is_active: true, sort_order: 1 },
      { id: 'sub-ringlights', name: 'Ring Lights', name_bn: 'রিং লাইট', slug: 'ring-lights', is_active: true, sort_order: 2 },
      { id: 'sub-creator-gear', name: 'Creator Equipment', name_bn: 'ক্রিয়েটর ইকুইপমেন্ট', slug: 'creator-equipment', is_active: true, sort_order: 3 },
    ],
  },
  {
    id: 'cat-power-charging',
    name: 'Power & Charging Solutions',
    name_bn: 'পাওয়ার ও চার্জিং সল্যুশনস',
    slug: 'power-charging-solutions',
    description: 'High-wattage power banks, GaN fast chargers, and wireless charging stations',
    image_url: 'https://images.unsplash.com/photo-1609592424368-24151fa796ea?q=80&w=800&auto=format&fit=crop',
    is_active: true,
    sort_order: 9,
    subcategories: [
      { id: 'sub-fast-chargers', name: 'Fast Chargers', name_bn: 'ফাস্ট চার্জার', slug: 'fast-chargers', is_active: true, sort_order: 1 },
      { id: 'sub-wireless-chargers', name: 'Wireless Chargers', name_bn: 'ওয়্যারলেস চার্জার', slug: 'wireless-chargers', is_active: true, sort_order: 2 },
      { id: 'sub-ext-boards', name: 'Extension Boards', name_bn: 'এক্সটেনশন বোর্ড', slug: 'extension-boards', is_active: true, sort_order: 3 },
      { id: 'sub-stations', name: 'Charging Stations', name_bn: 'চার্জিং স্টেশন', slug: 'charging-stations', is_active: true, sort_order: 4 },
    ],
  },
];

const initialProducts: Product[] = [
  {
    id: 'prod-iphone-16-pro-max',
    name: 'iPhone 16 Pro Max 256GB - Titanium',
    name_bn: 'আইফোন ১৬ প্রো ম্যাক্স ২৫৬জিবি - টাইটানিয়াম',
    slug: 'iphone-16-pro-max-256gb-titanium',
    sku: 'APL-IP16PM-256',
    brand_id: 'b-apple',
    brand: initialBrands[0],
    short_description: 'Engineered with Grade 5 titanium, A18 Pro chip, 48MP Fusion camera system with 5x Telephoto.',
    full_description: 'The iPhone 16 Pro Max features a strong and light titanium design with larger 6.9-inch Super Retina XDR display, Camera Control, 4K 120 fps Dolby Vision recording, and extraordinary battery life.',
    full_description_bn: 'আইফোন ১৬ প্রো ম্যাক্সে রয়েছে শক্তিশালী ও হালকা টাইটানিয়াম ডিজাইন, ৬.৯ ইঞ্চির সুপার রেটিনা এক্সডিআর ডিসপ্লে, ক্যামেরা কন্ট্রোল এবং এ১৮ প্রো চিপ।',
    regular_price: 189000,
    sale_price: 179900,
    stock_quantity: 18,
    stock_status: 'in_stock',
    warranty: '1 Year Official Apple Warranty',
    is_featured: true,
    status: 'published',
    tags: ['apple', 'iphone', 'flagship', 'pro-max', 'smartphone'],
    specifications: [
      { key: 'Display', value: '6.9-inch Super Retina XDR OLED 120Hz ProMotion' },
      { key: 'Chipset', value: 'Apple A18 Pro (3-nanometer)' },
      { key: 'Camera', value: '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto' },
      { key: 'Battery Life', value: 'Up to 33 hours video playback' },
      { key: 'Build', value: 'Grade 5 Titanium with Ceramic Shield front' },
    ],
    images: [
      {
        id: 'img-1',
        product_id: 'prod-iphone-16-pro-max',
        image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'iPhone 16 Pro Max Front & Back',
        is_primary: true,
        sort_order: 1,
      },
      {
        id: 'img-1b',
        product_id: 'prod-iphone-16-pro-max',
        image_url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'iPhone Titanium Camera Detail',
        is_primary: false,
        sort_order: 2,
      },
    ],
    variants: [
      {
        id: 'var-1',
        product_id: 'prod-iphone-16-pro-max',
        sku: 'APL-IP16PM-256-NT',
        name: 'Natural Titanium / 256GB',
        attributes: { Color: 'Natural Titanium', Storage: '256GB' },
        price: 179900,
        stock: 10,
        is_active: true,
      },
      {
        id: 'var-2',
        product_id: 'prod-iphone-16-pro-max',
        sku: 'APL-IP16PM-512-BT',
        name: 'Black Titanium / 512GB',
        attributes: { Color: 'Black Titanium', Storage: '512GB' },
        price: 205000,
        stock: 8,
        is_active: true,
      },
    ],
    categories: [initialCategories[0]],
    rating: 4.9,
    review_count: 34,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
    name_bn: 'সোনি ডব্লিউএইচ-১০০০এক্সএম৫ ওয়্যারলেস হেডফোন',
    slug: 'sony-wh-1000xm5-wireless-headphones',
    sku: 'SNY-WH1000XM5-BLK',
    brand_id: 'b-sony',
    brand: initialBrands[2],
    short_description: 'Industry-leading noise cancellation with dual Auto NC Optimizer processors and 8 microphones.',
    full_description: 'The Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening. High-resolution audio, crystal-clear hands-free calls, up to 30-hour battery life, and ultra-comfortable lightweight design.',
    full_description_bn: 'শিল্প-সেরা অ্যাক্টিভ নয়েজ ক্যান্সেলেশন, ৩০ ঘণ্টার ব্যাটারি লাইফ এবং ক্রিস্টাল ক্লিয়ার অডিও আউটপুট।',
    regular_price: 42500,
    sale_price: 38900,
    stock_quantity: 24,
    stock_status: 'in_stock',
    warranty: '1 Year Official Brand Warranty',
    is_featured: true,
    status: 'published',
    tags: ['sony', 'headphones', 'anc', 'audio', 'wireless'],
    specifications: [
      { key: 'Noise Cancellation', value: 'Dual Processor V1 + HD QN1 with 8 microphones' },
      { key: 'Battery Life', value: '30 hours with ANC ON (40 hours with ANC OFF)' },
      { key: 'Codecs', value: 'LDAC, AAC, SBC' },
      { key: 'Weight', value: '250g ultra-lightweight' },
    ],
    images: [
      {
        id: 'img-2',
        product_id: 'prod-sony-wh1000xm5',
        image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Sony WH-1000XM5 Black',
        is_primary: true,
        sort_order: 1,
      },
    ],
    variants: [
      {
        id: 'var-sony-blk',
        product_id: 'prod-sony-wh1000xm5',
        sku: 'SNY-WH1000XM5-BLK',
        name: 'Midnight Black',
        attributes: { Color: 'Midnight Black' },
        price: 38900,
        stock: 14,
        is_active: true,
      },
      {
        id: 'var-sony-slv',
        product_id: 'prod-sony-wh1000xm5',
        sku: 'SNY-WH1000XM5-SLV',
        name: 'Platinum Silver',
        attributes: { Color: 'Platinum Silver' },
        price: 38900,
        stock: 10,
        is_active: true,
      },
    ],
    categories: [initialCategories[1], initialCategories[5]],
    rating: 4.8,
    review_count: 52,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2 GPS + Cellular 49mm',
    name_bn: 'অ্যাপল ওয়াচ আল্ট্রা ২ জিপিএস + সেলুলার ৪৯মিমি',
    slug: 'apple-watch-ultra-2-gps-cellular-49mm',
    sku: 'APL-AWU2-49',
    brand_id: 'b-apple',
    brand: initialBrands[0],
    short_description: 'The most rugged and capable Apple Watch. Aerospace titanium case, 3000 nits, precision dual-frequency GPS.',
    full_description: 'Crafted for extreme environments with an aerospace-grade titanium case, sapphire crystal front, customizable Action button, 100m water resistance, and up to 72 hours of battery in Low Power Mode.',
    full_description_bn: 'সবচেয়ে মজবুত ও শক্তিশালী অ্যাপল ওয়াচ। টাইটানিয়াম কেস, ৩০০০ নিটস ডিসপ্লে এবং ৭২ ঘণ্টার ব্যাটারি ব্যাকআপ।',
    regular_price: 98000,
    sale_price: 92500,
    stock_quantity: 11,
    stock_status: 'in_stock',
    warranty: '1 Year Official Apple Warranty',
    is_featured: true,
    status: 'published',
    tags: ['apple', 'smartwatch', 'ultra', 'fitness', 'titanium'],
    specifications: [
      { key: 'Display Size', value: '49mm Aerospace Titanium Case (3000 nits)' },
      { key: 'Battery Life', value: 'Up to 36 hours (72 hours in Low Power Mode)' },
      { key: 'Water Resistance', value: '100m, Recreational dive to 40m' },
      { key: 'Sensors', value: 'ECG, SpO2, Temperature, Depth Gauge' },
    ],
    images: [
      {
        id: 'img-3',
        product_id: 'prod-apple-watch-ultra-2',
        image_url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Apple Watch Ultra 2 on wrist',
        is_primary: true,
        sort_order: 1,
      },
    ],
    variants: [
      {
        id: 'var-awu-ocean',
        product_id: 'prod-apple-watch-ultra-2',
        sku: 'APL-AWU2-OCN',
        name: 'Orange Ocean Band',
        attributes: { Band: 'Ocean Band', Color: 'Orange' },
        price: 92500,
        stock: 5,
        is_active: true,
      },
      {
        id: 'var-awu-trail',
        product_id: 'prod-apple-watch-ultra-2',
        sku: 'APL-AWU2-TRL',
        name: 'Black/Gray Trail Loop',
        attributes: { Band: 'Trail Loop', Color: 'Black/Gray' },
        price: 92500,
        stock: 6,
        is_active: true,
      },
    ],
    categories: [initialCategories[1]],
    rating: 4.9,
    review_count: 28,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-anker-prime-powerbank',
    name: 'Anker Prime 27,650mAh Power Bank (250W)',
    name_bn: 'অ্যাংকার প্রাইম ২৭,৬৫০ মিলিঅ্যাম্পিয়ার পাওয়ার ব্যাংক (২৫০ ওয়াট)',
    slug: 'anker-prime-27650mah-power-bank-250w',
    sku: 'ANK-PRIME-250W',
    brand_id: 'b-anker',
    brand: initialBrands[3],
    short_description: 'Massive 250W total multi-device output with smart digital display and Bluetooth companion app.',
    full_description: 'Equipped with dual high-power USB-C ports delivering up to 140W each, you can rapidly recharge two MacBooks simultaneously. The smart display displays real-time battery status, charging speeds, and temperature.',
    full_description_bn: '২৫০ ওয়াট মাল্টি-ডিভাইস ফাস্ট আউটপুট, স্মার্ট ডিজিটাল ডিসপ্লে এবং বিশাল ২৭,৬৫০ মিলিঅ্যাম্পিয়ার ধারণক্ষমতা।',
    regular_price: 19500,
    sale_price: 17200,
    stock_quantity: 32,
    stock_status: 'in_stock',
    warranty: '18 Months Official Brand Warranty',
    is_featured: true,
    status: 'published',
    tags: ['anker', 'powerbank', 'fast-charging', 'type-c', 'laptop-charger'],
    specifications: [
      { key: 'Battery Capacity', value: '27,650mAh (99.54Wh Airline Approved)' },
      { key: 'Output Power', value: '250W Maximum Multi-Port' },
      { key: 'Number of Ports', value: '2x USB-C (140W each), 1x USB-A (65W)' },
      { key: 'Smart App Control', value: 'Real-time wattage display via Bluetooth' },
    ],
    images: [
      {
        id: 'img-5',
        product_id: 'prod-anker-prime-powerbank',
        image_url: 'https://images.unsplash.com/photo-1609592424368-24151fa796ea?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Anker Prime Fast Power Bank',
        is_primary: true,
        sort_order: 1,
      },
    ],
    variants: [],
    categories: [initialCategories[0], initialCategories[8]],
    rating: 4.9,
    review_count: 41,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-logitech-mx-master-3s',
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    name_bn: 'লজিটেক এমএক্স মাস্টার ৩এস ওয়্যারলেস মাউস',
    slug: 'logitech-mx-master-3s-mouse',
    sku: 'LOG-MX3S-GRY',
    brand_id: 'b-logitech',
    brand: initialBrands[4],
    short_description: '8K DPI track-on-glass optical sensor, Quiet Clicks, and MagSpeed electromagnetic scrolling.',
    full_description: 'An icon remastered: The MX Master 3S features 8,000 DPI tracking on any surface, including glass, and quiet click switches with 90% less noise. Seamless cross-computer flow across Windows and macOS.',
    full_description_bn: 'কাচের উপরেও মসৃণভাবে চলার ৮কে ডিপিআই সেন্সর, নিরব ক্লিক সুইচ এবং ম্যাগস্পিড দ্রুত স্ক্রোলিং হুইল।',
    regular_price: 13500,
    sale_price: 11900,
    stock_quantity: 45,
    stock_status: 'in_stock',
    warranty: '1 Year Official Brand Warranty',
    is_featured: false,
    status: 'published',
    tags: ['logitech', 'mouse', 'bluetooth', 'productivity', 'office'],
    specifications: [
      { key: 'Sensor', value: 'Darkfield 8000 DPI Optical' },
      { key: 'Scroll Wheel', value: 'MagSpeed electromagnetic metal wheel' },
      { key: 'Battery', value: 'Up to 70 days rechargeable via USB-C' },
      { key: 'Connectivity', value: 'Bluetooth + Logi Bolt USB Receiver' },
    ],
    images: [
      {
        id: 'img-6',
        product_id: 'prod-logitech-mx-master-3s',
        image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'Logitech MX Master 3S Mouse',
        is_primary: true,
        sort_order: 1,
      },
    ],
    variants: [
      {
        id: 'var-mx-graphite',
        product_id: 'prod-logitech-mx-master-3s',
        sku: 'LOG-MX3S-GRP',
        name: 'Graphite Black',
        attributes: { Color: 'Graphite' },
        price: 11900,
        stock: 25,
        is_active: true,
      },
      {
        id: 'var-mx-gray',
        product_id: 'prod-logitech-mx-master-3s',
        sku: 'LOG-MX3S-PGR',
        name: 'Pale Gray',
        attributes: { Color: 'Pale Gray' },
        price: 11900,
        stock: 20,
        is_active: true,
      },
    ],
    categories: [initialCategories[2]],
    rating: 4.7,
    review_count: 67,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-dji-mini-4-pro',
    name: 'DJI Mini 4 Pro Fly More Combo Plus',
    name_bn: 'ডিজেআই মিনি ৪ প্রো ফ্লাই মোর কম্বো প্লাস',
    slug: 'dji-mini-4-pro-fly-more-combo-plus',
    sku: 'DJI-M4P-FMC',
    brand_id: 'b-dji',
    brand: initialBrands[5],
    short_description: 'Sub-249g folding mini drone with Omnidirectional Obstacle Sensing and 4K/60fps HDR True Vertical Shooting.',
    full_description: 'Mini to the Max: Features omnidirectional obstacle sensing, 4K/60fps HDR video, 20km FHD video transmission, ActiveTrack 360, and up to 45 minutes flight time with the Intelligent Flight Battery Plus.',
    full_description_bn: '২৪৯ গ্রামের কম ওজনের ভাঁজযোগ্য ড্রোন, সর্বমুখী বাধা শনাক্তকরণ সেন্সর এবং ৪কে ৬০এফপিএস এইচডিআর ভিডিও।',
    regular_price: 145000,
    sale_price: 138000,
    stock_quantity: 7,
    stock_status: 'in_stock',
    warranty: '1 Year Official Brand Warranty',
    is_featured: true,
    status: 'published',
    tags: ['dji', 'drone', '4k', 'photography', 'creator'],
    specifications: [
      { key: 'Takeoff Weight', value: '< 249g Regulatory Friendly' },
      { key: 'Flight Time', value: 'Up to 45 mins with Battery Plus' },
      { key: 'Video Resolution', value: '4K/60fps HDR, 4K/100fps Slow Motion' },
      { key: 'Transmission Range', value: 'DJI O4 up to 20km FHD' },
    ],
    images: [
      {
        id: 'img-4',
        product_id: 'prod-dji-mini-4-pro',
        image_url: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1000&auto=format&fit=crop',
        alt_text: 'DJI Mini 4 Pro Drone in Flight',
        is_primary: true,
        sort_order: 1,
      },
    ],
    variants: [],
    categories: [initialCategories[7]],
    rating: 5.0,
    review_count: 19,
    created_at: new Date().toISOString(),
  },
];

// Initial navigation menu according to Section 3:
// Home, Shop, Categories, New Arrivals, Best Sellers, Special Offers, Contact Us
const initialMenus: MenuItem[] = [
  {
    id: 'm-home',
    menu_id: 'm-main',
    title: 'Home',
    title_bn: 'হোম',
    url: '/',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'm-shop',
    menu_id: 'm-main',
    title: 'Shop',
    title_bn: 'শপ',
    url: '/products',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'm-categories',
    menu_id: 'm-main',
    title: 'Categories',
    title_bn: 'ক্যাটাগরি',
    url: '/products#categories',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'm-new-arrivals',
    menu_id: 'm-main',
    title: 'New Arrivals',
    title_bn: 'নতুন গ্যাজেট',
    url: '/products?sort=latest',
    sort_order: 4,
    is_active: true,
  },
  {
    id: 'm-best-sellers',
    menu_id: 'm-main',
    title: 'Best Sellers',
    title_bn: 'জনপ্রিয় পণ্য',
    url: '/products?sort=best-selling',
    sort_order: 5,
    is_active: true,
  },
  {
    id: 'm-deals',
    menu_id: 'm-main',
    title: 'Special Offers',
    title_bn: 'বিশেষ অফার',
    url: '/deals',
    sort_order: 6,
    is_active: true,
  },
  {
    id: 'm-contact',
    menu_id: 'm-main',
    title: 'Contact Us',
    title_bn: 'যোগাযোগ',
    url: '/contact',
    sort_order: 7,
    is_active: true,
  },
];

const initialCoupons: Coupon[] = [
  {
    id: 'c-welcome10',
    code: 'WELCOME10',
    description: 'Get 10% discount on orders above ৳2,000 (Max ৳2,500)',
    discount_type: 'percentage',
    discount_value: 10,
    min_order_amount: 2000,
    max_discount_amount: 2500,
    usage_limit: 1000,
    usage_count: 14,
    is_active: true,
  },
  {
    id: 'c-nstech',
    code: 'NSTECH',
    description: '৳100 flat discount for NS TechSphere shoppers',
    discount_type: 'fixed',
    discount_value: 100,
    min_order_amount: 3000,
    max_discount_amount: 100,
    usage_limit: 500,
    usage_count: 8,
    is_active: true,
  },
];

const initialOrders: Order[] = [
  {
    id: 'ord-101',
    order_number: 'NS-20261125-4821',
    customer_name: 'Tanvir Hossain',
    customer_email: 'tanvir.dev@gmail.com',
    customer_phone: '+8801712345678',
    division: 'Dhaka',
    district: 'Dhaka',
    area: 'Gulshan-2',
    full_address: 'House 14, Road 45, Gulshan-2, Dhaka',
    order_notes: 'Please call before delivery',
    subtotal: 179900,
    discount: 2500,
    shipping_charge: 70,
    grand_total: 177470,
    order_status: 'processing',
    payment_status: 'unpaid',
    payment_method: 'cod',
    tracking_number: 'TRK-DH-84912',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    items: [
      {
        id: 'ord-item-1',
        order_id: 'ord-101',
        product_id: 'prod-iphone-16-pro-max',
        variant_id: 'var-1',
        product_name: 'iPhone 16 Pro Max 256GB - Titanium',
        variant_name: 'Natural Titanium / 256GB',
        sku: 'APL-IP16PM-256-NT',
        unit_price: 179900,
        quantity: 1,
        total_price: 179900,
        image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'ord-102',
    order_number: 'NS-20261124-9124',
    customer_name: 'Nusrat Jahan',
    customer_email: 'nusrat.jahan@hotmail.com',
    customer_phone: '+8801819876543',
    division: 'Chittagong',
    district: 'Chittagong',
    area: 'Nasirabad',
    full_address: 'Flat B3, Green Valley, Nasirabad, Chittagong',
    subtotal: 38900,
    discount: 0,
    shipping_charge: 130,
    grand_total: 39030,
    order_status: 'shipped',
    payment_status: 'unpaid',
    payment_method: 'cod',
    tracking_number: 'SA-CTG-55109',
    created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
    items: [
      {
        id: 'ord-item-2',
        order_id: 'ord-102',
        product_id: 'prod-sony-wh1000xm5',
        variant_id: 'var-sony-blk',
        product_name: 'Sony WH-1000XM5 Wireless Headphones',
        variant_name: 'Midnight Black',
        sku: 'SNY-WH1000XM5-BLK',
        unit_price: 38900,
        quantity: 1,
        total_price: 38900,
        image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop',
      },
    ],
  },
];

const initialReviews: Review[] = [
  {
    id: 'rev-1',
    product_id: 'prod-iphone-16-pro-max',
    customer_name: 'Rafiqul Islam',
    rating: 5,
    comment: 'Exceptional camera quality and battery life. Delivered within 24 hours in Dhaka with official warranty. Highly recommended from NS TechSphere!',
    is_approved: true,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'rev-2',
    product_id: 'prod-sony-wh1000xm5',
    customer_name: 'Sadia Akhter',
    rating: 5,
    comment: 'The active noise cancellation is pure magic for working in busy offices. The bass response is balanced and punchy.',
    is_approved: true,
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

const initialPages: StaticPage[] = [
  {
    id: 'page-about',
    title: 'About Us',
    title_bn: 'আমাদের সম্পর্কে',
    slug: 'about-us',
    content: 'NS TechSphere is your premier technology lifestyle and authentic electronics retailer in Bangladesh. Explore the World of Technology with genuine smart gadgets, mobile accessories, creator equipment, and computing peripherals backed by official brand warranty.',
    content_bn: 'এনএস টেকস্ফিয়ার (NS TechSphere) বাংলাদেশের শীর্ষস্থানীয় প্রিমিয়াম প্রযুক্তি লাইফস্টাইল ও অথেনটিক গ্যাজেট রিটেলার। অফিশিয়াল ব্র্যান্ড ওয়ারেন্টিসহ আধুনিক স্মার্ট গ্যাজেট, কম্পিউটার এক্সেসরিজ ও লাইফস্টাইল ইলেকট্রনিক্স সরবরাহ করাই আমাদের লক্ষ্য।',
    is_published: true,
    updated_at: new Date().toISOString(),
  },
  {
    id: 'page-shipping',
    title: 'Shipping & Delivery Policy',
    title_bn: 'ডেলিভারি পলিসি',
    slug: 'shipping-policy',
    content: 'Inside Dhaka City: Delivery Charge ৳70 (Estimated Delivery: 24–48 hours after order confirmation). Outside Dhaka: Delivery Charge ৳130 (Estimated Delivery: According to courier service and destination nationwide across Bangladesh).',
    content_bn: 'ঢাকা সিটির ভেতরে ডেলিভারি চার্জ ৳৭০ (আনুমানিক সময়: অর্ডার নিশ্চিতের পর ২৪–৪৮ ঘণ্টা)। ঢাকা সিটির বাইরে সারাদেশে ডেলিভারি চার্জ ৳১৩০ (কুরিয়ার সার্ভিস ও জেলা অনুযায়ী নির্ভরযোগ্য ডেলিভারি)।',
    is_published: true,
    updated_at: new Date().toISOString(),
  },
  {
    id: 'page-return',
    title: 'Return & Refund Policy',
    title_bn: 'রিটার্ন ও রিফান্ড নীতি',
    slug: 'return-policy',
    content: 'Customers can request a replacement or return within 7 calendar days of receipt if the product has manufacturing defects or does not match specifications.',
    content_bn: 'পণ্য প্রাপ্তির ৭ দিনের মধ্যে যে কোনো উৎপাদনগত ত্রুটি দেখা দিলে রিপ্লেসমেন্ট বা রিফান্ডের নিশ্চয়তা রয়েছে।',
    is_published: true,
    updated_at: new Date().toISOString(),
  },
  {
    id: 'page-terms',
    title: 'Terms & Conditions',
    title_bn: 'শর্তাবলী',
    slug: 'terms-and-conditions',
    content: 'All purchases made on NS TechSphere are subject to authentic inventory verification and standard consumer protection laws of Bangladesh.',
    content_bn: 'এনএস টেকস্ফিয়ারে কেনাকাটার সকল ক্ষেত্রে বাংলাদেশের প্রচলিত ই-কমার্স ও ভোক্তা অধিকার আইন প্রযোজ্য।',
    is_published: true,
    updated_at: new Date().toISOString(),
  },
  {
    id: 'page-privacy',
    title: 'Privacy Policy',
    title_bn: 'গোপনীয়তা নীতি',
    slug: 'privacy-policy',
    content: 'We value your privacy and implement strict technical and database measures to protect customer addresses, phone numbers, and transaction details.',
    content_bn: 'আমরা আপনার তথ্যের গোপনীয়তাকে সম্মান করি এবং কোনো ব্যক্তিগত তথ্য তৃতীয় পক্ষের কাছে হস্তান্তর করি না।',
    is_published: true,
    updated_at: new Date().toISOString(),
  },
];

const initialLogs: ActivityLog[] = [
  {
    id: 'log-1',
    user_email: 'admin@nstechsphere.store',
    action: 'SYSTEM_BOOT',
    entity_type: 'SYSTEM',
    entity_id: 'SYSTEM_INIT',
    details: { message: 'NS TechSphere E-Commerce platform initialized with full 9-category catalog' },
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

// Unified In-Memory and State Provider (Singleton)
class LocalDatabase {
  private products: Product[] = [...initialProducts];
  private categories: Category[] = [...initialCategories];
  private brands: Brand[] = [...initialBrands];
  private orders: Order[] = [...initialOrders];
  private menus: MenuItem[] = [...initialMenus];
  private coupons: Coupon[] = [...initialCoupons];
  private reviews: Review[] = [...initialReviews];
  private pages: StaticPage[] = [...initialPages];
  private logs: ActivityLog[] = [...initialLogs];
  private settings: WebsiteSettings = { ...initialSettings };

  // --- Products ---
  getProducts(): Product[] {
    return this.products.filter((p) => p.status === 'published');
  }

  getAllProductsAdmin(): Product[] {
    return this.products;
  }

  getProductBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug);
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  searchProducts(query: string): Product[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.getProducts();

    return this.products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.name_bn.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.brand?.name.toLowerCase().includes(q) ||
        p.categories.some((c) => c.name.toLowerCase().includes(q) || c.name_bn.toLowerCase().includes(q))
      );
    });
  }

  createProduct(data: Partial<Product>): Product {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: data.name || 'New Tech Device',
      name_bn: data.name_bn || data.name || 'নতুন টেক ডিভাইস',
      slug: data.slug || `product-${Date.now()}`,
      sku: data.sku || `SKU-${Date.now()}`,
      brand_id: data.brand_id,
      brand: this.brands.find((b) => b.id === data.brand_id),
      short_description: data.short_description || '',
      full_description: data.full_description || '',
      full_description_bn: data.full_description_bn || '',
      regular_price: Number(data.regular_price) || 0,
      sale_price: data.sale_price ? Number(data.sale_price) : null,
      stock_quantity: Number(data.stock_quantity) || 0,
      stock_status: (Number(data.stock_quantity) || 0) > 0 ? 'in_stock' : 'out_of_stock',
      warranty: data.warranty || '1 Year Official Brand Warranty',
      is_featured: !!data.is_featured,
      status: data.status || 'published',
      tags: data.tags || [],
      specifications: data.specifications || [],
      images: data.images || [
        {
          id: `img-${Date.now()}`,
          product_id: `prod-${Date.now()}`,
          image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop',
          is_primary: true,
          sort_order: 1,
        },
      ],
      variants: data.variants || [],
      categories: data.categories || [],
      created_at: new Date().toISOString(),
    };

    this.products.unshift(newProduct);
    this.logActivity('admin@nstechsphere.store', 'CREATE', 'PRODUCT', newProduct.id, { name: newProduct.name });
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    const existing = this.products[idx];
    const updated: Product = {
      ...existing,
      ...updates,
      brand: updates.brand_id ? this.brands.find((b) => b.id === updates.brand_id) : existing.brand,
    };

    this.products[idx] = updated;
    this.logActivity('admin@nstechsphere.store', 'UPDATE', 'PRODUCT', id, { name: updated.name });
    return updated;
  }

  deleteProduct(id: string): boolean {
    const before = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    if (this.products.length < before) {
      this.logActivity('admin@nstechsphere.store', 'DELETE', 'PRODUCT', id);
      return true;
    }
    return false;
  }

  // --- Categories ---
  getCategories(): Category[] {
    return this.categories;
  }

  getCategoryBySlug(slug: string): Category | undefined {
    return this.categories.find((c) => c.slug === slug);
  }

  createCategory(cat: Partial<Category>): Category {
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      parent_id: cat.parent_id || null,
      name: cat.name || 'New Category',
      name_bn: cat.name_bn || cat.name || 'নতুন ক্যাটাগরি',
      slug: cat.slug || `category-${Date.now()}`,
      description: cat.description || '',
      image_url: cat.image_url || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=800&auto=format&fit=crop',
      is_active: true,
      sort_order: this.categories.length + 1,
      subcategories: cat.subcategories || [],
    };
    this.categories.push(newCat);
    this.logActivity('admin@nstechsphere.store', 'CREATE', 'CATEGORY', newCat.id);
    return newCat;
  }

  updateCategory(id: string, updates: Partial<Category>): Category | null {
    const idx = this.categories.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.categories[idx] = { ...this.categories[idx], ...updates };
    return this.categories[idx];
  }

  deleteCategory(id: string): boolean {
    const before = this.categories.length;
    this.categories = this.categories.filter((c) => c.id !== id);
    return this.categories.length < before;
  }

  // --- Brands ---
  getBrands(): Brand[] {
    return this.brands;
  }

  createBrand(brand: Partial<Brand>): Brand {
    const newBrand: Brand = {
      id: `b-${Date.now()}`,
      name: brand.name || 'New Brand',
      slug: brand.slug || `brand-${Date.now()}`,
      logo_url: brand.logo_url || 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      description: brand.description || '',
      is_active: true,
      sort_order: this.brands.length + 1,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  updateBrand(id: string, updates: Partial<Brand>): Brand | null {
    const idx = this.brands.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    this.brands[idx] = { ...this.brands[idx], ...updates };
    return this.brands[idx];
  }

  // --- Orders ---
  getOrders(): Order[] {
    return this.orders;
  }

  getOrderByNumber(orderNumber: string): Order | undefined {
    return this.orders.find((o) => o.order_number === orderNumber);
  }

  createOrder(orderData: {
    customer_name: string;
    customer_email?: string;
    customer_phone: string;
    division: string;
    district: string;
    area: string;
    full_address: string;
    order_notes?: string;
    payment_method: Order['payment_method'];
    delivery_zone: 'inside_dhaka' | 'outside_dhaka';
    items: {
      productId: string;
      variantId?: string;
      quantity: number;
    }[];
    couponCode?: string;
  }): Order {
    let subtotal = 0;
    const orderItems: Order['items'] = [];

    // Server-side price calculation and stock validation
    for (const item of orderData.items) {
      const product = this.getProductById(item.productId);
      if (!product) continue;

      let unitPrice = product.sale_price ?? product.regular_price;
      let variantName: string | undefined;
      let sku = product.sku;

      if (item.variantId) {
        const variant = product.variants.find((v) => v.id === item.variantId);
        if (variant) {
          unitPrice = variant.price;
          variantName = variant.name;
          sku = variant.sku;
          // Deduct variant stock
          variant.stock = Math.max(0, variant.stock - item.quantity);
        }
      }

      // Deduct master stock
      product.stock_quantity = Math.max(0, product.stock_quantity - item.quantity);
      if (product.stock_quantity === 0) product.stock_status = 'out_of_stock';

      const totalPrice = unitPrice * item.quantity;
      subtotal += totalPrice;

      orderItems.push({
        id: `oi-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        order_id: '',
        product_id: product.id,
        variant_id: item.variantId,
        product_name: product.name,
        variant_name: variantName,
        sku,
        unit_price: unitPrice,
        quantity: item.quantity,
        total_price: totalPrice,
        image_url: product.images[0]?.image_url,
      });
    }

    // Shipping charge calculation (৳70 inside Dhaka, ৳130 outside Dhaka)
    const shippingCharge =
      orderData.delivery_zone === 'inside_dhaka'
        ? this.settings.shipping.inside_dhaka_fee
        : this.settings.shipping.outside_dhaka_fee;

    // Coupon discount calculation
    let discount = 0;
    if (orderData.couponCode) {
      const coupon = this.validateCoupon(orderData.couponCode, subtotal);
      if (coupon.valid && coupon.discount) {
        discount = coupon.discount;
      }
    }

    const grandTotal = Math.max(0, subtotal - discount + shippingCharge);
    const orderId = `ord-${Date.now()}`;
    const orderNumber = generateOrderNumber();

    orderItems.forEach((oi) => (oi.order_id = orderId));

    const newOrder: Order = {
      id: orderId,
      order_number: orderNumber,
      customer_name: orderData.customer_name,
      customer_email: orderData.customer_email,
      customer_phone: orderData.customer_phone,
      division: orderData.division,
      district: orderData.district,
      area: orderData.area,
      full_address: orderData.full_address,
      order_notes: orderData.order_notes,
      subtotal,
      discount,
      shipping_charge: shippingCharge,
      grand_total: grandTotal,
      order_status: 'pending',
      payment_status: 'unpaid',
      payment_method: orderData.payment_method,
      created_at: new Date().toISOString(),
      items: orderItems,
    };

    this.orders.unshift(newOrder);
    this.logActivity(orderData.customer_email || 'guest', 'PLACE_ORDER', 'ORDER', newOrder.order_number, {
      grand_total: grandTotal,
      items_count: orderItems.length,
    });

    return newOrder;
  }

  updateOrderStatus(orderId: string, status: OrderStatus): boolean {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return false;
    order.order_status = status;
    this.logActivity('admin@nstechsphere.store', 'UPDATE_STATUS', 'ORDER', order.order_number, { status });
    return true;
  }

  updateOrderPaymentStatus(orderId: string, status: PaymentStatus): boolean {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return false;
    order.payment_status = status;
    this.logActivity('admin@nstechsphere.store', 'UPDATE_PAYMENT', 'ORDER', order.order_number, { status });
    return true;
  }

  updateOrderTracking(orderId: string, trackingNumber: string): boolean {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return false;
    order.tracking_number = trackingNumber;
    return true;
  }

  // --- Coupons ---
  getCoupons(): Coupon[] {
    return this.coupons;
  }

  createCoupon(couponData: Partial<Coupon>): Coupon {
    const newCoupon: Coupon = {
      id: `c-${Date.now()}`,
      code: (couponData.code || 'NSTECH').toUpperCase().trim(),
      description: couponData.description || 'Special Discount Voucher',
      discount_type: couponData.discount_type || 'percentage',
      discount_value: Number(couponData.discount_value) || 10,
      min_order_amount: Number(couponData.min_order_amount) || 0,
      max_discount_amount: couponData.max_discount_amount ? Number(couponData.max_discount_amount) : undefined,
      usage_limit: couponData.usage_limit ? Number(couponData.usage_limit) : undefined,
      usage_count: 0,
      is_active: true,
      expires_at: couponData.expires_at,
    };
    this.coupons.push(newCoupon);
    return newCoupon;
  }

  deleteCoupon(id: string): boolean {
    const before = this.coupons.length;
    this.coupons = this.coupons.filter((c) => c.id !== id);
    return this.coupons.length < before;
  }

  validateCoupon(code: string, subtotal: number): { valid: boolean; message: string; discount?: number } {
    const cleanCode = code.toUpperCase().trim();
    const coupon = this.coupons.find((c) => c.code === cleanCode && c.is_active);

    if (!coupon) {
      return { valid: false, message: 'Invalid or expired coupon code' };
    }

    if (subtotal < coupon.min_order_amount) {
      return {
        valid: false,
        message: `Coupon requires minimum order of ৳${coupon.min_order_amount}`,
      };
    }

    let discount = 0;
    if (coupon.discount_type === 'percentage') {
      discount = (subtotal * coupon.discount_value) / 100;
      if (coupon.max_discount_amount && discount > coupon.max_discount_amount) {
        discount = coupon.max_discount_amount;
      }
    } else {
      discount = coupon.discount_value;
    }

    return { valid: true, message: 'Coupon applied successfully', discount };
  }

  // --- Menus ---
  getMenuItems(): MenuItem[] {
    return this.menus.sort((a, b) => a.sort_order - b.sort_order);
  }

  createMenuItem(item: Partial<MenuItem>): MenuItem {
    const newItem: MenuItem = {
      id: `m-${Date.now()}`,
      menu_id: 'm-main',
      title: item.title || 'New Link',
      title_bn: item.title_bn || item.title || 'নতুন লিংক',
      url: item.url || '/',
      sort_order: this.menus.length + 1,
      is_active: true,
    };
    this.menus.push(newItem);
    return newItem;
  }

  updateMenuItem(id: string, updates: Partial<MenuItem>): MenuItem | null {
    const idx = this.menus.findIndex((m) => m.id === id);
    if (idx === -1) return null;
    this.menus[idx] = { ...this.menus[idx], ...updates };
    return this.menus[idx];
  }

  deleteMenuItem(id: string): boolean {
    const before = this.menus.length;
    this.menus = this.menus.filter((m) => m.id !== id);
    return this.menus.length < before;
  }

  // --- Settings ---
  getSettings(): WebsiteSettings {
    return this.settings;
  }

  updateSettings(newSettings: Partial<WebsiteSettings>): WebsiteSettings {
    this.settings = {
      ...this.settings,
      ...newSettings,
      general: { ...this.settings.general, ...(newSettings.general || {}) },
      security: {
        admin_email: this.settings.security?.admin_email || 'admin@nstechsphere.store',
        admin_password: this.settings.security?.admin_password || 'admin',
        ...(newSettings.security || {}),
      },
      shipping: { ...this.settings.shipping, ...(newSettings.shipping || {}) },
      payment: { ...this.settings.payment, ...(newSettings.payment || {}) },
      social: { ...this.settings.social, ...(newSettings.social || {}) },
    };
    this.logActivity('admin@nstechsphere.store', 'UPDATE_SETTINGS', 'SYSTEM', 'CONFIG');
    return this.settings;
  }

  verifyAdminLogin(email: string, pass: string): boolean {
    const adminEmail = this.settings.security?.admin_email || 'admin@nstechsphere.store';
    const adminPass = this.settings.security?.admin_password || 'admin';
    return email.trim().toLowerCase() === adminEmail.trim().toLowerCase() && pass === adminPass;
  }

  updateAdminSecurity(email: string, newPass?: string): boolean {
    if (!this.settings.security) {
      this.settings.security = {
        admin_email: email,
        admin_password: newPass || 'admin',
      };
    } else {
      this.settings.security.admin_email = email;
      if (newPass) {
        this.settings.security.admin_password = newPass;
      }
    }
    this.logActivity(email, 'UPDATE_SECURITY', 'ADMIN_ACCOUNT', 'CREDENTIALS');
    return true;
  }

  // --- Reviews ---
  getReviewsByProduct(productId: string): Review[] {
    return this.reviews.filter((r) => r.product_id === productId && r.is_approved);
  }

  getAllReviewsAdmin(): Review[] {
    return this.reviews;
  }

  addReview(productId: string, customerName: string, rating: number, comment: string): Review {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      product_id: productId,
      customer_name: customerName,
      rating: Math.min(5, Math.max(1, rating)),
      comment,
      is_approved: true,
      created_at: new Date().toISOString(),
    };
    this.reviews.unshift(newReview);
    return newReview;
  }

  toggleReviewApproval(reviewId: string): boolean {
    const review = this.reviews.find((r) => r.id === reviewId);
    if (!review) return false;
    review.is_approved = !review.is_approved;
    return true;
  }

  // --- CMS Static Pages ---
  getPages(): StaticPage[] {
    return this.pages;
  }

  getPageBySlug(slug: string): StaticPage | undefined {
    return this.pages.find((p) => p.slug === slug);
  }

  updatePage(slug: string, updates: Partial<StaticPage>): StaticPage | null {
    const page = this.pages.find((p) => p.slug === slug);
    if (!page) return null;
    Object.assign(page, updates, { updated_at: new Date().toISOString() });
    return page;
  }

  // --- Activity Logs ---
  getActivityLogs(): ActivityLog[] {
    return this.logs;
  }

  private logActivity(
    user_email: string,
    action: string,
    entity_type: string,
    entity_id: string,
    details?: Record<string, any>
  ) {
    this.logs.unshift({
      id: `log-${Date.now()}`,
      user_email,
      action,
      entity_type,
      entity_id,
      details,
      created_at: new Date().toISOString(),
    });
  }
}

// Global persistent instance in Node runtime
const globalForDb = globalThis as unknown as { localDb: LocalDatabase };
export const db = globalForDb.localDb || new LocalDatabase();
if (process.env.NODE_ENV !== 'production') globalForDb.localDb = db;
