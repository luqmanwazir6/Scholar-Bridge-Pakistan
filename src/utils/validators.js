/**
 * Input validators tailored for Pakistani student administrative context
 */

// Pakistani CNIC / B-Form regex: 5 digits - 7 digits - 1 digit
export const CNIC_REGEX = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

export const validateCNIC = (cnic) => {
  if (!cnic) return "CNIC or B-Form number is required.";
  const clean = cnic.trim();
  if (!CNIC_REGEX.test(clean)) {
    return "CNIC must be in the standard 13-digit format: 12345-1234567-1";
  }
  return null;
};

// Pakistani Phone number regex: 03XX-XXXXXXX or 03XXXXXXXXX
export const PHONE_REGEX = /^03[0-9]{2}-?[0-9]{7}$/;

export const validatePhone = (phone) => {
  if (!phone) return "Contact phone number is required.";
  const clean = phone.trim().replace(/\s+/g, "");
  if (!PHONE_REGEX.test(clean)) {
    return "Please enter a valid Pakistani mobile number starting with 03 (e.g. 0345-1234567).";
  }
  return null;
};

// Standard email validator
export const validateEmail = (email) => {
  if (!email) return "Email address is required.";
  const clean = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(clean)) {
    return "Please enter a valid email address.";
  }
  return null;
};

// Calculate age from date of birth string (YYYY-MM-DD)
export const calculateAge = (dobString) => {
  if (!dobString) return 0;
  const birthDate = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return Math.max(0, age);
};

// Academic marks validator
export const validateMarks = (obtained, total) => {
  const obt = parseFloat(obtained);
  const tot = parseFloat(total);
  if (isNaN(obt) || isNaN(tot)) {
    return { valid: false, error: "Marks must be valid numbers." };
  }
  if (tot <= 0) {
    return { valid: false, error: "Total marks must be greater than zero." };
  }
  if (obt < 0) {
    return { valid: false, error: "Obtained marks cannot be negative." };
  }
  if (obt > tot) {
    return { valid: false, error: "Obtained marks cannot exceed total marks." };
  }
  const percentage = ((obt / tot) * 100).toFixed(2);
  return { valid: true, percentage: parseFloat(percentage), error: null };
};

// CGPA validator
export const validateCGPA = (cgpa) => {
  const val = parseFloat(cgpa);
  if (isNaN(val)) return "CGPA must be a valid number.";
  if (val < 0.0 || val > 4.0) {
    return "CGPA must be between 0.00 and 4.00.";
  }
  return null;
};
