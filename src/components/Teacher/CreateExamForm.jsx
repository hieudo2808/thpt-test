import { useState } from 'react';
import api from '../../services/api';
import QuestionEditor from './QuestionEditor';

const CreateExamForm = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting exam data:', {
        title,
        questions,
        startTime, 
        endTime
      });
      // Gửi dữ liệu lên server
      await api.post('/exams', {
        title,
        questions,
        startTime,
        endTime
      });
    } catch (error) {
      console.error(error);
    } finally {
      // Reset form dù request thành công hay thất bại
      setTitle('');
      setQuestions([]);
      setStartTime('');
      setEndTime('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Exam title"
      />
      
      <QuestionEditor questions={questions} setQuestions={setQuestions} />
      
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      
      <button type="submit">Create Exam</button>
    </form>
  );
};

export default CreateExamForm;