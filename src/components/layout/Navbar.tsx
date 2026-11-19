import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  LayoutDashboard,
  ClipboardList,
  FileBarChart2,
  Info,
  Menu,
  X,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import { MedicalDisclaimerModal } from '../common/MedicalDisclaimerModal';
import { useAssessment } from '../../context/AssessmentContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { backendConnected, backendMessage } = useAssessment();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', path: '/', icon: Activity },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Assessment', path: '/assessment', icon: ClipboardList },
    { label: 'Results', path: '/results', icon: FileBarChart2 },
    { label: 'About Project', path: '/about', icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Project Title */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center shadow-md group-hover:bg-navy-800 transition-colors">
                <Activity className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-navy-900 text-base tracking-tight">
                    PsychePredict
                  </span>
                  <span className="bg-teal-50 text-teal-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-teal-200">
                    AI Screening
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  MCA Project • Multi-Class Psychological Disorder Prediction
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-navy-50 text-navy-900 font-semibold border border-navy-100 shadow-xs'
                        : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-teal-600' : 'text-slate-400'}`} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-2.5">
              {/* Backend Live Indicator */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
                  backendConnected
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
                title={backendMessage}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    backendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                  }`}
                />
                <span>{backendConnected ? 'FastAPI Active' : 'API Offline'}</span>
              </div>

              <button
                onClick={() => setDisclaimerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 rounded-lg transition-colors"
                title="View Medical Disclaimer"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                <span>Disclaimer</span>
              </button>

              <Link
                to="/assessment"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all hover:shadow-teal-600/20"
              >
                <span>Take Assessment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setDisclaimerOpen(true)}
                className="p-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg"
                aria-label="Disclaimer"
              >
                <ShieldAlert className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded-lg"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                    active
                      ? 'bg-navy-50 text-navy-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-teal-600' : 'text-slate-400'}`} />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/assessment"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-teal-600 text-white font-medium text-sm rounded-lg"
              >
                Start Assessment
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      <MedicalDisclaimerModal
        isOpen={disclaimerOpen}
        onClose={() => setDisclaimerOpen(false)}
      />
    </>
  );
};
