import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Logo } from "../components/Logo";

export function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans p-6 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center gap-4">
          <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Logo className="w-8 h-8" />
          <h1 className="text-2xl font-semibold text-gray-900">Privacy Policy</h1>
        </div>
        <div className="p-8 prose prose-sky max-w-none text-gray-600 text-sm">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, such as your name, email address, and exam preferences.</p>
          
          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to personalize your experience, and to communicate with you.</p>
          
          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">3. Information Sharing</h2>
          <p>We do not share your personal information with third parties except as described in this privacy policy or with your consent.</p>
          
          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">4. Data Security</h2>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
          
          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">5. Your Choices</h2>
          <p>You may update, correct or delete information about you at any time by logging into your online account or by contacting us.</p>
        </div>
      </div>
    </div>
  );
}
