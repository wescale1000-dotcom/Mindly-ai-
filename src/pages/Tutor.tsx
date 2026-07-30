import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft,
  BrainCircuit,
  FileText,
  Mic,
  Paperclip,
  Send,
  Sparkles,
  Plus,
  MessageSquare,
  MoreHorizontal,
  Menu,
  X,
  AtSign
} from "lucide-react";
import { Logo } from "../components/Logo";

import { db } from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export function Tutor() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [showFileTags, setShowFileTags] = useState(false);
  const [messages, setMessages] = useState<{role: string, parts: {text: string}[], displayText?: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [availableFiles, setAvailableFiles] = useState<any[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
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
          items.push({ id: doc.id, name: doc.data().name, content: doc.data().content });
        });
        setAvailableFiles(items);
      } catch (error: any) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchMaterials();
  }, [currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);
    
    // Simple trigger for file tagging when user types '@'
    if (value.endsWith('@')) {
      setShowFileTags(true);
    } else if (!value.includes('@')) {
      setShowFileTags(false);
    }
  };

  const insertTag = (filename: string) => {
    const newText = inputText.slice(0, -1) + `@${filename} `;
    setInputText(newText);
    setShowFileTags(false);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    let expandedText = inputText;
    availableFiles.forEach(file => {
      const tag = `@${file.name}`;
      if (expandedText.includes(tag)) {
        expandedText = expandedText.replace(tag, `[Reference Material: ${file.name}\nContent:\n${file.content}]\n`);
      }
    });

    const newMessages = [
      ...messages,
      { role: "user", parts: [{ text: expandedText }], displayText: inputText }
    ];
    
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    try {
      // Send without displayText to the backend
      const payloadMessages = newMessages.map(m => ({ role: m.role, parts: m.parts }));
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (response.status === 429) { throw new Error("I'm currently receiving too many requests. Please wait a minute and try again."); } if (!response.ok) { const errorData = await response.json().catch(() => ({})); throw new Error(errorData.error || "Network response was not ok"); }

      const data = await response.json();
      setMessages([...newMessages, { role: "model", parts: [{ text: data.text }] }]);
    } catch (error: any) {
      console.warn("Failed to send message:", error);
      setMessages([...newMessages, { role: "model", parts: [{ text: error.message || "Sorry, I encountered an error communicating with the server." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderInputArea = () => (
    <div className="w-full relative">
      {/* Tag Popup */}
      {showFileTags && (
        <div className="absolute bottom-full left-4 md:left-auto mb-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-10">
          <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500">
            Tag a file
          </div>
          <div className="max-h-48 overflow-y-auto">
            {availableFiles.map(file => (
              <button 
                key={file.id}
                onClick={() => insertTag(file.name)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700 flex items-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gray-100 rounded-2xl border-none focus-within:border-none focus-within:ring-0 focus-within:outline-none focus-within:bg-white transition-all shadow-sm flex flex-col">
        <textarea 
          rows={1}
          value={inputText}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Message Mindly Tutor... (Type @ to tag a file)"
          className="w-full bg-transparent border-0 ring-0 focus:ring-0 focus:border-0 focus:outline-none outline-none resize-none py-3.5 px-4 text-gray-900 placeholder:text-gray-500 max-h-32 min-h-[52px] shadow-none"
          style={{ height: 'auto', boxShadow: 'none' }}
        />
        <div className="flex items-center justify-between px-3 pb-2 pt-1">
          <div className="flex items-center gap-1">
            <button 
              className="p-1.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-200/50 transition-colors tooltip-trigger"
              title="Attach file"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button 
              className="p-1.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-200/50 transition-colors"
              title="Tag file"
              onClick={() => setShowFileTags(!showFileTags)}
            >
              <AtSign className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-200/50 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button 
              onClick={handleSendMessage}
              className={`p-1.5 rounded-lg transition-colors flex items-center justify-center w-8 h-8 ${inputText.trim() && !isLoading ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-sm' : 'bg-gray-200 text-gray-400'}`}
              disabled={!inputText.trim() || isLoading}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-2">
        <p className="text-[11px] text-gray-400 font-medium">Mindly Tutor can make mistakes. Consider verifying important information.</p>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-white flex font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat History Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-72 bg-gray-50 border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <button className="md:hidden p-2" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="px-3 pb-4">
          <button className="w-full flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm">
            <Plus className="w-4 h-4" /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-6">
          <div className="text-center text-sm text-gray-400 mt-8">
            No previous chats
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <header className="h-14 border-b border-gray-100 flex items-center justify-between px-4 shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-gray-900 font-medium">
              Mindly Tutor <span className="text-gray-400 font-normal text-sm">Gemma 4</span>
            </div>
          </div>
        </header>

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl flex flex-col items-center">
              <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-md mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">What do you want to learn today?</h2>
              {renderInputArea()}
            </div>
          </div>
        ) : (
          <>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
              <div className="max-w-3xl mx-auto space-y-8">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-4 md:gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border ${
                      msg.role === 'user' 
                        ? 'bg-gray-200 text-gray-700 font-medium border-gray-300' 
                        : 'bg-white shadow-sm border-gray-200'
                    }`}>
                      {msg.role === 'user' ? 'A' : <Logo className="w-5 h-5" />}
                    </div>
                    <div className={`flex-1 min-w-0 pt-1 ${msg.role === 'user' ? 'flex flex-col items-end' : ''}`}>
                      <div className={`prose prose-sm md:prose-base leading-relaxed max-w-none ${
                        msg.role === 'user' 
                          ? 'bg-gray-900 text-white rounded-2xl rounded-tr-sm p-4 shadow-sm inline-block max-w-[85%]' 
                          : 'text-gray-800'
                      }`}>
                        {(msg.displayText || msg.parts[0].text).split('\n').map((paragraph, i) => (
                          <p key={i} className={msg.role === 'user' ? 'text-white m-0' : ''}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-8 h-8 rounded-full bg-white shrink-0 flex items-center justify-center shadow-sm border border-gray-200">
                      <Logo className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0 pt-3">
                      <div className="flex space-x-1.5">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white relative shrink-0">
              <div className="max-w-3xl mx-auto w-full">
                {renderInputArea()}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
