import React from "react";
import { SurveyDetialsProps } from "../../interfaces/survey";

const SurveyModal: React.FC<SurveyDetialsProps> = ({ submission, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Handle click outside modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gray-100 px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Survey Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 py-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Full Name</label>
              <div className="mt-1 text-sm text-gray-900">{submission.name}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Gender</label>
              <div className="mt-1 text-sm text-gray-900">{submission.gender}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Nationality</label>
              <div className="mt-1 text-sm text-gray-900">{submission.nationality}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <div className="mt-1 text-sm text-gray-900">{submission.email}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Phone</label>
              <div className="mt-1 text-sm text-gray-900">{submission.phone}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Address</label>
              <div className="mt-1 text-sm text-gray-900">{submission.address}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Message</label>
              <div className="mt-1 text-sm text-gray-900">{submission.message}</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;