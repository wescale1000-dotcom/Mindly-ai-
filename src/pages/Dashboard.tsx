import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  BrainCircuit, 
  CheckCircle2, 
  MessageSquare, 
  Plus, 
  Upload, 
  ChevronRight,
  Flame,
  FileText,
  Loader2
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Sidebar } from "../components/Sidebar";
import { UploadModal } from "../components/UploadModal";
import { db } from "../lib/firebase";
import { collection, addDoc, query, where, getDocs, serverTimestamp, updateDoc, doc } from "firebase/firestore";

export function Dashboard() {
  const { currentUser } = useAuth();
  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Student';
  
  const [isUploading, setIsUploading] = useState(false);
  const [recentMaterials, setRecentMaterials] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const fetchMaterials = async () => {
    if (!currentUser) return;
    try {
      const q = query(
        collection(db, "materials"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      // Sort in memory
      items.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.toMillis() - a.createdAt.toMillis();
      });
      
      // Get only the most recent 3
      setRecentMaterials(items.slice(0, 3));
    } catch (error: any) {
      console.warn("Error fetching materials (check Firestore rules):", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [currentUser]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsModalOpen(true);
    }
  };

  const handleProcessFile = async (action: string) => {
    if (!selectedFile || !currentUser) return;

    setIsUploading(true);
    
    try {
      const text = await selectedFile.text();
      
      // Save material metadata
      const materialDocRef = await addDoc(collection(db, "materials"), {
        userId: currentUser.uid,
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        content: text,
        createdAt: serverTimestamp(),
      });

      if (action !== "none") {
        // Generate from AI
        const response = await fetch("/api/process-material", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text, action }),
        });

        if (!response.ok) { const errData = await response.json().catch(() => ({})); throw new Error(errData.error || "Failed to process material"); } if (true) {
          const data = await response.json();
          
          if (action === "quiz" || action === "qa") {
            const qaPairs = data.result || [];
            await addDoc(collection(db, "quizzes"), {
              userId: currentUser.uid,
              materialId: materialDocRef.id,
              materialName: selectedFile.name,
              qaPairs: qaPairs,
              createdAt: serverTimestamp(),
            });
            alert(`Successfully processed ${selectedFile.name} and generated ${qaPairs.length} questions! They have been saved to My Quizzes.`);
          }
        } else {
          alert(`Failed to generate ${action} for the uploaded material.`);
        }
      } else {
        alert(`Successfully uploaded ${selectedFile.name} to your materials.`);
      }
      
      fetchMaterials();
    } catch (error: any) {
      console.warn("Upload error:", error);
      alert(error.message || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
      setIsModalOpen(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-64 p-6 pt-20 pb-24 md:p-8 md:pt-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Welcome back, {displayName}.</h1>
            <p className="text-gray-500 text-base">Ready to master some new concepts today?</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto flex-wrap md:flex-nowrap">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm shrink-0">
              <div className="bg-orange-50 p-3 rounded-full flex items-center justify-center text-orange-500">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">0 Day Streak</h3>
                <div className="w-32 bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-full rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".txt,.md,.csv,.json" 
              className="hidden" 
            />

            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center justify-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {isUploading ? "Uploading..." : "Upload Material"}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-gray-500">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Topics Mastered</span>
            </div>
            <div className="text-3xl font-semibold text-gray-900 mb-1">0</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-gray-500">
              <BrainCircuit className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium">Average Quiz Score</span>
            </div>
            <div className="text-3xl font-semibold text-gray-900 mb-1">0%</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3 text-gray-500">
              <BookOpen className="w-5 h-5 text-sky-500" />
              <span className="text-sm font-medium">Materials Analyzed</span>
            </div>
            <div className="text-3xl font-semibold text-gray-900 mb-1">0</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Recommendations & Progress */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h2>
              <div className="bg-white border border-sky-100 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Started with Mindly</h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">Upload your study materials or start a conversation with the AI tutor to get personalized recommendations and track your progress.</p>
                <Link to="/tutor" className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
                  <MessageSquare className="w-4 h-4" /> Start AI Tutor
                </Link>
              </div>
            </section>
          </div>

          {/* Right Column: Recent Files */}
          <div className="space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Materials</h2>
                <Link to="/materials" className="text-sm font-medium text-sky-600 hover:text-sky-700 flex items-center">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                {recentMaterials.length === 0 ? (
                  <>
                    <div className="p-8 text-center text-gray-500 text-sm">
                      No materials uploaded yet.
                    </div>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer border-t border-gray-100 text-sky-600"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-medium">Upload new material</span>
                    </div>
                  </>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {recentMaterials.map((material) => (
                      <div key={material.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center text-sky-500 shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-sm truncate" title={material.name}>{material.name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {(material.size / 1024).toFixed(1)} KB • {material.createdAt?.toDate().toLocaleDateString() || "Just now"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer text-sky-600"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-medium">Upload new material</span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <UploadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        file={selectedFile}
        onConfirm={handleProcessFile}
        isUploading={isUploading}
      />
    </div>
  );
}

function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
