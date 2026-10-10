/**
 * Authentication Service (Demo Simulation)
 * NOTE: This is a frontend demo simulation. Passwords are NOT stored or checked against a real hash.
 * In a production backend, replace with JWT/Session endpoints via API_CONFIG.ENDPOINTS.AUTH_LOGIN.
 */

import { API_CONFIG } from "../config/apiConfig";
import { getStored, setStored, delay } from "./storageHelper";
import { SEED_STUDENTS, SEED_ADMIN } from "../data/seedStudents";

const { STORAGE_KEYS } = API_CONFIG;

export const authService = {
  async getCurrentUser() {
    await delay(50);
    const user = getStored(STORAGE_KEYS.CURRENT_USER, null);
    return user || SEED_STUDENTS[0]; // Default to demo student for frictionless browsing
  },

  async login(email, password, role = "student") {
    await delay(250);
    // TODO: In production backend, call POST /api/v1/auth/login with { email, password }
    if (role === "admin") {
      if (email.toLowerCase().includes("admin")) {
        setStored(STORAGE_KEYS.CURRENT_USER, SEED_ADMIN);
        return { success: true, user: SEED_ADMIN };
      }
      return { success: false, error: "Invalid admin demo credentials. Try 'admin@scholarbridge.pk.demo'." };
    }

    const students = getStored(STORAGE_KEYS.STUDENTS, SEED_STUDENTS);
    const found = students.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setStored(STORAGE_KEYS.CURRENT_USER, found);
      return { success: true, user: found };
    }

    // Allow synthetic student login with demo note
    const genericStudent = {
      ...SEED_STUDENTS[0],
      email: email,
      fullName: email.split("@")[0].toUpperCase() + " (Demo)",
    };
    setStored(STORAGE_KEYS.CURRENT_USER, genericStudent);
    return { success: true, user: genericStudent };
  },

  async loginAsDemoStudent() {
    await delay(150);
    const students = getStored(STORAGE_KEYS.STUDENTS, SEED_STUDENTS);
    const demoStudent = students[0] || SEED_STUDENTS[0];
    setStored(STORAGE_KEYS.CURRENT_USER, demoStudent);
    return demoStudent;
  },

  async loginAsDemoAdmin() {
    await delay(150);
    setStored(STORAGE_KEYS.CURRENT_USER, SEED_ADMIN);
    return SEED_ADMIN;
  },

  async logout() {
    await delay(100);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return true;
  },

  async register(registrationData) {
    await delay(300);
    // TODO: In production backend, call POST /api/v1/auth/register
    const students = getStored(STORAGE_KEYS.STUDENTS, SEED_STUDENTS);
    
    // Check for duplicate CNIC or email in seed data
    const existing = students.find(s => 
      s.email.toLowerCase() === registrationData.email.toLowerCase() ||
      s.cnic === registrationData.cnic
    );
    if (existing) {
      return { success: false, error: "An account with this CNIC or Email already exists in demo records." };
    }

    const newStudent = {
      id: `STU-2026-${Math.floor(100 + Math.random() * 900)}`,
      role: "student",
      fullName: registrationData.fullName,
      fatherName: registrationData.fatherName || "",
      email: registrationData.email,
      phone: registrationData.phone,
      dob: registrationData.dob || "2004-01-01",
      gender: registrationData.gender || "Not specified",
      cnic: registrationData.cnic,
      district: registrationData.district || "Dera Ismail Khan",
      domicile: registrationData.district || "Dera Ismail Khan",
      province: "Khyber Pakhtunkhwa",
      address: registrationData.address || "Dera Ismail Khan, KP",
      currentEducation: {
        level: registrationData.currentLevel || "Undergraduate",
        program: registrationData.program || "General Studies",
        institution: registrationData.institution || "Gomal University DI Khan",
        currentSemester: "1st Semester",
        cgpa: 3.0,
        passingYear: 2027,
        enrollmentStatus: "Enrolled",
      },
      educationHistory: [],
      familyFinancial: {
        guardianOccupation: "Not specified",
        guardianMonthlyIncomePKR: 50000,
        dependentSiblings: 2,
        earningMembers: 1,
      },
      profileCompletedPercent: 70,
      consentAccepted: true,
      consentDate: new Date().toISOString(),
      savedScholarships: [],
    };

    students.push(newStudent);
    setStored(STORAGE_KEYS.STUDENTS, students);
    setStored(STORAGE_KEYS.CURRENT_USER, newStudent);

    return { success: true, user: newStudent };
  },

  async updateProfile(userId, profileUpdates) {
    await delay(200);
    const students = getStored(STORAGE_KEYS.STUDENTS, SEED_STUDENTS);
    const index = students.findIndex(s => s.id === userId);
    if (index === -1) {
      return { success: false, error: "Student not found." };
    }

    const updated = {
      ...students[index],
      ...profileUpdates,
      // Recompute profile completion percentage
      profileCompletedPercent: computeProfilePercent({ ...students[index], ...profileUpdates }),
    };

    students[index] = updated;
    setStored(STORAGE_KEYS.STUDENTS, students);
    
    // Also update current user if it matches
    const currentUser = getStored(STORAGE_KEYS.CURRENT_USER, null);
    if (currentUser && currentUser.id === userId) {
      setStored(STORAGE_KEYS.CURRENT_USER, updated);
    }

    return { success: true, user: updated };
  }
};

export const computeProfilePercent = (student) => {
  let score = 0;
  if (student.fullName && student.fatherName) score += 20;
  if (student.cnic && student.phone && student.email) score += 20;
  if (student.district && student.domicile && student.address) score += 15;
  if (student.currentEducation && student.currentEducation.program && student.currentEducation.institution) score += 20;
  if (student.educationHistory && student.educationHistory.length > 0) score += 15;
  if (student.familyFinancial && student.familyFinancial.guardianMonthlyIncomePKR) score += 10;
  return Math.min(100, score);
};

export default authService;
