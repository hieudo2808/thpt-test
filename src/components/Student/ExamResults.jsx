import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import styles from "../../styles/Exam.module.scss";

const ExamResults = () => {
    const { examId } = useParams();
    const [results, setResults] = useState(null);
    const [exam, setExam] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: examData } = await api.get(`/exams/${examId}`);
                const { data: resultData } = await api.get(
                    `/results/${examId}`
                );
                setExam(examData);
                setResults(resultData);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };
        fetchData();
    }, [examId]);

    if (!results || !exam) return <div>Loading results...</div>;

    return (
        <div className={styles.examContainer}>
            <h1>{exam.title} Results</h1>
            <div className={styles.scoreSummary}>
                <h2>
                    Your Score: {results.score}/{exam.questions.length}
                </h2>
                <p>
                    Submission Time:{" "}
                    {new Date(results.submittedAt).toLocaleString()}
                </p>
            </div>

            <div className={styles.resultsDetails}>
                {exam.questions.map((question, index) => {
                    const isCorrect = results.result[index]?.correct;
                    const studentAnswer = results.answers[question.id];

                    return (
                        <div
                            key={question.id}
                            className={`${styles.questionResult} ${
                                isCorrect ? styles.correct : styles.incorrect
                            }`}
                        >
                            <h3>
                                Question {index + 1}: {question.content}
                            </h3>

                            {question.type === "multiple_choice" ? (
                                <>
                                    <p>Your answer: {studentAnswer}</p>
                                    <p>
                                        Correct answer: {question.correctAnswer}
                                    </p>
                                    <div className={styles.options}>
                                        {question.options.map((opt) => (
                                            <span
                                                key={opt}
                                                className={`${styles.option} ${
                                                    opt ===
                                                    question.correctAnswer
                                                        ? styles.correctOption
                                                        : ""
                                                }`}
                                            >
                                                {opt}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>Your answer: {studentAnswer}</p>
                                    <p>
                                        Correct answer: {question.correctAnswer}
                                    </p>
                                </>
                            )}

                            <div className={styles.status}>
                                {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExamResults;
