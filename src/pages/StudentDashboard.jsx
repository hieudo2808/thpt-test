import ExamList from '../components/Student/ExamList';
import styles from '../styles/Exam.module.scss';

const StudentDashboard = () => {
  return (
    <div className={styles.examContainer}>
      <h1>Student Dashboard</h1>
      <h2>Available Exams</h2>
      <ExamList />
    </div>
  );
};

export default StudentDashboard;