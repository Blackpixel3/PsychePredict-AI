import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-charcoal-600 border-t border-charcoal-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-charcoal-200">
          {/* Col 1: Branding & MCA Project */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-sage-800 text-white flex items-center justify-center">
                <Activity className="w-3 h-3 text-emerald-200" />
              </div>
              <span className="font-semibold text-charcoal-900 text-sm tracking-tight">
                PsychePredict
              </span>
            </div>
            <p className="text-xs text-charcoal-500 max-w-md leading-relaxed">
              Master of Computer Applications (MCA) Project: <em>Deep Learning Based Multi-Class Prediction of Psychological Disorders Using Patient Assessment Data</em>. Standardized preliminary screening using DASS-21, PHQ-9, and GAD-7.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2.5">
              Sections
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Assessment Intake
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Screening Results
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Methodology & Ethics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Medical Notice */}
          <div>
            <h4 className="text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2.5">
              Clinical Disclaimer
            </h4>
            <p className="text-[11px] text-charcoal-500 leading-relaxed">
              This system calculates research screening indicators and is not a substitute for clinical psychological evaluation or medical diagnosis.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-charcoal-400">
          <p>
            MCA Research Project • Department of Computer Applications
          </p>
          <p>
            React • TypeScript • FastAPI • Standardized Psychometrics
          </p>
        </div>
      </div>
    </footer>
  );
};
