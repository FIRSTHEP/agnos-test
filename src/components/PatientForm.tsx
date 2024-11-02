"use client";

import React, { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import InputField from './InputField';
import SelectField from './SelectField';
import { FormData, EmergencyContact } from '../interfaces/FormData';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLanguage, FaCross } from 'react-icons/fa';

const PatientForm: React.FC = () => {
  const socket = useSocket();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    preferredLanguage: '',
    nationality: '',
    emergencyContact: { name: '', relationship: '' },
    religion: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (socket) {
      socket.connect();
      socket.emit('connect_patient', { status: 'online' });
    }

    const handleBeforeUnload = () => {
      if (socket) {
        socket.emit('disconnect_patient');
        socket.disconnect();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (socket) {
        socket.emit('disconnect_patient');
        socket.disconnect();
      }
    };
  }, [socket]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Please enter a valid email address.'
        }));
        return;
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
      }
    }

    if (name === 'phone') {
      const phoneRegex = /^[0-9]*$/;
      if (!phoneRegex.test(value) || value.length > 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: 'Phone number must be 10 digits and contain only numbers.'
        }));
        return;
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
      }
    }

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      if (socket) {
        socket.emit('submitPatientData', updatedData);
      }
      return updatedData;
    });
  };

  const handleEmergencyContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: 'name' | 'relationship'
  ) => {
    const value = e.target.value;
    const updatedContact: EmergencyContact = {
      ...formData.emergencyContact,
      [field]: value,
    };

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        emergencyContact: updatedContact,
      };
      if (socket) {
        socket.emit('submitPatientData', updatedData);
      }
      return updatedData;
    });
  };

  return (
    <form className="max-w-lg mx-auto bg-white p-8 mt-10 mb-10 rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Patient Form</h2>

      <InputField
        label="First Name"
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
        required
        icon={<FaUser className="text-gray-500" />}
      />

      <InputField
        label="Middle Name (optional)"
        type="text"
        name="middleName"
        value={formData.middleName}
        onChange={handleChange}
        icon={<FaUser className="text-gray-500" />}
      />

      <InputField
        label="Last Name"
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
        required
        icon={<FaUser className="text-gray-500" />}
      />

      <InputField
        label="Date of Birth"
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        error={errors.dateOfBirth}
        required
      />

      <SelectField
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
        error={errors.gender}
        required
      />

      <InputField
        label="Phone Number"
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        maxLength={10}
        required
        icon={<FaPhone className="text-gray-500" />}
      />

      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        icon={<FaEnvelope className="text-gray-500" />}
      />

      <InputField
        label="Address 1"
        type="text"
        name="address1"
        value={formData.address1}
        onChange={handleChange}
        required
        icon={<FaMapMarkerAlt className="text-gray-500" />}
      />

      <InputField
        label="Address 2 (optional)"
        type="text"
        name="address2"
        value={formData.address2}
        onChange={handleChange}
        icon={<FaMapMarkerAlt className="text-gray-500" />}
      />

      <InputField
        label="Preferred Language"
        type="text"
        name="preferredLanguage"
        value={formData.preferredLanguage}
        onChange={handleChange}
        required
        icon={<FaLanguage className="text-gray-500" />}
      />

      <InputField
        label="Nationality"
        type="text"
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
        required
        icon={<FaLanguage className="text-gray-500" />}
      />

      <InputField
        label="Emergency Contact Name (optional)"
        type="text"
        name="emergencyContactName"
        value={formData.emergencyContact?.name}
        onChange={(e) => handleEmergencyContactChange(e, 'name')}
        icon={<FaPhone className="text-gray-500" />}
      />

      <InputField
        label="Emergency Contact Relationship (optional)"
        type="text"
        name="emergencyContactRelationship"
        value={formData.emergencyContact?.relationship}
        onChange={(e) => handleEmergencyContactChange(e, 'relationship')}
        icon={<FaPhone className="text-gray-500" />}
      />

      <InputField
        label="Religion"
        type="text"
        name="religion"
        value={formData.religion}
        onChange={handleChange}
        icon={<FaCross className="text-gray-500" />}
      />
    </form>
  );
};

export default PatientForm;
