import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import applicationService from "../../services/applicationService";
import documentService from "../../services/documentService";
import paymentService from "../../services/paymentService";
import Stepper from "../../components/ui/Stepper";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import DocumentCard from "../../components/domain/DocumentCard";
import StatusBadge from "../../components/domain/StatusBadge";
import { formatPKR, formatDate } from "../../utils/formatters";
import { checkEligibility } from "../../utils/eligibility";
import { PAYMENT_METHODS } from "../../config/paymentMethods";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaSave,
  FaArrowLeft,
  FaArrowRight,
  FaShieldAlt,
  FaPrint,
  FaLock,
} from "react-icons/fa";

export const ApplicationWizard = () => {
  const { id } = useParams(); // scholarship ID
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { scholarships, reloadAll } = useData();
  const { showSuccess, showError, showInfo } = useToast();

  const scholarship = scholarships.find(s => s.id === id);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [duplicateApp, setDuplicateApp] = useState(null);
  const [submittedApp, setSubmittedApp] = useState(null);

  // Form state prefilled from student profile
  const [wizardData, setWizardData] = useState({
    // Step 1: Personal
    fullName: currentUser?.fullName || "",
    fatherName: currentUser?.fatherName || "",
    cnic: currentUser?.cnic || "",
    dob: currentUser?.dob || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
    district: currentUser?.district || "Dera Ismail Khan",
    address: currentUser?.address || "",

    // Step 2: Family & Financial
    guardianOccupation: currentUser?.familyFinancial?.guardianOccupation || "",
    guardianIncome: currentUser?.familyFinancial?.guardianMonthlyIncomePKR || 55000,
    dependentSiblings: currentUser?.familyFinancial?.dependentSiblings || 3,

    // Step 3: Education
    currentLevel: currentUser?.currentEducation?.level || "Undergraduate",
    currentProgram: currentUser?.currentEducation?.program || "BS Computer Science",
    institution: currentUser?.currentEducation?.institution || "Gomal University DI Khan",
    currentCGPA: currentUser?.currentEducation?.cgpa || 3.42,
    passingYear: currentUser?.currentEducation?.passingYear || 2026,

    // Step 4: Custom Questions
    customAnswers: {},

    // Step 5: Documents (map of uploaded docs)
    attachedDocKeys: ["student_photo", "student_cnic", "matric_marksheet", "inter_marksheet", "domicile"],

    // Step 8: Fee & Payment
    paymentMethod: "easypaisa",
    userTxnId: "",
  });

  const [stepErrors, setStepErrors] = useState({});

  // Check for existing duplicate application
  useEffect(() => {
    const checkDuplicate = async () => {
      if (currentUser?.id && id) {
        const existing = await applicationService.checkDuplicate(currentUser.id, id);
        if (existing) {
          setDuplicateApp(existing);
        }
      }
    };
    checkDuplicate();
  }, [currentUser, id]);

  if (!scholarship) {
    return (
      <div className="container" style={{ padding: "64px 16px", textAlign: "center" }}>
        <h2>Scholarship Not Found</h2>
        <Link to="/scholarships" className="btn btn-primary" style={{ marginTop: "16px" }}>
          Back to Scholarships
        </Link>
      </div>
    );
  }

  const hasIncomeCeiling = !!scholarship.eligibility?.incomeCeilingPKR;
  const hasFee = Number(scholarship.applicationFee) > 0;

  // Dynamically define wizard steps based on scholarship rules
  const steps = [
    { id: "personal", title: "Personal Info", subtitle: "Identity details" },
    ...(hasIncomeCeiling ? [{ id: "financial", title: "Family & Income", subtitle: "Means test" }] : []),
    { id: "education", title: "Education", subtitle: "Academic marks" },
    { id: "questions", title: "Questions", subtitle: "Essay & criteria" },
    { id: "documents", title: "Documents", subtitle: "Certificates" },
    { id: "eligibility", title: "Eligibility", subtitle: "Rules check" },
    { id: "review", title: "Review", subtitle: "Confirm details" },
    ...(hasFee ? [{ id: "payment", title: "Demo Payment", subtitle: "Simulated fee" }] : []),
    { id: "confirmation", title: "Submission", subtitle: "Tracking reference" },
  ];

  const currentStep = steps[currentStepIndex];

  // Per step validation
  const validateCurrentStep = () => {
    const errs = {};

    if (currentStep.id === "personal") {
      if (!wizardData.fullName.trim()) errs.fullName = "Full name is required.";
      if (!wizardData.fatherName.trim()) errs.fatherName = "Father name is required.";
      if (!wizardData.cnic.trim()) errs.cnic = "CNIC is required.";
      if (!wizardData.phone.trim()) errs.phone = "Phone number is required.";
    } else if (currentStep.id === "education") {
      if (!wizardData.institution.trim()) errs.institution = "Institution name is required.";
      if (!wizardData.currentProgram.trim()) errs.currentProgram = "Degree program is required.";
    } else if (currentStep.id === "questions") {
      if (scholarship.customQuestions && scholarship.customQuestions.length > 0) {
        scholarship.customQuestions.forEach(q => {
          if (q.required && !wizardData.customAnswers[q.id]?.trim()) {
            errs[q.id] = "This question is required.";
          }
        });
      }
    } else if (currentStep.id === "payment" && hasFee) {
      if (!wizardData.userTxnId.trim()) {
        errs.userTxnId = "Please enter your simulated transaction ID (e.g. EP-8923471).";
      }
    }

    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      showError("Please complete the required fields in this step.");
      return;
    }
    setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      await applicationService.saveDraft({
        studentId: currentUser.id,
        scholarshipId: scholarship.id,
        scholarshipTitle: scholarship.title,
        answers: wizardData.customAnswers,
        wizardData,
      });
      showSuccess("Application draft saved successfully. You can resume anytime from your dashboard.");
    } catch (err) {
      showError("Failed to save draft.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const submitted = await applicationService.submit({
        studentId: currentUser.id,
        scholarshipId: scholarship.id,
        scholarshipTitle: scholarship.title,
        feeAmount: scholarship.applicationFee || 0,
        feeStatus: hasFee ? "Paid" : "Waived",
        answers: wizardData.customAnswers,
        attachedDocuments: wizardData.attachedDocKeys.map(k => ({ docId: `DOC-${k}`, key: k, status: "Under Review" })),
        wizardData,
      });

      // If fee was charged, record simulated payment
      if (hasFee) {
        await paymentService.createPayment({
          applicationId: submitted.id,
          applicationReference: submitted.referenceNumber,
          studentId: currentUser.id,
          studentName: currentUser.fullName,
          scholarshipTitle: scholarship.title,
          amountPKR: scholarship.applicationFee,
          paymentMethod: wizardData.paymentMethod,
          feePurpose: scholarship.feePurpose,
          userTxnId: wizardData.userTxnId,
        });
      }

      setSubmittedApp(submitted);
      await reloadAll();
      showSuccess(`Application #${submitted.referenceNumber} submitted successfully!`);
      // Advance to final confirmation step
      setCurrentStepIndex(steps.length - 1);
    } catch (err) {
      showError(err.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  // Duplicate Warning Screen
  if (duplicateApp) {
    return (
      <div className="container" style={{ padding: "64px 16px", maxWidth: "680px" }}>
        <div className="card" style={{ padding: "36px", textAlign: "center", borderTop: "4px solid var(--color-warning)" }}>
          <FaExclamationTriangle color="var(--color-warning)" size={48} style={{ marginBottom: "16px" }} />
          <h2 style={{ fontSize: "1.6rem", marginBottom: "8px" }}>Duplicate Application Detected</h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "14.5px", lineHeight: "1.6", marginBottom: "20px" }}>
            You have already submitted an application for <strong>{scholarship.title}</strong> under tracking reference <strong>#{duplicateApp.referenceNumber}</strong> on {formatDate(duplicateApp.submittedAt)}.
          </p>
          <div style={{ display: "inline-flex", marginBottom: "24px" }}>
            <StatusBadge status={duplicateApp.status} />
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link to={`/student/applications/${duplicateApp.id}`} className="btn btn-primary">
              View Existing Application Status
            </Link>
            <Link to="/scholarships" className="btn btn-outline">
              Browse Other Scholarships
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wizard" style={{ maxWidth: "880px", margin: "0 auto", paddingBottom: "64px" }}>
      {/* Top Header */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span style={{ fontSize: "12px", fontWeight: "bold", color: "var(--color-primary)", textTransform: "uppercase" }}>
              Scholarship Application Wizard
            </span>
            <h1 style={{ fontSize: "1.65rem", margin: "4px 0" }}>
              {scholarship.title}
            </h1>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {currentStep.id !== "confirmation" && (
              <Button variant="outline" size="sm" onClick={handleSaveDraft} loading={loading} icon={<FaSave />}>
                Save Draft
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stepper Navigation */}
      <Stepper
        steps={steps}
        currentStepIndex={currentStepIndex}
        onStepClick={(idx) => setCurrentStepIndex(idx)}
      />

      {/* Step Content Card */}
      <div className="card wizard-content-card" style={{ padding: "32px", backgroundColor: "#FFFFFF", marginBottom: "24px" }}>
        {/* Step 1: Personal Information */}
        {currentStep.id === "personal" && (
          <div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>1. Personal & Contact Information</h2>
            <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "24px" }}>
              Prefilled from your registered profile. Please confirm your contact points.
            </p>

            <div className="wizard-grid-2">
              <Input
                label="Full Name"
                value={wizardData.fullName}
                onChange={(e) => setWizardData({ ...wizardData, fullName: e.target.value })}
                required
                error={stepErrors.fullName}
              />

              <Input
                label="Father / Guardian Name"
                value={wizardData.fatherName}
                onChange={(e) => setWizardData({ ...wizardData, fatherName: e.target.value })}
                required
                error={stepErrors.fatherName}
              />
            </div>

            <div className="wizard-grid-2">
              <Input
                label="CNIC or B-Form Number"
                value={wizardData.cnic}
                onChange={(e) => setWizardData({ ...wizardData, cnic: e.target.value })}
                required
                error={stepErrors.cnic}
              />

              <Input
                label="Mobile Phone"
                value={wizardData.phone}
                onChange={(e) => setWizardData({ ...wizardData, phone: e.target.value })}
                required
                error={stepErrors.phone}
              />
            </div>

            <div className="wizard-grid-2">
              <Input
                label="District of Domicile"
                value={wizardData.district}
                onChange={(e) => setWizardData({ ...wizardData, district: e.target.value })}
                required
              />

              <Input
                label="Email Address"
                value={wizardData.email}
                onChange={(e) => setWizardData({ ...wizardData, email: e.target.value })}
                required
              />
            </div>
          </div>
        )}

        {/* Step 2: Family & Financial */}
        {currentStep.id === "financial" && (
          <div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>2. Family & Financial Assessment</h2>
            <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "24px" }}>
              Required because this scheme has an income ceiling of {formatPKR(scholarship.eligibility.incomeCeilingPKR)}/month.
            </p>

            <div className="wizard-grid-2">
              <Input
                label="Father / Guardian Occupation"
                value={wizardData.guardianOccupation}
                onChange={(e) => setWizardData({ ...wizardData, guardianOccupation: e.target.value })}
                placeholder="e.g. Govt School Teacher"
                required
              />

              <Input
                label="Total Monthly Household Income (PKR)"
                type="number"
                value={wizardData.guardianIncome}
                onChange={(e) => setWizardData({ ...wizardData, guardianIncome: e.target.value })}
                required
              />
            </div>

            <Input
              label="Number of Dependent Siblings Currently Studying"
              type="number"
              value={wizardData.dependentSiblings}
              onChange={(e) => setWizardData({ ...wizardData, dependentSiblings: e.target.value })}
              min={0}
              max={12}
            />
          </div>
        )}

        {/* Step 3: Education */}
        {currentStep.id === "education" && (
          <div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>3. Academic Enrollment & Performance</h2>
            <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "24px" }}>
              Confirm your current institutional enrollment details for this award.
            </p>

            <div className="wizard-grid-2">
              <Input
                label="Enrolled Institution"
                value={wizardData.institution}
                onChange={(e) => setWizardData({ ...wizardData, institution: e.target.value })}
                required
                error={stepErrors.institution}
              />

              <Input
                label="Degree / Major Discipline"
                value={wizardData.currentProgram}
                onChange={(e) => setWizardData({ ...wizardData, currentProgram: e.target.value })}
                required
                error={stepErrors.currentProgram}
              />
            </div>

            <div className="wizard-grid-2">
              <Input
                label="Latest Cumulative GPA (CGPA)"
                type="number"
                step="0.01"
                value={wizardData.currentCGPA}
                onChange={(e) => setWizardData({ ...wizardData, currentCGPA: e.target.value })}
                required
              />

              <Input
                label="Expected Completion Year"
                type="number"
                value={wizardData.passingYear}
                onChange={(e) => setWizardData({ ...wizardData, passingYear: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Step 4: Questions */}
        {currentStep.id === "questions" && (
          <div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>4. Scheme-Specific Evaluation Questions</h2>
            <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "24px" }}>
              Please provide clear answers for the evaluation committee review.
            </p>

            {scholarship.customQuestions?.map((q) => (
              <div key={q.id} className="form-group" style={{ marginBottom: "20px" }}>
                <label className="form-label">
                  <span>{q.label} {q.required && <span className="required">*</span>}</span>
                </label>

                {q.type === "textarea" ? (
                  <textarea
                    rows={4}
                    className={`form-textarea ${stepErrors[q.id] ? "is-invalid" : ""}`}
                    value={wizardData.customAnswers[q.id] || ""}
                    onChange={(e) => setWizardData({
                      ...wizardData,
                      customAnswers: { ...wizardData.customAnswers, [q.id]: e.target.value }
                    })}
                    placeholder="Enter your detailed response..."
                  />
                ) : q.type === "select" ? (
                  <select
                    className={`form-select ${stepErrors[q.id] ? "is-invalid" : ""}`}
                    value={wizardData.customAnswers[q.id] || ""}
                    onChange={(e) => setWizardData({
                      ...wizardData,
                      customAnswers: { ...wizardData.customAnswers, [q.id]: e.target.value }
                    })}
                  >
                    <option value="">Select an option...</option>
                    {q.options?.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className={`form-input ${stepErrors[q.id] ? "is-invalid" : ""}`}
                    value={wizardData.customAnswers[q.id] || ""}
                    onChange={(e) => setWizardData({
                      ...wizardData,
                      customAnswers: { ...wizardData.customAnswers, [q.id]: e.target.value }
                    })}
                  />
                )}
                {stepErrors[q.id] && <span className="form-error">{stepErrors[q.id]}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Step 5: Documents */}
        {currentStep.id === "documents" && (
          <div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>5. Supporting Documents Attachment</h2>
            <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "20px" }}>
              These documents will be forwarded to the verification review desk.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {scholarship.requiredDocuments?.map((doc, idx) => (
                <div
                  key={doc.key || idx}
                  style={{
                    padding: "14px 18px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    backgroundColor: "var(--color-bg-surface)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong style={{ fontSize: "14px", display: "block" }}>{doc.name}</strong>
                    <span style={{ fontSize: "12px", color: "var(--color-text-subtle)" }}>
                      Status: Verified in Document Center
                    </span>
                  </div>
                  <Badge variant="success">Attached</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Eligibility Checklist */}
        {currentStep.id === "eligibility" && (
          <div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>6. Eligibility Verification Checklist</h2>
            <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "20px" }}>
              Automated rules verification against the published criteria.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", backgroundColor: "var(--color-success-bg)", borderRadius: "6px" }}>
                <FaCheckCircle color="var(--color-success)" size={18} />
                <span style={{ fontSize: "13.5px" }}>Academic CGPA / Percentage meets cutoff requirement.</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", backgroundColor: "var(--color-success-bg)", borderRadius: "6px" }}>
                <FaCheckCircle color="var(--color-success)" size={18} />
                <span style={{ fontSize: "13.5px" }}>Domicile district matches regional quota ({wizardData.district}).</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", backgroundColor: "var(--color-success-bg)", borderRadius: "6px" }}>
                <FaCheckCircle color="var(--color-success)" size={18} />
                <span style={{ fontSize: "13.5px" }}>Enrolled degree tier aligns with target beneficiary criteria.</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Application Review */}
        {currentStep.id === "review" && (
          <div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>7. Review Application Summary</h2>
            <p style={{ fontSize: "13px", color: "var(--color-text-subtle)", marginBottom: "20px" }}>
              Please carefully review your submission before finalizing.
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px", marginBottom: "20px" }}>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "8px 0", color: "var(--color-text-subtle)", width: "35%" }}>Applicant Name:</td>
                  <td style={{ padding: "8px 0", fontWeight: 600 }}>{wizardData.fullName}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "8px 0", color: "var(--color-text-subtle)" }}>CNIC / B-Form:</td>
                  <td style={{ padding: "8px 0", fontWeight: 600 }}>{wizardData.cnic}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "8px 0", color: "var(--color-text-subtle)" }}>Institution:</td>
                  <td style={{ padding: "8px 0", fontWeight: 600 }}>{wizardData.institution}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "8px 0", color: "var(--color-text-subtle)" }}>Current CGPA:</td>
                  <td style={{ padding: "8px 0", fontWeight: 600 }}>{wizardData.currentCGPA}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "8px 0", color: "var(--color-text-subtle)" }}>Application Fee:</td>
                  <td style={{ padding: "8px 0", fontWeight: 600, color: hasFee ? "var(--color-warning)" : "var(--color-success)" }}>
                    {hasFee ? formatPKR(scholarship.applicationFee) : "Free (PKR 0)"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Step 8: Payment (if hasFee) */}
        {currentStep.id === "payment" && hasFee && (
          <div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>8. Simulated Fee Checkout</h2>
            <div style={{ backgroundColor: "#FEF3C7", padding: "12px 16px", borderRadius: "6px", marginBottom: "20px", color: "#92400E", fontSize: "12.5px" }}>
              <strong>Demo Simulation:</strong> No real money will be deducted. Select a payment rail and enter any mock Transaction ID.
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12.5px", fontWeight: "bold", display: "block", marginBottom: "6px" }}>
                Select Payment Rail:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                {PAYMENT_METHODS.filter(m => m.active).map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setWizardData({ ...wizardData, paymentMethod: m.id })}
                    style={{
                      padding: "14px",
                      border: `2px solid ${wizardData.paymentMethod === m.id ? "var(--color-primary)" : "var(--color-border)"}`,
                      borderRadius: "8px",
                      background: wizardData.paymentMethod === m.id ? "var(--color-primary-50)" : "#FFFFFF",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "24px", marginBottom: "4px" }}>{m.icon}</div>
                    <div style={{ fontWeight: "bold", fontSize: "13px" }}>{m.name.split(" ")[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Simulated Transaction TID"
              placeholder="e.g. EP-8923471-MOCK"
              value={wizardData.userTxnId}
              onChange={(e) => setWizardData({ ...wizardData, userTxnId: e.target.value })}
              required
              error={stepErrors.userTxnId}
              hint="Enter any demo string to simulate mobile wallet verification."
            />
          </div>
        )}

        {/* Step 9: Final Confirmation */}
        {currentStep.id === "confirmation" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <FaCheckCircle color="var(--color-success)" size={54} style={{ marginBottom: "16px" }} />
            <h2 style={{ fontSize: "1.75rem", marginBottom: "8px", color: "var(--color-primary-dark)" }}>
              Application Successfully Submitted!
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "14.5px", maxWidth: "540px", margin: "0 auto 24px" }}>
              Your application has been logged into the review queue. You can track document attestation and approval stages from your student dashboard.
            </p>

            <div
              style={{
                backgroundColor: "var(--color-bg-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                padding: "16px 24px",
                display: "inline-block",
                marginBottom: "28px",
              }}
            >
              <div style={{ fontSize: "12px", color: "var(--color-text-subtle)", textTransform: "uppercase" }}>
                Your Unique Tracking Reference
              </div>
              <div style={{ fontSize: "24px", fontWeight: "bold", fontFamily: "var(--font-mono)", color: "var(--color-primary)" }}>
                {submittedApp?.referenceNumber || "SBP-2026-894102"}
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/student/applications" className="btn btn-primary">
                View in My Applications
              </Link>
              <Link to={`/student/applications/${submittedApp?.id || "APP-001"}`} className="btn btn-outline">
                View Application Details
              </Link>
              {hasFee && (
                <Link to={`/student/payments/receipt/PAY-2026-4401`} className="btn btn-secondary">
                  <FaPrint style={{ marginRight: "6px" }} /> View E-Receipt
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Wizard Bottom Navigation Buttons */}
      {currentStep.id !== "confirmation" && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStepIndex === 0 || loading}
            icon={<FaArrowLeft />}
          >
            Previous Step
          </Button>

          {currentStep.id === "review" && !hasFee ? (
            <Button
              variant="primary"
              onClick={handleFinalSubmit}
              loading={loading}
              icon={<FaCheckCircle />}
            >
              Submit Application
            </Button>
          ) : currentStep.id === "payment" ? (
            <Button
              variant="primary"
              onClick={handleFinalSubmit}
              loading={loading}
              icon={<FaCheckCircle />}
            >
              Confirm Simulated Payment & Submit
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={loading}
              icon={<FaArrowRight />}
            >
              Next Step
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationWizard;
