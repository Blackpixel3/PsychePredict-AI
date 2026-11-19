import React from 'react';
import { AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface MedicalDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedicalDisclaimerModal: React.FC<MedicalDisclaimerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-amber-500/10 border-b border-amber-200/60 p-5 flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900">
              Important Medical & Clinical Research Disclaimer
            </h3>
            <p className="text-xs text-amber-900/80 mt-0.5">
              Please read carefully prior to reviewing psychological screening estimates.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm text-slate-600 leading-relaxed max-h-[70vh] overflow-y-auto">
          <p>
            <strong>1. Preliminary Screening Nature:</strong> This application is developed as part of an MCA (Master of Computer Applications) research project titled <em>"Deep Learning Based Multi-Class Prediction of Psychological Disorders Using Patient Assessment Data"</em>. All classifications, severity bands, and probability outputs are <strong>preliminary screening estimates</strong> and <strong>not clinical diagnoses</strong>.
          </p>

          <p>
            <strong>2. Not a Substitute for Professional Care:</strong> The information provided does not replace the judgment of a licensed clinical psychologist, psychiatrist, or qualified healthcare professional. Do not alter medication, psychiatric regimens, or clinical treatment plans based on this application.
          </p>

          <p>
            <strong>3. Crisis & Emergency Protocols:</strong> If you or someone you know is experiencing acute emotional distress, self-harm impulses, or a psychiatric crisis, please contact emergency medical services or a crisis helpline immediately (e.g., National Tele Mental Health Programme Tele-MANAS: <strong>14416</strong> or Kiran: <strong>1800-599-0019</strong>).
          </p>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5 text-xs text-slate-700">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Assessment data is processed in-memory for screening calculation and is not sold or shared with commercial entities.</span>
          </div>
        </div>

        <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
          >
            I Understand & Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
