import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const AdminDashboard = () => {
    const styles = {
        dashboardContainer: {
            display: 'flex',
            minHeight: '100vh',
        },
        sidebar: {
            width: '250px',
            backgroundColor: '#2c3e50',
            padding: '20px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
        },
        sidebarLink: {
            color: 'white',
            textDecoration: 'none',
            padding: '10px 0',
            fontSize: '16px',
        },
        mainContent: {
            flexGrow: 1,
            padding: '20px',
            backgroundColor: '#ecf0f1',
        },
        header: {
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#34495e',
        }
    };

    return (
        <Router>
            <div style={styles.dashboardContainer}>
                <nav style={styles.sidebar}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><Link to="/" style={styles.sidebarLink}>Dashboard</Link></li>
                        <li><Link to="/manage-courses" style={styles.sidebarLink}>Manage Courses</Link></li>
                        <li><Link to="/manage-users" style={styles.sidebarLink}>Manage Users</Link></li>
                        <li><Link to="/reports" style={styles.sidebarLink}>Reports</Link></li>
                        <li><Link to="/notifications" style={styles.sidebarLink}>Notifications</Link></li>
                    </ul>
                </nav>

                <div style={styles.mainContent}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/manage-courses" element={<ManageCourses />} />
                        <Route path="/manage-users" element={<ManageUsers />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/notifications" element={<Notifications />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

const Dashboard = () => <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Admin Dashboard Overview</h2>;
const ManageCourses = () => <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Manage Courses</h2>;
const ManageUsers = () => <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Manage Users</h2>;
const Reports = () => <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Reports</h2>;
const Notifications = () => <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Notifications</h2>;

export default AdminDashboard;
