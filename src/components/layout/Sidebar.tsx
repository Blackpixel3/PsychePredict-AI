import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  FileBarChart2,
  BookOpen,
  Info,
  ShieldCheck,
  BrainCircuit,
  Stethoscope,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const menuItems = [
    {
      group: 'Core Screening',
      items: [
        { label: 'Overview Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'New Assessment', path: '/assessment', icon: ClipboardList, badge: 'Active' },
        { label: 'Latest Results', path: '/results', icon: FileBarChart2 },
      ],
    },
    {
      group: 'Clinical Instruments',
      items: [
        { label: 'DASS-21 Scale', path: '/assessment?scale=dass21', icon: BookOpen },
        { label: 'PHQ-9 Depression', path: '/assessment?scale=phq9', icon: Stethoscope },
        { label: 'GAD-7 Anxiety', path: '/assessment?scale=gad7', icon: BrainCircuit },
      ],
    },
    {
      group: 'System & Research',
      items: [
        { label: 'Project Info & Model', path: '/about', icon: Info },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {menuItems.map((sec, idx) => (
          <div key={idx}>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              {sec.group}
            </p>
            <div className="space-y-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive && item.path === '/dashboard'
                          ? 'bg-navy-900 text-white font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-navy-900" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-medium bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar bottom card */}
      <div className="mt-6 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
        <div className="flex items-center gap-2 mb-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span className="text-xs font-semibold text-navy-900">Module 1 Ready</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-snug">
          Frontend client running with modular API interfaces. Ready for Module 2 backend pairing.
        </p>
      </div>
    </aside>
  );
};
