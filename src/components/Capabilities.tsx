import { Sparkles, Zap, Brain, Target, Compass, BookOpen, Clock, Pencil, Trophy } from "lucide-react";

const capabilities1 = [
  { text: "AI Tutor", icon: Brain },
  { text: "Mock Exams", icon: Target },
  { text: "Past Questions", icon: BookOpen },
  { text: "Performance Analytics", icon: Zap },
  { text: "Study Timetable", icon: Compass },
  { text: "Flashcards", icon: Sparkles },
];

const capabilities2 = [
  { text: "Essay Grading", icon: Pencil },
  { text: "Summary Generation", icon: Zap },
  { text: "Concept Explainer", icon: Compass },
  { text: "Timed Practice", icon: Clock },
  { text: "Leaderboards", icon: Trophy },
  { text: "Personalized Study Plan", icon: Target },
];

export function Capabilities() {
  return (
    <section className="py-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Everything you need to ace your exams</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Mindly comes packed with powerful tools to help you study smarter, not harder. Discover what you can do.
        </p>
      </div>

      <div className="relative flex flex-col gap-6 overflow-x-hidden group">
        
        {/* First Row (Scrolling Left) */}
        <div className="flex w-fit animate-scroll hover:[animation-play-state:paused] gap-4 pl-4">
          {[...capabilities1, ...capabilities1, ...capabilities1, ...capabilities1].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 px-6 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-800 text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-default whitespace-nowrap">
                <Icon className="w-5 h-5 text-sky-500" />
                {item.text}
              </div>
            )
          })}
        </div>

        {/* Second Row (Scrolling Right - using a reversed animation logic inline for variety) */}
        <div className="flex w-fit animate-scroll hover:[animation-play-state:paused] gap-4 pl-4" style={{ animationDirection: 'reverse' }}>
          {[...capabilities2, ...capabilities2, ...capabilities2, ...capabilities2].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 px-6 py-4 bg-gray-50 border border-gray-200 rounded-full text-gray-800 text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-default whitespace-nowrap">
                <Icon className="w-5 h-5 text-sky-500" />
                {item.text}
              </div>
            )
          })}
        </div>

        {/* Left and right gradient masks for smooth fade */}
        <div className="absolute top-0 left-0 h-full w-24 sm:w-48 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-24 sm:w-48 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
