import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle back button click
  const handleBackClick = () => {
    navigate('/signup'); // Navigate to the Sign Up page
  };

  return (
    <div className="legal-container">
      <i
        className="fas fa-arrow-left back-icon-legal" // Use existing back-icon class
        onClick={handleBackClick}
        role="button"
        aria-label="Back to Sign Up"
      ></i>
      <h2>Terms & Conditions</h2>
      
      <h3>1. Introduction</h3>
      <p>Welcome to Blinka. These terms and conditions ("Terms") govern your use of the Blinka application ("App"), owned by Richard Nugent. By using the App, you agree to abide by these Terms.</p>
      <p>If you do not agree to these Terms, please refrain from using the App.</p>

      <h3>2. Purpose</h3>
      <p>Blinka is designed to help individuals improve their cognitive abilities, agility, and mobility. The App is provided free of charge, and its content is for informational and educational purposes only.</p>

      <h3>3. User Registration</h3>
      <p>To use Blinka, you must create an account by providing your first name, email address, and a password. While the last name and mobile number are optional, we recommend you provide complete and accurate information for better communication and support.</p>

      <h3>4. Privacy</h3>
      <p>Your personal information, including your name and email address, will be processed and stored in accordance with our Privacy Policy. Please review the Privacy Policy to understand how we handle your data.</p>

      <h3>5. Account Security</h3>
      <p>You are responsible for maintaining the confidentiality of your login credentials. If you suspect any unauthorized use of your account, notify us immediately.</p>
      <p>Blinka will not be liable for any loss or damage arising from unauthorized access to your account due to your failure to secure your login information.</p>

      <h3>6. Use of the App</h3>
      <p>Blinka is intended solely for personal, non-commercial use. You agree not to misuse the App in any way that could disrupt or damage its functionality.</p>

      <h3>7. Modifications to the App</h3>
      <p>We reserve the right to modify or discontinue, temporarily or permanently, any part of the App without prior notice.</p>

      <h3>8. Limitation of Liability</h3>
      <p>Richard Nugent will not be held liable for any damages or losses arising from your use of the App. Your use of Blinka is at your own risk.</p>

      <h3>9. Changes to the Terms</h3>
      <p>We reserve the right to modify these Terms at any time. Any changes will be posted within the App, and your continued use of the App after changes are made signifies your acceptance of the updated Terms.</p>

      <h3>10. Contact Us</h3>
      <p>If you have any questions or require further clarification about these Terms, feel free to contact us at <a href="mailto:askblinka@gmail.com">askblinka@gmail.com</a></p>
      <a href="mailto:askblinka@gmail.com" className='email-at'>BLINKA</a>
    </div>
  );
}

export default TC;
