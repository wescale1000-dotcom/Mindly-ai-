export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-sky-50 border-t border-sky-100">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">About Mindly</h2>
        <div className="prose prose-lg text-gray-600 mx-auto">
          <p className="mb-4">
            Mindly was founded with a simple mission: to make high-quality exam preparation accessible to every student across Africa. 
            We believe that with the right tools and guidance, anyone can achieve academic excellence.
          </p>
          <p className="mb-4">
            Our platform leverages advanced artificial intelligence to provide personalized tutoring, ensuring that you don't just memorize answers, but understand the underlying concepts.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Vision</h3>
          <p className="mb-4">
            To be the leading digital learning companion for students preparing for WAEC, JAMB, NECO, and other major examinations, empowering millions to unlock their full potential.
          </p>
        </div>
      </div>
    </section>
  );
}
