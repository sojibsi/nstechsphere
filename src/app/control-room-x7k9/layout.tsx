'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Menu as MenuIcon,
  ShoppingBag,
  Sliders,
  DollarSign,
  Tag,
  Star,
  Users,
  Settings,
  FileText,
  Activity,
  LogOut,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Boxes,
  Compass,
  Bell,
  Search,
  CircleDot,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminEmail, setAdminEmail] = useState('admin@nstechsphere.store');

  // Login form state
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check existing session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ns_admin_auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.token && parsed?.email) {
          setIsAuthenticated(true);
          setAdminEmail(parsed.email);
          return;
        }
      }
    } catch {}
    setIsAuthenticated(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inputEmail.trim(), password: inputPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem(
          'ns_admin_auth',
          JSON.stringify({ token: data.token, email: data.adminEmail })
        );
        setAdminEmail(data.adminEmail);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.message || 'Authentication failed. Incorrect email or password.');
      }
    } catch {
      setLoginError('Unable to connect to authentication server. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('ns_admin_auth');
    } catch {}
    setIsAuthenticated(false);
    setInputPassword('');
  };

  const adminBase = '/control-room-x7k9';

  // While checking initial authentication session
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-neutral-700 border-t-white animate-spin" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Verifying Control Room Access...
          </span>
        </div>
      </div>
    );
  }

  // If NOT authenticated, show the secure Admin Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-12 selection:bg-white selection:text-black">
        <div className="w-full max-w-md space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden shadow-2xl ring-1 ring-neutral-700 bg-white p-1">
              <Image
                src="/images/ns-logo.jpg"
                alt="NS TechSphere"
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-full"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight uppercase">
                NS TechSphere
              </h1>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono font-semibold text-neutral-300 mt-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Control Room • Restricted Access</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto">
              Please enter your authorized Super Admin credentials to proceed.
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl space-y-5">
            {loginError && (
              <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="admin@nstechsphere.store"
                    className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-neutral-800 bg-neutral-900 text-white placeholder-neutral-500 focus:border-white focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                  Admin Password
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs pl-10 pr-10 py-3 rounded-xl border border-neutral-800 bg-neutral-900 text-white placeholder-neutral-500 focus:border-white focus:outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-neutral-400 hover:text-white p-1 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 active:scale-[0.98] transition-all disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-neutral-400 border-t-black animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize & Enter</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center text-[11px] text-neutral-500">
            Protected by NS TechSphere Multi-layer Firewall
          </div>
        </div>
      </div>
    );
  }

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [{ label: 'Dashboard', href: adminBase, icon: LayoutDashboard }],
    },
    {
      title: 'CATALOG & INVENTORY',
      items: [
        { label: 'Products', href: `${adminBase}/products`, icon: Package },
        { label: 'Categories', href: `${adminBase}/categories`, icon: Layers },
        { label: 'Brands', href: `${adminBase}/brands`, icon: Compass },
        { label: 'Inventory & Stock', href: `${adminBase}/inventory`, icon: Boxes },
      ],
    },
    {
      title: 'COMMERCE & ORDERS',
      items: [
        { label: 'Orders & Sales', href: `${adminBase}/orders`, icon: ShoppingBag },
        { label: 'Coupons & Promos', href: `${adminBase}/coupons`, icon: Tag },
        { label: 'Reviews Moderation', href: `${adminBase}/reviews`, icon: Star },
      ],
    },
    {
      title: 'WEBSITE & CMS',
      items: [
        { label: 'Navigation Menus', href: `${adminBase}/menus`, icon: MenuIcon },
        { label: 'CMS Static Pages', href: `${adminBase}/pages`, icon: FileText },
        { label: 'Activity Logs', href: `${adminBase}/activity-logs`, icon: Activity },
        { label: 'Website Settings', href: `${adminBase}/settings`, icon: Settings },
      ],
    },
  ];

  // Derive current page title for breadcrumb
  let currentPageTitle = 'Dashboard';
  for (const group of navGroups) {
    const match = group.items.find((i) => i.href === pathname);
    if (match) {
      currentPageTitle = match.label;
      break;
    }
  }

  return (
    <div className="min-h-screen flex bg-neutral-100 dark:bg-black text-foreground antialiased selection:bg-neutral-800 selection:text-white dark:selection:bg-neutral-200 dark:selection:text-black">
      {/* Admin Sidebar */}
      <aside
        className={`sticky top-0 h-screen border-r border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-950 flex flex-col transition-all duration-300 z-30 shrink-0 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand / Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-800/80">
          {!isSidebarCollapsed ? (
            <Link href={adminBase} className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 shadow-sm ring-1 ring-neutral-300 dark:ring-neutral-700 bg-white dark:bg-neutral-900 p-0.5">
                <Image
                  src="/images/ns-logo.jpg"
                  alt="NS TechSphere"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-xs tracking-wider uppercase text-foreground truncate">
                  NS TechSphere
                </span>
                <span className="text-[10px] text-neutral-500 font-mono font-semibold">
                  Control Room
                </span>
              </div>
            </Link>
          ) : (
            <Link href={adminBase} className="mx-auto">
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm ring-1 ring-neutral-300 dark:ring-neutral-700 bg-white dark:bg-neutral-900 p-0.5">
                <Image
                  src="/images/ns-logo.jpg"
                  alt="NS TechSphere"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </Link>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-foreground transition-colors ml-1 shrink-0"
            title="Toggle Sidebar"
          >
            <MenuIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items with Section Headers */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-5 no-scrollbar">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5 font-mono">
                  {group.title}
                </div>
              )}
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                        : 'text-neutral-500 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer Link to Storefront & Logout */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800/80 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-500 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>View Storefront</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="font-semibold text-neutral-500">Admin</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-bold text-foreground">{currentPageTitle}</span>
          </div>

          {/* Right Status Actions */}
          <div className="flex items-center gap-4">
            {/* Live Server Operational Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-neutral-400">Authenticated</span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold text-xs shadow-sm">
                SA
              </div>
              <div className="hidden md:block text-left">
                <div className="font-bold text-foreground text-xs leading-none">
                  Super Administrator
                </div>
                <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                  {adminEmail}
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-red-500 hover:border-red-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Admin Body */}
        <main className="flex-1 p-6 sm:p-8 xl:p-10 w-full">{children}</main>
      </div>
    </div>
  );
}
