'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { settings, showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showToast('Your message has been dispatched to our support team.', 'success');
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Contact Customer Care
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          We are ready to assist you with inquiries regarding device availability, warranty claims, and order delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Headquarters & Support
          </h2>

          <div className="space-y-4 text-xs text-neutral-500">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
              <span>{settings.general.address}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-foreground shrink-0" />
              <span>{settings.general.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-foreground shrink-0" />
              <span>{settings.general.email}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-400 leading-normal">
            Operational Hours: Saturday - Thursday (10:00 AM - 8:00 PM BST). Closed on official national holidays.
          </div>
        </div>

        {/* Contact Message Form */}
        <div className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/60 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-foreground mx-auto" />
              <h3 className="text-sm font-bold text-foreground">Message Received</h3>
              <p className="text-xs text-neutral-400">
                A member of our technical team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  Message Details
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Specify product SKU or order number if applicable..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-smooth flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
