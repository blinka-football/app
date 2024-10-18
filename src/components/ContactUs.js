import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';  // Import useNavigate

function ContactUs() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!firstName.trim()) {
      setModalMessage('First Name is required.');
      setShowModal(true);
      return;
    }

    if (!email.trim()) {
      setModalMessage('Email is required.');
      setShowModal(true);
      return;
    }

    if (!message.trim()) {
      setModalMessage('Message is required.');
      setShowModal(true);
      return;
    }

    // Insert data into Supabase contactform table
    const { error } = await supabase
      .from('contactform')
      .insert([
        { 
          firstname: firstName, 
          lastname:lastName, 
          email: email, 
          contact: contactNumber, 
          message: message 
        }
      ]);

    if (error) {
      setModalMessage(`Error: ${error.message}`);
      setShowModal(true);
    } else {
      setModalMessage('Your enquiry is registered. We will get back to you soon.');
      setShowModal(true);
      // Clear form after successful submission
      setFirstName('');
      setLastName('');
      setEmail('');
      setContactNumber('');
      setMessage('');
    }
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle back button click
  const handleBackClick = () => {
    navigate('/signup'); // Navigate to the Sign Up page
  };

  return (
    <div className="page-container">
      <div className="left-side">
        <div className="left-content">
          <h1 className="blinka-text">BLINKA</h1>
        </div>
      </div>
      <div className="right-side">
        <div className="form-container">
          <div className="form-header">
            {/* Font Awesome back icon */}
            <i
              className="fas fa-arrow-left back-icon"
              onClick={handleBackClick}
              role="button"
              aria-label="Back to Sign Up"
            ></i>
            <h2 className="form-title">Contact Us</h2>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label className="form-label">
                First Name<span className="required">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                maxLength="50"
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                value={lastName}
                maxLength="50"
                onChange={(e) => setLastName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Email<span className="required">*</span>
              </label>
              <input
                type="email"
                value={email}
                maxLength="50"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Message<span className="required">*</span>
              </label>
              <textarea
                value={message}
                maxLength="500"
                onChange={(e) => setMessage(e.target.value)}
                required
                className="form-input"
                rows="5"
              />
            </div>

            <button type="submit" className="startBtn">
              <span className="start-btn-text">Submit</span>
            </button>
          </form>
        </div>
      </div>

      {/* T&C and Privacy Links outside the form */}
      <div className="legal-links-container">
          <Link to="/t&c" className="legal-link">T&C</Link>
          <Link to="/privacy" className="legal-link">Privacy</Link>
        </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close modal">
              &times;
            </button>
            <div className="modal-content">
              <p>{modalMessage}</p>
              <button className="modal-ok-btn" onClick={handleCloseModal}>
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactUs;
