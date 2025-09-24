import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../assets/styles/register.module.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
    agency_name: "",
    license_number: "",
    bio: "",
    profile_image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      profile_image: file,
    }));
    setPreview(URL.createObjectURL(file));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setForm((prev) => ({
      ...prev,
      role,
      agency_name: role === "broker" ? prev.agency_name : "",
      license_number: role === "broker" ? prev.license_number : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setUploading(true);

    // Basic validation
    if (!form.name || !form.email || !form.password) {
      setError("Name, Email, and Password are required.");
      setUploading(false);
      return;
    }
    if (form.role === "broker" && (!form.agency_name || !form.license_number)) {
      setError("Agency Name and License Number are required for brokers.");
      setUploading(false);
      return;
    }

    const result = await register(form);
    setUploading(false);
    
    if (result.success) {
      setSuccess("Registration successful! Redirecting to dashboard...");
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "user",
        agency_name: "",
        license_number: "",
        bio: "",
        profile_image: null,
      });
      setPreview(null);

      setTimeout(() => {
        // Navigate to appropriate dashboard based on role
        if (result.user?.role === "broker") {
          navigate("/broker/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }, 1200);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#4285f4" strokeWidth="2" fill="none"/>
              <polyline points="9,22 9,12 15,12 15,22" stroke="#4285f4" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.subtitle}>Join RealEstate Pro to start listing and browsing properties</p>
        
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Full Name<span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Email<span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Password<span className={styles.required}>*</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={styles.input}
              maxLength={20}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Account Type</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={form.role === "user"}
                  onChange={handleRoleChange}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>Regular User</span>
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="role"
                  value="broker"
                  checked={form.role === "broker"}
                  onChange={handleRoleChange}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>Broker</span>
              </label>
            </div>
          </div>

          {form.role === "broker" && (
            <>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Agency Name<span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="agency_name"
                  value={form.agency_name}
                  onChange={handleChange}
                  placeholder="Enter your agency name"
                  className={styles.input}
                  required={form.role === "broker"}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  License Number<span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="license_number"
                  value={form.license_number}
                  onChange={handleChange}
                  placeholder="Enter your license number"
                  className={styles.input}
                  required={form.role === "broker"}
                />
              </div>
            </>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              className={styles.textarea}
              rows={3}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading}
              className={styles.fileInput}
            />
            {preview && (
              <div className={styles.imagePreview}>
                <img
                  src={preview}
                  alt="Profile Preview"
                  className={styles.previewImage}
                />
              </div>
            )}
          </div>

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
          
          <button type="submit" disabled={uploading} className={styles.submitButton}>
            {uploading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        
        <div className={styles.signinLink}>
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default Register;