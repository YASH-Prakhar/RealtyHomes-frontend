import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
import { useAuth } from "../../contexts/AuthContext";
import PropertyListingForm from "../common/PropertyListingForm";
import styles from "../../assets/styles/userDashboard.module.css";
import PropertyCard from "../common/PropertyCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchInquiries } from "../../features/inquirySlice";

const UserDashboard = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const inquiries = useSelector((state) => state.inquiries.inquiries);
  const loading = useSelector((state) => state.inquiries.loading);
  const error = useSelector((state) => state.inquiries.error);
  const [isListingFormOpen, setIsListingFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [myListedProperties, setMyListedProperties] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [propertyNames, setPropertyNames] = useState({});
  const navigate = useNavigate();

  // Fetch property names
  useEffect(() => {
    if (inquiries.length > 0) {
      fetchPropertyNames(inquiries);
    }
  }, [inquiries]);

  // Memoize fetchUserProperties
  const fetchUserProperties = useCallback(async () => {
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
      console.log("Fetched properties:", response.data);
      setMyListedProperties(response.data.properties || []);
    } catch (error) {
      console.error("Error fetching user properties:", error);
      setFetchError("Failed to load your properties");
    }
  }, [user.id]); // Add user.id as a dependency

  // Fetch user's properties and inquiries when component mounts
  useEffect(() => {
    fetchUserProperties(); // Call the memoized function
    dispatch(fetchInquiries(user.id));
  }, [dispatch, user.id, fetchUserProperties]); // Include fetchUserProperties in the dependency array

  const fetchPropertyNames = async (inquiries) => {
    const token = localStorage.getItem("SESSION_TOKEN");
    const propertyIds = inquiries.map((inquiry) => inquiry.property_id);
    const uniquePropertyIds = [...new Set(propertyIds)];

    try {
      const responses = await Promise.all(
        uniquePropertyIds.map((id) =>
          axios.get(`http://localhost:5000/api/properties/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );

      const names = {};
      responses.forEach((response) => {
        names[response.data.property.id] = response.data.property.title;
      });
      setPropertyNames(names);
    } catch (error) {
      console.error("Error fetching property names:", error);
    }
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
      fetchUserProperties();
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
            Welcome back, {user?.name || "Jane User"}!
          </h1>
          <p className={styles.welcomeSubtitle}>
            Manage your properties and track your real estate activities
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActionsContainer}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <p className={styles.sectionSubtitle}>
          Manage your real estate activities
        </p>

        <div className={styles.quickActions}>
          <button
            className={styles.primaryAction}
            onClick={() => setIsListingFormOpen(true)}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "List New Property"}
          </button>

          <button onClick={() => navigate("/properties")} className={styles.secondaryAction}>
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
          {fetchError ? (
            <div className={styles.error}>{fetchError}</div>
          ) : myListedProperties.length === 0 ? (
            <div className={styles.emptyState}>
              <p>You haven't listed any properties yet.</p>
            </div>
          ) : (
            myListedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={{
                  id: property.id,
                  title: property.title,
                  description: property.description,
                  price: property.price,
                  location: property.location,
                  bedrooms: property.bedrooms,
                  bathrooms: property.bathrooms,
                  area: `${property.area_sqft} sq ft`,
                  image: property.images[0],
                  type: property.property_type,
                  status: property.status,
                  listedDate: formatDate(property.created_at),
                  features: property.features,
                }}
                showOwner={false}
                onClick={() => handlePropertyClick(property.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Recent Inquiries Section */}
      <div className={styles.inquiriesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Inquiries</h2>
        </div>

        <div className={styles.inquiriesList}>
          {error ? (
            <div className={styles.error}>{error}</div>
          ) : loading ? (
            <div>Loading inquiries...</div>
          ) : inquiries.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No inquiries received yet.</p>
            </div>
          ) : (
            inquiries.map((inquiry) => (
              <div key={inquiry.id} className={styles.inquiryItem}>
                <div className={styles.inquiryContent}>
                  <div className={styles.inquiryHeader}>
                    <h4 className={styles.inquirerName}>{inquiry.name}</h4>
                    <span className={styles.inquiryDate}>
                      {formatDate(inquiry.created_at)}
                    </span>
                  </div>
                  <p className={styles.inquiryProperty}>
                    Property:{" "}
                    {propertyNames[inquiry.property_id] || "Loading..."}
                  </p>
                  <p className={styles.inquiryMessage}>{inquiry.message}</p>
                  <p className={styles.inquiryContact}>
                    Email: {inquiry.email} | Phone: {inquiry.phone}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
