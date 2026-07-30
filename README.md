# Mindly 🧠 - Your AI-Powered Study Assistant

![Mindly Banner](https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200&h=400)

**Mindly** is an intelligent, full-stack study assistant application. Built with React, Vite, and powered exclusively by the **Gemma 4 AI model**, Mindly helps students organize their study materials, test their knowledge, and learn new topics effectively through AI-driven content generation and interactive tutoring.

---

## 🌟 Features & Capabilities

Mindly offers a robust suite of tools designed to enhance your studying experience:

### 1. 🤖 AI Tutor Chat
- **Interactive Conversational Interface:** Powered by the **Gemma 4** model.
- **Deep Explanations:** Capable of explaining complex topics, summarizing study notes, and providing interactive tutoring sessions.
- **Educational Formatting:** The system prompt is optimized for clear, educational responses using markdown formatting.

### 2. 📄 Material Upload & Processing
- **Format Support:** Users can seamlessly upload study materials (.txt, .md).
- **Secure Parsing:** Once uploaded, documents are securely stored and parsed for AI analysis.

### 3. 📝 AI Quiz Generation
- **Automated Testing:** Extracts key facts and concepts from uploaded study materials.
- **Multiple-Choice:** Generates a 5-question multiple-choice quiz automatically using the Gemma AI API.
- **Detailed Answers:** Questions include four options (A/B/C/D) and correctly identified answers with concise explanations.

### 4. 🧠 AI Q&A Generation
- **Flashcard-Ready:** Analyzes a document and synthesizes 5 robust question-and-answer pairs.
- **Quick Revisions:** Ideal for flashcard-style studying and fast-paced revisions.

### 5. 🗺️ AI Mindmap Generation
- **Visual Learning:** Analyzes uploaded materials and constructs a hierarchical mindmap outline.
- **Structured Knowledge:** Uses Gemma AI to structure knowledge visually, providing an organized Markdown-based tree to aid structural learning and conceptual mapping.

---

## 🛠️ Tech Stack

Mindly utilizes a modern, performant tech stack:

- **Frontend**: React 19, React Router v7, Tailwind CSS v4, Lucide React (for crisp iconography).
- **Backend**: Node.js, Express.js (used to securely wrap AI requests without exposing API keys to the client).
- **AI Integration**: `@google/genai` utilizing the **Gemma 4** model.
- **Database/Storage**: Firebase Firestore (stores user metadata, generated quizzes, QA, mindmaps, and uploaded material metadata).
- **Authentication**: Firebase Auth for secure user login and session management.

---

## 🚀 Getting Started & Documentation

Follow these instructions to set up Mindly locally for development and testing.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- A **Google Gemini/Gemma API Key**
- A **Firebase Project** with Authentication and Firestore enabled

### 1. Clone & Install Dependencies

```bash
# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory and ensure the following variables are set. Do not commit this file to version control.

```env
GEMINI_API_KEY=your_gemini_or_gemma_api_key_here
```

### 3. Start the Development Server

```bash
npm run dev
```
*This command starts both the Express API and the Vite React development server concurrently on port `3000`.*

### 4. Build for Production

```bash
npm run build
```
*This command compiles the React application into the `dist` folder and bundles the Express server into `dist/server.cjs`. You can then run the built application using:*

```bash
npm start
```

---

## 📂 Project Structure

A brief overview of the core directories and files:

- `/src/components/` - Reusable React UI components (Sidebar, Navigation, Modals, etc.)
- `/src/pages/` - Application route views (Dashboard, My Materials, Quizzes, Mindmaps, AI Tutor, etc.)
- `/src/lib/` - Utility functions and setup configurations, including the Firebase initialization (`firebase.ts`).
- `/src/contexts/` - React context providers (e.g., `AuthContext.tsx` for global user state).
- `/server.ts` - The Express backend server that provides `/api/chat` and `/api/process-material` endpoints, securely communicating with the Gemma AI API.

---

## 🔒 Firebase Firestore Rules

Ensure that you deploy the proper Firestore security rules to allow secure reading and writing exclusively for authenticated users. The required rules are defined in `firestore.rules`.

You can deploy these rules using the Firebase CLI:

```bash
firebase deploy --only firestore:rules
```

*(Note: In development, you can test these rules via the Firebase Emulator Suite or directly in the Firebase Console.)*
