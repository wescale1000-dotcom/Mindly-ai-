import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";

export function Cta() {
  return (
    <section className="py-32 relative overflow-hidden w-full flex flex-col items-center">
      {/* Top Gradient for blending with previous section */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Animated WebGL Background */}
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-gray-200/60 backdrop-blur-sm mb-8">
          <Sparkles className="w-4 h-4 text-sky-500" />
          <span className="text-sm font-medium text-gray-700">Start learning today</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-6 leading-tight">
          Ready to transform your<br className="hidden md:block" /> study routine?
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Join thousands of students who are already getting better grades with personalized AI tutoring and mock exams.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20">
            Get Started for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/login" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/80 text-gray-900 rounded-full text-base font-semibold hover:bg-white transition-colors border border-gray-200 shadow-sm">
            Log into Account
          </Link>
        </div>
      </div>
    </section>
  );
}
