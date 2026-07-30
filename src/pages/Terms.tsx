import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Logo } from "../components/Logo";

export function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans p-6 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center gap-4">
          <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Logo className="w-8 h-8" />
          <h1 className="text-2xl font-semibold text-gray-900">Terms of Service</h1>
        </div>
        <div className="p-8 prose prose-sky max-w-none text-gray-600 text-sm">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">1. Acceptance of Terms</h2>
          <p>By accessing and using Mindly, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          
          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">2. User Accounts</h2>
          <p>You must create an account to use certain features. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
          
          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">3. Use of Service</h2>
          <p>Mindly provides educational tools and resources. You agree not to misuse our services or help anyone else do so. You must not try to access the service using a method other than the interface and the instructions we provide.</p>
          
          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">4. Content</h2>
          <p>You retain ownership of any intellectual property rights that you hold in the content you submit to the service.</p>
          
          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">5. Modifications to the Service</h2>
          <p>We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice.</p>
        </div>
      </div>
    </div>
  );
}
