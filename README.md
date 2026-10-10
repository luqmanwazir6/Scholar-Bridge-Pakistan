# ScholarBridge Pakistan — Scholarship Management Platform (Frontend Prototype)

> [!IMPORTANT]
> **DEMO PROTOTYPE NOTICE:** This is a fully functional **frontend prototype** built with React, Vite, and JavaScript. All scholarship listings, institutional partnerships, payments, and applicant identities are synthetic demonstrations. It is **NOT affiliated with HEC or any government authority**. Real passwords, CNIC records, and banking credentials are never collected or stored.

---

## 🌟 Overview & Regional Pilot Focus
**ScholarBridge Pakistan** is a modern web platform designed to streamline discovery, eligibility evaluation, document verification, and award disbursement for students across Pakistan.

The initial pilot focuses on **Dera Ismail Khan (Khyber Pakhtunkhwa)**, serving students of **Gomal University**, **Qurtuba University**, and affiliated regional colleges, with full scalability to all provinces.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v24+ recommended)
- **npm**: v9.0.0 or higher

### 2. Installation
```bash
# Clone or navigate to the project directory
cd LMS

# Install required dependencies (React 18, React Router DOM, React Icons)
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
The application will launch at: **`http://localhost:3000`**

### 4. Build for Production & Verification
```bash
# Type check & build optimized assets
npm run build

# Preview production build locally
npm run preview
```

---

## 🔑 Demo Access & One-Click Logins

The application features instant one-click login buttons in the persistent top **Demo Mode** banner and login pages:

| Role | Demo Credentials | Quick Action | Pre-loaded Context |
| :--- | :--- | :--- | :--- |
| **Demo Student** | `ahmad.khan@demo.pk`<br>`demo12345` | Click **"Demo Student"** in top banner | Ahmad Tariq Khan (DI Khan, Gomal University, BS Computer Science, 5th Sem, Active Submissions & Corrections) |
| **Demo Admin** | `admin@scholarbridge.pk.demo`<br>`admin12345` | Click **"Demo Admin"** in top banner | Admin Officer (DI Khan Desk Lead, Full Review & Verification Desk) |
| **Reset Data** | Any session | Click **"Reset Data"** in top banner | Restores all localStorage collections back to original seed datasets |

---

## 🛠 Feature Tour

### 1. Public Portal
- **Landing Page**: Educational trust hero, regional focus banner, how-it-works, featured opportunities, live eligibility checker.
- **Scholarships Catalog**: Multi-criteria search and filter by Category, Degree Level, District Domicile, and Fee/Free status.
- **Side-by-Side Comparison**: Compare up to 3 scholarships simultaneously.
- **Interactive Eligibility Guide**: Instant parameter tester for candidate qualifications.
- **Transparent Policies**: Privacy policy, Terms of use, and Payment & Refund guidelines.
- **Validated Contact Form**: Real-time validated support inquiry form.

### 2. Candidate Student Portal
- **Dashboard**: Profile completion meter, live scholarship recommendations, active applications, and correction alerts.
- **My Profile**: Pakistani CNIC masking (`12101-*****67-1`), auto-calculated age from DOB, phone validation, and privacy consent.
- **Education History**: Dynamic degrees (Matric, Intermediate, BS, MS, PhD) with auto-calculated marks percentages.
- **Document Center**: In-browser uploads (JPG, PNG, PDF max 2MB) with mock watermarked previews and review status history.
- **9-Step Application Wizard**: Step-by-step progress, prefilled profile data, draft save & resume, duplicate submission checks, and unique reference generation (`SBP-2026-XXXXXX`).
- **Payment Checkout Simulation**: Easypaisa, JazzCash, and Bank Transfer checkout simulation with duplicate payment lock.
- **Printable E-Receipt & Summary**: Print-friendly layouts (`@media print`) with simulated seals and barcodes.

### 3. Administrative Desk Portal
- **Command Dashboard**: KPI statistics and pure CSS/SVG pipeline charts.
- **Scheme Management**: Create, edit, publish, close, and archive configurable scholarships with custom application questions.
- **Applications Review Desk**: Endorse applications, issue rejections with mandatory reasons, and request document corrections.
- **Document Verification Desk**: Watermarked mock previews, mark verified/rejected, and record review notes.
- **Payment Reconciliation**: Reconcile bank transfers and simulate refunds.
- **Award Distribution Desk**: Formal grant disbursement vouchers transitioning approved applications to 'Awarded'.
- **Reports & Analytics**: In-browser Blob CSV downloads for Applications, Payments, and Candidates.
- **Cryptographic Audit Trail**: Immutable timestamped log of all desk actions.

---

## 📋 Technology Stack & Architecture

- **Framework**: React 18 (Functional Components & Hooks)
- **Build Tool**: Vite 5
- **Routing**: React Router DOM v6 with role-guarded layouts
- **Icons**: React Icons (Font Awesome & Feather icons)
- **Styling**: Pure CSS with design tokens (`variables.css` & `global.css`)
- **State & Service Layer**: Asynchronous decoupled services in `src/services/` returning simulated promises; ready for REST backend swap.

---

## ⚠️ Known Limitations & Scope
1. **Frontend Only**: State persists in browser `localStorage`. No MongoDB or Express server is executed in this prototype.
2. **Document Previews**: Uploaded files generate in-memory synthetic SVG data URIs; authentic document verification requires real board attestation and backend infrastructure.
3. **Payments**: All payment rails are simulated; no monetary charges occur.

---

## 📄 License & Attribution
Designed and built for educational software prototyping in Pakistan. Inspired by public clarity standards without copying any proprietary governmental assets.
