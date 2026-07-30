import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Upload, FileText, Plus, Loader2, BookOpen } from "lucide-react";
import { UploadModal } from "../components/UploadModal";
import { GenerateModal } from "../components/GenerateModal";
import { db } from "../lib/firebase";
import { collection, addDoc, query, where, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export function MyMaterials() {
  const [isUploading, setIsUploading] = useState(false);
  const [materials, setMaterials] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [selectedMaterialForGen, setSelectedMaterialForGen] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();
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
      // Sort in memory since we didn't create a composite index for orderBy yet
      items.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.toMillis() - a.createdAt.toMillis();
      });
      setMaterials(items);
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

  const handleGenerateFromMaterial = async (action: string) => {
    if (!selectedMaterialForGen || !currentUser) return;
    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/process-material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: selectedMaterialForGen.content, action }),
      });

      if (!response.ok) { const errData = await response.json().catch(() => ({})); throw new Error(errData.error || "Failed to process material"); } if (true) {
        const data = await response.json();
        
        if (action === "quiz" || action === "qa") {
          const qaPairs = data.result || [];
          await addDoc(collection(db, "quizzes"), {
            userId: currentUser.uid,
            materialId: selectedMaterialForGen.id,
            materialName: selectedMaterialForGen.name,
            qaPairs: qaPairs,
            createdAt: serverTimestamp(),
          });
          alert(`Successfully generated ${qaPairs.length} questions! They have been saved to My Quizzes.`);
          navigate('/quizzes');
        } else if (action === "mindmap") {
          const markdown = data.result?.markdown || "";
          await addDoc(collection(db, "mindmaps"), {
            userId: currentUser.uid,
            materialId: selectedMaterialForGen.id,
            materialName: selectedMaterialForGen.name,
            markdown: markdown,
            createdAt: serverTimestamp(),
          });
          alert(`Successfully generated a mindmap for ${selectedMaterialForGen.name}! It has been saved to My Mindmaps.`);
          navigate('/mindmaps');
        }
      } else {
        alert(`Failed to generate ${action} for the material.`);
      }
    } catch (error: any) {
      console.warn("Generate error:", error);
      const isPermission = error.message?.includes("Missing or insufficient permissions");
      if (isPermission) {
        alert("Firestore Permission Denied. Please update your Firestore Security Rules in the Firebase Console to allow this operation.");
      } else {
        alert(error.message || "An error occurred during generation.");
      }
    } finally {
      setIsGenerating(false);
      setIsGenerateModalOpen(false);
      setSelectedMaterialForGen(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <main className="md:ml-64 p-6 pt-20 pb-24 md:p-8 md:pt-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Materials</h1>
            <p className="text-gray-500 text-sm">Upload and manage your study documents.</p>
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
            className="flex items-center justify-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {isUploading ? "Uploading & Analyzing..." : "Upload Material"}
          </button>
        </div>

        {materials.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm divide-y divide-gray-100">
            <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No materials yet</h3>
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                Upload your past questions, lecture notes, or textbooks to start getting personalized study recommendations and auto-generated quizzes. (Currently supports .txt, .md)
              </p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" /> Upload your first document
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <div key={material.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center text-sky-500">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 truncate" title={material.name}>
                  {material.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  {(material.size / 1024).toFixed(1)} KB • {material.createdAt?.toDate().toLocaleDateString() || "Just now"}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => {
                      setSelectedMaterialForGen(material);
                      setIsGenerateModalOpen(true);
                    }}
                    className="text-sm font-medium text-sky-600 hover:text-sky-700 flex items-center gap-1"
                  >
                    <BookOpen className="w-4 h-4" />
                    Generate AI Content
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <UploadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        file={selectedFile}
        onConfirm={handleProcessFile}
        isUploading={isUploading}
      />

      <GenerateModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        material={selectedMaterialForGen}
        onConfirm={handleGenerateFromMaterial}
        isGenerating={isGenerating}
      />
    </div>
  );
}
