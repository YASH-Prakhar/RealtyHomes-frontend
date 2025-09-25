import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../assets/styles/propertyDashboard.module.css";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../common/PropertyCard";

const PropertyDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "all",
    bedrooms: "any",
    bathrooms: "any",
    minArea: 0,
    maxArea: 5000,
  });
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("SESSION_TOKEN");
      const response = await axios.get("http://localhost:5000/api/properties", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      console.log("Fetched properties:", response.data);
      setProperties(
        Array.isArray(response.data.properties) ? response.data.properties : []
      );
    } catch (err) {
      setError(err.message);
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredProperties = properties.filter((property) => {
    return (
      (!filters.location ||
        property.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())) &&
      (filters.propertyType === "all" ||
        property.property_type === filters.propertyType) &&
      (filters.bedrooms === "any" ||
        property.bedrooms >= parseInt(filters.bedrooms)) &&
      (filters.bathrooms === "any" ||
        property.bathrooms >= parseInt(filters.bathrooms)) &&
      property.area_sqft >= filters.minArea &&
      property.area_sqft <= filters.maxArea
    );
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at) - new Date(a.created_at);
      case "oldest":
        return new Date(a.created_at) - new Date(b.created_at);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

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

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading properties...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Left Sidebar Filters */}
      <div className={styles.filters}>
        <h3>Search Filters</h3>

        <div className={styles.filterSection}>
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter city, neighborhood..."
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>

        <div className={styles.filterSection}>
          <label>Property Type</label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
          >
            <option value="all">All types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
        </div>

        {/* Removed Price Range Filter */}
        {/* <div className={styles.filterSection}>
          <label>Price Range</label>
          <div className={styles.priceInputs}>
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
        </div> */}

        <div className={styles.filterSection}>
          <label>Bedrooms</label>
          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
          >
            <option value="any">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div className={styles.filterSection}>
          <label>Bathrooms</label>
          <select
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleFilterChange}
          >
            <option value="any">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>

        <div className={styles.filterSection}>
          <label>Area (sq ft)</label>
          <div className={styles.areaInputs}>
            <input
              type="number"
              name="minArea"
              placeholder="Min"
              value={filters.minArea}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="maxArea"
              placeholder="Max"
              value={filters.maxArea}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.results}>
            {sortedProperties.length} properties found
          </div>
          <div className={styles.controls}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
            <div className={styles.viewToggle}>
              <button
                className={viewMode === "grid" ? styles.active : ""}
                onClick={() => setViewMode("grid")}
              >
                Grid
              </button>
              <button
                className={viewMode === "list" ? styles.active : ""}
                onClick={() => setViewMode("list")}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading properties...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? styles.propertiesGrid
                : styles.propertiesList
            }
          >
            {sortedProperties.map((property) => (
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
                  image: property.images[0],
                  type: property.property_type,
                  status: property.status,
                  listedDate: formatDate(property.created_at),
                  features: property.features,
                }}
                showOwner={false}
                onClick={() => navigate(`/property/${property.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDashboard;
