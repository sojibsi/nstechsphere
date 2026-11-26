'use client';

import React, { useState, useEffect } from 'react';
import { WebsiteSettings } from '@/types';
import { useApp } from '@/lib/context/app-context';
import { Settings, Save, ShieldCheck, CheckCircle2, Lock, KeyRound, ShieldAlert } from 'lucide-react';

export default function AdminSettingsPage() {
  const { settings: globalSettings, updateSettingsState, showToast } = useApp();
  const [settings, setSettings] = useState<WebsiteSettings>(globalSettings);
  const [isSaving, setIsSaving] = useState(false);

  // Security credentials state
  const [securityEmail, setSecurityEmail] = useState('admin@nstechsphere.store');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingSecurity, setIsUpdatingSecurity] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setSettings(data);
      });

    fetch('/api/admin/security')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.admin_email) setSecurityEmail(data.admin_email);
      });
  }, []);

  const handleSecuritySave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      showToast('New passwords do not match!', 'error');
      return;
    }
    setIsUpdatingSecurity(true);
    try {
      const res = await fetch('/api/admin/security', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: securityEmail.trim(),
          currentPassword,
          newPassword: newPassword || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Admin email and password updated successfully!', 'success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        try {
          const auth = JSON.parse(localStorage.getItem('ns_admin_auth') || '{}');
          auth.email = data.admin_email;
          localStorage.setItem('ns_admin_auth', JSON.stringify(auth));
        } catch {}
      } else {
        showToast(data.message || 'Failed to update credentials', 'error');
      }
    } catch {
      showToast('Error communicating with security service', 'error');
    } finally {
      setIsUpdatingSecurity(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        const updated = await res.json();
        updateSettingsState(updated);
        showToast('Settings saved and synchronized across storefront!', 'success');
      }
    } catch {
      showToast('Failed to save settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
          Centralized Website Settings
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Modify the brand identity, WhatsApp support line, delivery charges, and commerce configuration dynamically.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 w-full">
        {/* 1. General & Brand */}
        <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-4 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Brand Identity & Contact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Website Brand Name *
              </label>
              <input
                type="text"
                value={settings.general.brand_name}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, brand_name: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Tagline / Slogan
              </label>
              <input
                type="text"
                value={settings.general.tagline}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, tagline: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                WhatsApp Support Number
              </label>
              <input
                type="text"
                value={settings.general.whatsapp}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, whatsapp: e.target.value },
                  })
                }
                placeholder="01642603236"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Customer Care Helpline
              </label>
              <input
                type="text"
                value={settings.general.phone}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, phone: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={settings.general.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, email: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-500 block mb-1">
              Store / Business Address
            </label>
            <input
              type="text"
              value={settings.general.address}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, address: e.target.value },
                })
              }
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-500 block mb-1">
              Brand Logo URL & Live Preview
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 shadow-md ring-2 ring-amber-400/50 bg-white dark:bg-neutral-900 p-0.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={settings.general.logo_url || '/images/logo.png'}
                  alt="Logo Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <input
                type="text"
                value={settings.general.logo_url || '/images/logo.png'}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, logo_url: e.target.value },
                  })
                }
                placeholder="/images/logo.png"
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* 2. Commerce & Shipping */}
        <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-4 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Commerce & Delivery Charges
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Inside Dhaka Delivery Fee (৳)
              </label>
              <input
                type="number"
                value={settings.shipping.inside_dhaka_fee}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    shipping: {
                      ...settings.shipping,
                      inside_dhaka_fee: Number(e.target.value),
                    },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none font-mono"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Outside Dhaka Delivery Fee (৳)
              </label>
              <input
                type="number"
                value={settings.shipping.outside_dhaka_fee}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    shipping: {
                      ...settings.shipping,
                      outside_dhaka_fee: Number(e.target.value),
                    },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none font-mono"
                required
              />
            </div>
          </div>
        </div>

        {/* 3. Social Media Links */}
        <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-4 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Social Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Facebook Page URL
              </label>
              <input
                type="url"
                value={settings.social.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, facebook: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.social.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, instagram: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                YouTube URL
              </label>
              <input
                type="url"
                value={settings.social.youtube}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, youtube: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-smooth shadow-md disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Synchronizing...' : 'Save Settings'}</span>
        </button>
      </form>

      {/* 5. Dedicated Super Admin Security & Password Management */}
      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-5 shadow-sm">
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-foreground border border-neutral-200 dark:border-neutral-800">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Control Room Security & Admin Password
              </h2>
              <p className="text-xs text-neutral-400">
                Change your Super Admin email address and password for logging into the secure Control Room.
              </p>
            </div>
          </div>

          <form onSubmit={handleSecuritySave} className="space-y-4 max-w-2xl">
            <div>
              <label className="text-xs font-semibold text-neutral-500 block mb-1">
                Admin Email Address *
              </label>
              <input
                type="email"
                value={securityEmail}
                onChange={(e) => setSecurityEmail(e.target.value)}
                required
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Required to change pass"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave blank to keep"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new pass"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background text-foreground outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpdatingSecurity}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-smooth shadow-md disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isUpdatingSecurity ? 'Updating...' : 'Update Admin Credentials'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
