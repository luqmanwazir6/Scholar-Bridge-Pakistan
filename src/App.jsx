import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import ScrollToTop from "./components/common/ScrollToTop";
import CookieNotice from "./components/common/CookieNotice";
import AppRoutes from "./routes/AppRoutes";

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <ScrollToTop />
            <AppRoutes />
            <CookieNotice />
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
