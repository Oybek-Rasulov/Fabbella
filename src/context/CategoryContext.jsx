import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CategoryContext = createContext();

export function CategoryProvider({children}) {
    const [ category, setCategory] = useState("");

    function getCategory(category) {
        setCategory(category)
    }

    return (
        <CategoryContext.Provider value={{getCategory, category}}>
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategory() {
    const context = useContext(CategoryContext)
    if(context === undefined) {
        throw new Error("CategoryContext must be used within a CategoryProvider")
    }

    return context
}

CategoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
}