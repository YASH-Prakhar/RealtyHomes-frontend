import React, { useState } from "react";
import styles from "../../assets/styles/propertyListingForm.module.css";

const PropertyListingForm = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    property_type: "",
    bedrooms: "",
    bathrooms: "",
    area_sqft: "",
    images: [],
    features: []
  });

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const propertyTypes = [
    "Select property type",
    "House",
    "Apartment",
    "Condo",
    "Townhouse",
    "Villa",
    "Studio",
    "Loft",
    "Duplex"
  ];

  const availableFeatures = [
    "Parking", "Balcony", "Garden", "Garage",
    "Fireplace", "Updated Kitchen", "Water View", "Concierge",
    "Roof Deck", "In-unit Laundry", "Gym", "Pool",
    "Elevator", "Air Conditioning", "Hardwood Floors", "Walk-in Closet",
    "Dishwasher", "Washer/Dryer", "Pet Friendly", "Furnished"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev => {
      const updated = prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature];
      
      setForm(prevForm => ({
        ...prevForm,
        features: updated
      }));
      
      return updated;
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setImageFiles(prev => [...prev, ...imageFiles]);
      setForm(prev => ({
        ...prev,
        images: [...prev.images, ...imageFiles]
      }));
    }
  };

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title || !form.description || !form.price || !form.location || 
        !form.property_type || form.property_type === "Select property type") {
      alert("Please fill in all required fields");
      return;
    }

    if (imageFiles.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    setLoading(true);
    
    try {
      // Prepare form data
      const propertyData = {
        ...form,
        price: parseFloat(form.price),
        bedrooms: form.bedrooms ? parseInt(form.bedrooms) : null,
        bathrooms: form.bathrooms ? parseInt(form.bathrooms) : null,
        area_sqft: form.area_sqft ? parseInt(form.area_sqft) : null,
        features: selectedFeatures
      };

      await onSubmit(propertyData);
      
      // Reset form
      setForm({
        title: "",
        description: "",
        price: "",
        location: "",
        property_type: "",
        bedrooms: "",
        bathrooms: "",
        area_sqft: "",
        images: [],
        features: []
      });
      setSelectedFeatures([]);
      setImageFiles([]);
      onClose();
      
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Error creating listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>List Your Property</h2>
          <p className={styles.subtitle}>Create a listing to showcase your property to potential buyers</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Basic Information */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Basic Information</h3>
            <p className={styles.sectionSubtitle}>Provide the essential details about your property</p>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Property Title <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Modern Downtown Apartment with City Views"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Description <span className={styles.required}>*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your property, highlighting key features and amenities..."
                className={styles.textarea}
                rows={4}
                required
              />
              <span className={styles.charCount}>
                {form.description.length} characters (minimum 50)
              </span>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Price (USD) <span className={styles.required}>*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="450000"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Location <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Downtown Seattle, WA"
                  className={styles.input}
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Property Details</h3>
            <p className={styles.sectionSubtitle}>Specify the type and characteristics of your property</p>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Property Type <span className={styles.required}>*</span>
              </label>
              <select
                name="property_type"
                value={form.property_type}
                onChange={handleChange}
                className={styles.select}
                required
              >
                {propertyTypes.map((type, index) => (
                  <option key={index} value={index === 0 ? "" : type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Bedrooms <span className={styles.required}>*</span>
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={form.bedrooms}
                  onChange={handleChange}
                  placeholder="3"
                  className={styles.input}
                  min="0"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Bathrooms <span className={styles.required}>*</span>
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={form.bathrooms}
                  onChange={handleChange}
                  placeholder="2"
                  className={styles.input}
                  min="0"
                  step="0.5"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Area (sq ft) <span className={styles.required}>*</span>
                </label>
                <input
                  type="number"
                  name="area_sqft"
                  value={form.area_sqft}
                  onChange={handleChange}
                  placeholder="1500"
                  className={styles.input}
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Features & Amenities */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Features & Amenities</h3>
            <p className={styles.sectionSubtitle}>Select the features that apply to your property</p>

            <div className={styles.featuresGrid}>
              {availableFeatures.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => handleFeatureToggle(feature)}
                  className={`${styles.featureButton} ${
                    selectedFeatures.includes(feature) ? styles.featureSelected : ""
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
            
            <p className={styles.featuresCount}>
              Click to select/deselect features. Selected: {selectedFeatures.length}
            </p>
          </div>

          {/* Property Images */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Property Images <span className={styles.required}>*</span>
            </h3>
            <p className={styles.sectionSubtitle}>Upload photos of your property (at least 1 required)</p>

            <div
              className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className={styles.fileInput}
                id="file-upload"
              />
              <label htmlFor="file-upload" className={styles.uploadLabel}>
                <div className={styles.uploadIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#9ca3af" strokeWidth="2" fill="none"/>
                    <polyline points="14,2 14,8 20,8" stroke="#9ca3af" strokeWidth="2" fill="none"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="#9ca3af" strokeWidth="2"/>
                    <line x1="12" y1="17" x2="12" y2="9" stroke="#9ca3af" strokeWidth="2"/>
                  </svg>
                </div>
                <div className={styles.uploadText}>
                  <p>Click to upload or drag and drop</p>
                  <p>PNG, JPG, GIF up to 10MB each</p>
                </div>
              </label>
            </div>

            {imageFiles.length > 0 && (
              <div className={styles.imagePreview}>
                {imageFiles.map((file, index) => (
                  <div key={index} className={styles.imageItem}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className={styles.previewImage}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className={styles.removeImage}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
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
              {loading ? "Creating Listing..." : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyListingForm;