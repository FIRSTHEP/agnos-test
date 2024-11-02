"use client";

import React, { useState } from 'react';
import PatientForm from '../components/PatientForm';
import StaffView from '../components/StaffView';
import Image from 'next/image';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showForms, setShowForms] = useState<boolean>(false);
  
  const handleButtonClick = (url: string) => {
    setLoading(true);
    setTimeout(() => {
      window.open(url, '_blank');
      setLoading(false);
    }, 500);
  };

  const handleCheckboxChange = () => {
    setShowForms(prev => !prev);
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 pt-10 sm:pt-20 relative">
      <div className="flex flex-col items-center flex-grow px-4">
        <Image
          src="/agnos_logo.webp"
          alt="Agnos Logo"
          width={300}
          height={200}
          priority
          className="w-64 sm:w-96" // Adjust logo size for mobile
        />
        <h1 className="text-3xl sm:text-5xl font-bold text-center text-gray-800 mb-4">Agnos Home Work</h1>
        <p className="text-base sm:text-lg text-gray-700 text-center mb-6">Please choose a role:</p>

        <div className="flex flex-col sm:flex-row justify-center items-start w-full max-w-4xl relative">
          <div className="w-full sm:w-1/2 p-4">
            {showForms && <PatientForm />}
          </div>
          <div className="w-full sm:w-1/2 p-4">
            {showForms && <StaffView />}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center w-full max-w-md space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
          <button
            onClick={() => handleButtonClick("/patient")}
            className="btn w-full sm:flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xl sm:text-2xl py-3 sm:py-4 rounded-lg shadow-lg transition duration-200 text-center"
            aria-label="Open Patient View"
          >
            {loading ? 'Loading...' : 'Patient'}
          </button>
          <button
            onClick={() => handleButtonClick("/staff")}
            className="btn w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold text-xl sm:text-2xl py-3 sm:py-4 rounded-lg shadow-lg transition duration-200 text-center"
            aria-label="Open Staff View"
          >
            {loading ? 'Loading...' : 'Staff'}
          </button>
        </div>

        {loading && (
          <div className="loader mb-6">
            <div className="spinner-border animate-spin inline-block w-8 sm:w-10 h-8 sm:h-10 border-4 rounded-full border-t-transparent border-blue-500" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <label className="flex items-center mb-4 text-gray-700">
          <input
            type="checkbox"
            checked={showForms}
            onChange={handleCheckboxChange}
            className="mr-2"
            aria-label="Toggle Dev Mode"
          />
          Dev Mode
        </label>
      </div>

      <footer className="bg-[rgb(30,42,55)] border-t border-gray-300 shadow-lg text-center w-full mt-auto p-4">
        <p className="text-white font-semibold text-sm sm:text-base">Developed by ADITHEP SUDCHAREE</p>
        <p className="text-gray-300 text-xs sm:text-sm">© {new Date().getFullYear()} Agnos Home Work. All rights reserved.</p>
      </footer>
    </main>
  );
}
