export function ExamsSection() {
  return (
    <section id="exams" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Supported Examinations</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive study materials for all major West African examinations.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "WAEC / WASSCE", desc: "West African Senior School Certificate Examination" },
            { name: "JAMB / UTME", desc: "Joint Admissions and Matriculation Board" },
            { name: "NECO", desc: "National Examinations Council" },
            { name: "GCE O'Level", desc: "General Certificate of Education" },
            { name: "Post-UTME", desc: "University Specific Screening Exams" },
            { name: "Cambridge IGCSE", desc: "International General Certificate of Secondary Education" }
          ].map((exam, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-sky-200 transition-colors cursor-default">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{exam.name}</h3>
              <p className="text-gray-600">{exam.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
