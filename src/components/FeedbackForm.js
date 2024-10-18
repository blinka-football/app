// components/FeedbackForm.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const FeedbackForm = ({ onSubmit }) => {
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmitFeedback = () => {
    if (!rating) {
      toast.error('Please select a rating.');
      return;
    }

    if (message.trim().length === 0) {
      toast.error('Please enter your feedback.');
      return;
    }

    onSubmit(parseInt(rating), message.trim());
  };

  return (
    <>
      <label htmlFor="rating">Rating (1-5):</label>
      <select
        id="rating"
        name="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      >
        <option value="" disabled>
          Select rating
        </option>
        <option value="1">1 - Very Dissatisfied</option>
        <option value="2">2 - Dissatisfied</option>
        <option value="3">3 - Neutral</option>
        <option value="4">4 - Satisfied</option>
        <option value="5">5 - Very Satisfied</option>
      </select>

      <label htmlFor="message">Your Feedback:</label>
      <textarea
        id="message"
        name="message"
        maxLength="500"
        rows="5"
        placeholder="Enter your feedback (max 500 characters)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      ></textarea>

      <div>
        <button className="modal-ok-btn" onClick={handleSubmitFeedback}>
          Submit
        </button>
      </div>
    </>
  );
};

export default FeedbackForm;
