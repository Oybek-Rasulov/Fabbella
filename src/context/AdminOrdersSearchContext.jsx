import { useContext, createContext, useState } from "react";

const AdminOrdersSearchContext = createContext();

export function OrdersSearchProvider({ children }) {
    const [ searchValue, setSearchValue ] = useState("");

    function getSearchValue(value) {
        setSearchValue(value);
    }

    return (
        <AdminOrdersSearchContext.Provider value={{searchValue, getSearchValue}}>
            {children}
        </AdminOrdersSearchContext.Provider>
    )
}

export default AdminOrdersSearchContext

export function useAdminOrdersSearch() {
    const context = useContext(AdminOrdersSearchContext);
    if (context === undefined) {
        throw new Error("useAdminOrdersSearch must be used within an AdminOrdersSearchContext")
    }

    return context;
}
