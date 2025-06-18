import { useState } from "react";
import styles from "../../styles/Exam.module.scss";

const QuestionEditor = ({ questions, setQuestions }) => {
    const [newQuestion, setNewQuestion] = useState({
        content: "",
        type: "multiple_choice",
        options: ["", "", "", ""],
        correctAnswer: "",
    });

    const addQuestion = (e) => {
        if (e) e.preventDefault();

        setQuestions([
            ...questions,
            {
                ...newQuestion,
                id: `q${Date.now()}`,
            },
        ]);
        setNewQuestion({
            content: "",
            type: "multiple_choice",
            options: ["", "", "", ""],
            correctAnswer: "",
        });
    };

    return (
        <div className={styles.questionEditor}>
            <h4>Add New Question</h4>
            <select
                value={newQuestion.type}
                onChange={(e) =>
                    setNewQuestion({ ...newQuestion, type: e.target.value })
                }
            >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="text_answer">Text Answer</option>
            </select>

            <textarea
                placeholder="Question content"
                value={newQuestion.content}
                onChange={(e) =>
                    setNewQuestion({ ...newQuestion, content: e.target.value })
                }
            />

            {newQuestion.type === "multiple_choice" && (
                <div className={styles.optionsContainer}>
                    {newQuestion.options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => {
                                const newOptions = [...newQuestion.options];
                                newOptions[index] = e.target.value;
                                setNewQuestion({
                                    ...newQuestion,
                                    options: newOptions,
                                });
                            }}
                        />
                    ))}
                    <select
                        value={newQuestion.correctAnswer}
                        onChange={(e) =>
                            setNewQuestion({
                                ...newQuestion,
                                correctAnswer: e.target.value,
                            })
                        }
                    >
                        <option value="">Select correct answer</option>
                        {newQuestion.options.map(
                            (option, index) =>
                                option && (
                                    <option key={index} value={option}>
                                        Option {index + 1}
                                    </option>
                                )
                        )}
                    </select>
                </div>
            )}

            {newQuestion.type === "text_answer" && (
                <input
                    type="text"
                    placeholder="Correct answer"
                    value={newQuestion.correctAnswer}
                    onChange={(e) =>
                        setNewQuestion({
                            ...newQuestion,
                            correctAnswer: e.target.value,
                        })
                    }
                />
            )}

            <button onClick={addQuestion} className={styles.addButton}>
                Add Question
            </button>
        </div>
    );
};

export default QuestionEditor;
