import React, {useState, useEffect} from "react";
import { useAuth } from "../../contexts/AuthContext";
import { myProperties, savedProperties, inquiries } from "../../constants/propertyData";
import styles from "../../assets/styles/userDashboard.module.css";
import { PropertyListForm } from "../common/propertyListForm"

const UserDashboard = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  
  const PropertyCard = ({ property, showOwner = false }) => (
    <div className={styles.propertyCard}>
      <div className={styles.imageContainer}>
        <img 
          src={require('../../assets/images/' + property.image.split('\\').pop())} 
          alt={property.title} 
          className={styles.propertyImage} 
        />
        {property.status === 'active' && <span className={styles.activeTag}>active</span>}
        <div className={styles.priceTag}>{property.price}</div>
      </div>
      <div className={styles.propertyContent}>
        <h3 className={styles.propertyTitle}>{property.title}</h3>
        <div className={styles.locationContainer}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#6b7280" strokeWidth="2" fill="none"/>
            <circle cx="12" cy="10" r="3" stroke="#6b7280" strokeWidth="2" fill="none"/>
          </svg>
          <span className={styles.location}>{property.location}</span>
        </div>
        <p className={styles.description}>{property.description}</p>
        
        <div className={styles.propertyFeatures}>
          <div className={styles.feature}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6b7280" strokeWidth="2" fill="none"/>
            </svg>
            <span>{property.bedrooms}</span>
          </div>
          <div className={styles.feature}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M9 6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2" stroke="#6b7280" strokeWidth="2" fill="none"/>
            </svg>
            <span>{property.bathrooms}</span>
          </div>
          <div className={styles.feature}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#6b7280" strokeWidth="2" fill="none"/>
            </svg>
            <span>{property.area}</span>
          </div>
        </div>

        <div className={styles.propertyFooter}>
          <div className={styles.propertyType}>
            <span className={property.type === 'house' ? styles.houseTag : styles.apartmentTag}>
              {property.type}
            </span>
            <span className={styles.listedDate}>{property.listedDate}</span>
          </div>
          
          {showOwner && (
            <div className={styles.ownerInfo}>
              <div className={styles.ownerAvatar}>
                {property.owner.charAt(0)}
              </div>
              <span className={styles.ownerName}>{property.owner}</span>
              {property.agency && <span className={styles.brokerTag}>Broker</span>}
            </div>
          )}
          {!showOwner && (
            <div className={styles.ownerInfo}>
              <div className={styles.ownerAvatar}>
                {property.owner.charAt(0)}
              </div>
              <span className={styles.ownerName}>{property.owner}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

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
          <button className={styles.primaryAction}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M12 6v6l4 2" stroke="white" strokeWidth="2"/>
            </svg>
            List New Property
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

      {/* My Properties Section */}
      <div className={styles.propertiesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>My Properties</h2>
          <button className={styles.viewAllBtn}>View All</button>
        </div>
        
        <div className={styles.propertiesGrid}>
          {myProperties.map((property) => (
            <PropertyCard key={property.id} property={property} showOwner={false} />
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