import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Logo className="w-8 h-8" />
              <span className="font-semibold text-xl tracking-tight text-gray-900">Mindly</span>
            </Link>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">
              Smarter learning, better grades. AI-powered exam preparation for students across Africa and beyond.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/#features" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Features</Link></li>
              <li><Link to="/#pricing" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Pricing</Link></li>
              <li><Link to="/#exams" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Supported Exams</Link></li>
              <li><Link to="/#templates" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Templates</Link></li>
              <li><Link to="/#community" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/#about" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">About Us</Link></li>
              <li><Link to="/#careers" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Mindly AI. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="/login" className="hover:text-sky-600 transition-colors">Log In</Link>
            <Link to="/signup" className="hover:text-sky-600 transition-colors">Sign Up</Link>
          </div>
        </div>
      </div>
      
      {/* Huge text at the bottom */}
      <div className="mt-24 flex justify-center items-end select-none overflow-hidden relative">
        <div className="text-[15vw] font-black tracking-tighter flex items-center leading-none">
          <span className="text-gray-50 hover:text-gray-900 transition-colors duration-300 cursor-default">MINDLY</span>
          <div className="ml-[2vw] cursor-default">
            <Logo className="w-[12vw] h-[12vw] opacity-30 grayscale saturate-0 hover:opacity-100 hover:grayscale-0 hover:saturate-100 transition-all duration-300" />
          </div>
        </div>
      </div>
    </footer>
  );
}
