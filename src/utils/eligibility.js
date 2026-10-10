/**
 * Scholarship Eligibility Evaluation Engine
 * Evaluates a student profile against configurable scholarship criteria.
 */

import { calculateAge } from "./validators";

export const checkEligibility = (student, scholarship) => {
  if (!student) {
    return {
      status: "unauthenticated",
      label: "Log in to check eligibility",
      eligible: false,
      reasons: ["Please log in as a student to evaluate eligibility against your profile."],
      warnings: [],
    };
  }

  if (!student.profileCompletedPercent || student.profileCompletedPercent < 60) {
    return {
      status: "incomplete_profile",
      label: "Complete profile to check",
      eligible: false,
      reasons: ["Your student profile is less than 60% complete. Please add your academic credentials."],
      warnings: ["Academic records and domicile details needed."],
    };
  }

  const rules = scholarship.eligibility || {};
  const failures = [];
  const warnings = [];

  // 1. Age check
  const studentAge = calculateAge(student.dob);
  if (rules.ageMin && studentAge < rules.ageMin) {
    failures.push(`Minimum age is ${rules.ageMin} years (your current age is ${studentAge}).`);
  }
  if (rules.ageMax && studentAge > rules.ageMax) {
    failures.push(`Maximum age limit is ${rules.ageMax} years (your current age is ${studentAge}).`);
  }

  // 2. Education level check
  if (scholarship.educationLevel && scholarship.educationLevel.length > 0) {
    const studentLevel = student.currentEducation?.level;
    const matchesLevel = scholarship.educationLevel.some(lvl => 
      lvl.toLowerCase().includes(studentLevel?.toLowerCase() || "___") ||
      studentLevel?.toLowerCase().includes(lvl.toLowerCase())
    );
    if (!matchesLevel) {
      warnings.push(`Targeted for: ${scholarship.educationLevel.join(", ")}. Your profile indicates current level is ${studentLevel || "Unspecified"}.`);
    }
  }

  // 3. Academic Marks / CGPA check
  if (rules.minCGPA && student.currentEducation?.cgpa) {
    if (student.currentEducation.cgpa < rules.minCGPA) {
      failures.push(`Minimum CGPA requirement is ${rules.minCGPA} (your recorded CGPA is ${student.currentEducation.cgpa}).`);
    }
  }

  if (rules.minMarksPercent) {
    // Check against latest education history item or matric
    const latestExam = student.educationHistory?.[student.educationHistory.length - 1];
    if (latestExam && latestExam.percentage && latestExam.percentage < rules.minMarksPercent) {
      failures.push(`Minimum marks percentage required is ${rules.minMarksPercent}% (your last recorded was ${latestExam.percentage}%).`);
    }
  }

  // 4. District / Domicile check
  if (rules.eligibleDistricts && rules.eligibleDistricts.length > 0) {
    const hasAll = rules.eligibleDistricts.some(d => d.toLowerCase().includes("all"));
    if (!hasAll) {
      const studentDistrict = student.district || student.domicile || "";
      const matchesDistrict = rules.eligibleDistricts.some(d => 
        d.toLowerCase().includes(studentDistrict.toLowerCase()) ||
        studentDistrict.toLowerCase().includes(d.toLowerCase())
      );
      if (!matchesDistrict) {
        failures.push(`Eligible districts: ${rules.eligibleDistricts.join(", ")}. Your domicile is recorded as ${studentDistrict || "Unknown"}.`);
      }
    }
  }

  // 5. Family Income check (for Need-based)
  if (rules.incomeCeilingPKR) {
    const familyIncome = student.familyFinancial?.guardianMonthlyIncomePKR;
    if (familyIncome && familyIncome > rules.incomeCeilingPKR) {
      failures.push(`Maximum monthly family income ceiling is PKR ${rules.incomeCeilingPKR.toLocaleString()} (your recorded income is PKR ${familyIncome.toLocaleString()}).`);
    }
  }

  if (failures.length > 0) {
    return {
      status: "ineligible",
      label: `Not eligible (${failures.length} criteria unmet)`,
      eligible: false,
      reasons: failures,
      warnings: warnings,
    };
  }

  return {
    status: "eligible",
    label: "You appear eligible",
    eligible: true,
    reasons: ["Your current academic level, age, domicile, and academic records meet this scholarship's published criteria."],
    warnings: warnings,
  };
};

export default checkEligibility;
