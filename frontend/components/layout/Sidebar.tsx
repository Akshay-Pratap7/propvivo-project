'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCheck,
  CalendarDays,
  CalendarOff,
  Banknote,
  TrendingUp,
  Package,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Recruitment', href: '/recruitment', icon: UserPlus },
  { name: 'Onboarding', href: '/onboarding', icon: UserCheck },
  { name: 'Employee', href: '/team', icon: Users },
  { name: 'Attendance', href: '/attendance', icon: CalendarDays },
  { name: 'Leave', href: '/leave', icon: CalendarOff },
  { name: 'Payroll', href: '/payroll', icon: Banknote },
  { name: 'Performance', href: '/performance', icon: TrendingUp },
  { name: 'Assets', href: '/documents', icon: Package },
  { name: 'Projects', href: '/contributions', icon: FolderKanban },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <div
      className={`${
        isExpanded ? 'w-64' : 'w-20'
      } flex flex-col h-screen bg-white border-r border-slate-200 transition-all duration-300 relative shrink-0`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-100 h-16">
        {isExpanded ? (
          <span className="text-xl font-bold text-[#FF5A5F] tracking-tight truncate">WorkFlow HRMS</span>
        ) : (
          <span className="text-xl font-bold text-[#FF5A5F] mx-auto">W</span>
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-20 bg-white border border-slate-200 rounded-full p-1 text-slate-500 hover:text-[#FF5A5F] shadow-sm z-10 cursor-pointer"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group ${
                isActive
                  ? 'bg-[#FF5A5F]/10 text-[#FF5A5F]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title={!isExpanded ? item.name : undefined}
            >
              <Icon
                size={20}
                className={isActive ? 'text-[#FF5A5F]' : 'text-slate-400 group-hover:text-slate-600'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {isExpanded && (
                <span className={`font-medium ${isActive ? 'font-semibold' : ''} truncate`}>
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
