import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
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
    { label: 'Overview', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Assessment', path: '/assessment' },
    { label: 'Results', path: '/results' },
    { label: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-charcoal-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo & Project Title */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-sage-800 text-white flex items-center justify-center">
                <Activity className="w-4 h-4 text-emerald-200" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-charcoal-900 text-sm tracking-tight">
                  PsychePredict
                </span>
                <span className="text-[11px] text-charcoal-400 hidden sm:inline">
                  Clinical Assessment System
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      active
                        ? 'bg-zinc-100 text-charcoal-900 font-semibold'
                        : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-zinc-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-2.5">
              {/* Backend Live Indicator */}
              <div
                className="flex items-center gap-1.5 px-2 py-1 text-[11px] text-charcoal-600 bg-zinc-50 border border-charcoal-200 rounded"
                title={backendMessage}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    backendConnected ? 'bg-sage-600' : 'bg-zinc-400'
                  }`}
                />
                <span className="font-mono text-[10px]">
                  {backendConnected ? 'API online' : 'API offline'}
                </span>
              </div>

              <button
                onClick={() => setDisclaimerOpen(true)}
                className="text-xs text-charcoal-500 hover:text-charcoal-800 px-2 py-1 rounded transition-colors"
                title="View Medical Disclaimer"
              >
                Disclaimer
              </button>

              <Link
                to="/assessment"
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-sage-800 hover:bg-sage-700 rounded transition-colors"
              >
                <span>Start Assessment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={() => setDisclaimerOpen(true)}
                className="p-1.5 text-charcoal-500 hover:text-charcoal-800 rounded"
                aria-label="Disclaimer"
              >
                <ShieldAlert className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-charcoal-700 hover:bg-zinc-100 rounded"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-charcoal-200 bg-white px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded text-xs font-medium ${
                    active
                      ? 'bg-zinc-100 text-charcoal-900 font-semibold'
                      : 'text-charcoal-600 hover:bg-zinc-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/assessment"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-sage-800 text-white font-medium text-xs rounded"
              >
                Start Assessment
                <ChevronRight className="w-3.5 h-3.5" />
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
