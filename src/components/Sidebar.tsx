import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  BrainCircuit, 
  FileText, 
  Flame, 
  MessageSquare, 
  TrendingUp, 
  LogOut,
  User as UserIcon,
  Users
} from "lucide-react";
import { Logo } from "./Logo";
import { useAuth } from "../contexts/AuthContext";

export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navItems = [
    { path: "/dashboard", icon: <TrendingUp className="w-4 h-4" />, label: "Dashboard" },
    { path: "/tutor", icon: <MessageSquare className="w-4 h-4" />, label: "AI Tutor" },
    { path: "/materials", icon: <FileText className="w-4 h-4" />, label: "My Materials" },
    { path: "/quizzes", icon: <BrainCircuit className="w-4 h-4" />, label: "Quizzes" },
    { path: "/mindmaps", icon: <FileText className="w-4 h-4" />, label: "Mindmaps" },
    { path: "/community", icon: <Users className="w-4 h-4" />, label: "Community" },
    { path: "/profile", icon: <UserIcon className="w-4 h-4" />, label: "Profile" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-4 hidden md:flex flex-col z-50">
        <Link to="/" className="flex items-center gap-2 px-2 mb-8 mt-2">
          <Logo className="w-8 h-8" />
          <span className="font-semibold text-xl tracking-tight text-gray-900">Mindly</span>
        </Link>
        
        <div className="space-y-1 mb-8">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                location.pathname.startsWith(item.path) 
                  ? "bg-sky-50 text-sky-700" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </div>
        
        <div className="mt-auto">
          <div className="p-3 bg-gray-50 rounded-xl mb-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-gray-900">5 Day Streak</span>
            </div>
            <div className="flex gap-1">
              {[true, true, true, true, true, false, false].map((active, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${active ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
              ))}
            </div>
          </div>
          
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors text-left">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </nav>

      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-200 z-50 flex justify-between items-center px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <span className="font-semibold text-lg text-sky-700">Mindly</span>
        </Link>
        <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </button>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 md:hidden z-50 flex justify-around items-center px-2 py-2 pb-safe rounded-t-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive 
                  ? "text-sky-700 bg-sky-50" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className={`flex items-center justify-center ${isActive ? 'scale-110 mb-0.5' : ''} transition-transform`}>
                {item.icon}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
