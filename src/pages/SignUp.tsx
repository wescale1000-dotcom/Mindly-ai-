import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, GraduationCap, PenTool, Library } from "lucide-react";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [exam, setExam] = useState("WAEC / SSCE");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        exam,
        createdAt: new Date().toISOString()
      });

      localStorage.setItem("hasSignedUp", "true");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || name,
        email: user.email,
        exam,
        createdAt: new Date().toISOString()
      }, { merge: true });

      localStorage.setItem("hasSignedUp", "true");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign up with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col md:flex-row font-sans selection:bg-sky-200 selection:text-sky-900 overflow-hidden">
      
      {/* Left Side - Visual */}
      <div className="hidden md:flex md:w-[45%] lg:w-[50%] p-10 flex-col justify-between relative overflow-hidden bg-sky-50">
        <AnimatedBackground />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-10 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
          </Link>
          <p className="text-sky-700 text-sm font-medium mb-3">You can easily</p>
          <h2 className="text-4xl lg:text-[42px] font-medium text-gray-900 leading-[1.15] tracking-tight">
            Master your<br />exams with<br />Mindly AI
          </h2>
        </div>
        
        <div className="relative z-10 mt-12">
          <p className="text-gray-500 text-xs mb-4">Supported exams</p>
          <div className="flex items-center gap-5 text-gray-800">
            <div className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-sky-500"/> <span className="font-medium text-sm">WAEC</span></div>
            <div className="flex items-center gap-1.5"><PenTool className="w-4 h-4 text-sky-500"/> <span className="font-medium text-sm">JAMB</span></div>
            <div className="flex items-center gap-1.5"><Library className="w-4 h-4 text-sky-500"/> <span className="font-medium text-sm">NECO</span></div>
            <div className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-sky-500"/> <span className="font-medium text-sm">Uni</span></div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-[55%] lg:w-[50%] p-8 md:p-12 lg:px-14 lg:py-12 bg-white relative flex flex-col justify-center h-full overflow-y-auto">
        <div className="md:hidden mb-6">
           <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
            </Link>
        </div>
        
        <div className="w-full max-w-[400px] mx-auto">
          <h2 className="text-[28px] font-semibold text-gray-900 mb-1 tracking-tight">Get Started Now</h2>
          <p className="text-gray-500 text-sm mb-6">Please fill in your details to create an account.</p>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>}

          <form className="space-y-4" onSubmit={handleEmailSignUp}>
            <div>
              <label htmlFor="name" className="block text-[13px] font-semibold text-gray-900 mb-1.5">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                required
                className="appearance-none block w-full px-4 py-2.5 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[13px] font-semibold text-gray-900 mb-1.5">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@gmail.com"
                autoComplete="email"
                required
                className="appearance-none block w-full px-4 py-2.5 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="exam" className="block text-[13px] font-semibold text-gray-900 mb-1.5">What are you preparing for?</label>
              <select
                id="exam"
                name="exam"
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="appearance-none block w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm transition-shadow bg-white"
              >
                <option>WAEC / SSCE</option>
                <option>NECO</option>
                <option>JAMB / UTME</option>
                <option>University Exams</option>
              </select>
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-[13px] font-semibold text-gray-900">Password</label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="appearance-none block w-full px-4 py-2.5 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm transition-shadow"
                />
              </div>
            </div>

            <div className="flex items-center pt-1 pb-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-xs text-gray-600">
                I agree to the <Link to="/terms" className="text-gray-900 underline hover:text-sky-600">Terms</Link> & <Link to="/privacy" className="text-gray-900 underline hover:text-sky-600">Privacy Policy</Link>
              </label>
            </div>

            <div>
              <button disabled={loading} type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:opacity-50">
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <span className="text-xs text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-xs font-semibold text-sky-600 hover:text-sky-500 transition-colors">
              Log in
            </Link>
          </div>

          <div className="mt-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-400">Or</span>
              </div>
            </div>

            <div className="mt-5">
              <button disabled={loading} onClick={handleGoogleSignUp} type="button" className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
