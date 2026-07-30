export function Stats() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 -z-10 w-[600px] h-[600px] border border-sky-100 rounded-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 -z-10 w-[800px] h-[800px] border border-sky-100 rounded-full opacity-50"></div>
      
      <div className="max-w-5xl mx-auto px-6 text-center z-10 relative">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6 max-w-3xl mx-auto leading-tight">
          Join thousands of students achieving better grades.
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
          See how Mindly helps students across Nigeria prepare efficiently for WAEC, NECO, JAMB, and University exams by turning their own materials into a personalized AI tutor.
        </p>
        <button className="px-6 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors mb-20">
          See Success Stories
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-16">
          <div className="flex flex-col items-center">
            <h3 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">50K+</h3>
            <p className="text-gray-600 text-sm md:text-base px-4">
              Students actively studying with Mindly.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">1M+</h3>
            <p className="text-gray-600 text-sm md:text-base px-4">
              Past questions analyzed and broken down into topics.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">2.5M</h3>
            <p className="text-gray-600 text-sm md:text-base px-4">
              AI quizzes generated and graded.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
