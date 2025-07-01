import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import assets from "../../services/assets"
import { logout } from "./AdminAuth/AdminLogOut";
import { useNavigate } from "react-router-dom";

function AdminNavigation() {
    const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err.message);
    }
  }

    return (
        <div className="admin-navbar">
           <div className="mb2">
                <img src={assets.logo} alt="logo" className="logo" />
            </div>
            <ul>
                <li><NavLink to="/adminboard/main"> <HomeIcon /> Bosh</NavLink></li>
                <li><NavLink to="/adminboard/orders"> <LocalMallIcon /> Buyurtmalar</NavLink></li>
                <li><NavLink to="/adminboard/products"> <CheckroomIcon /> Mahsulotlar</NavLink></li>
                <li><NavLink to="/adminboard/add"> <AddBoxIcon /> Mahsulot qo'shish</NavLink></li>
                <li><button onClick={() => handleLogout()} > <LogoutIcon /> Chiqish</button></li>
            </ul> 
        </div>
    )
}

export default AdminNavigation;
