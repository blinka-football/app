import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [isError, setIsError] = useState(false); 

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Additional validation for First Name
    if (!firstName.trim()) {
      setModalMessage('First Name is required.');
      setIsError(true);
      setShowModal(true);
      return;
    }

    if (contactDetails) {
      // Remove any non-numeric characters from the input
      const cleanedContactDetails = contactDetails.replace(/\D/g, '');
    
      // Check if the number starts with 07 and has 11 digits or starts with 7 and has 10 digits
      const ukMobileRegex = /^(07\d{9}|7\d{9})$/;
      
      if (!ukMobileRegex.test(cleanedContactDetails)) {
        setModalMessage('Please enter a valid UK mobile number');
        setIsError(true);
        setShowModal(true);
        return;
      }
    }
    
    // Sign up the user with Supabase
    const { error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`, // Redirect after confirming email
          data: {
            firstName,
            lastName,
            contactDetails,
          },
        },
      }
    );

    if (error) {
      setModalMessage(error.message);
      setIsError(true);
      setShowModal(true);
    } else {
      setModalMessage('Check your email for the confirmation link.');
      setIsError(false);
      setShowModal(true);
    }
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    if (!isError) {
      navigate('/login'); // Redirect to login page after successful sign-up
    }
    // If there was an error, stay on the sign-up page
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
          <form onSubmit={handleSignUp} className="signup-form">
            <h2 className="form-title">Sign Up</h2>

            <div className="form-group">
              <label className="form-label">
                First Name / User Name<span className="required">*</span>
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
              <label className="form-label">
                Password<span className="required">*</span>
              </label>
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  minLength="6"
                  maxLength="20"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input password-input"
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  role="button"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#c0ba98"
                      viewBox="0 0 24 24"
                      width="24px"
                      height="24px"
                    >
                      <path d="M12 5c-7.633 0-11.524 6.99-11.719 7.308l-.281.692.281.692c.195.318 4.086 7.308 11.719 7.308 7.633 0 11.524-6.99 11.719-7.308l.281-.692-.281-.692c-.195-.318-4.086-7.308-11.719-7.308zm0 13c-4.411 0-7.911-3.057-9.51-5 1.599-1.943 5.099-5 9.51-5 4.411 0 7.911 3.057 9.51 5-1.599 1.943-5.099 5-9.51 5z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#c0ba98"
                      viewBox="0 0 24 24"
                      width="24px"
                      height="24px"
                    >
                      <path d="M12 5c-7.633 0-11.524 6.99-11.719 7.308l-.281.692.281.692c.195.318 4.086 7.308 11.719 7.308 7.633 0 11.524-6.99 11.719-7.308l.281-.692-.281-.692c-.195-.318-4.086-7.308-11.719-7.308zm0 13c-4.411 0-7.911-3.057-9.51-5 1.599-1.943 5.099-5 9.51-5 4.411 0 7.911 3.057 9.51 5-1.599 1.943-5.099 5-9.51 5z" />
                      <path d="M2 2l20 20" stroke="#c0ba98" strokeWidth="2"/>
                    </svg>
                  )}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input
                type="text"
                value={contactDetails}
                onChange={(e) => setContactDetails(e.target.value)}
                className="form-input"
              />
            </div>

            <button type="submit" className="startBtn">
              <span className="start-btn-text">Sign Up</span>
            </button>

            <p className="form-footer">
              Already have an account?{' '}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </p>
            <p className="form-footer">
              <Link to="/contactus" className="contact-us">
                Contact Us
              </Link>
            </p>
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

export default SignUp;
