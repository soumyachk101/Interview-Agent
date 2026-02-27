# 🗄️ Database Structure
## AI Interview Agent — MongoDB Collections & Schemas

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Database:** MongoDB Atlas
**ODM:** Mongoose 8.x

---

## 1. Overview

```
MongoDB Database: ai_interview_agent
│
├── users               ← Registered candidates and admins
├── resumes             ← Uploaded resume files + parsed content
├── sessions            ← Interview session state and conversation history
├── transactions        ← Razorpay payment records
└── reports             ← Post-interview feedback reports
```

---

## 2. Collection: `users`

**Mongoose Model:** `User.js`

### Schema

```javascript
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,        // Never returned in queries by default
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["candidate", "admin"],
      default: "candidate",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailOtp: {
      code: { type: String, select: false },
      expiresAt: { type: Date, select: false },
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    defaultResumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },
    totalSessions: {
      type: Number,
      default: 0,
    },
    totalSpend: {
      type: Number,
      default: 0,         // In paise (INR smallest unit)
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,     // createdAt, updatedAt auto-managed
  }
);
```

### Indexes

```javascript
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ isBanned: 1 });
userSchema.index({ createdAt: -1 });
```

### Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✅ | Candidate's full name |
| `email` | String | ✅ | Unique login email |
| `password` | String | ✅ | Bcrypt hashed, hidden from queries |
| `phone` | String | ❌ | Optional contact number |
| `role` | Enum | ✅ | `candidate` or `admin` |
| `isEmailVerified` | Boolean | ✅ | Email verification status |
| `emailOtp.code` | String | ❌ | Hashed OTP, hidden |
| `emailOtp.expiresAt` | Date | ❌ | OTP expiry timestamp |
| `passwordResetToken` | String | ❌ | Hashed reset token |
| `passwordResetExpires` | Date | ❌ | Reset token expiry |
| `refreshToken` | String | ❌ | Hashed refresh JWT |
| `defaultResumeId` | ObjectId | ❌ | Ref to default resume |
| `totalSessions` | Number | ✅ | Lifetime session count |
| `totalSpend` | Number | ✅ | Lifetime spend in paise |
| `isBanned` | Boolean | ✅ | Admin ban flag |
| `createdAt` | Date | Auto | Account creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

---

## 3. Collection: `resumes`

**Mongoose Model:** `Resume.js`

### Schema

```javascript
const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    label: {
      type: String,
      default: "My Resume",
      maxlength: 50,
    },
    fileUrl: {
      type: String,
      required: true,           // Cloudinary secure URL
    },
    filePublicId: {
      type: String,
      required: true,           // Cloudinary public ID for deletion
    },
    fileType: {
      type: String,
      enum: ["pdf", "docx"],
      required: true,
    },
    fileSizeBytes: {
      type: Number,
      required: true,
    },
    parsedData: {
      rawText: { type: String },
      skills: [{ type: String }],
      experience: [
        {
          company: String,
          role: String,
          duration: String,
          description: String,
        },
      ],
      education: [
        {
          institution: String,
          degree: String,
          year: String,
          gpa: String,
        },
      ],
      projects: [
        {
          name: String,
          techStack: [{ type: String }],
          description: String,
          url: String,
        },
      ],
      certifications: [
        {
          name: String,
          issuer: String,
          year: String,
        },
      ],
    },
    isParsingComplete: {
      type: Boolean,
      default: false,
    },
    parsingError: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
```

### Indexes

```javascript
resumeSchema.index({ userId: 1, createdAt: -1 });
resumeSchema.index({ userId: 1 }, { name: "user_resumes" });
```

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `userId` | ObjectId | Reference to the owning user |
| `label` | String | User-defined label (e.g., "Software Dev CV") |
| `fileUrl` | String | Cloudinary CDN URL |
| `filePublicId` | String | Used to delete from Cloudinary |
| `fileType` | Enum | `pdf` or `docx` |
| `fileSizeBytes` | Number | Raw file size in bytes |
| `parsedData.rawText` | String | Full extracted text |
| `parsedData.skills` | String[] | List of skill keywords |
| `parsedData.experience` | Object[] | Work history entries |
| `parsedData.education` | Object[] | Education entries |
| `parsedData.projects` | Object[] | Project entries with tech stack |
| `parsedData.certifications` | Object[] | Certification entries |
| `isParsingComplete` | Boolean | Whether async parsing is done |
| `parsingError` | String | Error message if parsing failed |

---

## 4. Collection: `sessions`

**Mongoose Model:** `Session.js`

### Schema

```javascript
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    interviewType: {
      type: String,
      enum: ["Technical", "HR", "Mixed"],
      required: true,
    },
    domain: {
      type: String,
      required: true,
      // e.g., "Full Stack", "Backend", "Behavioural"
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    currentQuestion: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "active", "completed", "abandoned"],
      default: "pending",
    },
    conversationHistory: [
      {
        role: {
          type: String,
          enum: ["system", "assistant", "user"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        questionNumber: {
          type: Number,
          default: null,    // Set for assistant questions
        },
        isSkipped: {
          type: Boolean,
          default: false,
        },
        silentScore: {
          type: Number,
          default: null,    // 0–100, set after each answer
          select: false,    // Not exposed to frontend during interview
        },
      },
    ],
    startedAt: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    timeLimitMinutes: {
      type: Number,
      default: 30,
    },
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
```

### Indexes

```javascript
sessionSchema.index({ userId: 1, createdAt: -1 });
sessionSchema.index({ status: 1 });
sessionSchema.index({ userId: 1, status: 1 });
sessionSchema.index({ transactionId: 1 }, { unique: true });
```

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `userId` | ObjectId | Reference to candidate |
| `resumeId` | ObjectId | Resume used for this session |
| `transactionId` | ObjectId | Linked payment |
| `interviewType` | Enum | `Technical`, `HR`, or `Mixed` |
| `domain` | String | e.g., `Full Stack`, `DevOps` |
| `difficulty` | Enum | `Easy`, `Medium`, `Hard` |
| `totalQuestions` | Number | Questions planned for session |
| `currentQuestion` | Number | Progress counter |
| `status` | Enum | `pending → active → completed / abandoned` |
| `conversationHistory` | Object[] | Full chat history with metadata |
| `conversationHistory[].role` | Enum | `system`, `assistant`, `user` |
| `conversationHistory[].content` | String | Message text |
| `conversationHistory[].questionNumber` | Number | For AI questions |
| `conversationHistory[].isSkipped` | Boolean | Was the Q skipped? |
| `conversationHistory[].silentScore` | Number | Hidden score (0–100) |
| `startedAt` | Date | When candidate sent first answer |
| `completedAt` | Date | When session ended |
| `timeLimitMinutes` | Number | Session time cap |
| `reportId` | ObjectId | Generated report reference |

---

## 5. Collection: `transactions`

**Mongoose Model:** `Transaction.js`

### Schema

```javascript
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },
    razorpayPaymentId: {
      type: String,
      default: null,
    },
    razorpaySignature: {
      type: String,
      default: null,
      select: false,
    },
    amountPaise: {
      type: Number,
      required: true,         // Amount in paise (₹49 = 4900 paise)
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed", "refunded"],
      default: "created",
    },
    interviewType: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    paidAt: {
      type: Date,
      default: null,
    },
    receiptEmailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
```

### Indexes

```javascript
transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ razorpayOrderId: 1 }, { unique: true });
transactionSchema.index({ status: 1 });
transactionSchema.index({ paidAt: -1 });
```

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `userId` | ObjectId | Who made the payment |
| `razorpayOrderId` | String | Unique Razorpay order ID |
| `razorpayPaymentId` | String | Returned after successful payment |
| `razorpaySignature` | String | HMAC signature (hidden) |
| `amountPaise` | Number | Amount in paise (₹99 = 9900) |
| `currency` | String | Always `INR` |
| `status` | Enum | `created → paid / failed / refunded` |
| `interviewType` | String | Interview type purchased |
| `domain` | String | Domain selected |
| `difficulty` | String | Difficulty selected |
| `resumeId` | ObjectId | Resume to use in this purchase |
| `paidAt` | Date | Timestamp of payment success |
| `receiptEmailSent` | Boolean | Whether receipt email was dispatched |

---

## 6. Collection: `reports`

**Mongoose Model:** `Report.js`

### Schema

```javascript
const reportSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    grade: {
      type: String,
      enum: ["Excellent", "Good", "Average", "Needs Improvement"],
      required: true,
    },
    strengths: [{ type: String }],
    improvementAreas: [{ type: String }],
    questionFeedback: [
      {
        questionNumber: Number,
        question: String,
        candidateAnswer: String,
        score: { type: Number, min: 0, max: 100 },
        feedback: String,
        isSkipped: { type: Boolean, default: false },
      },
    ],
    skillGapAnalysis: [
      {
        skill: String,
        performanceLevel: {
          type: String,
          enum: ["Strong", "Moderate", "Weak"],
        },
        recommendation: String,
      },
    ],
    learningResources: [
      {
        topic: String,
        url: String,
        platform: String,
      },
    ],
    overallSummary: {
      type: String,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    pdfUrl: {
      type: String,
      default: null,         // Cloudinary URL of exported PDF
    },
  },
  {
    timestamps: true,
  }
);
```

### Indexes

```javascript
reportSchema.index({ sessionId: 1 }, { unique: true });
reportSchema.index({ userId: 1, createdAt: -1 });
reportSchema.index({ overallScore: -1 });
```

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `sessionId` | ObjectId | One-to-one with session |
| `userId` | ObjectId | Candidate who took the interview |
| `overallScore` | Number | Weighted average (0–100) |
| `grade` | Enum | Human-readable grade label |
| `strengths` | String[] | Top performing areas |
| `improvementAreas` | String[] | Areas needing work |
| `questionFeedback` | Object[] | Per-question scores and feedback |
| `skillGapAnalysis` | Object[] | Resume skill vs. performance |
| `learningResources` | Object[] | Recommended external resources |
| `overallSummary` | String | 3–4 sentence summary paragraph |
| `generatedAt` | Date | Report generation timestamp |
| `pdfUrl` | String | Cloudinary URL of PDF export |

---

## 7. Relationships Diagram

```
users
  │
  ├─── 1:N ──► resumes
  │              │
  │              └─── 1:N ──► sessions ──── 1:1 ──► reports
  │                               │
  └─── 1:N ──► transactions ──────┘ (transactionId links to session)
```

---

## 8. MongoDB Atlas Recommended Configuration

| Setting | Value |
|---------|-------|
| Cluster Tier | M0 (dev) → M10 (production) |
| Region | ap-south-1 (Mumbai) for low latency from India |
| Backup | Daily snapshots enabled (M10+) |
| Connection Pool Size | 10 (default for M10) |
| Read Preference | `primary` |
| Write Concern | `majority` |
| Compression | Snappy (enabled by default on Atlas) |

---

## 9. Mongoose Connection Setup

```javascript
// server/config/db.js

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ai_interview_agent",
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

---

## 10. Data Retention Policy

| Collection | Retention | Deletion Trigger |
|-----------|-----------|-----------------|
| `users` | Until account deletion | User request or admin action |
| `resumes` | Until user deletes | User deletes resume or account |
| `sessions` | 1 year | Auto-purge via TTL index (optional) |
| `transactions` | 7 years | Legal compliance (do not delete) |
| `reports` | 1 year | Auto-purge or user request |

**GDPR Note:** On account deletion request, anonymise user PII in `transactions` (replace name/email with `[DELETED]`) but retain the financial record for compliance.
