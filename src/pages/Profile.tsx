import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  User as UserIcon,
  Mail,
  BookOpen,
  Calendar,
  Save,
  LogOut
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/firebase";
import { doc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import { Sidebar } from "../components/Sidebar";

export function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [exam, setExam] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    
    const docRef = doc(db, "users", currentUser.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || currentUser.displayName || "");
        setExam(data.exam || "WAEC / SSCE");
      } else {
        setName(currentUser.displayName || "");
        setExam("WAEC / SSCE");
      }
      setLoading(false);
    }, (err) => {
      console.error("Error fetching user data", err);
      setError("Failed to load profile data");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(docRef, {
        name,
        exam,
        updatedAt: new Date().toISOString(),
        email: currentUser.email
      }, { merge: true });
      setMessage("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <main className="md:ml-64 p-6 pt-20 pb-24 md:p-8 md:pt-8 max-w-4xl mx-auto">
        <div className="mb-8 hidden md:block">
          <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Your Profile</h1>
              <p className="text-gray-500 text-sm">Manage your account settings and preferences.</p>
            </div>
            <div className="h-16 w-16 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
              <UserIcon className="w-8 h-8" />
            </div>
          </div>

          <div className="p-8">
            {message && <div className="mb-6 p-4 bg-green-50 text-green-700 text-sm rounded-xl">{message}</div>}
            {error && <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl">{error}</div>}

            <form onSubmit={handleSave} className="space-y-6 max-w-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-gray-400" /> Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" /> Email Address
                </label>
                <input
                  type="email"
                  value={currentUser?.email || ""}
                  disabled
                  className="block w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                />
                <p className="mt-1.5 text-xs text-gray-500">Email address cannot be changed.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-400" /> Primary Exam Focus
                </label>
                <select
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                >
                  <option>WAEC / SSCE</option>
                  <option>JAMB / UTME</option>
                  <option>NECO</option>
                  <option>GCE</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end border-t border-gray-100">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
