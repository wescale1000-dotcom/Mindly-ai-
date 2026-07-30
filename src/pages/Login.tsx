import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Logo } from "../components/Logo";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../lib/firebase";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to log in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center font-sans selection:bg-sky-200 selection:text-sky-900 relative overflow-hidden p-4">
      {/* Full screen animated background */}
      <AnimatedBackground />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-sky-900/10 rounded-3xl p-8 md:p-10">
          <div className="mb-8 flex flex-col items-center justify-center text-center">
            <Logo className="w-12 h-12 mb-4" />
            <h2 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">Welcome back</h2>
            <p className="text-gray-500 text-sm">Please enter your details to access your account.</p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>}

          <form className="space-y-5" onSubmit={handleEmailLogin}>
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
                className="appearance-none block w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm transition-shadow"
              />
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-[13px] font-semibold text-gray-900">Password</label>
                <a href="#" className="text-[11px] font-medium text-sky-600 hover:text-sky-500">Forgot Password?</a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm transition-shadow"
                />
              </div>
            </div>

            <div className="flex items-center pt-1 pb-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-600">
                Remember me
              </label>
            </div>

            <div>
              <button disabled={loading} type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md shadow-gray-900/10 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:opacity-50">
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <span className="text-xs text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="text-xs font-semibold text-sky-600 hover:text-sky-500 transition-colors">
              Sign up for free
            </Link>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white/80 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button disabled={loading} onClick={handleGoogleLogin} type="button" className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white/50 text-sm font-medium text-gray-700 hover:bg-white transition-colors disabled:opacity-50">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
