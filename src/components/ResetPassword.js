import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle

  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setIsRecovery(true);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Password validation
    if (!newPassword) {
      setModalMessage('Password is required.');
      setIsError(true);
      return;
    }
    if (newPassword.length < 6 || newPassword.length > 20) {
      setModalMessage('Password must be between 6 and 20 characters.');
      setIsError(true);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error('Error resetting password:', error.message);
        setModalMessage('Failed to reset password. Please try again.');
        setIsError(true);
      } else {
        setModalMessage('Your password has been successfully updated. Please log in with your new password.');
        setIsError(false);

        // Sign out the user to clear any existing sessions
        await supabase.auth.signOut();

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setModalMessage('An unexpected error occurred. Please try again later.');
      setIsError(true);
    }
  };

  const handleCloseModal = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isRecovery ? (
        <div className="page-container">
          <div className="left-side">
            <div className="left-content">
              <h1 className="blinka-text">BLINKA</h1>
            </div>
          </div>
          <div className="right-side">
            <div className="form-container">
              <h2 className="form-title">Reset Your Password</h2>
              <form onSubmit={handleResetPassword} className="reset-password-form">
                <div className="form-group">
                  <label className="form-label">
                    New Password<span className="required">*</span>
                  </label>
                  <div className="password-field">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="form-input password-input"
                      placeholder="Enter your new password"
                      minLength="6"
                      maxLength="20"
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
                          <path d="M2 2l20 20" stroke="#c0ba98" strokeWidth="2"/>
                        </svg>
                      )}
                    </span>
                  </div>
                </div>

                {modalMessage && (
                  <p
                    style={{
                      color: isError ? 'red' : 'green',
                      marginBottom: '10px',
                      textAlign: 'center',
                    }}
                  >
                    {modalMessage}
                  </p>
                )}

                <div className="modal-buttons" style={{ justifyContent: 'center' }}>
                  <button type="submit" className="startBtn">
                    <span className="start-btn-text">Reset Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
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
              <p style={{ textAlign: 'center' }}>
                Invalid or expired reset link. Please request a new password reset.
              </p>
              <button className="modal-ok-btn" onClick={handleCloseModal}>
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
