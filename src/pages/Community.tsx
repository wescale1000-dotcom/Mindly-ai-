import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Search, FileText, Upload, Filter, Download } from "lucide-react";

export function Community() {
  const [documents, setDocuments] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <main className="md:ml-64 p-6 pt-20 pb-24 md:p-8 md:pt-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Community Library</h1>
            <p className="text-gray-500 text-sm">Discover and share study materials with other students.</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors shadow-sm">
            <Upload className="w-4 h-4" /> Upload Document
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-8 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="p-4 flex items-center gap-2 flex-1">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search documents, subjects, or topics..." 
              className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <div className="p-4 flex items-center gap-2 md:w-48 bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">All Subjects</span>
          </div>
        </div>

        {documents.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
              Be the first to share study materials with the community!
            </p>
            <button className="inline-flex items-center justify-center gap-2 bg-sky-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors shadow-sm">
              <Upload className="w-4 h-4" /> Upload Document
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-sky-200 transition-colors flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    doc.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                  }`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight mb-1" title={doc.title}>
                      {doc.title}
                    </h3>
                    <p className="text-xs text-gray-500">By {doc.uploader} • {doc.size}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{doc.subject}</span>
                  <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{doc.exam}</span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    <Download className="w-3 h-3" /> {doc.downloads.toLocaleString()}
                  </span>
                  <button className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
