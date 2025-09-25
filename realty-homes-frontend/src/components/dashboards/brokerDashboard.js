import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  brokerProfile,
  recentInquiries,
  monthlyStats,
  statsChanges,
} from "../../constants/brokerData";
import styles from "../../assets/styles/brokerDashboard.module.css";
import PropertyCard from "../common/PropertyCard";
import PropertyListingForm from "../common/PropertyListingForm"; // Import the form
import axios from "axios";

const BrokerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize navigate
  const [isListingFormOpen, setIsListingFormOpen] = useState(false); // State to control form visibility
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const [brokerProperties, setBrokerProperties] = useState([]); // State to store broker's properties
  const [fetchError, setFetchError] = useState(null); // State to handle fetch errors

  useEffect(() => {
    fetchBrokerProperties(); // Fetch properties when component mounts
  }, []);

  const fetchBrokerProperties = async () => {
    try {
      const token = localStorage.getItem("SESSION_TOKEN");
      const response = await axios.get(
        "http://localhost:5000/api/properties/my-properties",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            user_id: user.id,
          },
        }
      );
      setBrokerProperties(response.data.properties || []);
    } catch (error) {
      console.error("Error fetching broker properties:", error);
      setFetchError("Failed to load properties");
    }
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`); // Navigate to the property detail page
  };

  const handlePropertySubmit = async (propertyData) => {
    setIsLoading(true);
    const token = localStorage.getItem("SESSION_TOKEN");

    const formData = new FormData();
    for (const key in propertyData) {
      if (key === "images") {
        propertyData.images.forEach((file) => {
          formData.append("images", file);
        });
      } else if (key === "features") {
        formData.append("features", JSON.stringify(propertyData.features));
      } else if (
        propertyData[key] !== undefined &&
        propertyData[key] !== null
      ) {
        formData.append(key, propertyData[key]);
      }
    }

    try {
      await axios.post("http://localhost:5000/api/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Property listed successfully!");
      fetchBrokerProperties(); // Refresh the property list
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to list the property. Please try again.");
    } finally {
      setIsLoading(false);
      setIsListingFormOpen(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.welcomeTitle}>
            Welcome back, {user?.name || brokerProfile.name}!
          </h1>
          <div className={styles.brokerBadges}>
            <span className={styles.brokerTitle}>{brokerProfile.title}</span>
            <span className={styles.agencyName}>{brokerProfile.agency}</span>
          </div>
          <p className={styles.welcomeSubtitle}>
            Manage your professional real estate portfolio
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  stroke="#6b7280"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <span className={styles.statTitle}>Total Properties</span>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>
              {brokerProfile.totalProperties}
            </div>
            <div className={styles.statMeta}>
              <span className={styles.statSubtext}>
                {brokerProfile.activeListings} active listings
              </span>
              <span className={styles.statChange}>
                {statsChanges.totalProperties}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2v20M2 12h20" stroke="#10b981" strokeWidth="2" />
              </svg>
            </div>
            <span className={styles.statTitle}>Total Portfolio Value</span>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>
              {brokerProfile.portfolioValue}
            </div>
            <div className={styles.statMeta}>
              <span className={styles.statSubtext}>
                Avg. {brokerProfile.avgPropertyValue}
              </span>
              <span className={styles.statChange}>
                {statsChanges.portfolioValue}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <span className={styles.statTitle}>New Inquiries</span>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>
              {brokerProfile.newInquiries}
            </div>
            <div className={styles.statMeta}>
              <span className={styles.statSubtext}>This week</span>
              <span className={styles.statChange}>
                {statsChanges.newInquiries}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  stroke="#eab308"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <span className={styles.statTitle}>Agency Rating</span>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{brokerProfile.rating}</div>
            <div className={styles.statMeta}>
              <span className={styles.statSubtext}>
                From {brokerProfile.reviewsCount} reviews
              </span>
              <span className={styles.statChange}>
                {statsChanges.agencyRating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Broker Tools */}
      <div className={styles.brokerToolsContainer}>
        <h2 className={styles.sectionTitle}>Broker Tools</h2>
        <p className={styles.sectionSubtitle}>
          Professional real estate management tools
        </p>

        <div className={styles.brokerTools}>
          <button
            className={styles.primaryTool}
            onClick={() => setIsListingFormOpen(true)} // Open the form
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "List New Property"}
          </button>

          <button className={styles.secondaryTool}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke="#374151"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            Manage Inquiries
          </button>

          <button className={styles.secondaryTool}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 20V10M12 20V4M6 20v-6"
                stroke="#374151"
                strokeWidth="2"
              />
            </svg>
            View Analytics
          </button>

          <button className={styles.secondaryTool}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="#374151"
                strokeWidth="2"
                fill="none"
              />
              <path d="m21 21-4.35-4.35" stroke="#374151" strokeWidth="2" />
            </svg>
            Market Research
          </button>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* My Properties Section */}
        <div className={styles.propertiesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>My Properties</h2>
            <button className={styles.viewAllBtn}>
              View All ({brokerProperties.length})
            </button>
          </div>

          <div className={styles.propertiesGrid}>
            {fetchError ? (
              <div className={styles.error}>{fetchError}</div>
            ) : brokerProperties.length === 0 ? (
              <div className={styles.emptyState}>
                <p>You haven't listed any properties yet.</p>
                <button
                  className={styles.primaryAction}
                  onClick={() => setIsListingFormOpen(true)}
                >
                  List Your First Property
                </button>
              </div>
            ) : (
              brokerProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={{
                    id: property.id,
                    title: property.title,
                    description: property.description,
                    price: formatPrice(property.price),
                    location: property.location,
                    bedrooms: property.bedrooms,
                    bathrooms: property.bathrooms,
                    area: `${property.area_sqft} sq ft`,
                    image: property.images[0], // Assuming images is an array
                    type: property.property_type,
                    status: property.status,
                    listedDate: formatDate(property.created_at),
                    features: property.features,
                  }}
                  onClick={() => handlePropertyClick(property.id)} // Pass the click handler
                />
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>

          {/* Recent Inquiries */}
          <div className={styles.inquiriesSection}>
            <div className={styles.sidebarHeader}>
              <h3 className={styles.sidebarTitle}>Recent Inquiries</h3>
              <button className={styles.viewAllBtn}>View All</button>
            </div>
            <div className={styles.inquiriesList}>
              {recentInquiries.map((inquiry) => (
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

          {/* This Month Stats */}
          <div className={styles.monthlyStatsSection}>
            <h3 className={styles.sidebarTitle}>This Month</h3>
            <div className={styles.monthlyStats}>
              <div className={styles.monthlyStat}>
                <span className={styles.monthlyLabel}>Views</span>
                <span className={styles.monthlyValue}>
                  {monthlyStats.views.toLocaleString()}
                </span>
              </div>
              <div className={styles.monthlyStat}>
                <span className={styles.monthlyLabel}>Inquiries</span>
                <span className={styles.monthlyValue}>
                  {monthlyStats.inquiries}
                </span>
              </div>
              <div className={styles.monthlyStat}>
                <span className={styles.monthlyLabel}>Active Listings</span>
                <span className={styles.monthlyValue}>
                  {monthlyStats.activeListings}
                </span>
              </div>
              <div className={styles.monthlyStat}>
                <span className={styles.monthlyLabel}>Response Rate</span>
                <span
                  className={`${styles.monthlyValue} ${styles.responseRate}`}
                >
                  {monthlyStats.responseRate}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Listing Form Modal */}
      <PropertyListingForm
        isOpen={isListingFormOpen}
        onClose={() => setIsListingFormOpen(false)} // Close the form
        onSubmit={handlePropertySubmit} // Handle form submission
      />
    </div>
  );
};

export default BrokerDashboard;
