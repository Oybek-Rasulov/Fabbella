import AdminNavigation from "./AdminNavigation";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function AdminLayout() {
    return (
        <>
            <Toaster position="top-right" />
            <div className="admin-layout">
                <AdminNavigation/>
                <main className="admin-main">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default AdminLayout
