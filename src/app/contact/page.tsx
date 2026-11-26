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
              <span>Helpline: {settings.general.phone}</span>
            </div>

            <a
              href={`https://wa.me/8801642603236?text=${encodeURIComponent('Hello NS TechSphere, I would like to inquire about a product.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp: 01642603236 (Direct Chat)</span>
            </a>

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
