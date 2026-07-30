import React, { useState } from 'react';
import { FileText, Loader2, X, BrainCircuit, AlignLeft } from 'lucide-react';

interface GenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: any | null;
  onConfirm: (action: string) => void;
  isGenerating: boolean;
}

export function GenerateModal({ isOpen, onClose, material, onConfirm, isGenerating }: GenerateModalProps) {
  const [selectedAction, setSelectedAction] = useState('quiz');

  if (!isOpen || !material) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Generate from Material</h2>
          <button 
            onClick={onClose}
            disabled={isGenerating}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6 bg-sky-50 p-3 rounded-xl border border-sky-100/50">
            <div className="bg-sky-100 p-2 rounded-lg text-sky-600">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{material.name}</p>
              <p className="text-xs text-gray-500">{(material.size ? material.size / 1024 : 0).toFixed(1)} KB</p>
            </div>
          </div>

          <h3 className="text-sm font-medium text-gray-700 mb-3">What would you like to generate?</h3>
          
          <div className="space-y-3">
            <label className={`flex items-start p-4 border rounded-2xl cursor-pointer transition-all ${
              selectedAction === 'quiz' ? 'border-sky-500 bg-sky-50/50 ring-1 ring-sky-500' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input 
                type="radio" 
                name="action" 
                value="quiz" 
                checked={selectedAction === 'quiz'} 
                onChange={() => setSelectedAction('quiz')}
                className="mt-1 mr-3 text-sky-500 focus:ring-sky-500"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BrainCircuit className={`w-4 h-4 ${selectedAction === 'quiz' ? 'text-sky-500' : 'text-gray-400'}`} />
                  <span className="font-medium text-gray-900 text-sm">Generate Quiz</span>
                </div>
                <p className="text-xs text-gray-500">Automatically generate a 5-question multiple choice quiz.</p>
              </div>
            </label>

            <label className={`flex items-start p-4 border rounded-2xl cursor-pointer transition-all ${
              selectedAction === 'qa' ? 'border-sky-500 bg-sky-50/50 ring-1 ring-sky-500' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input 
                type="radio" 
                name="action" 
                value="qa" 
                checked={selectedAction === 'qa'} 
                onChange={() => setSelectedAction('qa')}
                className="mt-1 mr-3 text-sky-500 focus:ring-sky-500"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <AlignLeft className={`w-4 h-4 ${selectedAction === 'qa' ? 'text-sky-500' : 'text-gray-400'}`} />
                  <span className="font-medium text-gray-900 text-sm">Generate Q&A</span>
                </div>
                <p className="text-xs text-gray-500">Create 5 question and answer pairs for studying.</p>
              </div>
            </label>

            <label className={`flex items-start p-4 border rounded-2xl cursor-pointer transition-all ${
              selectedAction === 'mindmap' ? 'border-sky-500 bg-sky-50/50 ring-1 ring-sky-500' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input 
                type="radio" 
                name="action" 
                value="mindmap" 
                checked={selectedAction === 'mindmap'} 
                onChange={() => setSelectedAction('mindmap')}
                className="mt-1 mr-3 text-sky-500 focus:ring-sky-500"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FileText className={`w-4 h-4 ${selectedAction === 'mindmap' ? 'text-sky-500' : 'text-gray-400'}`} />
                  <span className="font-medium text-gray-900 text-sm">Generate Mindmap</span>
                </div>
                <p className="text-xs text-gray-500">Create a hierarchical Markdown mindmap of the material.</p>
              </div>
            </label>
          </div>
        </div>

        <div className="p-6 pt-2 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3 rounded-b-3xl mt-4">
          <button 
            onClick={onClose}
            disabled={isGenerating}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={() => onConfirm(selectedAction)}
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-50 min-w-[120px]"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isGenerating ? "Processing..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}
