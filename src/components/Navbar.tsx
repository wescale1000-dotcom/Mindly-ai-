import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`flex items-center justify-between px-6 py-4 md:px-12 fixed w-full top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <Link to="/" className="flex items-center gap-2">
        <Logo className="w-8 h-8" />
        <span className="font-semibold text-lg tracking-tight text-gray-900">Mindly</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <div className="relative group">
          <button className="flex items-center gap-1 py-4 hover:text-gray-900 focus:outline-none">
            Features <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
          </button>
          
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white rounded-2xl shadow-xl shadow-sky-900/10 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 p-3 z-50">
            <Link to="/" className="block p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="text-gray-900 font-semibold mb-1">AI Tutor</div>
              <div className="text-xs text-gray-500">24/7 personalized help and explanation</div>
            </Link>
            <Link to="/" className="block p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="text-gray-900 font-semibold mb-1">Mock Exams</div>
              <div className="text-xs text-gray-500">Simulate WAEC, JAMB, & NECO environments</div>
            </Link>
            <Link to="/" className="block p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="text-gray-900 font-semibold mb-1">Past Questions</div>
              <div className="text-xs text-gray-500">Access thousands of organized past questions</div>
            </Link>
            <Link to="/" className="block p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="text-gray-900 font-semibold mb-1">Analytics</div>
              <div className="text-xs text-gray-500">Track your performance and weak points</div>
            </Link>
          </div>
        </div>
        <Link to="/" className="hover:text-gray-900">How it Works</Link>
        <Link to="/" className="hover:text-gray-900">Exams</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/login" className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900">
          Log In
        </Link>
        <Link to="/signup" className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
