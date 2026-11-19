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
      group: 'Screening',
      items: [
        { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { label: 'New Intake', path: '/assessment', icon: ClipboardList },
        { label: 'Screening Results', path: '/results', icon: FileBarChart2 },
      ],
    },
    {
      group: 'Standard Scales',
      items: [
        { label: 'DASS-21 Instrument', path: '/assessment', icon: BookOpen },
        { label: 'PHQ-9 (Depression)', path: '/assessment', icon: Stethoscope },
        { label: 'GAD-7 (Anxiety)', path: '/assessment', icon: BrainCircuit },
      ],
    },
    {
      group: 'Documentation',
      items: [
        { label: 'Methodology & Model', path: '/about', icon: Info },
      ],
    },
  ];

  return (
    <aside className="w-56 bg-white border-r border-charcoal-200 min-h-[calc(100vh-3.5rem)] p-3.5 flex flex-col justify-between shrink-0">
      <div className="space-y-5">
        {menuItems.map((sec, idx) => (
          <div key={idx}>
            <p className="text-[10px] font-semibold text-charcoal-400 uppercase tracking-wider px-2 mb-1">
              {sec.group}
            </p>
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                        isActive && item.path === '/dashboard'
                          ? 'bg-zinc-100 text-charcoal-900 font-semibold'
                          : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-zinc-50'
                      }`
                    }
                  >
                    <Icon className="w-3.5 h-3.5 text-charcoal-400" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar bottom card */}
      <div className="p-3 bg-zinc-50 rounded border border-charcoal-200">
        <div className="flex items-center gap-1.5 mb-1">
          <ShieldCheck className="w-3.5 h-3.5 text-sage-700" />
          <span className="text-xs font-medium text-charcoal-900">Research Screening</span>
        </div>
        <p className="text-[11px] text-charcoal-500 leading-snug">
          Clinical self-report assessment client. Connects directly to FastAPI backend services.
        </p>
      </div>
    </aside>
  );
};
