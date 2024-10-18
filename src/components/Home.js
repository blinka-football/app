// components/Home.js
import React, { useContext, useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { AuthContext } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import blinkaLogo from '../media/blinka-logo.png'; 
import footballImage from '../media/football.png'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tabs/style/react-tabs.css';
import Confetti from './Confetti'; 

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const [copySuccess, setCopySuccess] = useState('');

  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  const [isConfettiVisible, setIsConfettiVisible] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleShareApp = () => {
    setIsModalOpen(true);
    setDropdownOpen(false);
  };

  const handleFeedback = () => {
    setIsFeedbackModalOpen(true);
    setDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  // Function to copy the sign-up link to clipboard
  const handleCopyLink = () => {
    const signupLink = `${window.location.origin}/signup`;
    navigator.clipboard
      .writeText(signupLink)
      .then(() => {
        setCopySuccess('Link copied!');
        setTimeout(() => {
          setCopySuccess('');
          closeModal();
        }, 1500);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy link. Please try again.');
      });
  };

  // Function to submit feedback
  const submitFeedback = async (rating, message) => {
    try {
      const { error } = await supabase.from('feedback').insert([
        {
          user_id: user.id,
          rating: rating,
          message: message,
        },
      ]);

      if (error) {
        console.error('Error submitting feedback:', error);
        toast.error('Failed to submit feedback. Please try again.');
      } else {
        setFeedbackSuccess('Thank you for your feedback!');
        setTimeout(() => {
          setFeedbackSuccess('');
          closeFeedbackModal();
        }, 1500);
      }
    } catch (err) {
      console.error('Unexpected error submitting feedback:', err);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  // Function to handle scroll down
  const handleScrollDown = () => {
    const scrollValue = window.innerWidth <= 768 ? 1100 : 1700;
    window.scrollBy({ top: scrollValue, behavior: 'smooth' });
  };


  const triggerConfetti = () => {
    setIsConfettiVisible(true);
    setTimeout(() => {
      setIsConfettiVisible(false);
    }, 3000); // Hide confetti after 3 seconds
  };


  // Scroll behavior for promo content heading
  useEffect(() => {
    const handleScroll = () => {
      const promoHeading = document.querySelector('.promo-body');
      if (!promoHeading) return;

      const windowHeight = window.innerHeight;
      const promoHeadingPosition = promoHeading.getBoundingClientRect().top;

      // Check if the scroll has passed halfway point of the heading
      if (promoHeadingPosition < windowHeight / 2) {
        promoHeading.classList.add('underline'); 
      } else {
        promoHeading.classList.remove('underline');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); 
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div id="large-header" className="large-header">
        {user && <Confetti isVisible={isConfettiVisible}/>}
        {/* Dropdown for Share App, Sign Out , and Feedback */}
        {user && (
          <div className="dropdown" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="User Menu"
              className="dropdown-toggle"
            >
              <i className="fas fa-user"></i>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleShareApp}>
                  Share App
                </button>
                <button className="dropdown-item" onClick={handleFeedback}>
                  Feedback
                </button>
                <button className="dropdown-item" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}

        {/* Blinka Logo Text */}
        <div className="blinka-logo-container">
          <h1 className="blinka-text">BLINKA</h1>
        </div>

        {/* Blinka Image Logo with Football */}
        <div className="logo-with-football-container">
          <img src={blinkaLogo} alt="Blinka Logo" className="blinka-image-logo" onClick={triggerConfetti}/>
          <img src={footballImage} alt="Football" className="football-image" />
        </div>

        {/* Personalized Message */}
        <p className="personalized-message">
          {user && user.user_metadata && user.user_metadata.firstName ? (
            <>
              <span className="user-name">
                {user.user_metadata.firstName.toUpperCase()},
              </span>{' '}
              <span className="message-text">CAN YOU KEEP UP?</span>
            </>
          ) : (
            <span className="message-text">CAN YOU KEEP UP?</span>
          )}
        </p>
        
        <a href="#bottom" className='scroll-down' onClick={handleScrollDown}>LET'S PLAY ↓</a>

        {/* Promo Content */}
        <div className="promo-content">
          <h2 className="promo-body">
            JOURNEY INTO BLINKA: UNDERSTANDING THE GAME'S IMPACT
          </h2>
          <div className="video-container">
            <iframe
              className="promo-video"
              src="https://www.youtube.com/embed/xE_fQGaC4vI"
              title="GROUP SOCCER TRAINING IDEAS | Joner Football"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Modal for Share App */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
                &times;
              </button>
              <div className="modal-content">
                <p>Share this link to invite others to sign up:</p>
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/signup`}
                  className="share-link-input"
                  style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
                />
                <button className="modal-ok-btn" onClick={handleCopyLink}>
                  Copy
                </button>
                {copySuccess && <p className="copy-success">{copySuccess}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Modal for Feedback */}
        {isFeedbackModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <button
                className="modal-close-btn"
                onClick={closeFeedbackModal}
                aria-label="Close modal"
              >
                &times;
              </button>
              <div className="modal-content">
                <p>We value your feedback!</p>
                <FeedbackForm onSubmit={submitFeedback} />
                {feedbackSuccess && (
                  <p className="copy-success">{feedbackSuccess}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </>
  );
};

// FeedbackForm Component
const FeedbackForm = ({ onSubmit }) => {
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');

  const [ratingError, setRatingError] = useState('');
  const [messageError, setMessageError] = useState('');

  const handleSubmitFeedback = () => {
    let hasError = false;

    if (!rating) {
      setRatingError('Please select a rating.');
      hasError = true;
      setTimeout(() => {
        setRatingError('');
      }, 1500);
    }

    if (message.trim().length === 0) {
      setMessageError('Please enter your feedback.');
      hasError = true;
      setTimeout(() => {
        setMessageError('');
      }, 1500);
    }

    if (hasError) {
      return;
    }

    onSubmit(parseInt(rating), message.trim());
  };

  return (
    <>
      <label htmlFor="rating" style={{ display: 'block', marginBottom: '10px' }}>
        How likely are you to recommend our app to a friend?<span className="required">*</span>
      </label>
      <select
        id="rating"
        name="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      >
        <option value="" disabled>
          Select rating
        </option>
        <option value="1">1 - Definitely Not Recommend</option>
        <option value="2">2 - Probably Not Recommend</option>
        <option value="3">3 - Not Sure</option>
        <option value="4">4 - Probably Recommend</option>
        <option value="5">5 - Definitely Recommend</option>
      </select>
      {ratingError && <p className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{ratingError}</p>}

      <label htmlFor="message" style={{ display: 'block', marginBottom: '10px' }}>
        Your Feedback:<span className="required">*</span>
      </label>
      <textarea
        id="message"
        name="message"
        maxLength="500"
        rows="5"
        placeholder="Enter your feedback (max 500 characters)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      ></textarea>
      {messageError && <p className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{messageError}</p>}

      <div>
        <button className="modal-ok-btn" onClick={handleSubmitFeedback}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Home;
