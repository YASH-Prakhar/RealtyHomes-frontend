import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { myProperties } from "../../constants/propertyData"; // Import property data
import styles from "../../assets/styles/propertyDetail.module.css";
import InquiryForm from "../common/InquiryForm"; // Assuming InquiryForm is a component

const PropertyDetail = () => {
  const { id } = useParams(); // Get property ID from URL
  const navigate = useNavigate(); // For navigation
  const [property, setProperty] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    // Fetch property details by ID (for now, filter from myProperties)
    const selectedProperty = myProperties.find((prop) => prop.id === parseInt(id));
    setProperty(selectedProperty);
  }, [id]);

  if (!property) {
    return <div>Loading...</div>; // Show loading state if property is not yet loaded
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        &larr; Back to Properties
      </button>
      <div className={styles.mainContent}>
        {/* Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.mainImageContainer}>
            <img src={property.image} alt={property.title} className={styles.mainImage} />
            <div className={styles.imageCounter}>1/1</div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.ownerSection}>
            <div className={styles.ownerInfo}>
              <div className={styles.ownerAvatar}>{property.owner?.charAt(0)}</div>
              <span className={styles.ownerName}>{property.owner}</span>
            </div>
            <button 
              className={styles.inquiryButton} 
              onClick={() => setIsInquiryOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2" />
              </svg>
              Send Inquiry
            </button>
          </div>

          <div className={styles.priceSection}>
            <h3>Price Breakdown</h3>
            <div className={styles.priceItem}>
              <span>List Price</span>
              <span>{property.price}</span>
            </div>
            <div className={styles.priceItem}>
              <span>Price per sq ft</span>
              <span>${property.pricePerSqFt || "N/A"}</span>
            </div>
            <div className={styles.totalPrice}>
              <span>Total Price</span>
              <span className={styles.price}>{property.price}</span>
            </div>
          </div>

          <div className={styles.quickFacts}>
            <h3>Quick Facts</h3>
            <div className={styles.factItem}>
              <span>Property Type</span>
              <span>{property.type || "N/A"}</span>
            </div>
            <div className={styles.factItem}>
              <span>Year Listed</span>
              <span>{property.yearListed || "N/A"}</span>
            </div>
            <div className={styles.factItem}>
              <span>Status</span>
              <span className={styles.statusActive}>{property.status || "N/A"}</span>
            </div>
            <div className={styles.factItem}>
              <span>Listed By</span>
              <span>{property.owner || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Info Section */}
      <div className={styles.propertyInfo}>
        <div className={styles.propertyHeader}>
          <div className={styles.propertyTitle}>
            <h1>{property.title}</h1>
            <div className={styles.locationContainer}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#6b7280" strokeWidth="2" />
                <circle cx="12" cy="10" r="3" stroke="#6b7280" strokeWidth="2" />
              </svg>
              <span>{property.location}</span>
            </div>
          </div>
          <div className={styles.priceTag}>
            <span className={styles.price}>{property.price}</span>
            <span className={styles.statusBadge}>{property.status}</span>
          </div>
        </div>

        <div className={styles.propertyStats}>
          <div className={styles.stat}>
            <div className={styles.statIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6b7280" strokeWidth="2" />
              </svg>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{property.bedrooms || "N/A"}</span>
              <span className={styles.statLabel}>Bedrooms</span>
            </div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M9 6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2" stroke="#6b7280" strokeWidth="2" />
              </svg>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{property.bathrooms || "N/A"}</span>
              <span className={styles.statLabel}>Bathrooms</span>
            </div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6b7280" strokeWidth="2" />
              </svg>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{property.area || "N/A"}</span>
              <span className={styles.statLabel}>Sq Ft</span>
            </div>
          </div>
        </div>

        <div className={styles.descriptionSection}>
          <h2>Description</h2>
          <p>{property.description || "No description available."}</p>
        </div>

        <div className={styles.featuresSection}>
          <h2>Features & Amenities</h2>
          <div className={styles.featuresGrid}>
            {(property.features || []).map((feature, index) => (
              <div key={index} className={styles.feature}>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InquiryForm 
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        property={property}
      />
    </div>
  );
};

export default PropertyDetail;