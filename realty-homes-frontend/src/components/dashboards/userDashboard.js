import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { myProperties, savedProperties, inquiries } from "../../constants/propertyData";
import PropertyListingForm from "../common/PropertyListingForm";
import styles from "../../assets/styles/userDashboard.module.css";
import PropertyCard from "../common/PropertyCard";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useAuth();
  const [isListingFormOpen, setIsListingFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePropertySubmit = async (propertyData) => {
    setIsLoading(true);
    try {
      console.log("Creating property:", propertyData);
      alert("Property listed successfully!");
      // Optionally, update the myProperties list dynamically here
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to list the property. Please try again.");
    } finally {
      setIsLoading(false);
      setIsListingFormOpen(false);
    }
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.welcomeTitle}>Welcome back, {user?.name || 'Jane User'}!</h1>
          <p className={styles.welcomeSubtitle}>Manage your properties and track your real estate activities</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#374151" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div>
            <h3 className={styles.statTitle}>My Properties</h3>
            <div className={styles.statNumber}>1<span className={styles.statUnit}>/5</span></div>
            <p className={styles.statSubtext}>4 remaining</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#374151" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div>
            <h3 className={styles.statTitle}>Saved Properties</h3>
            <div className={styles.statNumber}>2</div>
            <p className={styles.statSubtext}>Favorited listings</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#374151" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div>
            <h3 className={styles.statTitle}>Inquiries</h3>
            <div className={styles.statNumber}>1</div>
            <p className={styles.statSubtext}>New messages</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActionsContainer}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <p className={styles.sectionSubtitle}>Manage your real estate activities</p>
        
        <div className={styles.quickActions}>
          <button
            className={styles.primaryAction}
            onClick={() => setIsListingFormOpen(true)}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "List New Property"}
          </button>
          
          <button className={styles.secondaryAction}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="#374151" strokeWidth="2" fill="none"/>
              <path d="m21 21-4.35-4.35" stroke="#374151" strokeWidth="2"/>
            </svg>
            Browse Properties
          </button>
        </div>
      </div>

      {/* Property Listing Form Modal */}
      <PropertyListingForm
        isOpen={isListingFormOpen}
        onClose={() => setIsListingFormOpen(false)}
        onSubmit={handlePropertySubmit}
      />

      {/* My Properties Section */}
      <div className={styles.propertiesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>My Properties</h2>
          <button className={styles.viewAllBtn}>View All</button>
        </div>
        
        <div className={styles.propertiesGrid}>
          {myProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              showOwner={false}
              onClick={() => handlePropertyClick(property.id)} // Pass the click handler
            />
          ))}
        </div>
      </div>

      {/* Saved Properties Section */}
      <div className={styles.propertiesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Saved Properties</h2>
          <button className={styles.viewAllBtn}>View All</button>
        </div>
        
        <div className={styles.propertiesGrid}>
          {savedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} showOwner={true} />
          ))}
        </div>
      </div>

      {/* Recent Inquiries Section */}
      <div className={styles.inquiriesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Inquiries</h2>
          <button className={styles.viewAllBtn}>View All</button>
        </div>
        
        <div className={styles.inquiriesList}>
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className={styles.inquiryItem}>
              <div className={styles.inquiryContent}>
                <div className={styles.inquiryHeader}>
                  <h4 className={styles.inquirerName}>{inquiry.name}</h4>
                  <span className={styles.inquiryDate}>{inquiry.date}</span>
                </div>
                <p className={styles.inquiryProperty}>{inquiry.property}</p>
                <p className={styles.inquiryMessage}>{inquiry.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;