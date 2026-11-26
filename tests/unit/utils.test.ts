import { describe, it, expect } from 'vitest';
import { formatPrice, slugify, generateOrderNumber } from '@/lib/utils';

describe('Utility Functions', () => {
  it('formats BDT currency correctly with symbol', () => {
    expect(formatPrice(179900, '৳')).toBe('৳179,900');
    expect(formatPrice(0, '৳')).toBe('৳0');
    expect(formatPrice(60, '৳')).toBe('৳60');
  });

  it('slugifies product names and strings cleanly', () => {
    expect(slugify('iPhone 16 Pro Max 256GB - Titanium')).toBe('iphone-16-pro-max-256gb-titanium');
    expect(slugify('Sony WH-1000XM5 Wireless Headphones!')).toBe('sony-wh-1000xm5-wireless-headphones');
  });

  it('generates unique format order numbers matching NS-YYYYMMDD-XXXX or custom prefix', () => {
    const orderNum = generateOrderNumber();
    expect(orderNum).toMatch(/^(NS|GG)-\d{8}-\d{4}$/);
  });
});
