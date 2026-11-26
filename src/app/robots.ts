import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nstechsphere.store';
  const adminRoute = process.env.NEXT_PUBLIC_ADMIN_ROUTE || '/control-room-x7k9';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          `${adminRoute}/`,
          '/account/',
          '/checkout/',
          '/order-confirmation/',
          '/api/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
