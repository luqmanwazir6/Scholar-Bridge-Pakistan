import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import scholarshipService from "../services/scholarshipService";
import applicationService from "../services/applicationService";
import documentService from "../services/documentService";
import paymentService from "../services/paymentService";
import notificationService from "../services/notificationService";
import auditService from "../services/auditService";
import { resetAllDemoData, initDemoData } from "../services/storageHelper";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { showSuccess, showInfo } = useToast();

  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const reloadAll = useCallback(async () => {
    try {
      initDemoData();
      const [sList, aList, dList, pList, nList, logList] = await Promise.all([
        scholarshipService.getAll(),
        applicationService.getAll(),
        documentService.getAll(),
        paymentService.getAll(),
        notificationService.getAll(),
        auditService.getLogs(),
      ]);

      setScholarships(sList);
      setApplications(aList);
      setDocuments(dList);
      setPayments(pList);
      setNotifications(nList);
      setAuditLogs(logList);

      if (currentUser?.id) {
        const saved = await scholarshipService.getSavedIds(currentUser.id);
        setSavedIds(saved);
      }
    } catch (err) {
      console.error("Failed to load platform data:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    reloadAll();

    const handleReset = () => {
      reloadAll();
    };
    window.addEventListener("sbp_data_reset", handleReset);
    return () => window.removeEventListener("sbp_data_reset", handleReset);
  }, [reloadAll]);

  const toggleSaveScholarship = async (scholarshipId) => {
    if (!currentUser) return;
    const updated = await scholarshipService.toggleSave(currentUser.id, scholarshipId);
    setSavedIds(updated);
    if (updated.includes(scholarshipId)) {
      showInfo("Scholarship saved to your bookmarks.");
    } else {
      showInfo("Scholarship removed from bookmarks.");
    }
  };

  const handleResetData = () => {
    resetAllDemoData();
    showSuccess("All demo data has been restored to default seed state.");
  };

  return (
    <DataContext.Provider
      value={{
        scholarships,
        applications,
        documents,
        payments,
        notifications,
        auditLogs,
        savedIds,
        loading,
        reloadAll,
        toggleSaveScholarship,
        resetDemoData: handleResetData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default DataContext;
