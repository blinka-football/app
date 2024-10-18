import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  // Removed isError since it's not used
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setModalMessage(error.message);
      // Removed setIsError(true) since isError is not used
      setShowModal(true);
    } else {
      navigate('/home');
    }
  };

  // Function to handle closing the login error modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle opening the forgot password modal
  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
    setForgotPasswordEmail('');
    setForgotPasswordMessage('');
  };

  // Function to handle closing the forgot password modal
  const handleCloseForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  // Function to handle forgot password submission
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    const redirectToUrl = `${window.location.origin}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(
      forgotPasswordEmail,
      {
        redirectTo: redirectToUrl,
      }
    );

    if (error) {
      console.log('Reset password error:', error);
    }

    setForgotPasswordMessage(
      'If this email exists, a reset password link has been sent.'
    );
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
          <form onSubmit={handleLogin} className="login-form">
            <h2 className="form-title">Login</h2>

            <div className="form-group">
              <label className="form-label">
                Email<span className="required">*</span>
              </label>
              <input
                type="email"
                value={email}
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
                    // SVG icon for "eye" (password visible)
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
                    // SVG icon for "eye with slash" (password hidden)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#c0ba98"
                      viewBox="0 0 24 24"
                      width="24px"
                      height="24px"
                    >
                      <path d="M12 5c-7.633 0-11.524 6.99-11.719 7.308l-.281.692.281.692c.195.318 4.086 7.308 11.719 7.308 7.633 0 11.524-6.99 11.719-7.308l.281-.692-.281-.692c-.195-.318-4.086-7.308-11.719-7.308zm0 13c-4.411 0-7.911-3.057-9.51-5 1.599-1.943 5.099-5 9.51-5 4.411 0 7.911 3.057 9.51 5-1.599 1.943-5.099 5-9.51 5z" />
                      <path
                        d="M2 2l20 20"
                        stroke="#c0ba98"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            <button type="submit" className="startBtn">
              <span className="start-btn-text">Login</span>
            </button>

            <p className="form-footer">
              Don't have an account?{' '}
              <Link to="/signup" className="login-link">
                Sign Up
              </Link>
            </p>

            <p className="form-footer">
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="forgot-password-link"
                style={{
                  fontSize: '14px',
                  background: 'none',
                  border: 'none',
                  padding: '0',
                  margin: '0',
                  color: '#c0ba98',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Forgot Password?
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* T&C and Privacy Links outside the form */}
      <div className="legal-links-container">
        <Link to="/t&c" className="legal-link">
          T&C
        </Link>
        <Link to="/privacy" className="legal-link">
          Privacy
        </Link>
      </div>

      {/* Modal for Login Errors */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
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

      {/* Modal for Forgot Password */}
      {showForgotPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="modal-close-btn"
              onClick={handleCloseForgotPasswordModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="modal-content">
              {!forgotPasswordMessage ? (
                <>
                  <p>Please enter your email to reset your password.</p>
                  <form onSubmit={handleForgotPasswordSubmit}>
                    <input
                      type="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                      className="form-input"
                      placeholder="Enter your email"
                      style={{
                        marginBottom: '10px',
                        width: '100%',
                        padding: '8px',
                      }}
                    />
                    <div className="modal-buttons">
                      <button type="submit" className="modal-ok-btn">
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <p>{forgotPasswordMessage}</p>
                  <button
                    className="modal-ok-btn"
                    onClick={handleCloseForgotPasswordModal}
                  >
                    Okay
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
