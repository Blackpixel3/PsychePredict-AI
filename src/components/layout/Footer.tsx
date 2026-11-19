import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Activity, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Branding & MCA Project */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-white font-bold tracking-tight text-base">
                PsychePredict AI
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              MCA Project: <strong>Deep Learning Based Multi-Class Prediction of Psychological Disorders Using Patient Assessment Data</strong>. Designed for early detection and multimodal risk stratification across Depression, Anxiety, and Stress.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-teal-400/90 pt-1">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Standardized Instruments: DASS-21 • PHQ-9 • GAD-7</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Screening Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Overview & Landing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                  Screening Dashboard
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-slate-400 hover:text-white transition-colors">
                  Full Assessment Form
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-slate-400 hover:text-white transition-colors">
                  Results & Risk Profiles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  Project Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Medical Notice */}
          <div>
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Disclaimer Notice
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This system provides research-oriented screening estimates based on self-reported psychometric questionnaires. It does not provide medical diagnoses or replace licensed clinical intervention.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} PsychePredict AI — Master of Computer Applications (MCA) Project.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Module 1: Frontend Client</span>
            <span>•</span>
            <span>React + TypeScript + Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
