"use client";

import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import StatusDot from './StatusDot';
import type { FormData } from '../interfaces/FormData';

const StaffView: React.FC = () => {
  const socket = useSocket();
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState('Offline');
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
        setStatus('Offline');
        return;
    }

    setIsSocketConnected(true);
    setStatus('Online');

    const handlePatientFormUpdate = (data: FormData) => {
        setFormData(data);
        setStatus('Typing...');
        setTimeout(() => isSocketConnected && setStatus('Online'), 1500);
    };

    const handleDisconnect = () => {
        setStatus('Patient has disconnected');
        setIsSocketConnected(false);
    };

    const handleCustomDisconnect = () => {
        setStatus('Offline');
        setIsSocketConnected(false);
    };

    socket.on('patientFormUpdate', handlePatientFormUpdate);
    socket.on('disconnect', handleDisconnect);
    socket.on('disconnect_patient', handleCustomDisconnect);

    return () => {
        socket.off('patientFormUpdate', handlePatientFormUpdate);
        socket.off('disconnect', handleDisconnect);
        socket.off('disconnect_patient', handleCustomDisconnect);
    };
}, [socket, isSocketConnected]);

  const renderPatientInfo = (label: string, value: string | undefined) => (
    <div className="flex justify-between py-1 border-b last:border-b-0">
      <strong>{label}:</strong>
      <span>{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="p-6 max-w-lg mx-auto mt-10 mb-10 bg-white shadow-lg border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Patient Information (Real-Time)</h2>
      <p className="flex items-center text-gray-500 mb-4">
        <StatusDot getColor={status} />
        <span>{status}</span>
      </p>
      <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
        {renderPatientInfo('First Name', formData.firstName)}
        {renderPatientInfo('Middle Name', formData.middleName)}
        {renderPatientInfo('Last Name', formData.lastName)}
        {renderPatientInfo('Date of Birth', formData.dateOfBirth)}
        {renderPatientInfo('Gender', formData.gender)}
        {renderPatientInfo('Phone', formData.phone)}
        {renderPatientInfo('Email', formData.email)}
        {renderPatientInfo('Address 1', formData.address1)}
        {renderPatientInfo('Address 2', formData.address2)}
        {renderPatientInfo('Preferred Language', formData.preferredLanguage)}
        {renderPatientInfo('Nationality', formData.nationality)}
        {renderPatientInfo('Religion', formData.religion)}
        <br />
        <h4 className="font-semibold mt-4">Emergency Contact</h4>
        {renderPatientInfo('Name', formData.emergencyContact?.name)}
        {renderPatientInfo('Relationship', formData.emergencyContact?.relationship)}
      </div>
    </div>
  );
};

export default StaffView;
