import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TakeExam from "./components/Student/TakeExam";
import ExamResults from "./components/Student/ExamResults";
import { useAuth } from "./contexts/AuthContext";
import Register from "./pages/Register";

const App = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/teacher"
                element={
                    <ProtectedRoute allowedRoles={["Teacher"]}>
                        <TeacherDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/student"
                element={
                    <ProtectedRoute allowedRoles={["Student"]}>
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/exam/:examId"
                element={
                    <ProtectedRoute allowedRoles={["Student"]}>
                        <TakeExam />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/results/:examId"
                element={
                    <ProtectedRoute allowedRoles={["Student"]}>
                        <ExamResults />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/"
                element={
                    user ? (
                        user.role === "Teacher" ? (
                            <Navigate to="/teacher" />
                        ) : (
                            <Navigate to="/student" />
                        )
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
        </Routes>
    );
};

export default App;
