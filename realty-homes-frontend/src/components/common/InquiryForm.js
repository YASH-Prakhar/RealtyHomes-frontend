import React from 'react';
import styles from '../../assets/styles/InquiryForm.module.css';

const InquiryForm = ({ isOpen, onClose, property }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };

  const handleInquirySent = () => {
    alert('Inquiry sent successfully!');
    console.log('Inquiry details sent for property:', property);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={onClose}>×</button>
          <h2>Send Inquiry</h2>
          <p>Contact {property?.owner || 'Owner'} about this property</p>
        </div>

        <div className={styles.propertyInfo}>
          <h3>{property?.title}</h3>
          <p className={styles.price}>{property?.price}</p>
          <p className={styles.contact}>Contact: {property?.owner}</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              placeholder="Jane User"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              placeholder="user@example.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              rows="4"
              required
              placeholder={`Hi, I'm interested in your property "${property?.title}". Could you please provide more information?`}
            ></textarea>
          </div>

          <div className={styles.tip}>
            <span>Tip:</span> Include specific questions about the property to get
            a faster response from {property?.owner}.
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button onClick={handleInquirySent} type="submit" className={styles.submitButton}>
              Send Inquiry
            </button>
          </div>

          <p className={styles.disclaimer}>
            Your contact information will be shared with the property owner/broker. 
            By sending this inquiry, you agree to be contacted about this property.
          </p>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;