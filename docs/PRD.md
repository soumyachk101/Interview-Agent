# 📋 Product Requirements Document (PRD)
## AI Interview Agent — MERN Stack

**Version:** 1.0.0
**Status:** Draft
**Last Updated:** 2026-02-26
**Owner:** Product Team

---

## 1. Executive Summary

The **AI Interview Agent** is a full-stack SaaS web application that simulates real-world technical and HR interviews. Candidates upload their resume, select an interview type and difficulty level, pay a small fee via Razorpay, and are then interviewed in real-time by an AI agent that reads the resume, asks contextual questions, evaluates answers, and generates a detailed feedback report.

---

## 2. Problem Statement

| Pain Point | Impact |
|-----------|--------|
| Lack of affordable interview practice | Candidates fail due to under-preparation |
| Generic mock interviews ignore the candidate's actual resume | Irrelevant questions reduce practice quality |
| No instant, objective feedback | Learners cannot identify weaknesses quickly |
| Human mock interviewers are expensive | Accessibility barrier for students and early-career professionals |

---

## 3. Goals & Success Metrics

### 3.1 Product Goals
- Deliver personalized, resume-aware AI interviews within 30 seconds of payment confirmation.
- Provide a structured feedback report immediately after interview completion.
- Maintain a smooth, mobile-friendly UX with zero friction checkout.

### 3.2 Key Success Metrics (KPIs)

| Metric | Target (3 months post-launch) |
|--------|-------------------------------|
| Monthly Active Users (MAU) | 2,000+ |
| Interview Completion Rate | ≥ 75% |
| Payment Conversion Rate | ≥ 60% from resume upload |
| Average Feedback Score (User Rating) | ≥ 4.2 / 5 |
| Time-to-First-Question | ≤ 30 seconds after payment |

---

## 4. Target Audience

### 4.1 Primary Users
- **Students & Fresh Graduates** — preparing for campus placements and first jobs.
- **Early-Career Professionals** (0–3 years) — switching roles or targeting specific companies.

### 4.2 Secondary Users
- **Bootcamp Graduates** — polishing technical skills before applying.
- **Non-native English speakers** — practicing professional interview communication.

---

## 5. Scope

### 5.1 In Scope (v1.0)
- User registration and authentication (JWT).
- Resume upload (PDF / DOCX) with parsing.
- Interview type selection: Technical, HR, or Mixed.
- Difficulty selection: Easy, Medium, Hard.
- Razorpay payment gateway integration.
- Real-time AI-driven interview chat interface.
- Dynamic question generation based on resume content.
- Answer evaluation and scoring.
- Post-interview feedback report (PDF export).
- Interview history dashboard.
- Admin dashboard (user management, revenue analytics).

### 5.2 Out of Scope (v1.0)
- Video/voice interviews.
- Team / corporate bulk plans.
- Multi-language support beyond English.
- LinkedIn OAuth login.

---

## 6. Feature Requirements

### 6.1 Authentication Module

**F-AUTH-01 — Registration**
- Fields: Full Name, Email, Password, Phone Number.
- Email verification via OTP before account activation.
- Password: minimum 8 characters, 1 uppercase, 1 special character.

**F-AUTH-02 — Login**
- Email + password login.
- JWT access token (15 min expiry) + refresh token (7 days).
- "Remember Me" stores refresh token in HttpOnly cookie.

**F-AUTH-03 — Password Reset**
- Reset link sent to registered email, valid for 15 minutes.

---

### 6.2 Resume Upload Module

**F-RESUME-01 — Upload**
- Accept PDF and DOCX formats only.
- Maximum file size: 5 MB.
- File stored in Cloudinary / S3 and URL saved to DB.
- Resume parsed server-side using a parsing library (pdf-parse / mammoth).

**F-RESUME-02 — Resume Preview**
- Display parsed resume sections: Skills, Experience, Education, Projects.
- Allow candidate to confirm or re-upload before proceeding.

**F-RESUME-03 — Resume Management**
- Candidates can save up to 3 resumes in their profile.
- Default resume auto-selected for new sessions.

---

### 6.3 Interview Configuration Module

**F-CONFIG-01 — Interview Type**
- Options: Technical, HR, Mixed.
- Brief description shown for each type.

**F-CONFIG-02 — Domain Selection**
- For Technical type: Frontend, Backend, Full Stack, Data Science, DevOps, Mobile.
- For HR type: Behavioural, Situational, Leadership.

**F-CONFIG-03 — Difficulty Level**
- Easy (3–5 questions), Medium (6–8 questions), Hard (9–12 questions).
- Pricing tied to difficulty (see Payment section).

---

### 6.4 Payment Module

**F-PAY-01 — Pricing Tiers**

| Tier | Questions | Price (INR) |
|------|-----------|-------------|
| Easy | 3–5 | ₹49 |
| Medium | 6–8 | ₹99 |
| Hard | 9–12 | ₹199 |

**F-PAY-02 — Razorpay Checkout**
- Create Razorpay order via backend before showing checkout.
- Prefill user name, email, contact in Razorpay modal.
- Handle payment success and failure callbacks.
- Verify payment signature server-side before unlocking interview.

**F-PAY-03 — Payment Receipt**
- Send email receipt with payment ID, amount, and timestamp.
- Store transaction record in DB.

---

### 6.5 AI Interview Module

**F-AI-01 — Session Initialisation**
- On payment success, create an interview session with status `active`.
- Inject system prompt with parsed resume context + interview config.

**F-AI-02 — Question Generation**
- AI generates questions dynamically based on:
  - Resume skills and experience.
  - Selected domain and difficulty.
  - Previous answers (follow-up logic).
- Questions served one at a time.

**F-AI-03 — Answer Evaluation**
- Each answer evaluated silently for:
  - Technical accuracy.
  - Communication clarity.
  - Completeness.
- Scores stored server-side, not shown to candidate mid-interview.

**F-AI-04 — Conversation Interface**
- Chat-style UI (interviewer message left, candidate message right).
- Typing indicator while AI generates next question.
- Time limit per answer: configurable (default 3 minutes), shown as a countdown.
- "Skip" button to move to next question (marks as skipped in report).

**F-AI-05 — Session Completion**
- Interview ends when all questions answered or time limit exceeded.
- Session status updated to `completed`.
- Feedback report generated asynchronously.

---

### 6.6 Feedback Report Module

**F-REPORT-01 — Report Content**
- Overall score (0–100).
- Per-question score with AI commentary.
- Skill gap analysis (mapped to resume skills).
- Strengths and improvement areas summary.
- Recommended learning resources (links).

**F-REPORT-02 — Report Delivery**
- Displayed on-screen immediately after interview.
- Downloadable as PDF.
- Accessible from Interview History dashboard at any time.

---

### 6.7 Dashboard Module

**F-DASH-01 — Candidate Dashboard**
- Interview history (date, type, score, status).
- Average score trend chart (last 5 sessions).
- Resume management section.
- Account settings.

**F-DASH-02 — Admin Dashboard**
- Total users, total sessions, total revenue.
- Filter sessions by date, type, difficulty.
- User management (view, ban, delete).
- Revenue chart (daily / weekly / monthly).

---

## 7. User Stories

| ID | As a… | I want to… | So that… |
|----|-------|------------|---------|
| US-01 | Candidate | Upload my resume | The AI asks me relevant questions |
| US-02 | Candidate | Choose interview type and difficulty | I can practise for my target role |
| US-03 | Candidate | Pay securely via Razorpay | I can unlock my interview session |
| US-04 | Candidate | Get asked follow-up questions | The interview feels realistic |
| US-05 | Candidate | See detailed feedback instantly | I know what to improve |
| US-06 | Candidate | Download my feedback as PDF | I can review it offline |
| US-07 | Candidate | View all past interviews | I can track my progress |
| US-08 | Admin | View revenue and sessions | I can monitor platform health |

---

## 8. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Response latency (AI question) | ≤ 3 seconds (P95) |
| Resume parsing time | ≤ 5 seconds |
| Payment verification | ≤ 2 seconds |
| Uptime | ≥ 99.5% |
| Concurrent sessions supported | 500+ |
| GDPR / Data Privacy | Resumes deletable on request |
| Mobile Responsiveness | Full support (iOS Safari, Android Chrome) |

---

## 9. Acceptance Criteria

- [ ] User can register, verify email, and log in successfully.
- [ ] PDF and DOCX resumes up to 5 MB upload and parse without error.
- [ ] Razorpay payment completes and signature is verified before session starts.
- [ ] AI asks at least 3 questions per session based on resume content.
- [ ] Feedback report is generated and downloadable within 10 seconds of interview end.
- [ ] Admin can view total revenue and user count on the dashboard.
- [ ] All pages render correctly on a 375px wide mobile viewport.

---

## 10. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| AI gives irrelevant questions | Medium | High | Strict system prompt with resume injection |
| Razorpay webhook missed | Low | High | Server-side signature verification as fallback |
| Resume parsing fails for complex PDFs | Medium | Medium | Fallback to raw text extraction; user notified |
| High AI API cost at scale | Medium | Medium | Cache common questions; rate-limit per user |
| Data breach of resumes | Low | Critical | Encrypted storage, access tokens, audit logs |

---

## 11. Timeline (Suggested)

| Phase | Tasks | Duration |
|-------|-------|----------|
| Phase 1 | Auth, Resume Upload, DB setup | Week 1–2 |
| Phase 2 | AI Interview core + Razorpay | Week 3–4 |
| Phase 3 | Feedback Report + Dashboard | Week 5–6 |
| Phase 4 | Testing, QA, Bug Fixes | Week 7 |
| Phase 5 | Deployment + Monitoring | Week 8 |
