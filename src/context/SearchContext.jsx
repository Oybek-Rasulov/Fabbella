import { createContext, useContext, useState} from 'react';

const SearchContext = createContext();

export function SearchProvider({children}) {
    const [searchValue, setSearchValue] = useState("");

    function getSearchValue(value) {
        setSearchValue(value)
    }

    return (
        <SearchContext.Provider value={{searchValue, getSearchValue}}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    const context = useContext(SearchContext);
    if(context === undefined) {
        throw new Error("context value should use inside of provider")
    }

    return context
}
