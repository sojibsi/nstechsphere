'use client';

import React, { useState, useEffect } from 'react';
import { Product, ProductVariant, Review } from '@/types';
import { useApp } from '@/lib/context/app-context';
import { formatPrice } from '@/lib/utils';
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Check,
  Share2,
  Clock,
  Lock,
  Box,
  BadgeCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProductCard } from '@/components/storefront/ProductCard';

interface Props {
  product: Product;
  relatedProducts: Product[];
  initialReviews: Review[];
}

export function ProductDetailsClient({
  product,
  relatedProducts,
  initialReviews,
}: Props) {
  const { language, settings, addToCart, wishlist, toggleWishlist, t, showToast } = useApp();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<string>(
    product.images[0]?.image_url || '/placeholder.png'
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Review submission state
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const displayName = language === 'bn' ? product.name_bn || product.name : product.name;
  const displayDescription =
    language === 'bn' ? product.full_description_bn || product.full_description : product.full_description;

  const currentPrice = selectedVariant
    ? selectedVariant.price
    : product.sale_price ?? product.regular_price;
  const currentSku = selectedVariant ? selectedVariant.sku : product.sku;
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock_quantity;
  const hasDiscount =
    !selectedVariant && product.sale_price && product.sale_price < product.regular_price;
  const discountPercent = hasDiscount
    ? Math.round(((product.regular_price - product.sale_price!) / product.regular_price) * 100)
    : 0;

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    router.push('/checkout');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} at Gadget & Gear Bangladesh`,
          url: window.location.href,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) {
      showToast('Please provide your name and review comment', 'error');
      return;
    }

    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customerName: reviewerName.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews([newReview, ...reviews]);
        setReviewerName('');
        setComment('');
        showToast(
          language === 'bn' ? 'আপনার মতামত সফলভাবে জমা হয়েছে' : 'Review submitted successfully!',
          'success'
        );
      }
    } catch {
      showToast('Failed to submit review', 'error');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 space-y-16">
      {/* Product Top Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 overflow-hidden shadow-subtle group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-black tracking-wider uppercase shadow-md">
                Save {discountPercent}%
              </span>
            )}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 rounded-full liquid-glass border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-foreground transition-all shadow-sm"
              title="Share Device"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.image_url)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img.image_url
                      ? 'border-black dark:border-white shadow-md'
                      : 'border-neutral-200 dark:border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details & Actions */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
              <span className="flex items-center gap-1.5 text-foreground">
                <BadgeCheck className="w-4 h-4" />
                <span>{product.brand?.name || 'Authentic'}</span>
              </span>
              <span className="font-mono text-[11px]">SKU: {currentSku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              {displayName}
            </h1>

            {/* Ratings & Authenticity Tag */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-foreground" />
                  ))}
                </div>
                <span>({reviews.length} customer reviews)</span>
              </div>
              <span className="text-neutral-400">•</span>
              <span className="text-xs text-neutral-500 font-medium">100% Genuine Sealed Unit</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                {formatPrice(currentPrice, settings.general.currency_symbol)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-neutral-400 line-through">
                  {formatPrice(product.regular_price, settings.general.currency_symbol)}
                </span>
              )}
            </div>
            <div className="text-xs text-neutral-500 flex items-center gap-1.5 pt-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>
                Order within <strong className="text-foreground">3 hours</strong> for same-day dispatch inside Dhaka
              </span>
            </div>
          </div>

          {/* Stock Availability */}
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                currentStock > 0 ? 'bg-black dark:bg-white animate-pulse' : 'bg-red-500'
              }`}
            />
            <span className="text-xs font-bold uppercase tracking-wide">
              {currentStock > 0 ? `${t.inStock} (${currentStock} units ready for delivery)` : t.outOfStock}
            </span>
          </div>

          {/* Variants Selector */}
          {product.variants.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Choose Configuration / Edition:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-sm'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 text-neutral-600 dark:text-neutral-300'
                      }`}
                    >
                      {variant.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Buying Buttons */}
          <div className="space-y-3.5 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-xl overflow-hidden bg-background">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-sm text-neutral-500 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2.5 text-xs font-bold text-center min-w-[36px]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  className="px-3.5 py-2.5 text-sm text-neutral-500 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors ${
                  isWishlisted ? 'text-black dark:text-white' : 'text-neutral-400'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <button
                onClick={() => addToCart(product, quantity, selectedVariant)}
                disabled={currentStock <= 0}
                className="w-full py-4 px-6 rounded-full border-2 border-black dark:border-white text-foreground hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.addToCart}</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={currentStock <= 0}
                className="w-full py-4 px-6 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-40"
              >
                <span>{t.buyNow}</span>
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-foreground shrink-0" />
              <span>{product.warranty || '1 Year Official Warranty'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-foreground shrink-0" />
              <span>24-48h Dhaka Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-foreground shrink-0" />
              <span>7-Day Return Policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar on Scroll */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 shadow-2xl animate-in slide-in-from-bottom duration-200">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={selectedImage}
                alt=""
                className="w-11 h-11 object-cover rounded-lg border border-neutral-200 dark:border-neutral-800 shrink-0"
              />
              <div className="min-w-0 hidden sm:block">
                <div className="text-xs font-bold text-foreground truncate">{displayName}</div>
                <div className="text-[11px] font-extrabold text-foreground">
                  {formatPrice(currentPrice, settings.general.currency_symbol)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => addToCart(product, quantity, selectedVariant)}
                disabled={currentStock <= 0}
                className="px-5 py-2.5 rounded-full border border-black dark:border-white text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                {t.addToCart}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={currentStock <= 0}
                className="px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow-md"
              >
                {t.buyNow}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Description & Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-foreground">Device Overview & Details</h2>
          <div className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed space-y-4">
            <p>{displayDescription}</p>
          </div>

          {/* Technical Specifications */}
          {product.specifications.length > 0 && (
            <div className="pt-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                {t.specifications}
              </h3>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-subtle">
                <table className="w-full text-xs">
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr
                        key={i}
                        className={
                          i % 2 === 0
                            ? 'bg-neutral-50/50 dark:bg-neutral-900/40'
                            : 'bg-transparent'
                        }
                      >
                        <td className="py-3 px-4 font-semibold text-neutral-500 w-1/3 border-b border-neutral-200/50 dark:border-neutral-800/50">
                          {spec.key}
                        </td>
                        <td className="py-3 px-4 text-foreground font-medium border-b border-neutral-200/50 dark:border-neutral-800/50">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Customer Reviews & Submit Form */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">{t.reviews}</h2>

          {/* Submit Review Box */}
          <form
            onSubmit={handleReviewSubmit}
            className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-4 shadow-subtle"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider">Leave a Review</h3>
            <div>
              <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="e.g. Tanvir Ahmed"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
              >
                <option value="5">★★★★★ (5/5 Exceptional)</option>
                <option value="4">★★★★☆ (4/5 Very Good)</option>
                <option value="3">★★★☆☆ (3/5 Average)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
                Review Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Share your experience with this gadget..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingReview}
              className="w-full py-2.5 px-4 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-smooth disabled:opacity-50"
            >
              {isSubmittingReview ? 'Submitting...' : t.submitReview}
            </button>
          </form>

          {/* Existing Reviews List */}
          <div className="space-y-3">
            {reviews.length === 0 ? (
              <p className="text-xs text-neutral-400">Be the first to review this product!</p>
            ) : (
              reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{r.customer_name}</span>
                    <div className="flex text-neutral-900 dark:text-neutral-100">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 leading-normal">{r.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
          <h2 className="text-2xl font-extrabold text-foreground">{t.relatedProducts}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
