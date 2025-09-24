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
      <h2>Register for RealtyHomes</h2>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <label>
          Name<span style={{ color: "red" }}>*</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email<span style={{ color: "red" }}>*</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password<span style={{ color: "red" }}>*</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            maxLength={20}
          />
        </label>
        <label>
          Register As
          <select name="role" value={form.role} onChange={handleRoleChange}>
            <option value="user">User</option>
            <option value="broker">Broker</option>
          </select>
        </label>
        {form.role === "broker" && (
          <>
            <label>
              Agency Name<span style={{ color: "red" }}>*</span>
              <input
                type="text"
                name="agency_name"
                value={form.agency_name}
                onChange={handleChange}
                required={form.role === "broker"}
              />
            </label>
            <label>
              License Number<span style={{ color: "red" }}>*</span>
              <input
                type="text"
                name="license_number"
                value={form.license_number}
                onChange={handleChange}
                required={form.role === "broker"}
              />
            </label>
          </>
        )}
        <label>
          Bio
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
          />
        </label>
        <label>
          Profile Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploading}
          />
          {preview && (
            <img
              src={preview}
              alt="Profile Preview"
              style={{
                width: 80,
                height: 80,
                marginTop: 8,
                borderRadius: "50%",
              }}
            />
          )}
        </label>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        <button type="submit" disabled={uploading}>
          {uploading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
