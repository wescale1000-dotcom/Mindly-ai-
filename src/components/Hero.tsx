import { BookOpen, Upload, ChevronDown } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { Logos } from "./Logos";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center text-center pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Animated WebGL Background */}
      <AnimatedBackground />
      
      <div className="relative max-w-4xl mx-auto z-10 px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-gray-200/60 backdrop-blur-sm mb-6">
          <Logo className="w-4 h-4" />
          <span className="text-sm font-medium text-gray-700">Powered by Google Gemma 4</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 leading-[1.1] mb-6">
          Ace your exams with your <br className="hidden md:block" />personal AI tutor.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Turn your textbooks, notes, and past questions into a personalized learning system for WAEC, NECO, JAMB, and University exams.
        </p>

        {/* AI Input Box */}
        <div className="w-full max-w-3xl mx-auto bg-white/90 rounded-3xl p-4 shadow-xl shadow-sky-900/5 border border-white/50 backdrop-blur-xl">
          <div className="flex flex-col gap-4">
            <Link to="/signup" className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-4 py-4 text-left border border-dashed border-gray-300 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
               <div className="w-12 h-12 bg-sky-100 rounded-xl flex shrink-0 items-center justify-center text-sky-600 group-hover:scale-105 transition-transform">
                 <Upload className="w-6 h-6" />
               </div>
               <div>
                 <p className="text-gray-900 font-medium text-base sm:text-lg">Upload your study materials</p>
                 <p className="text-gray-500 text-xs sm:text-sm mt-1">Drop PDFs, lecture notes, or past questions here to get started</p>
               </div>
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-gray-100 pt-4 sm:px-2 gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto min-w-0">
                <button className="px-4 py-1.5 rounded-full bg-sky-50 text-sm font-medium text-sky-700 shrink-0 flex items-center gap-2 whitespace-nowrap">
                  <BookOpen className="w-4 h-4" /> Prepare for JAMB
                </button>
                <button className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 shrink-0 whitespace-nowrap">WAEC</button>
                <button className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 shrink-0 whitespace-nowrap">NECO</button>
                <button className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 shrink-0 whitespace-nowrap">University</button>
              </div>
              
              <div className="flex items-center gap-3 shrink-0 md:ml-4 w-full md:w-auto">
                <Link to="/signup" className="flex items-center justify-center w-full md:w-auto gap-2 px-6 py-2.5 rounded-full bg-gray-900 text-sm font-medium text-white hover:bg-gray-800 transition-colors whitespace-nowrap">
                  Start Learning Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Logos />
    </section>
  );
}
