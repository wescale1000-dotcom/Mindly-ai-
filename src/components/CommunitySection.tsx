import { FileText, Upload, Download, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function CommunitySection() {
  return (
    <section id="community" className="bg-sky-50 py-24 border-y border-sky-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 text-gray-900 leading-tight">
              A community-driven <span className="text-sky-600">study library</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Access thousands of study materials, university PDFs, and lecture notes shared by students. Upload your own documents to help others and earn community points.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="font-medium">Share your lecture notes and summaries</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="font-medium">Browse verified past questions</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sky-500 shadow-sm">
                  <Download className="w-5 h-5" />
                </div>
                <span className="font-medium">Download materials for offline study</span>
              </li>
            </ul>

            <Link to="/signup" className="inline-block bg-gray-900 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Explore Library
            </Link>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl blur-2xl opacity-20 transform rotate-3"></div>
            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xl relative">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">JAMB 2021 Physics Past Questions</h4>
                    <p className="text-xs text-gray-500 mb-2">Uploaded by David O. • PDF • 2.4 MB</p>
                    <div className="flex gap-2">
                      <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600">Physics</span>
                      <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600">JAMB</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">SS2 Biology Comprehensive Summary</h4>
                    <p className="text-xs text-gray-500 mb-2">Uploaded by Sarah M. • DOCX • 1.1 MB</p>
                    <div className="flex gap-2">
                      <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600">Biology</span>
                      <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600">WAEC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
