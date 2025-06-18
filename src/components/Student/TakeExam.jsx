import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import styles from "../../styles/Exam.module.scss";
import Timer from "../common/Timer";

const TakeExam = () => {
    const navigate = useNavigate();
    const { examId } = useParams();
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchExam = async () => {
            const { data } = await api.get(`/exams/${examId}`);
            setExam(data);
        };
        fetchExam();
    }, [examId]);

    const handleSubmit = async () => {
        await api.post(`/exams/${examId}/submit`, { answers });
        // Redirect to results page
        navigate(`/results/${examId}`);
    };

    if (!exam) return <div>Loading...</div>;

    return (
        <div className={styles.examContainer}>
            <h1>{exam.title}</h1>
            <div className={styles.timer}>
                <Timer endTime={exam.endTime} onExpire={handleSubmit} />
            </div>
            {exam.questions.map((q) => (
                <div key={q.id} className={styles.question}>
                    <h3>{q.content}</h3>
                    {q.type === "multiple_choice" ? (
                        q.options.map((opt) => (
                            <label key={opt}>
                                <input
                                    type="radio"
                                    name={q.id}
                                    value={opt}
                                    onChange={(e) =>
                                        setAnswers({
                                            ...answers,
                                            [q.id]: e.target.value,
                                        })
                                    }
                                />
                                {opt}
                            </label>
                        ))
                    ) : (
                        <input
                            type="text"
                            onChange={(e) =>
                                setAnswers({
                                    ...answers,
                                    [q.id]: e.target.value,
                                })
                            }
                        />
                    )}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default TakeExam;
