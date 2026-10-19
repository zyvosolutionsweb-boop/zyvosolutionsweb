import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AdminLogin } from "./AdminLogin";
import { AdminLayout } from "./AdminLayout";
import { AdminInquiries } from "./AdminInquiries";
import { AdminCms } from "./AdminCms";
import { AdminServices } from "./AdminServices";
import { AdminPortfolio } from "./AdminPortfolio";
import { AdminSettings } from "./AdminSettings";
import { AdminSqlHelper } from "./AdminSqlHelper";

export default function AdminPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("zyvo_admin_auth") === "true";
  });

  const activeTab = searchParams.get("tab") || "inquiries";

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("zyvo_admin_auth");
    sessionStorage.removeItem("zyvo_admin_user");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onLogout={handleLogout}
    >
      {activeTab === "inquiries" && <AdminInquiries />}
      {activeTab === "cms" && <AdminCms />}
      {activeTab === "services" && <AdminServices />}
      {activeTab === "portfolio" && <AdminPortfolio />}
      {activeTab === "settings" && <AdminSettings />}
      {activeTab === "sql" && <AdminSqlHelper />}
    </AdminLayout>
  );
}
