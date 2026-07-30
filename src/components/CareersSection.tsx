export function CareersSection() {
  return (
    <section id="careers" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Join Our Team</h2>
        <p className="text-xl text-gray-600 mb-12">Help us shape the future of education in Africa.</p>
        
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">No open positions right now</h3>
          <p className="text-gray-600 mb-6">We're currently not actively hiring, but we're always looking for talented individuals. Feel free to send us your resume.</p>
          <a href="mailto:careers@mindly.example.com" className="inline-block bg-sky-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-sky-700 transition-colors shadow-sm">
            Send Resume
          </a>
        </div>
      </div>
    </section>
  );
}
