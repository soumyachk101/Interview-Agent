# ⚙️ Technical Requirements File (TRF)
## AI Interview Agent — MERN Stack

**Version:** 1.0.0
**Status:** Draft
**Last Updated:** 2026-02-26

---

## 1. Technology Stack

### 1.1 Frontend
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React (Vite) | 18.x |
| Styling | TailwindCSS | 3.x |
| State Management | Zustand | 4.x |
| Routing | React Router DOM | 6.x |
| HTTP Client | Axios | 1.x |
| Form Handling | React Hook Form + Zod | Latest |
| PDF Export | react-to-pdf / jspdf | Latest |
| Toast Notifications | react-hot-toast | Latest |
| Markdown Renderer | react-markdown | Latest |

### 1.2 Backend
| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | Node.js | 20 LTS |
| Framework | Express.js | 4.x |
| ODM | Mongoose | 8.x |
| Auth | JWT (jsonwebtoken) + bcryptjs | Latest |
| File Upload | Multer | 1.x |
| File Storage | Cloudinary SDK | 2.x |
| Resume Parsing | pdf-parse + mammoth | Latest |
| Email | Nodemailer + Gmail SMTP | Latest |
| Rate Limiting | express-rate-limit | Latest |
| Validation | Joi / Zod | Latest |
| Logging | Morgan + Winston | Latest |

### 1.3 AI Integration
| Component | Technology |
|-----------|-----------|
| Primary LLM | OpenAI GPT-4o (gpt-4o-mini for cost savings) |
| Fallback LLM | Anthropic Claude 3 Haiku |
| SDK | openai (npm) |
| Streaming | OpenAI streaming chunks via SSE |

### 1.4 Payments
| Component | Technology |
|-----------|-----------|
| Gateway | Razorpay |
| Backend SDK | razorpay (npm) |
| Frontend SDK | Razorpay Checkout.js (CDN) |
| Webhook Verification | HMAC-SHA256 signature check |

### 1.5 Database
| Component | Technology |
|-----------|-----------|
| Primary DB | MongoDB Atlas (M0 free → M10 paid) |
| ODM | Mongoose |
| Indexing | Compound indexes on userId + createdAt |

### 1.6 Deployment
| Service | Platform |
|---------|---------|
| Frontend | Vercel |
| Backend | Render (Web Service) |
| Database | MongoDB Atlas |
| File Storage | Cloudinary |
| Environment Secrets | Render Environment Variables / Vercel Env |

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (React)                        │
│  Pages: Home, Auth, Upload, Config, Payment, Interview,      │
│         Report, Dashboard, Admin                             │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS (REST + SSE)
┌──────────────────────▼──────────────────────────────────────┐
│                     BACKEND (Express)                        │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐  │
│  │ Auth     │ │ Resume   │ │ Payment  │ │  Interview    │  │
│  │ Router   │ │ Router   │ │ Router   │ │  Router (SSE) │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────┘  │
│                       │                                      │
│  ┌────────────────────▼────────────────────────────────┐    │
│  │               Middleware Stack                       │    │
│  │  authMiddleware · rateLimiter · multer · validator  │    │
│  └────────────────────────────────────────────────────┘    │
└───────┬───────────────────┬──────────────────┬─────────────┘
        │                   │                  │
┌───────▼──────┐  ┌─────────▼──────┐  ┌────────▼────────┐
│  MongoDB      │  │   OpenAI API   │  │   Razorpay API  │
│  Atlas        │  │   (GPT-4o)     │  │                 │
└──────────────┘  └────────────────┘  └─────────────────┘
                          │
                  ┌───────▼──────┐
                  │  Cloudinary  │
                  │ (File Store) │
                  └──────────────┘
```

---

## 3. Project Folder Structure

```
ai-interview-agent/
│
├── client/                          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/              # Button, Input, Modal, Loader
│   │   │   ├── interview/           # ChatBubble, Timer, SkipBtn
│   │   │   ├── report/              # ScoreCard, FeedbackItem
│   │   │   └── layout/              # Navbar, Sidebar, Footer
│   │   ├── hooks/                   # useAuth, useInterview, usePayment
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Resume/
│   │   │   │   └── UploadResume.jsx
│   │   │   ├── Config/
│   │   │   │   └── InterviewConfig.jsx
│   │   │   ├── Payment/
│   │   │   │   └── Checkout.jsx
│   │   │   ├── Interview/
│   │   │   │   └── InterviewRoom.jsx
│   │   │   ├── Report/
│   │   │   │   └── FeedbackReport.jsx
│   │   │   ├── Dashboard/
│   │   │   │   └── CandidateDashboard.jsx
│   │   │   └── Admin/
│   │   │       └── AdminDashboard.jsx
│   │   ├── services/                # API call functions (Axios)
│   │   │   ├── authService.js
│   │   │   ├── resumeService.js
│   │   │   ├── paymentService.js
│   │   │   └── interviewService.js
│   │   ├── store/                   # Zustand stores
│   │   │   ├── authStore.js
│   │   │   └── interviewStore.js
│   │   ├── utils/
│   │   │   ├── axiosInstance.js     # Base URL + interceptors
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                          # Express Backend
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   ├── cloudinary.js            # Cloudinary setup
│   │   └── razorpay.js              # Razorpay instance
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── resumeController.js
│   │   ├── paymentController.js
│   │   ├── interviewController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verify
│   │   ├── adminMiddleware.js       # Role check
│   │   ├── uploadMiddleware.js      # Multer config
│   │   └── errorMiddleware.js       # Global error handler
│   ├── models/                      # Mongoose models
│   │   ├── User.js
│   │   ├── Resume.js
│   │   ├── Session.js
│   │   ├── Transaction.js
│   │   └── Report.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── resumeRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── interviewRoutes.js
│   │   └── adminRoutes.js
│   ├── services/
│   │   ├── aiService.js             # OpenAI integration
│   │   ├── resumeParser.js          # pdf-parse + mammoth
│   │   ├── emailService.js          # Nodemailer
│   │   └── reportService.js         # Feedback generation
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── razorpayVerify.js
│   ├── .env
│   ├── app.js                       # Express app setup
│   └── server.js                    # HTTP server entry point
│
└── docs/                            # This documentation folder
    ├── README.md
    ├── PRD.md
    ├── TRF.md
    ├── ai-instructions/
    │   ├── AI_INSTRUCTIONS.md
    │   └── MASTER_PROMPT.md
    └── database/
        └── DATABASE_STRUCTURE.md
```

---

## 4. API Endpoints

### 4.1 Auth Routes — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|---------|------|-------------|
| POST | `/register` | ❌ | Register new user |
| POST | `/verify-otp` | ❌ | Verify email OTP |
| POST | `/login` | ❌ | Login, returns tokens |
| POST | `/refresh` | ❌ | Refresh access token |
| POST | `/forgot-password` | ❌ | Send reset link |
| POST | `/reset-password` | ❌ | Reset with token |
| POST | `/logout` | ✅ | Invalidate refresh token |

### 4.2 Resume Routes — `/api/resume`

| Method | Endpoint | Auth | Description |
|--------|---------|------|-------------|
| POST | `/upload` | ✅ | Upload + parse resume |
| GET | `/` | ✅ | Get all resumes for user |
| GET | `/:id` | ✅ | Get single resume |
| DELETE | `/:id` | ✅ | Delete resume |
| PATCH | `/:id/default` | ✅ | Set as default resume |

### 4.3 Payment Routes — `/api/payment`

| Method | Endpoint | Auth | Description |
|--------|---------|------|-------------|
| POST | `/create-order` | ✅ | Create Razorpay order |
| POST | `/verify` | ✅ | Verify payment signature |
| GET | `/history` | ✅ | Get payment history |
| POST | `/webhook` | ❌ | Razorpay webhook handler |

### 4.4 Interview Routes — `/api/interview`

| Method | Endpoint | Auth | Description |
|--------|---------|------|-------------|
| POST | `/start` | ✅ | Start new session (post-payment) |
| GET | `/session/:id` | ✅ | Get session details |
| POST | `/session/:id/answer` | ✅ | Submit answer, get next question |
| POST | `/session/:id/skip` | ✅ | Skip current question |
| POST | `/session/:id/end` | ✅ | End session early |
| GET | `/history` | ✅ | Get all past sessions |

### 4.5 Report Routes — `/api/report`

| Method | Endpoint | Auth | Description |
|--------|---------|------|-------------|
| GET | `/:sessionId` | ✅ | Get feedback report |
| GET | `/:sessionId/pdf` | ✅ | Download report as PDF |

### 4.6 Admin Routes — `/api/admin`

| Method | Endpoint | Auth | Admin |
|--------|---------|------|-------|
| GET | `/stats` | ✅ | ✅ | Platform stats |
| GET | `/users` | ✅ | ✅ | All users |
| PATCH | `/users/:id/ban` | ✅ | ✅ | Ban user |
| GET | `/sessions` | ✅ | ✅ | All sessions |
| GET | `/revenue` | ✅ | ✅ | Revenue data |

---

## 5. Environment Variables

### 5.1 Backend `.env`

```env
# Server
PORT=5000
NODE_ENV=production

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ai-interview

# JWT
JWT_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay
RAZORPAY_KEY_ID=rzp_live_xxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

# OpenAI
OPENAI_API_KEY=sk-xxxx
OPENAI_MODEL=gpt-4o-mini

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password

# Frontend URL (CORS)
CLIENT_URL=https://your-app.vercel.app
```

### 5.2 Frontend `.env`

```env
VITE_API_BASE_URL=https://your-api.render.com/api
VITE_RAZORPAY_KEY_ID=rzp_live_xxxx
```

---

## 6. Authentication Flow

```
Client                    Server
  │                          │
  ├─── POST /login ─────────►│
  │                          │  Validate credentials
  │                          │  Generate accessToken (15m)
  │                          │  Generate refreshToken (7d)
  │◄── { accessToken } ──────┤  Set refreshToken in HttpOnly cookie
  │                          │
  │  (15 min later)          │
  ├─── POST /refresh ────────►│
  │    (cookie sent auto)    │  Verify refresh token
  │◄── { new accessToken } ──┤
  │                          │
  ├─── Protected Request ────►│
  │    Authorization: Bearer  │  authMiddleware verifies JWT
  │◄── Response ─────────────┤
```

---

## 7. Payment Flow

```
Client                    Server                   Razorpay
  │                          │                          │
  ├─ POST /payment/create ──►│                          │
  │  { amount, difficulty }  │── Create Order ─────────►│
  │                          │◄── { orderId } ──────────┤
  │◄── { orderId, key } ─────┤                          │
  │                          │                          │
  │  Open Razorpay Modal     │                          │
  │──────────────────────────────────────────────────►  │
  │◄── Payment Success ───────────────────────────────  │
  │    { paymentId, orderId, signature }                │
  │                          │                          │
  ├─ POST /payment/verify ──►│                          │
  │                          │  HMAC verify signature   │
  │                          │  Create Transaction doc  │
  │                          │  Create Interview Session│
  │◄── { sessionId } ────────┤                          │
  │                          │                          │
  │  Redirect to /interview/:sessionId                  │
```

---

## 8. AI Interview Flow

```
Client (SSE)              Server                    OpenAI
  │                          │                          │
  ├─ POST /interview/start ─►│                          │
  │                          │  Load resume + config    │
  │                          │  Build system prompt     │
  │                          │──── Stream Question ────►│
  │◄── SSE: question chunk ──│◄─── Streamed tokens ─────┤
  │                          │                          │
  │  User types answer       │                          │
  ├─ POST /answer ──────────►│                          │
  │                          │  Score answer silently   │
  │                          │  Append to conversation  │
  │                          │──── Next question ──────►│
  │◄── SSE: question chunk ──│◄─── Streamed tokens ─────┤
  │                          │                          │
  │  (Repeat N times)        │                          │
  │                          │                          │
  ├─ POST /end ─────────────►│                          │
  │                          │  Generate feedback ─────►│
  │                          │◄── Feedback JSON ─────── │
  │                          │  Save Report to DB       │
  │◄── { reportId } ─────────┤                          │
```

---

## 9. Security Requirements

- All passwords hashed with `bcryptjs` (salt rounds: 12).
- JWTs signed with HS256, access token short-lived (15 min).
- Refresh tokens stored in HttpOnly, Secure, SameSite=Strict cookies.
- Razorpay payment verified using HMAC-SHA256 server-side before session unlock.
- File uploads validated for MIME type (PDF/DOCX only) and size (≤5 MB).
- Resume files stored on Cloudinary with private access mode.
- Rate limiting: 100 req/15 min per IP on auth routes.
- CORS restricted to frontend domain only.
- Helmet.js for HTTP security headers.
- Admin routes protected by role-based middleware.
- MongoDB queries use parameterised inputs (Mongoose prevents NoSQL injection).

---

## 10. Deployment Checklist

- [ ] MongoDB Atlas cluster created, IP whitelist set to `0.0.0.0/0` (or Render IPs).
- [ ] Cloudinary account configured, upload preset created.
- [ ] Razorpay account activated, webhook URL registered.
- [ ] Backend deployed to Render with all env vars set.
- [ ] Frontend deployed to Vercel with `VITE_API_BASE_URL` pointing to Render URL.
- [ ] CORS `CLIENT_URL` updated to Vercel deployment URL.
- [ ] OpenAI API key billing limit set to prevent runaway costs.
- [ ] Email SMTP tested with real Gmail App Password.
- [ ] Health check endpoint `/api/health` returning 200.
