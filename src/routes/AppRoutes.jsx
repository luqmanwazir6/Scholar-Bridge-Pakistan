import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import StudentLayout from "../layouts/StudentLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import ScholarshipsList from "../pages/public/ScholarshipsList";
import ScholarshipDetails from "../pages/public/ScholarshipDetails";
import CompareScholarships from "../pages/public/CompareScholarships";
import HowItWorks from "../pages/public/HowItWorks";
import EligibilityGuide from "../pages/public/EligibilityGuide";
import ApplicationProcess from "../pages/public/ApplicationProcess";
import FAQ from "../pages/public/FAQ";
import Contact from "../pages/public/Contact";
import PrivacyPolicy from "../pages/public/PrivacyPolicy";
import TermsAndConditions from "../pages/public/TermsAndConditions";
import PaymentAndRefundPolicy from "../pages/public/PaymentAndRefundPolicy";
import NotFound from "../pages/public/NotFound";
import AccessDenied from "../pages/public/AccessDenied";
import SessionExpired from "../pages/public/SessionExpired";
import CGPACalculator from "../pages/public/tools/CGPACalculator";
import PercentageCalculator from "../pages/public/tools/PercentageCalculator";
import DocumentChecklist from "../pages/public/tools/DocumentChecklist";
import DeadlineCalendar from "../pages/public/tools/DeadlineCalendar";

// Student Pages
import StudentLogin from "../pages/student/Login";
import StudentRegistration from "../pages/student/Registration";
import ForgotPassword from "../pages/student/ForgotPassword";
import StudentDashboard from "../pages/student/Dashboard";
import MyProfile from "../pages/student/MyProfile";
import EducationHistory from "../pages/student/EducationHistory";
import DocumentCenter from "../pages/student/DocumentCenter";
import ApplicationWizard from "../pages/student/ApplicationWizard";
import ApplicationPreview from "../pages/student/ApplicationPreview";
import MyApplications from "../pages/student/MyApplications";
import ApplicationDetails from "../pages/student/ApplicationDetails";
import PaymentCheckout from "../pages/student/PaymentCheckout";
import ReceiptDetails from "../pages/student/ReceiptDetails";
import Notifications from "../pages/student/Notifications";
import AccountSettings from "../pages/student/AccountSettings";

// Admin Pages
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/Dashboard";
import ScholarshipManagement from "../pages/admin/ScholarshipManagement";
import CreateEditScholarship from "../pages/admin/CreateEditScholarship";
import ApplicationManagement from "../pages/admin/ApplicationManagement";
import DocumentVerification from "../pages/admin/DocumentVerification";
import PaymentManagement from "../pages/admin/PaymentManagement";
import StudentManagement from "../pages/admin/StudentManagement";
import AwardManagement from "../pages/admin/AwardManagement";
import ReportsAnalytics from "../pages/admin/ReportsAnalytics";
import AuditLogs from "../pages/admin/AuditLogs";
import AdminSettings from "../pages/admin/AdminSettings";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="scholarships" element={<ScholarshipsList />} />
        <Route path="scholarships/:id" element={<ScholarshipDetails />} />
        <Route path="compare" element={<CompareScholarships />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="eligibility-guide" element={<EligibilityGuide />} />
        <Route path="application-process" element={<ApplicationProcess />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="payment-and-refund-policy" element={<PaymentAndRefundPolicy />} />
        <Route path="access-denied" element={<AccessDenied />} />
        <Route path="session-expired" element={<SessionExpired />} />

        {/* Dedicated Student Tools */}
        <Route path="tools/cgpa-calculator" element={<CGPACalculator />} />
        <Route path="tools/percentage-calculator" element={<PercentageCalculator />} />
        <Route path="tools/document-checklist" element={<DocumentChecklist />} />
        <Route path="tools/deadline-calendar" element={<DeadlineCalendar />} />

        {/* Student Auth Screens in Public Layout */}
        <Route path="student/login" element={<StudentLogin />} />
        <Route path="student/register" element={<StudentRegistration />} />
        <Route path="student/forgot-password" element={<ForgotPassword />} />

        {/* Admin Auth Screen in Public Layout */}
        <Route path="admin/login" element={<AdminLogin />} />
      </Route>

      {/* Protected Student Portal */}
      <Route
        path="student"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="education" element={<EducationHistory />} />
        <Route path="documents" element={<DocumentCenter />} />
        <Route path="apply/:id" element={<ApplicationWizard />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="applications/:id" element={<ApplicationDetails />} />
        <Route path="applications/:id/preview" element={<ApplicationPreview />} />
        <Route path="payments/checkout/:id" element={<PaymentCheckout />} />
        <Route path="payments/receipt/:id" element={<ReceiptDetails />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<AccountSettings />} />
      </Route>

      {/* Protected Admin Control Desk */}
      <Route
        path="admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="scholarships" element={<ScholarshipManagement />} />
        <Route path="scholarships/new" element={<CreateEditScholarship />} />
        <Route path="scholarships/:id/edit" element={<CreateEditScholarship />} />
        <Route path="applications" element={<ApplicationManagement />} />
        <Route path="documents" element={<DocumentVerification />} />
        <Route path="payments" element={<PaymentManagement />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="awards" element={<AwardManagement />} />
        <Route path="reports" element={<ReportsAnalytics />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch-all 404 Route */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
