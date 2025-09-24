import React from "react";
import styles from "../../assets/styles/propertyCard.module.css";

const PropertyCard = ({ property, showOwner = false, onClick }) => (
  <div className={styles.propertyCard} onClick={onClick}>
    <div className={styles.imageContainer}>
      <img
        src={require("../../assets/images/" + property.image.split("\\").pop())}
        alt={property.title}
        className={styles.propertyImage}
      />
      {property.status === "active" && <span className={styles.activeTag}>active</span>}
      <div className={styles.priceTag}>{property.price}</div>
    </div>
    <div className={styles.propertyContent}>
      <h3 className={styles.propertyTitle}>{property.title}</h3>
      <div className={styles.locationContainer}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#6b7280" strokeWidth="2" fill="none" />
          <circle cx="12" cy="10" r="3" stroke="#6b7280" strokeWidth="2" fill="none" />
        </svg>
        <span className={styles.location}>{property.location}</span>
      </div>
      <p className={styles.description}>{property.description}</p>
      <div className={styles.propertyFeatures}>
        <div className={styles.feature}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6b7280" strokeWidth="2" fill="none" />
          </svg>
          <span>{property.bedrooms}</span>
        </div>
        <div className={styles.feature}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M9 6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2"
              stroke="#6b7280"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span>{property.bathrooms}</span>
        </div>
        <div className={styles.feature}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6b7280" strokeWidth="2" fill="none" />
          </svg>
          <span>{property.area}</span>
        </div>
      </div>
      <div className={styles.propertyFooter}>
        <div className={styles.propertyType}>
          <span className={property.type === "house" ? styles.houseTag : styles.apartmentTag}>{property.type}</span>
          <span className={styles.listedDate}>{property.listedDate}</span>
        </div>
        {showOwner && (
          <div className={styles.ownerInfo}>
            <div className={styles.ownerAvatar}>{property.owner.charAt(0)}</div>
            <span className={styles.ownerName}>{property.owner}</span>
            {property.agency && <span className={styles.brokerTag}>Broker</span>}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default PropertyCard;