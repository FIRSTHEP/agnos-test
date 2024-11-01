export const validateEmail = (email: string): boolean => {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  };

  export const validatePhone = (phone: string): boolean => {
    const phonePattern = /^\d{10}$/; 
    return phonePattern.test(phone);
  };
  