import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context/app-context';
import { ToastContainer } from '@/components/layout/ToastContainer';
import { StorefrontShell } from '@/components/layout/StorefrontShell';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';
import { db } from '@/lib/store/local-db';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nstechsphere.store';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NS TechSphere | Explore the World of Technology | Electronics & Gadgets Bangladesh',
    template: '%s | NS TechSphere',
  },
  description:
    'Explore the World of Technology with NS TechSphere. Shop premium electronics, smart gadgets, computer accessories, gaming gear, and tech accessories with official warranty and Cash on Delivery in Bangladesh.',
  keywords: [
    'NS TechSphere',
    'nstechsphere.store',
    'Explore the World of Technology',
    'Electronics Bangladesh',
    'Smart Gadgets BD',
    'Mobile Accessories Dhaka',
    'Gaming Accessories Bangladesh',
    'Computer & Laptop Accessories BD',
    'Smart Home Bangladesh',
    'Audio & Entertainment BD',
    'Cash on delivery gadgets BD',
  ],
  authors: [{ name: 'NS TechSphere' }],
  creator: 'NS TechSphere',
  publisher: 'NS TechSphere',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-BD': siteUrl,
      'bn-BD': `${siteUrl}?lang=bn`,
    },
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
    url: siteUrl,
    siteName: 'NS TechSphere',
    title: 'NS TechSphere | Explore the World of Technology',
    description:
      'Buy 100% authentic tech flagships, electronics, smart gadgets, and everyday technology essentials with official warranty and express delivery in Bangladesh.',
    images: [
      {
        url: `${siteUrl}/images/logo.png`,
        width: 800,
        height: 800,
        alt: 'NS TechSphere - Explore the World of Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NS TechSphere | Explore the World of Technology',
    description: 'Official tech devices, authentic brand warranty, express nationwide delivery.',
    images: [`${siteUrl}/images/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = db.getSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <OrganizationJsonLd settings={settings} url={siteUrl} />
        <WebSiteJsonLd url={siteUrl} name={settings.general.brand_name} />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-neutral-800 selection:text-white dark:selection:bg-neutral-200 dark:selection:text-black">
        <AppProvider>
          <StorefrontShell>{children}</StorefrontShell>
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
