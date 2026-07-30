import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { BrainCircuit, Play, ChevronDown, ChevronUp } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export function MyQuizzes() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [expandedQuizId, setExpandedQuizId] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const fetchQuizzes = async () => {
    if (!currentUser) return;
    try {
      const q = query(
        collection(db, "quizzes"),
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
      setQuizzes(items);
    } catch (error) {
      console.warn("Error fetching quizzes (check Firestore rules):", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [currentUser]);

  const toggleExpand = (id: string) => {
    if (expandedQuizId === id) {
      setExpandedQuizId(null);
    } else {
      setExpandedQuizId(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <main className="md:ml-64 p-6 pt-20 pb-24 md:p-8 md:pt-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Quizzes</h1>
            <p className="text-gray-500 text-sm">Track your test scores and review generated quizzes.</p>
          </div>
          <Link to="/materials" className="flex items-center justify-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors shadow-sm">
            <BrainCircuit className="w-4 h-4" /> Generate More
          </Link>
        </div>

        {quizzes.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 mb-4">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes taken yet</h3>
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                Test your knowledge by generating a quiz from your uploaded materials or asking the AI Tutor.
              </p>
              <Link to="/materials" className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                <Play className="w-4 h-4" /> Go to Materials
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div 
                  className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpand(quiz.id)}
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      Quiz for {quiz.materialName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {quiz.qaPairs?.length || 0} Questions • Generated on {quiz.createdAt?.toDate().toLocaleDateString() || "Recently"}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    {expandedQuizId === quiz.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
                
                {expandedQuizId === quiz.id && quiz.qaPairs && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                    <div className="space-y-6">
                      {quiz.qaPairs.map((qa: any, idx: number) => (
                        <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                          <h4 className="font-medium text-gray-900 mb-3 flex gap-2">
                            <span className="text-sky-500">Q{idx + 1}:</span> {qa.question}
                          </h4>
                          <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <span className="font-semibold text-gray-900 mr-2">Answer:</span> 
                            {qa.answer}
                          </p>
                        </div>
                      ))}
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
