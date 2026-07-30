import { GraduationCap, BookOpen, PenTool, Library } from "lucide-react";

export function Templates() {
  const exams = [
    {
      title: "WAEC Preparation",
      description: "Master SSCE subjects with topic-by-topic breakdowns and past question analysis.",
      icon: <BookOpen className="w-6 h-6 text-sky-500" />,
      gradient: "from-blue-50 to-indigo-50"
    },
    {
      title: "JAMB / UTME",
      description: "Speed test yourself with timed quizzes generated from Jamb syllabuses.",
      icon: <PenTool className="w-6 h-6 text-green-500" />,
      gradient: "from-green-50 to-emerald-50"
    },
    {
      title: "NECO",
      description: "Get detailed marking guides for theory questions using our Answer Grader.",
      icon: <Library className="w-6 h-6 text-amber-500" />,
      gradient: "from-amber-50 to-orange-50"
    },
    {
      title: "University Exams",
      description: "Upload your professor's lecture notes and let Mindly explain the difficult concepts.",
      icon: <GraduationCap className="w-6 h-6 text-purple-500" />,
      gradient: "from-purple-50 to-fuchsia-50"
    }
  ];

  return (
    <section id="templates" className="bg-white text-gray-900 py-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
            Tailored for your specific exams.
          </h2>
          <p className="text-gray-500 text-lg">
            Whether you're writing WAEC, JAMB, or preparing for your first-year university finals, Mindly adapts to your study materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {exams.map((exam, i) => (
            <div key={i} className={`bg-gradient-to-br ${exam.gradient} rounded-2xl p-8 border border-white shadow-sm hover:shadow-md transition-shadow`}>
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                 {exam.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{exam.title}</h3>
              <p className="text-gray-600 leading-relaxed">{exam.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="px-8 py-3 rounded-full bg-sky-500 text-sm font-medium text-white hover:bg-sky-600 transition-colors shadow-md shadow-sky-500/20">
            Start Your Study Plan
          </button>
        </div>
      </div>
    </section>
  );
}
