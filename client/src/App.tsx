import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { CandidateDashboard } from "./pages/Dashboard/CandidateDashboard";
import { SetupInterview } from "./pages/Resume/SetupInterview";
import { InterviewRoom } from "./pages/Interview/InterviewRoom";
import { FeedbackReport } from "./pages/Report/FeedbackReport";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<CandidateDashboard />} />
                <Route path="/setup" element={<SetupInterview />} />
                <Route path="/interview-room" element={<InterviewRoom />} />
                <Route path="/report/:id" element={<FeedbackReport />} />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
