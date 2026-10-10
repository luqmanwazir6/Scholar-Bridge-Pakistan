/**
 * ScholarBridge Pakistan - Central Brand Configuration
 * All visual identity, branding, terminology and contact points are centralized here.
 */
export const BRAND = {
  name: "ScholarBridge Pakistan",
  shortName: "ScholarBridge",
  tagline: "Empowering Students across Pakistan with Verified Scholarship Access",
  subTagline: "Bridging the gap between ambitious students and educational opportunities — starting from Dera Ismail Khan, Khyber Pakhtunkhwa to all of Pakistan.",
  initialRegion: "Dera Ismail Khan, KP",
  coverage: "Pakistan Nationwide",
  
  // Visual identity
  logo: {
    text: "ScholarBridge",
    badge: "Pakistan",
    symbol: "🎓",
  },

  // Color tokens (mirrored in variables.css)
  colors: {
    primary: "#0D47A1",      // Trustworthy Deep Blue
    primaryDark: "#082C64",
    primaryLight: "#1976D2",
    secondary: "#00897B",    // Teal
    secondaryLight: "#26A69A",
    accent: "#F57C00",       // Warm Amber/Orange
    accentLight: "#FFB74D",
    success: "#2E7D32",
    warning: "#ED6C02",
    danger: "#D32F2F",
    neutralDark: "#1E293B",
    neutralLight: "#F8FAFC",
  },

  // Fonts
  fonts: {
    heading: "'Outfit', 'Segoe UI', system-ui, sans-serif",
    body: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Fira Code', 'Cascadia Code', Consolas, monospace",
  },

  // Contact & Support (Synthetic demo points)
  contact: {
    email: "support@scholarbridge.pk.demo",
    phone: "+92 966 712345 (Demo Desk)",
    address: "Academic Complex, University Road, Dera Ismail Khan, Khyber Pakhtunkhwa, Pakistan",
    helpDeskHours: "Monday – Friday: 9:00 AM – 5:00 PM PKT",
  },

  // Disclaimers & Regulatory Notices
  disclaimers: {
    demoNotice: "DEMO PROTOTYPE ONLY — All scholarship listings, institutions, transactions, and credentials on this portal are synthetic demonstrations for testing and prototyping purposes. Not affiliated with HEC or any government authority.",
    scholarshipNotice: "Sample Data – Not an Official Scholarship",
    documentNotice: "Confidential – Demo Preview Only. Genuine document verification requires trusted institutional procedures and backend infrastructure.",
    paymentNotice: "Demo Payment Simulation – No real monetary transactions take place. This is not a real financial instrument.",
  },

  version: "1.0.0-prototype",
};

export default BRAND;
