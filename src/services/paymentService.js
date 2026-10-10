/**
 * Payment Service - Simulated Demo Payment Processing
 * Always marks records as "Simulated" and enforces duplicate check.
 */

import { API_CONFIG } from "../config/apiConfig";
import { getStored, setStored, delay } from "./storageHelper";
import { SEED_PAYMENTS } from "../data/seedPayments";
import { generateReceiptNumber, generateTxnReference } from "../utils/referenceGenerator";
import { auditService } from "./auditService";
import { notificationService } from "./notificationService";
import { PAYMENT_METHODS } from "../config/paymentMethods";

const { STORAGE_KEYS } = API_CONFIG;

export const paymentService = {
  async getAll(filter = {}) {
    await delay(100);
    let list = getStored(STORAGE_KEYS.PAYMENTS, SEED_PAYMENTS);
    if (filter.status && filter.status !== "All") {
      list = list.filter(p => p.status.includes(filter.status));
    }
    return list.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));
  },

  async getById(id) {
    await delay(80);
    const list = getStored(STORAGE_KEYS.PAYMENTS, SEED_PAYMENTS);
    return list.find(p => p.id === id || p.receiptNumber === id) || null;
  },

  async getByApplicationId(applicationId) {
    await delay(80);
    const list = getStored(STORAGE_KEYS.PAYMENTS, SEED_PAYMENTS);
    return list.find(p => p.applicationId === applicationId) || null;
  },

  async createPayment({
    applicationId,
    applicationReference,
    studentId,
    studentName,
    scholarshipTitle,
    amountPKR,
    paymentMethod,
    feePurpose,
    userTxnId = "",
  }) {
    await delay(300);

    const list = getStored(STORAGE_KEYS.PAYMENTS, SEED_PAYMENTS);

    // Prevent duplicate demo payment
    const existing = list.find(p => p.applicationId === applicationId && p.status !== "Refunded");
    if (existing) {
      throw new Error(`A payment simulation has already been recorded for this application (Receipt #${existing.receiptNumber}).`);
    }

    const methodConfig = PAYMENT_METHODS.find(m => m.id === paymentMethod) || PAYMENT_METHODS[0];
    const txnRef = userTxnId.trim() || generateTxnReference(paymentMethod);
    const receiptNo = generateReceiptNumber();
    const now = new Date().toISOString();

    // Bank transfer goes into manual verification queue; mobile wallet into Successful (Simulated)
    const initialStatus = paymentMethod === "bank_transfer" ? "Manual Verification Pending" : "Successful (Simulated)";

    const newPayment = {
      id: `PAY-2026-${Date.now().toString().slice(-4)}`,
      receiptNumber: receiptNo,
      applicationId,
      applicationReference,
      studentId,
      studentName,
      scholarshipTitle,
      amountPKR,
      feePurpose: feePurpose || "Application processing token fee",
      paymentMethod,
      paymentMethodName: methodConfig.name,
      accountNumberUsed: methodConfig.accountNumber,
      transactionReference: txnRef,
      status: initialStatus,
      isSimulated: true,
      paidAt: now,
      verifiedAt: initialStatus === "Successful (Simulated)" ? now : null,
      verifiedBy: initialStatus === "Successful (Simulated)" ? "AUTO-DEMO-RAIL" : null,
      remarks: `Simulated transaction via ${methodConfig.name}. Not a real monetary transfer.`,
    };

    list.unshift(newPayment);
    setStored(STORAGE_KEYS.PAYMENTS, list);

    await auditService.logAction({
      action: "PAYMENT_SIMULATED",
      targetType: "Payment",
      targetId: newPayment.id,
      targetReference: `Receipt ${receiptNo} for ${applicationReference}`,
      details: `Simulated payment of PKR ${amountPKR} via ${methodConfig.name}. Status: ${initialStatus}`,
    });

    await notificationService.createNotification({
      userId: studentId,
      type: "success",
      title: `Payment Receipt Generated: ${receiptNo}`,
      message: `Your simulated fee payment of PKR ${amountPKR} for ${scholarshipTitle} has been recorded.`,
      link: `/student/payments/receipt/${newPayment.id}`,
    });

    return newPayment;
  },

  async updateStatus(id, newStatus, remarks = "", actor = "Admin Officer") {
    await delay(180);
    const list = getStored(STORAGE_KEYS.PAYMENTS, SEED_PAYMENTS);
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) throw new Error("Payment record not found.");

    const now = new Date().toISOString();
    const payment = list[idx];
    const prevStatus = payment.status;

    payment.status = newStatus;
    payment.remarks = remarks || payment.remarks;
    if (newStatus === "Successful (Simulated)" || newStatus === "Verified") {
      payment.verifiedAt = now;
      payment.verifiedBy = "ADM-001";
    }

    list[idx] = payment;
    setStored(STORAGE_KEYS.PAYMENTS, list);

    await auditService.logAction({
      action: "PAYMENT_STATUS_UPDATED",
      targetType: "Payment",
      targetId: payment.id,
      targetReference: `Receipt ${payment.receiptNumber}`,
      details: `Payment status changed from ${prevStatus} to ${newStatus}. Remarks: ${remarks || "None"}`,
    });

    return payment;
  }
};

export default paymentService;
