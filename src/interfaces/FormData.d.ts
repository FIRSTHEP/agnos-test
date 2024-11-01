export interface EmergencyContact {
  name: string;
  relationship: string;
}

export interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address1: string; 
  address2: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContact: EmergencyContact;
  religion: string;
}
