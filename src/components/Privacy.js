import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Privacy = () => {
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
      <h2>Privacy Policy</h2>
      <h3>1. Information We Collect</h3>
      <p>
        <strong>Personal Information:</strong> When you register for Blinka, we collect your first name, email address, and password. Providing your last name and mobile number is optional but recommended for better communication.
      </p>

      <h3>2. How We Use Your Information</h3>
      <p>
        <strong>Account Creation and Management:</strong> We use your personal information to create and manage your account on Blinka.
      </p>
      <p>
        <strong>Communication:</strong> We may use your email address to send you important updates, notifications, or support-related messages. If you have provided your mobile number, we may contact you via SMS.
      </p>

      <h3>3. Sharing Your Information</h3>
      <p>
        We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following cases:
      </p>
      <p>
        <strong>Service Providers:</strong> We may share your information with trusted third-party service providers to help us operate and maintain Blinka. These service providers are obligated to protect your information and use it only as necessary to perform services for us.
      </p>
      <p>
        <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid legal requests.
      </p>

      <h3>4. Data Security</h3>
      <p>
        We are committed to ensuring the security of your personal information. We use industry-standard security measures to protect your data from unauthorised access, disclosure, alteration, or destruction. However, no data transmission over the internet or electronic storage method is completely secure. While we strive to protect your information, we cannot guarantee its absolute security.
      </p>

      <h3>5. Your Rights</h3>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you.</li>
        <li>Request corrections to inaccurate or incomplete information.</li>
        <li>Request deletion of your personal information, subject to legal requirements.</li>
        <li>Opt-out of any marketing communications we send.</li>
      </ul>
      <p>To exercise these rights, please contact us at <a href="mailto:askblinka@gmail.com">askblinka@gmail.com</a></p>

      <h3>6. Children's Privacy</h3>
      <p>
        Blinka is not intended for use by individuals under the age of 8. We do not knowingly collect personal information from children under 8. </p>
        <p>If we learn that we have collected such information, we will take steps to delete it promptly.
      </p>

      <h3>7. Changes to This Privacy Policy</h3>
      <p>
        We reserve the right to update this Privacy Policy from time to time. Any changes will be posted in the app, and we encourage you to review this Privacy Policy regularly. Your continued use of the app after any changes indicates your acceptance of the updated Privacy Policy.
      </p>

      <h3>8. Contact Us</h3>
      <p>
        If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at <a href="mailto:askblinka@gmail.com">askblinka@gmail.com</a>
        <a href="mailto:askblinka@gmail.com" className='email-at'>BLINKA</a>
      </p>
    </div>
  );
}

export default Privacy;
