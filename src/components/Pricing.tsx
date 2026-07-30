import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section className="bg-white py-24 md:py-32 rounded-t-[3rem] -mt-8 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
            Choose the plan that fits<br />your website growth.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="rounded-3xl border border-gray-200 p-8 md:p-10 bg-white shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Free to start</h3>
            
            <ul className="space-y-4 mb-10">
              {[
                "Up to 2 published websites",
                "AI-generated layouts and copy",
                "Drag-and-drop section editing",
                "Basic analytics and SEO tools",
                "Email support and onboarding"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-sky-500" strokeWidth={3} />
                  </div>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className="w-full py-4 rounded-xl bg-sky-50 text-sky-600 font-semibold hover:bg-sky-100 transition-colors">
              Start Building
            </button>
          </div>

          {/* Pro Plan */}
          <div className="rounded-3xl p-8 md:p-10 bg-[#111111] text-white shadow-xl relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[60px] pointer-events-none"></div>

            <h3 className="text-xl font-medium text-gray-400 mb-2">Plans start at:</h3>
            <div className="text-4xl md:text-5xl font-semibold mb-8 text-sky-400">
              $0<span className="text-2xl text-gray-500">/mo</span>
            </div>
            
            <p className="text-gray-400 leading-relaxed mb-10">
              Upgrade as your traffic grows. Paid plans start at $29/mo for premium hosting, advanced SEO features, team collaboration, and custom integrations, built to maximize your success.
            </p>
            
            <button className="w-full py-4 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/20">
              View All Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
