import { FileText, FileQuestion, BookOpen, BrainCircuit, CheckCircle2, LineChart, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="features"
      ref={sectionRef}
      className={`text-white py-24 md:py-32 relative overflow-hidden transition-colors duration-1000 ease-out ${
        isVisible ? "bg-[#111111]" : "bg-white"
      }`}
    >
      {/* Subtle background glow/circle */}
      <div 
        className={`absolute top-1/4 right-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000 delay-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <div 
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 delay-300 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 mb-24">
          {/* Left Column: Text & Steps */}
          <div className="max-w-xl">
            <h2 className={`text-3xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight transition-colors duration-1000 ${isVisible ? "text-white" : "text-gray-900"}`}>
              A smarter way to prepare for exams.
            </h2>
            <p className={`text-lg mb-16 transition-colors duration-1000 ${isVisible ? "text-gray-400" : "text-gray-600"}`}>
              Stop guessing what to read. Mindly turns your study materials into a personalized, interactive learning system.
            </p>

            <div className="space-y-12 relative">
              {/* Connecting line */}
              <div className="absolute left-[11px] top-2 bottom-6 w-px bg-gray-800 -z-10"></div>

              {/* Step 1 */}
              <div className="flex gap-6 relative">
                <div className="w-6 h-6 rounded-full border-2 border-sky-500 bg-[#111111] flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-sky-500 mb-1">Step 1</h4>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${isVisible ? "text-white" : "text-gray-900"}`}>Upload your materials</h3>
                  <p className={`leading-relaxed text-sm transition-colors duration-1000 ${isVisible ? "text-gray-400" : "text-gray-600"}`}>
                    Upload your PDFs, textbooks, past questions, or photos of your handwritten notes.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 relative">
                <div className="w-6 h-6 rounded-full border border-gray-700 bg-[#111111] flex items-center justify-center shrink-0 mt-1"></div>
                <div className="opacity-60">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Step 2</h4>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${isVisible ? "text-white" : "text-gray-900"}`}>AI Analysis</h3>
                  <p className={`leading-relaxed text-sm transition-colors duration-1000 ${isVisible ? "text-gray-400" : "text-gray-600"}`}>
                    Gemma 4 analyzes the content, extracting key concepts, flagging difficult topics, and identifying recurring past questions.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 relative">
                <div className="w-6 h-6 rounded-full border border-gray-700 bg-[#111111] flex items-center justify-center shrink-0 mt-1"></div>
                <div className="opacity-60">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Step 3</h4>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${isVisible ? "text-white" : "text-gray-900"}`}>Master the subject</h3>
                  <p className={`leading-relaxed text-sm transition-colors duration-1000 ${isVisible ? "text-gray-400" : "text-gray-600"}`}>
                    Chat with your Personal Tutor about the material, take AI-generated quizzes, and get instant feedback on your answers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: UI Mockup */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-sky-400/10 rounded-[2rem] blur-xl transform -rotate-3 scale-105"></div>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-[2rem] p-4 border border-gray-800 shadow-2xl relative">
              {/* Inner UI Mockup */}
              <div className="bg-white rounded-xl overflow-hidden text-gray-900 shadow-inner">
                {/* Mockup Header */}
                <div className="flex items-center gap-2 p-4 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mx-auto w-48 h-6 bg-white rounded-md border border-gray-200 text-[10px] text-gray-400 flex items-center justify-center">JAMB Biology Past Questions</div>
                </div>
                
                {/* Mockup Body */}
                <div className="p-6">
                  {/* Chat Message Bubble */}
                  <div className="flex gap-3 mb-6 bg-sky-50 p-4 rounded-2xl rounded-tl-sm border border-sky-100">
                    <div className="w-8 h-8 rounded-full bg-sky-500 shrink-0 border border-white shadow-sm overflow-hidden flex items-center justify-center text-white">
                       <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-medium text-sm">AI Tutor</span>
                        <span className="text-[10px] text-gray-500">Just now</span>
                      </div>
                      <p className="text-sm text-gray-700">Based on your recent quizzes, you're struggling with <strong>Genetics</strong>. Should we review Mendelian inheritance or try some practice questions?</p>
                    </div>
                  </div>

                  {/* Dashboard Panels */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
                      <h5 className="text-xs font-semibold text-gray-500 mb-3">Topic Priority List</h5>
                      <div className="space-y-3">
                         <div className="flex items-center justify-between text-sm">
                           <span className="font-medium">Genetics</span>
                           <span className="text-[10px] bg-red-100 text-red-700 px-2 rounded-full">High</span>
                         </div>
                         <div className="flex items-center justify-between text-sm">
                           <span className="font-medium">Ecology</span>
                           <span className="text-[10px] bg-amber-100 text-amber-700 px-2 rounded-full">Medium</span>
                         </div>
                         <div className="flex items-center justify-between text-sm">
                           <span className="font-medium">Cell Biology</span>
                           <span className="text-[10px] bg-green-100 text-green-700 px-2 rounded-full">Mastered</span>
                         </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50/30 flex flex-col justify-between">
                       <div>
                         <h5 className="text-xs font-semibold text-gray-500 mb-1">Your Progress</h5>
                         <p className="text-sm font-medium">85% Ready</p>
                       </div>
                       <div className="flex items-end justify-between h-12 gap-1 mt-2">
                          {[40, 50, 45, 70, 65, 85].map((h, i) => (
                             <div key={i} className="w-full bg-sky-500 rounded-t-sm" style={{height: `${h}%`}}></div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Bottom Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
          <div>
            <div className="w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-sky-500 mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className={`font-medium mb-2 transition-colors duration-1000 ${isVisible ? "text-white" : "text-gray-900"}`}>AI Document Analyzer</h4>
            <p className={`text-sm leading-relaxed transition-colors duration-1000 ${isVisible ? "text-gray-400" : "text-gray-600"}`}>Extracts summaries, key concepts, and flags difficult topics from your uploads.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-sky-500 mb-4">
              <FileQuestion className="w-5 h-5" />
            </div>
            <h4 className={`font-medium mb-2 transition-colors duration-1000 ${isVisible ? "text-white" : "text-gray-900"}`}>Past Question Analyzer</h4>
            <p className={`text-sm leading-relaxed transition-colors duration-1000 ${isVisible ? "text-gray-400" : "text-gray-600"}`}>Identifies frequently repeated topics and patterns from past exam papers.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-sky-500 mb-4">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h4 className={`font-medium mb-2 transition-colors duration-1000 ${isVisible ? "text-white" : "text-gray-900"}`}>AI Quiz Generator</h4>
            <p className={`text-sm leading-relaxed transition-colors duration-1000 ${isVisible ? "text-gray-400" : "text-gray-600"}`}>Test yourself with auto-generated multiple-choice and theory questions.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-sky-500 mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className={`font-medium mb-2 transition-colors duration-1000 ${isVisible ? "text-white" : "text-gray-900"}`}>AI Answer Grader</h4>
            <p className={`text-sm leading-relaxed transition-colors duration-1000 ${isVisible ? "text-gray-400" : "text-gray-600"}`}>Submit written answers and get detailed feedback and marking guides.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
