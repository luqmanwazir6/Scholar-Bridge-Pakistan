/**
 * Seed Students & Admin Users - Synthetic Demo Accounts Only
 * NEVER store real passwords, CNIC numbers or private financial data.
 */

export const SEED_STUDENTS = [
  {
    id: "STU-2026-001",
    role: "student",
    fullName: "Ahmad Tariq Khan",
    fatherName: "Tariq Mahmood Khan",
    email: "ahmad.khan@demo.pk",
    phone: "0345-7654321",
    dob: "2003-05-14",
    gender: "Male",
    cnic: "12101-1234567-1", // Masked format available via formatter
    district: "Dera Ismail Khan",
    domicile: "Dera Ismail Khan",
    province: "Khyber Pakhtunkhwa",
    address: "House 14, Street 3, Mohallah Qasaban, Dera Ismail Khan Cantt",
    currentEducation: {
      level: "Undergraduate",
      program: "BS Computer Science",
      institution: "Gomal University DI Khan",
      currentSemester: "5th Semester",
      cgpa: 3.42,
      passingYear: 2026,
      enrollmentStatus: "Enrolled",
      rollNumber: "GU-CS-2022-48",
    },
    educationHistory: [
      {
        id: "edu_1",
        level: "Matric / SSC",
        board: "BISE Dera Ismail Khan",
        school: "Govt Comprehensive High School DI Khan",
        passingYear: "2020",
        totalMarks: 1100,
        obtainedMarks: 910,
        percentage: 82.72,
        major: "Science (Biology)",
      },
      {
        id: "edu_2",
        level: "Intermediate / FA / FSc / ICS",
        board: "BISE Dera Ismail Khan",
        school: "Govt Post Graduate College No 1 DI Khan",
        passingYear: "2022",
        totalMarks: 1100,
        obtainedMarks: 865,
        percentage: 78.63,
        major: "Pre-Engineering / ICS",
      }
    ],
    familyFinancial: {
      guardianOccupation: "School Teacher (Govt Elementary School)",
      guardianMonthlyIncomePKR: 55000,
      dependentSiblings: 3,
      earningMembers: 1,
      residenceType: "Rented",
    },
    profileCompletedPercent: 95,
    consentAccepted: true,
    consentDate: "2026-09-01T10:00:00Z",
    savedScholarships: ["SBP-SCH-001", "SBP-SCH-003"],
  },
  {
    id: "STU-2026-002",
    role: "student",
    fullName: "Fatima Noor Bibi",
    fatherName: "Noor Mohammad",
    email: "fatima.noor@demo.pk",
    phone: "0301-9876543",
    dob: "2004-09-22",
    gender: "Female",
    cnic: "12101-7654321-2",
    district: "Dera Ismail Khan",
    domicile: "Dera Ismail Khan",
    province: "Khyber Pakhtunkhwa",
    address: "Village Kotla Saidan, Tehsil & District DI Khan",
    currentEducation: {
      level: "Undergraduate",
      program: "BS Software Engineering",
      institution: "Gomal University DI Khan",
      currentSemester: "3rd Semester",
      cgpa: 3.65,
      passingYear: 2027,
      enrollmentStatus: "Enrolled",
      rollNumber: "GU-SE-2023-12",
    },
    educationHistory: [
      {
        id: "edu_f1",
        level: "Matric / SSC",
        board: "BISE Dera Ismail Khan",
        school: "Govt Girls High School No 2 DI Khan",
        passingYear: "2021",
        totalMarks: 1100,
        obtainedMarks: 960,
        percentage: 87.27,
        major: "Science (Computer Science)",
      },
      {
        id: "edu_f2",
        level: "Intermediate / FA / FSc / ICS",
        board: "BISE Dera Ismail Khan",
        school: "Govt Girls Degree College DI Khan",
        passingYear: "2023",
        totalMarks: 1100,
        obtainedMarks: 915,
        percentage: 83.18,
        major: "ICS (Computer Science)",
      }
    ],
    familyFinancial: {
      guardianOccupation: "Small Shopkeeper (Grain Market)",
      guardianMonthlyIncomePKR: 42000,
      dependentSiblings: 4,
      earningMembers: 1,
      residenceType: "Owned",
    },
    profileCompletedPercent: 100,
    consentAccepted: true,
    consentDate: "2026-09-02T12:00:00Z",
    savedScholarships: ["SBP-SCH-003", "SBP-SCH-002"],
  }
];

export const SEED_ADMIN = {
  id: "ADM-001",
  role: "admin",
  fullName: "Admin Officer (DI Khan Desk)",
  email: "admin@scholarbridge.pk.demo",
  designation: "Provincial Scholarship Verification Lead",
  department: "Scholarship Review & Quality Directorate",
  jurisdiction: "Khyber Pakhtunkhwa & Inter-Provincial Schemes",
};

export default { SEED_STUDENTS, SEED_ADMIN };
