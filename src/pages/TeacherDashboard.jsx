import ExamList from "../components/Student/ExamList";
import CreateExamForm from "../components/Teacher/CreateExamForm";
import styles from "../styles/Exam.module.scss";

const TeacherDashboard = () => {
    return (
        <div className={styles.examContainer}>
            <h1>Teacher Dashboard</h1>
            <CreateExamForm />
            <h2>Your Exams</h2>
            <ExamList />
        </div>
    );
};

export default TeacherDashboard;
