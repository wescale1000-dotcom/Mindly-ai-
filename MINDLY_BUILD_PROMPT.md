# Mindly — AI Build Prompt

Build **Mindly**, an AI-powered study assistant web app that helps students preparing for WAEC, NECO, JAMB, and university exams turn their own learning materials (textbooks, PDFs, lecture notes, past questions, images of notes) into a personalized, interactive learning system powered by Google's Gemma 4 model.

Mindly is not a generic chatbot — every feature should be built around a concrete AI task (document analysis, extraction, summarization, question generation, answer grading, personalization), not a freeform chat window bolted onto the product.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Shadcn UI
- **Backend:** Next.js API Routes, Node.js
- **Database:** Supabase (Postgres)
- **Vector Database:** Supabase Vector (pgvector) — for embedding and retrieving chunks of uploaded documents
- **Auth:** Supabase Auth (or Clerk)
- **File Storage:** Supabase Storage — for uploaded PDFs, notes, and images
- **AI Model:** Google Gemma 4, called server-side from API routes

## Core User

A secondary school or university student in Nigeria preparing for a specific exam (WAEC, NECO, JAMB, or a university course), who has their own study materials and needs help understanding them, knowing what to prioritize, and testing themselves.

## MVP Feature Set (build these first, in this order)

### 1. Auth & Onboarding
- Sign up / log in (email + password, or Google via Supabase Auth)
- Onboarding flow to capture: exam type (WAEC/NECO/JAMB/University), subjects of interest, exam date, and available study time per week
- This onboarding data feeds the Study Plan Generator later

### 2. Document Upload & AI Document Analyzer
- Upload flow supporting PDF, images (photos of handwritten/printed notes), and plain text
- Store raw files in Supabase Storage, associate with the student's account and a chosen subject
- On upload, send content to Gemma 4 to produce:
  - A structured summary of the document
  - A list of key concepts and definitions extracted from it
  - Flagged "difficult topics" (topics the model assesses as conceptually dense or exam-critical)
  - Study recommendations tied to the content
- Chunk and embed document content into the Supabase vector database so it can be retrieved later by the AI Tutor and Quiz Generator (retrieval-augmented generation, not just one-shot summarization)
- Show processing status (queued → analyzing → ready) since document analysis is not instant

### 3. Past Question Analyzer
- Separate upload flow specifically for past exam papers (WAEC/NECO/JAMB/university past questions)
- Gemma 4 analyzes uploaded past questions to surface:
  - Frequently repeated topics across years
  - Recurring question patterns/formats
  - Estimated difficulty distribution
  - A ranked list of "focus areas" the student should prioritize
- Output should be tied back to the student's subject/document library so recommendations connect to their own materials

### 4. Personal AI Tutor
- Chat-style interface, but scoped: the tutor is grounded in the student's uploaded materials (via the vector store) plus their quiz/answer history, not a general-purpose assistant
- Student can ask questions about a specific document, topic, or past mistake
- Tutor should reference which uploaded material an explanation is drawn from
- Tutor adjusts explanation depth based on the student's demonstrated level (informed by quiz results and graded answers, not just the current message)

### 5. AI Quiz Generator
- Generate quizzes from a selected document, topic, or subject
- Support both multiple-choice and theory/essay-style questions
- Each generated question includes a marking guide / model answer for grading and for the student to self-check
- Store generated quizzes and results tied to the student's account for progress tracking

### 6. AI Answer Grader
- Student submits a written answer (to a theory question, from the quiz generator or typed manually)
- Gemma 4 evaluates: accuracy, missing information, specific mistakes, and concrete improvement suggestions
- Store graded results as part of the student's performance history — this feeds the dashboard's "weak areas" and the tutor's personalization

## Post-MVP Features (build after the above is working)

### 7. AI Study Plan Generator
- Generate a personalized schedule using: exam date, subjects, weekly available time, and current ability (from quiz/grading history)
- Plan should be editable/regenerable, and broken into weekly or daily tasks tied to specific subjects/topics

### 8. AI Flashcard Generator
- Convert any analyzed document into a flashcard deck automatically
- Support basic spaced-repetition style review (mark card as known/unsure/unknown, resurface accordingly)

### 9. AI Voice Tutor (optional/stretch)
- Voice-based conversation mode for the Personal AI Tutor, using speech-to-text input and text-to-speech output
- Same grounding rules as the text tutor (based on the student's materials and history)

## Student Dashboard

Build a dashboard as the default landing page after login, showing:
- Overall learning progress (e.g., topics covered vs. flagged difficult topics)
- Quiz scores over time, broken down by subject
- Study streak (consecutive days of activity)
- Per-subject performance breakdown
- AI-generated recommendations (next best action: a quiz to retake, a topic to review, a document not yet analyzed)
- Weak areas surfaced from graded answers and quiz results

## Data Model Considerations (guide, not final schema)

- `users` — auth identity + onboarding info (exam type, subjects, exam date, weekly study time)
- `documents` — uploaded files, subject, processing status, summary, key concepts, difficulty flags
- `document_chunks` / vector embeddings — for retrieval by tutor and quiz generator
- `past_questions` — uploaded past papers, linked analysis (repeated topics, patterns, difficulty)
- `quizzes` and `quiz_questions` — generated questions, type (MCQ/theory), marking guide, linked source document/topic
- `quiz_attempts` — student responses, scores, timestamps
- `graded_answers` — submitted answers, AI feedback, accuracy score, linked topic/subject
- `study_plans` — generated schedule, tasks, linked subjects and exam date
- `flashcards` — generated cards, source document, review state
- `tutor_conversations` — message history, linked documents/topics referenced

## Build Priorities for Hackathon MVP

If time is constrained, build in this exact order and stop wherever time runs out — each step should be a fully working slice, not a partial version of everything:
1. Auth + onboarding
2. AI Document Analyzer (upload → Gemma 4 analysis → stored summary/concepts)
3. Personal AI Tutor (grounded in uploaded documents)
4. AI Quiz Generator
5. Past Question Analyzer
6. AI Answer Grader
7. Dashboard tying progress progress together

## What NOT to build in this pass

- No generic/unscoped chatbot — every AI interaction must be grounded in the student's own materials or history
- No payment/subscription flow unless explicitly requested later
- No admin/teacher-facing tools — this is a student-only MVP
- No mobile app — web app only, responsive for mobile browsers
