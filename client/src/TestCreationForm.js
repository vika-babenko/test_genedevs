import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const TestCreationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [], // An array of question objects (questionText, answerOptions)
  });

  const { title, description, questions } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...questions, { questionText: '', answerOptions: [] }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/tests', formData);
      console.log('Test created:', res.data);
      // Handle success, redirect, or show a success message
    } catch (error) {
      console.error('Error creating test:', error.response.data);
      // Handle error and show an error message
    }
  };

  // Render the form and handle input fields for questions dynamically

  return (
    <div className="container">
      <h2>Create a New Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" name="title" value={title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" name="description" value={description} onChange={handleChange}></textarea>
        </div>
        {questions.map((question, index) => (
          <div key={index} className="form-group">
            <label>Question {index + 1}</label>
            <input
              type="text"
              className="form-control"
              name={`questions[${index}].questionText`}
              value={question.questionText}
              onChange={handleChange}
            />
            <label>Answer Options</label>
            <input
              type="text"
              className="form-control"
              name={`questions[${index}].answerOptions`}
              value={question.answerOptions.join(', ')}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit" className="btn btn-success">Create Test</button>
      </form>
    </div>
  );
};

export default TestCreationForm;

