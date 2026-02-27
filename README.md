# 🤖 AI Interview Agent — Documentation Hub

> MERN Stack · Resume Upload · Razorpay Payments · Cloud Deployment

---

## 📁 Folder Structure

```
ai-interview-agent/
│
├── README.md                          ← You are here
├── PRD.md                             ← Product Requirements Document
├── TRF.md                             ← Technical Requirements File
│
├── ai-instructions/
│   ├── AI_INSTRUCTIONS.md             ← Core AI behaviour & rules
│   └── MASTER_PROMPT.md               ← Master system prompt for the agent
│
└── database/
    └── DATABASE_STRUCTURE.md          ← MongoDB schemas & collections
```

---

## 📄 Document Index

| File | Purpose |
|------|---------|
| `PRD.md` | Full product vision, features, user stories, and acceptance criteria |
| `TRF.md` | Tech stack, architecture, API contracts, third-party integrations |
| `ai-instructions/AI_INSTRUCTIONS.md` | Rules, constraints & personality for the AI interviewer |
| `ai-instructions/MASTER_PROMPT.md` | Ready-to-use system prompt injected at runtime |
| `database/DATABASE_STRUCTURE.md` | All MongoDB collections, fields, types, and indexes |

---

## 🚀 Quick Start

1. Read `PRD.md` to understand **what** we are building.
2. Read `TRF.md` to understand **how** it is built.
3. Feed `MASTER_PROMPT.md` directly into your AI model API call.
4. Use `DATABASE_STRUCTURE.md` to scaffold your Mongoose models.

---

## 🛠️ Tech Stack at a Glance

- **Frontend** — React (Vite), TailwindCSS, Axios
- **Backend** — Node.js, Express.js
- **Database** — MongoDB + Mongoose
- **AI** — OpenAI GPT-4o / Claude (configurable)
- **Payments** — Razorpay
- **File Storage** — Multer + Cloudinary / AWS S3
- **Deployment** — Render / Railway (backend) + Vercel (frontend)
