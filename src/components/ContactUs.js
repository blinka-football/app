import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import Select, { components } from 'react-select';
import CountryFlag from 'react-country-flag';
import { allCountries } from 'country-telephone-data';

// Find the UK country object to set as default
const defaultCountry = allCountries.find(
  (country) => country.iso2.toUpperCase() === 'GB'
) || allCountries[0];

// Generate country options
const countryOptions = allCountries.map((country) => ({
  value: `+${country.dialCode}`,
  label: `${country.name}`,
  flag: country.iso2.toUpperCase(),
}));

// Custom Option component to display flag and country name
const CustomOption = (props) => (
  <components.Option {...props}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <CountryFlag
        countryCode={props.data.flag}
        svg
        style={{ width: '0.8em', height: '0.8em', marginRight: '0.5em' }} // Reduced size
      />
      <span>{props.label}</span>
    </div>
  </components.Option>
);

// Custom SingleValue component to display flag and country code
const CustomSingleValue = (props) => (
  <components.SingleValue {...props}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <CountryFlag
        countryCode={props.data.flag}
        svg
        style={{ width: '0.8em', height: '0.8em', marginRight: '0.5em' }} // Reduced size
      />
      <span>{props.data.value}</span>
    </div>
  </components.SingleValue>
);

// Custom styles for react-select to match existing form inputs
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#2e2e2e',
    borderColor: state.isFocused ? '#e18e28' : '#555',
    borderRadius: '5px',
    boxShadow: state.isFocused ? '0 0 0 1px #e18e28' : 'none',
    '&:hover': {
      borderColor: '#e18e28',
    },
    padding: '0', // Remove default padding to match input
    height: '100%',
    minHeight: '38px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#c0ba98',
    opacity: 0.7,
    fontSize: '1em',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#c0ba98',
    fontSize: '1em',
  }),
  input: (provided) => ({
    ...provided,
    color: '#c0ba98',
    fontSize: '1em',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#2e2e2e',
    color: '#c0ba98',
    zIndex: 9999, // Ensure the dropdown menu appears above other elements
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#555' : '#2e2e2e',
    color: '#c0ba98',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#c0ba98',
    '&:hover': {
      color: '#c0ba98',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: '#c0ba98',
    '&:hover': {
      color: '#c0ba98',
    },
  }),
};

function ContactUs() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    value: `+${defaultCountry.dialCode}`,
    label: defaultCountry.name,
    flag: defaultCountry.iso2.toUpperCase(),
  }); // Default to UK
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!firstName.trim()) {
      setModalMessage('First Name is required.');
      setIsError(true);
      setShowModal(true);
      return;
    }

    if (!email.trim()) {
      setModalMessage('Email is required.');
      setIsError(true);
      setShowModal(true);
      return;
    }

    if (!message.trim()) {
      setModalMessage('Message is required.');
      setIsError(true);
      setShowModal(true);
      return;
    }

    if (contactNumber) {
      // Remove any non-numeric characters from the input
      const cleanedContactNumber = contactNumber.replace(/\D/g, '');

      // Ensure it's exactly 10 digits
      const numberRegex = /^\d{10}$/;

      if (!numberRegex.test(cleanedContactNumber)) {
        setModalMessage('Please enter a valid 10-digit mobile number.');
        setIsError(true);
        setShowModal(true);
        return;
      }
    } else {
      setModalMessage('Contact number is required.');
      setIsError(true);
      setShowModal(true);
      return;
    }

    // Concatenate country code with the contact number using a hyphen
    const fullContactNumber = `${selectedCountry.value}-${contactNumber}`;

    // Insert data into Supabase contactform table
    const { error } = await supabase
      .from('contactform')
      .insert([
        { 
          firstname: firstName, 
          lastname: lastName, 
          email: email, 
          contact: fullContactNumber, 
          message: message 
        }
      ]);

    if (error) {
      setModalMessage(`Error: ${error.message}`);
      setIsError(true);
      setShowModal(true);
    } else {
      setModalMessage('Your enquiry is registered. We will get back to you soon.');
      setIsError(false);
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
    if (!isError) {
      // Optionally, navigate to another page after successful submission
      // navigate('/some-other-page');
    }
    // If there was an error, stay on the Contact Us page
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
              <label className="form-label">
                Mobile Number<span className="required">*</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40%', marginRight: '10px' }}>
                  <Select
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={(option) => setSelectedCountry(option)}
                    className="country-select"
                    classNamePrefix="select"
                    styles={customSelectStyles}
                    components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                    placeholder="Select Country"
                  />
                </div>
                <input
                  type="text"
                  value={contactNumber}
                  inputMode="tel"
                  maxLength="10" // Ensure it's 10 digits as per your requirement
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                  className="form-input"
                  placeholder="10-digit number"
                  style={{ width: '60%' }}
                />
              </div>
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
    </div>
  );
}

export default ContactUs;
