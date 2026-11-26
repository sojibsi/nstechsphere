'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageCircle,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  HelpCircle,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const { settings, showToast, language } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order Inquiry');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitted(true);
    showToast('Your inquiry has been registered. Our support engineers will contact you shortly.', 'success');
  };

  const whatsappDirectUrl = `https://wa.me/8801642603236?text=${encodeURIComponent(
    'Hello NS TechSphere Support, I would like to make an inquiry.'
  )}`;

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Support & Help Center</span>
      </nav>

      {/* Hero Header */}
      <div className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 liquid-glass-elevated p-6 sm:p-10 relative overflow-hidden space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-black/5 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-foreground">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Customer First Support</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
          Support & Help Center
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Need assistance with genuine device selection, warranty claims, or delivery tracking? Our expert tech support team is here to assist you 7 days a week.
        </p>
      </div>

      {/* 4 Contact Channels Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Helpline */}
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Phone Helpline</h3>
          <p className="text-base font-bold text-foreground">01642603236</p>
          <p className="text-xs text-neutral-400">10:00 AM – 10:00 PM (Everyday)</p>
        </div>

        {/* WhatsApp */}
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center font-bold">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">WhatsApp Chat</h3>
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noreferrer"
            className="text-base font-bold text-emerald-600 dark:text-emerald-400 hover:underline block"
          >
            01642603236 ↗
          </a>
          <p className="text-xs text-neutral-400">Instant response & photo sharing</p>
        </div>

        {/* Email */}
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Email Support</h3>
          <p className="text-xs font-bold text-foreground truncate">support@nstechsphere.store</p>
          <p className="text-xs text-neutral-400">Response within 4–6 business hours</p>
        </div>

        {/* Office */}
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-2">
          <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-foreground">Headquarters</h3>
          <p className="text-xs font-bold text-foreground">Motijheel C/A, Dhaka</p>
          <p className="text-xs text-neutral-400">Dhaka 1000, Bangladesh</p>
        </div>
      </div>

      {/* Quick Self-Service Links */}
      <div className="p-5 sm:p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400">
          Fast Self-Service Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/track-order"
            className="p-3.5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-all flex items-center justify-between group border border-neutral-200/60 dark:border-neutral-800"
          >
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-foreground" />
              <span className="text-xs font-bold text-foreground">Track Your Order</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/return-policy"
            className="p-3.5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-all flex items-center justify-between group border border-neutral-200/60 dark:border-neutral-800"
          >
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-foreground" />
              <span className="text-xs font-bold text-foreground">7-Day Return & Replacement</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/shipping-policy"
            className="p-3.5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-all flex items-center justify-between group border border-neutral-200/60 dark:border-neutral-800"
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-foreground" />
              <span className="text-xs font-bold text-foreground">Delivery Rates & Policy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Contact Form & Support Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Support Information (Left 1 Col) */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass space-y-6">
          <div>
            <h3 className="text-base font-black text-foreground">Direct Assistance</h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Prefer instant live conversation? Connect with our dedicated representatives via WhatsApp for priority service.
            </p>
          </div>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-2xl bg-[#25D366] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:opacity-90 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-foreground">Operating Schedule</p>
                <p className="text-neutral-400">Saturday – Thursday: 10:00 AM – 10:00 PM</p>
                <p className="text-neutral-400">Friday: 2:00 PM – 10:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-foreground">Authorized Warranty Support</p>
                <p className="text-neutral-400">Full manufacturer replacement support across Bangladesh.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Interactive Contact Form (Right 2 Cols) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 liquid-glass-elevated shadow-xl">
          {submitted ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-foreground">Inquiry Successfully Dispatched</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Thank you, {name}. A member of our support team will review your message and contact you via phone or email shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl liquid-glass-btn text-xs font-bold text-foreground"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-black text-foreground">Send an Official Message</h3>
                <p className="text-xs text-neutral-400">
                  Fill in your details and message below; we typically reply within a few hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 text-foreground outline-none focus:border-black dark:focus:border-white transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300 block mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 017XXXXXXXX"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 text-foreground outline-none focus:border-black dark:focus:border-white transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300 block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 text-foreground outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300 block mb-1">
                    Topic of Inquiry
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 text-foreground outline-none focus:border-black dark:focus:border-white transition-colors cursor-pointer"
                  >
                    <option value="Order Inquiry">Order & Shipment Inquiry</option>
                    <option value="Product Availability">Product Stock & Specs</option>
                    <option value="Warranty Claim">Warranty or Replacement</option>
                    <option value="Payment Issue">Payment Verification</option>
                    <option value="Corporate Order">Corporate Bulk Purchase</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300 block mb-1">
                  Order Reference Number (If applicable)
                </label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. NS-20261125-XXXX"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 text-foreground outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300 block mb-1">
                  Detailed Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Describe your inquiry, device model, or issue in detail..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 text-foreground outline-none resize-none focus:border-black dark:focus:border-white transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Support Ticket</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
