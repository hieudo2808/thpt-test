import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import styles from '../../styles/Exam.module.scss';

const ExamList = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data } = await api.get('/exams/available');
        setExams(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  if (loading) return <div>Loading exams...</div>;

  return (
    <div className={styles.examList}>
      {exams.map(exam => (
        <div key={exam.id} className={styles.examCard}>
          <h3>{exam.title}</h3>
          <p>Start: {new Date(exam.startTime).toLocaleString()}</p>
          <p>End: {new Date(exam.endTime).toLocaleString()}</p>
          <button 
            className={styles.startButton}
            onClick={() => navigate(`/exam/${exam.id}`)}
          >
            Start Exam
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExamList;