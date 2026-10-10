/**
 * Data formatters for ScholarBridge Pakistan
 */

// Mask CNIC for privacy protection in UI: 12101-1234567-1 -> 12101-*****67-1
export const maskCNIC = (cnic) => {
  if (!cnic) return "N/A";
  const str = String(cnic).trim();
  const parts = str.split("-");
  if (parts.length === 3) {
    const middle = parts[1];
    const maskedMiddle = "*****" + middle.slice(-2);
    return `${parts[0]}-${maskedMiddle}-${parts[2]}`;
  }
  // Fallback for non-standard string
  if (str.length >= 8) {
    return str.slice(0, 5) + "*****" + str.slice(-2);
  }
  return str;
};

// Mask phone: 0345-7654321 -> 0345-***4321
export const maskPhone = (phone) => {
  if (!phone) return "N/A";
  const str = String(phone).trim();
  if (str.length >= 10) {
    return str.slice(0, 4) + "-***" + str.slice(-4);
  }
  return str;
};

// Currency formatter: 25000 -> PKR 25,000
export const formatPKR = (amount) => {
  if (amount === 0 || amount === "0") return "PKR 0 (Free)";
  if (!amount && amount !== 0) return "N/A";
  const num = Number(amount);
  return `PKR ${num.toLocaleString("en-PK")}`;
};

// Date formatter
export const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...(includeTime && { hour: "2-digit", minute: "2-digit" }),
    };
    return date.toLocaleDateString("en-PK", options);
  } catch (err) {
    return dateString;
  }
};

// Deadline status and days remaining
export const getDeadlineStatus = (deadlineString) => {
  if (!deadlineString) return { label: "No Deadline", isUrgent: false, isClosed: false, days: null };
  const deadline = new Date(deadlineString);
  const now = new Date();
  // Set to end of deadline day
  deadline.setHours(23, 59, 59, 999);
  
  const diffTime = deadline - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { label: "Closed", isUrgent: false, isClosed: true, days: diffDays };
  }
  if (diffDays === 0) {
    return { label: "Closes Today", isUrgent: true, isClosed: false, days: 0 };
  }
  if (diffDays === 1) {
    return { label: "Closing Tomorrow", isUrgent: true, isClosed: false, days: 1 };
  }
  if (diffDays <= 5) {
    return { label: `Closing in ${diffDays} days`, isUrgent: true, isClosed: false, days: diffDays };
  }
  return { label: `${diffDays} days left`, isUrgent: false, isClosed: false, days: diffDays };
};
