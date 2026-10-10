/**
 * Supported payment methods configuration (UI simulation)
 * Extensible configuration for Pakistani payment ecosystem
 */
export const PAYMENT_METHODS = [
  {
    id: "easypaisa",
    name: "Easypaisa Mobile Account / Retailer",
    type: "mobile_wallet",
    icon: "📱",
    accountTitle: "ScholarBridge Pakistan (Demo Desk)",
    accountNumber: "0345-9876543",
    instructions: "Transfer the exact fee amount via Easypaisa App or Easypaisa Shop to the account number above, then enter your simulated transaction ID (e.g. EP-8923471).",
    requiresProof: true,
    badgeText: "Instant Demo Simulation",
    active: true,
  },
  {
    id: "jazzcash",
    name: "JazzCash Mobile Account",
    type: "mobile_wallet",
    icon: "💳",
    accountTitle: "ScholarBridge Pakistan (Demo Desk)",
    accountNumber: "0300-1234567",
    instructions: "Pay using the JazzCash App with Till ID / Mobile Account, then provide the mock transaction TID (e.g. JC-4819203).",
    requiresProof: true,
    badgeText: "Instant Demo Simulation",
    active: true,
  },
  {
    id: "bank_transfer",
    name: "Direct 1Link / IBFT Bank Transfer",
    type: "bank_account",
    icon: "🏦",
    accountTitle: "ScholarBridge Demo Trust Fund",
    bankName: "National Bank of Pakistan (DI Khan Cantt Branch - Demo)",
    accountNumber: "PK36NBPA0001234567890123",
    instructions: "Transfer through your online banking portal or ATM using IBFT. Bank transfers enter a 'Manual Verification Pending' state in demo mode.",
    requiresProof: true,
    badgeText: "Manual Verification Queue",
    active: true,
  },
  {
    id: "raast",
    name: "Raast P2P / P2M Instant Payment (Future Integration)",
    type: "raast",
    icon: "⚡",
    accountTitle: "Raast ID: 03459876543",
    accountNumber: "RAAST-SBP-DEMO",
    instructions: "Raast direct government-backed instant payment rails — planned for future backend integration.",
    requiresProof: false,
    badgeText: "Coming Soon in Backend Phase",
    active: false,
  },
  {
    id: "kuickpay",
    name: "KuickPay 1Bill Voucher (Future Integration)",
    type: "voucher",
    icon: "🧾",
    accountTitle: "1Bill SBP Demo Consumer ID",
    accountNumber: "100234-DEMO-001",
    instructions: "Pay at any ATM, TCS center, or 1Link mobile banking app using the 1Bill invoice number.",
    requiresProof: false,
    badgeText: "Coming Soon in Backend Phase",
    active: false,
  }
];

export default PAYMENT_METHODS;
