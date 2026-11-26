import { db } from '@/lib/store/local-db';
import { notFound } from 'next/navigation';
import { ProductDetailsClient } from './ProductDetailsClient';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = db.getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found | Gadget & Gear' };
  }

  const price = product.sale_price ?? product.regular_price;
  const title = `${product.name} - Price in Bangladesh (৳${price.toLocaleString()})`;
  const description =
    product.short_description ||
    `${product.name} available at Gadget & Gear Bangladesh. 100% authentic with ${product.warranty || 'Official Brand Warranty'} and cash on delivery.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      `${product.name} price in bd`,
      `${product.brand?.name} Bangladesh`,
      product.sku,
      ...product.tags,
    ],
    alternates: {
      canonical: `${siteUrl}/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/products/${product.slug}`,
      siteName: 'Gadget & Gear Bangladesh',
      images: [
        {
          url: product.images[0]?.image_url || '/placeholder.png',
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.images[0]?.image_url || '/placeholder.png'],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = db.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or brand
  const relatedProducts = db
    .getProducts()
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.brand_id === product.brand_id ||
          p.categories.some((c) => product.categories.some((pc) => pc.id === c.id)))
    )
    .slice(0, 4);

  const initialReviews = db.getReviewsByProduct(product.id);

  const breadcrumbs = [
    { name: 'Home', url: siteUrl },
    {
      name: product.categories[0]?.name || 'Products',
      url: `${siteUrl}/category/${product.categories[0]?.slug || 'products'}`,
    },
    { name: product.name, url: `${siteUrl}/products/${product.slug}` },
  ];

  return (
    <>
      <ProductJsonLd product={product} url={siteUrl} currency="BDT" />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ProductDetailsClient
        product={product}
        relatedProducts={relatedProducts}
        initialReviews={initialReviews}
      />
    </>
  );
}
