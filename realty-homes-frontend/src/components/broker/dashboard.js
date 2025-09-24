import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../assets/styles/brokerDashboard.module.css';
import { 
  brokerListings, 
  recentInquiries, 
  marketStats, 
  upcomingAppointments, 
  performanceMetrics 
} from '../../constants/brokerPropertyData';

const BrokerDashboard = () => {
  const { user } = useAuth();

  // Extract numeric values from price strings
  const extractPrice = (priceStr) => {
    if (typeof priceStr === 'string') {
      return parseInt(priceStr.replace(/[$,]/g, '')) || 0;
    }
    return priceStr || 0;
  };

  // Calculate total sales from market stats
  const totalSales = marketStats.reduce((total, stat) => {
    if (stat.title === 'Closed Deals') {
      return extractPrice(stat.change) || 2800000; // Default value from "+$2.8M volume"
    }
    return total;
  }, 0);

  // Get active listings count
  const activeListings = marketStats.find(stat => stat.title === 'Active Properties')?.value || 18;

  return (
    <div className={styles.dashboard}>
      {/* Header Section */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.welcomeTitle}>Welcome back, {user?.name}!</h1>
          <p className={styles.welcomeSubtitle}>Manage your listings and client interactions</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.primaryBtn}>
            <span>➕</span> Add New Listing
          </button>
          <button className={styles.secondaryBtn}>
            <span>📊</span> View Reports
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#dbeafe', color: '#3b82f6' }}>
            🏠
          </div>
          <div className={styles.statContent}>
            <div className={styles.statTitle}>Active Listings</div>
            <div className={styles.statValue}>{activeListings}</div>
            <div className={styles.statChange}>+12% this month</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
            💰
          </div>
          <div className={styles.statContent}>
            <div className={styles.statTitle}>Total Sales</div>
            <div className={styles.statValue}>${totalSales.toLocaleString()}</div>
            <div className={styles.statChange}>+8% this month</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
            📞
          </div>
          <div className={styles.statContent}>
            <div className={styles.statTitle}>New Inquiries</div>
            <div className={styles.statValue}>{recentInquiries.length}</div>
            <div className={styles.statChange}>+15% this week</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#fce7f3', color: '#db2777' }}>
            ⭐
          </div>
          <div className={styles.statContent}>
            <div className={styles.statTitle}>Client Rating</div>
            <div className={styles.statValue}>4.8/5.0</div>
            <div className={styles.statChange}>Excellent</div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className={styles.dashboardGrid}>
        {/* Property Listings Section */}
        <div className={styles.listingsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Listings</h2>
            <button className={styles.viewAllBtn}>View All →</button>
          </div>
          <div className={styles.propertyList}>
            {brokerListings.slice(0, 4).map((property) => (
              <div key={property.id} className={styles.propertyItem}>
                <img 
                  src={`/images/${property.image}`} 
                  alt={property.title}
                  className={styles.propertyImage}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCA2MEw2MCAyMEg2MFY2MEgyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                  }}
                />
                <div className={styles.propertyDetails}>
                  <h3 className={styles.propertyTitle}>{property.title}</h3>
                  <div className={styles.propertyLocation}>
                    📍 {property.location}
                  </div>
                  <div className={styles.propertyStats}>
                    <span>💰 {property.price}</span>
                    <span>🛏️ {property.bedrooms} beds</span>
                    <span>🛁 {property.bathrooms} baths</span>
                    <span>📐 {property.area}</span>
                  </div>
                  <div className={styles.propertyActions}>
                    <span className={`${styles.statusBadge} ${
                      property.status === 'active' ? styles.statusActive :
                      property.status === 'pending' ? styles.statusPending :
                      styles.statusSold
                    }`}>
                      {property.status}
                    </span>
                    <button className={`${styles.actionBtn} ${styles.primary}`}>
                      Edit
                    </button>
                    <button className={styles.actionBtn}>
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Recent Inquiries */}
          <div className={styles.sidebarSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Recent Inquiries</h3>
              <button className={styles.viewAllBtn}>View All →</button>
            </div>
            <div className={styles.inquiryList}>
              {recentInquiries.slice(0, 3).map((inquiry) => (
                <div key={inquiry.id} className={styles.inquiryItem}>
                  <div className={styles.inquiryHeader}>
                    <h4 className={styles.inquirerName}>{inquiry.name}</h4>
                    <span className={styles.inquiryTime}>{inquiry.date}</span>
                  </div>
                  <div className={styles.inquiryProperty}>
                    📍 {inquiry.property}
                  </div>
                  <div className={styles.inquiryMessage}>
                    {inquiry.message}
                  </div>
                  <div className={styles.inquiryContact}>
                    <span>📞 {inquiry.phone}</span>
                    <span>✉️ {inquiry.contact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className={styles.sidebarSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Upcoming Appointments</h3>
              <button className={styles.viewAllBtn}>View All →</button>
            </div>
            <div className={styles.appointmentList}>
              {upcomingAppointments.slice(0, 2).map((appointment) => (
                <div key={appointment.id} className={styles.appointmentItem}>
                  <div className={styles.appointmentHeader}>
                    <h4 className={styles.appointmentClient}>{appointment.client}</h4>
                    <span className={styles.appointmentTime}>{appointment.date}</span>
                  </div>
                  <div className={styles.appointmentProperty}>
                    📍 {appointment.property}
                  </div>
                  <div className={styles.appointmentType}>
                    {appointment.type}
                  </div>
                  <div className={styles.appointmentNotes}>
                    {appointment.notes}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className={styles.sidebarSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Performance</h3>
            </div>
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>{performanceMetrics.totalViews}</div>
                <div className={styles.metricLabel}>Total Views</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>{performanceMetrics.conversionRate}%</div>
                <div className={styles.metricLabel}>Conversion Rate</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>{performanceMetrics.avgDaysOnMarket}</div>
                <div className={styles.metricLabel}>Avg Days on Market</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>{performanceMetrics.avgCommission}</div>
                <div className={styles.metricLabel}>Avg Commission</div>
              </div>
            </div>
            
            {/* Monthly Sales Progress */}
            <div className={styles.progressContainer}>
              <div className={styles.progressHeader}>
                <span className={styles.progressTitle}>Monthly Goal Progress</span>
                <span className={styles.progressValue}>{performanceMetrics.monthlyProgress}%</span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${performanceMetrics.monthlyProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;
