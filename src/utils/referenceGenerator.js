/**
 * Unique Reference Generators for Applications, Payments and Receipts
 */

export const generateAppReference = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `SBP-${year}-${randomNum}`;
};

export const generateReceiptNumber = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `REC-${year}-${randomNum}`;
};

export const generateTxnReference = (method = "easypaisa") => {
  const rand = Math.floor(1000000 + Math.random() * 9000000);
  if (method === "easypaisa") return `EP-${rand}-MOCK`;
  if (method === "jazzcash") return `JC-${rand}-MOCK`;
  if (method === "bank_transfer") return `NBP-FT-${rand}-MOCK`;
  return `TXN-${rand}-MOCK`;
};
