import { assets } from "../../Products/Products";
import { useAdminOrdersSearch } from "../../../context/AdminOrdersSearchContext";

function AdminOrdersSearch() {
    const { searchValue, getSearchValue } = useAdminOrdersSearch();

    function handleSetSearch(search) {
        getSearchValue(search)
    }     

    return (
        <div className='nav-main'>
            <div></div>
            <form >
                <div className="nav-content">
                    <input type="search" className="nav-search" name='search' value={searchValue} onChange={(e) => handleSetSearch(e.target.value)} placeholder="Mahsulot nomini kiriting..." />
                    <button type="submit" className="btn nav-btn" disabled={true}><img src={assets.search} alt="search icon" /></button>
                </div>
            </form>
        </div>
    )
}

export default AdminOrdersSearch
