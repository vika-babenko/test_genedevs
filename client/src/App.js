import React, { useState, useEffect } from 'react';
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
      // Ensure the user is authenticated (you may use a user context or a library like Redux for this)
      // If not authenticated, you can redirect to a login page or show an error message
      // For this example, we're assuming authentication is already handled

      // Proceed with the test creation since the user is authenticated
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
      <h2>Authorization</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name="title" value={title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
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
              onChange={(e) => handleChange(e, index)}
            />
            <label>Answer Options</label>
            <input
              type="text"
              className="form-control"
              name={`questions[${index}].answerOptions`}
              value={question.answerOptions.join(', ')}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>
          SignUP
        </button>
        <button type="submit" className="btn btn-success">Sign in</button>
      </form>
    </div>
  );
};

export default TestCreationForm;
