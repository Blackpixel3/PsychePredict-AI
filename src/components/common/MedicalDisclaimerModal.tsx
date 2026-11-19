import React from 'react';
import { X } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/50">
      <div className="bg-white rounded-lg max-w-lg w-full shadow-lg border border-charcoal-200 overflow-hidden">
        <div className="border-b border-charcoal-200 p-5 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-charcoal-900">
              Clinical Research & Medical Disclaimer
            </h3>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Please read carefully prior to interpreting screening estimates.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-charcoal-400 hover:text-charcoal-700 p-1 rounded transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 text-xs text-charcoal-600 leading-relaxed max-h-[70vh] overflow-y-auto">
          <p>
            <strong className="text-charcoal-900">1. Preliminary Screening Nature:</strong> This application was developed as part of an MCA research project titled <em>"Deep Learning Based Multi-Class Prediction of Psychological Disorders Using Patient Assessment Data"</em>. All classifications, severity bands, and probability outputs are <strong>preliminary screening estimates</strong> and <strong>not medical diagnoses</strong>.
          </p>

          <p>
            <strong className="text-charcoal-900">2. Not a Substitute for Professional Care:</strong> The information provided cannot replace the evaluation of a licensed clinical psychologist or psychiatrist. Do not alter psychiatric treatments or medication regimens based on this system.
          </p>

          <p>
            <strong className="text-charcoal-900">3. Crisis & Emergency Protocols:</strong> If you or someone you know is in acute emotional distress or experiencing self-harm thoughts, please contact an emergency medical service or crisis helpline immediately (e.g., Tele-MANAS: <strong>14416</strong> or Kiran: <strong>1800-599-0019</strong>).
          </p>

          <div className="p-3 bg-zinc-50 border border-charcoal-200 rounded text-[11px] text-charcoal-600">
            Assessment data is processed securely for academic evaluation purposes and is never shared with commercial entities.
          </div>
        </div>

        <div className="p-4 bg-zinc-50 border-t border-charcoal-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-charcoal-900 hover:bg-charcoal-800 text-white font-medium text-xs rounded transition-colors"
          >
            I Understand and Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
