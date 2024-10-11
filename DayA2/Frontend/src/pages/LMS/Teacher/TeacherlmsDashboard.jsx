import React, { useState } from 'react';
import LMSTeacherNavbar from '../../../component/LmsNavbar/LmsNavbar';

// Placeholder Component for Classroom Section
const Classroom = () => (
  <div id="classroom" className="bg-white shadow-md rounded p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Classroom Section</h2>
    <p>Create, view, and manage your classrooms here.</p>
  </div>
);

// Placeholder Component for Cohorts Section
const Cohorts = () => (
  <div id="cohorts" className="bg-white shadow-md rounded p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Cohorts Section</h2>
    <p>Create and manage your cohorts here.</p>
  </div>
);

// Placeholder Component for Students Section
const Students = () => (
  <div id="students" className="bg-white shadow-md rounded p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Students Section</h2>
    <p>Manage student cohorts, attendance, and feedback here.</p>
  </div>
);

// Main Dashboard Component
const TeacherlmsDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Include the Navbar */}
      <LMSTeacherNavbar />

      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome to Teacher's Dashboard</h1>

        <p className="text-lg mb-6">
          This is your dashboard where you can manage classrooms, cohorts, students, and more.
        </p>

        {/* Sections */}
        <Classroom />
        <Cohorts />
        <Students />
      </div>
    </div>
  );
};

export default TeacherlmsDashboard;
