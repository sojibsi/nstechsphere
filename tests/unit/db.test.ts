import { describe, it, expect } from 'vitest';
import { db } from '@/lib/store/local-db';

describe('Local Database & Business Logic Engine', () => {
  it('retrieves published products catalog', () => {
    const products = db.getProducts();
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('sku');
    expect(products[0]).toHaveProperty('regular_price');
  });

  it('searches products by brand, tag, SKU, and name', () => {
    const iphoneSearch = db.searchProducts('iPhone');
    expect(iphoneSearch.length).toBeGreaterThan(0);
    expect(iphoneSearch[0].slug).toContain('iphone');

    const skuSearch = db.searchProducts('APL-IP16PM-256');
    expect(skuSearch.length).toBe(1);

    const sonySearch = db.searchProducts('Sony');
    expect(sonySearch.length).toBeGreaterThan(0);
  });

  it('validates coupons and applies correct discount caps', () => {
    // WELCOME10: 10% off min ৳2,000 max ৳2,500
    const validResult = db.validateCoupon('WELCOME10', 5000);
    expect(validResult.valid).toBe(true);
    expect(validResult.discount).toBe(500);

    const cappedResult = db.validateCoupon('WELCOME10', 50000);
    expect(cappedResult.valid).toBe(true);
    expect(cappedResult.discount).toBe(2500); // capped at 2500

    const belowMinResult = db.validateCoupon('WELCOME10', 1000);
    expect(belowMinResult.valid).toBe(false);

    const invalidResult = db.validateCoupon('FAKE_CODE_2026', 10000);
    expect(invalidResult.valid).toBe(false);
  });

  it('updates website settings and maintains integrity', () => {
    const updated = db.updateSettings({
      general: {
        brand_name: 'Gadget & Gear BD',
        tagline: 'Authentic Flagship Tech',
        email: 'info@gadgetgear.com.bd',
        phone: '+880 9612 111 222',
        whatsapp: '+8801700000000',
        address: 'Dhaka, Bangladesh',
        currency: 'BDT',
        currency_symbol: '৳',
      },
    });

    expect(updated.general.brand_name).toBe('Gadget & Gear BD');
    expect(db.getSettings().general.brand_name).toBe('Gadget & Gear BD');
  });
});
