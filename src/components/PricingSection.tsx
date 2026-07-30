import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that fits your study needs and start preparing effectively.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
            <p className="text-gray-500 mb-6">Perfect for getting started</p>
            <div className="text-4xl font-bold text-gray-900 mb-6">Free<span className="text-lg text-gray-500 font-normal">/forever</span></div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {['Access to limited past questions', 'Basic AI Tutor responses', 'Study tracker', 'Community support'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-sky-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link to="/signup" className="w-full py-3 px-6 rounded-xl border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-50 transition-colors text-center">
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-900 shadow-xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <p className="text-gray-400 mb-6">For serious students</p>
            <div className="text-4xl font-bold text-white mb-6">₦2,500<span className="text-lg text-gray-400 font-normal">/month</span></div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {['Unlimited past questions & answers', 'Advanced AI Tutor with detailed explanations', 'Personalized study plans', 'Priority support', 'Progress analytics'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-sky-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link to="/signup" className="w-full py-3 px-6 rounded-xl bg-sky-500 text-white font-medium hover:bg-sky-600 transition-colors text-center">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
