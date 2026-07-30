import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { FileText, Play, ChevronDown, ChevronUp } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export function MyMindmaps() {
  const [mindmaps, setMindmaps] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const fetchMindmaps = async () => {
    if (!currentUser) return;
    try {
      const q = query(
        collection(db, "mindmaps"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      items.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.toMillis() - a.createdAt.toMillis();
      });
      setMindmaps(items);
    } catch (error) {
      console.warn("Error fetching mindmaps (check Firestore rules):", error);
    }
  };

  useEffect(() => {
    fetchMindmaps();
  }, [currentUser]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <main className="md:ml-64 p-6 pt-20 pb-24 md:p-8 md:pt-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Mindmaps</h1>
            <p className="text-gray-500 text-sm">Review your generated mindmaps.</p>
          </div>
          <Link to="/materials" className="flex items-center justify-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors shadow-sm">
            <FileText className="w-4 h-4" /> Generate More
          </Link>
        </div>

        {mindmaps.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No mindmaps yet</h3>
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                Generate a mindmap from your uploaded materials to visualize your study content.
              </p>
              <Link to="/materials" className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                <Play className="w-4 h-4" /> Go to Materials
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {mindmaps.map((mindmap) => (
              <div key={mindmap.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div 
                  className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpand(mindmap.id)}
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      Mindmap for {mindmap.materialName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Generated on {mindmap.createdAt?.toDate().toLocaleDateString() || "Recently"}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    {expandedId === mindmap.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
                
                {expandedId === mindmap.id && mindmap.markdown && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm overflow-auto">
                      <pre className="text-gray-700 text-sm whitespace-pre-wrap font-sans">
                        {mindmap.markdown}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
