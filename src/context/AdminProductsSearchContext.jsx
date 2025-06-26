import { useContext, createContext, useState } from "react";

const AdminProductsSearchContext = createContext();

export function ProductsSearchProvider({ children }) {
    const [ searchValue, setSearchValue ] = useState("");

    function getSearchValue(value) {
        setSearchValue(value);
    }

    return (
        <AdminProductsSearchContext.Provider value={{searchValue, getSearchValue}}>
            {children}
        </AdminProductsSearchContext.Provider>
    )
}

export default AdminProductsSearchContext

export function useAdminProductsSearch() {
    const context = useContext(AdminProductsSearchContext);
    if (context === undefined) {
        throw new Error("useAdminOrdersSearch must be used within an AdminOrdersSearchContext")
    }

    return context;
}
