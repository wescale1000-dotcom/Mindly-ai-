import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">404 - Not Found</h1>
        <p className="text-gray-500 mb-8">The page you are looking for does not exist or has been moved.</p>
        <Link 
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors w-full"
        >
          <ArrowLeft className="w-4 h-4" /> Go back home
        </Link>
      </div>
    </div>
  );
}
