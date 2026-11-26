export type Language = 'en' | 'bn';
export type Theme = 'light' | 'dark';

export interface WebsiteSettings {
  general: {
    brand_name: string;
    tagline: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    currency: string;
    currency_symbol: string;
    logo_url?: string;
  };
  security?: {
    admin_email: string;
    admin_password?: string;
  };
  shipping: {
    inside_dhaka_fee: number;
    outside_dhaka_fee: number;
    free_shipping_threshold: number;
  };
  payment: {
    cod_enabled: boolean;
    bkash_enabled: boolean;
    nagad_enabled: boolean;
    sslcommerz_enabled: boolean;
  };
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  description: string;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
}

export interface Category {
  id: string;
  parent_id?: string | null;
  name: string;
  name_bn: string;
  slug: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
  subcategories?: Category[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  name: string;
  attributes: Record<string, string>;
  price: number;
  stock: number;
  is_active: boolean;
  image_url?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order: number;
}

export interface SpecificationItem {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  name_bn: string;
  slug: string;
  sku: string;
  brand_id?: string;
  brand?: Brand;
  short_description?: string;
  full_description: string;
  full_description_bn: string;
  regular_price: number;
  sale_price?: number | null;
  stock_quantity: number;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  warranty?: string;
  is_featured: boolean;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  specifications: SpecificationItem[];
  seo_title?: string;
  seo_description?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  categories: Category[];
  rating?: number;
  review_count?: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  menu_id: string;
  parent_id?: string | null;
  title: string;
  title_bn: string;
  url: string;
  target?: string;
  sort_order: number;
  is_active: boolean;
  children?: MenuItem[];
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shippingCharge: number;
  discount: number;
  couponCode?: string;
  grandTotal: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'sslcommerz';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string;
  product_name: string;
  variant_name?: string;
  sku: string;
  unit_price: number;
  quantity: number;
  total_price: number;
  image_url?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  division: string;
  district: string;
  area: string;
  full_address: string;
  order_notes?: string;
  subtotal: number;
  discount: number;
  shipping_charge: number;
  grand_total: number;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  tracking_number?: string;
  internal_notes?: string;
  created_at: string;
  items: OrderItem[];
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount?: number;
  usage_limit?: number;
  usage_count: number;
  is_active: boolean;
  expires_at?: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id?: string;
  customer_name: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'customer' | 'staff' | 'super_admin';
  created_at: string;
}

export interface StaticPage {
  id: string;
  title: string;
  title_bn: string;
  slug: string;
  content: string;
  content_bn: string;
  is_published: boolean;
  meta_title?: string;
  meta_description?: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id?: string;
  user_email?: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details?: Record<string, any>;
  created_at: string;
}
