import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { addInquiry } from "../../features/inquirySlice"; // Import the addInquiry thunk
import styles from "../../assets/styles/InquiryForm.module.css";

const InquiryForm = ({ isOpen, onClose, property }) => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const inquiryData = {
        ...formData,
        property_id: property.id,
        owner_id: property.owner_id,
      };
      await dispatch(addInquiry(inquiryData)); // Dispatch the addInquiry thunk
      alert("Inquiry sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to send inquiry");
      console.error("Error sending inquiry:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get owner name safely
  const ownerName = property?.owner_name || "Owner";

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
          <h2>Send Inquiry</h2>
          <p>Contact {ownerName} about this property</p>
        </div>

        <div className={styles.propertyInfo}>
          <h3>{property?.title}</h3>
          <p className={styles.price}>${property?.price?.toLocaleString()}</p>
          <p className={styles.contact}>Contact: {ownerName}</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane User"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder={`Hi, I'm interested in your property "${property?.title}". Could you please provide more information?`}
            ></textarea>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.tip}>
            <span>Tip:</span> Include specific questions about the property to
            get a faster response from {ownerName}.
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Inquiry"}
            </button>
          </div>

          <p className={styles.disclaimer}>
            Your contact information will be shared with the property
            owner/broker. By sending this inquiry, you agree to be contacted
            about this property.
          </p>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;
