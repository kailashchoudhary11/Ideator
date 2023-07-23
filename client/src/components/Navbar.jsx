import { NavLink } from "react-router-dom"
import img from '../assets/images/logo.png'
import '../styles/Navbar.css'
import { useState, useEffect } from "react";
import getAxios from "../utils/getAxios";
import checkAuth from "../utils/checkAuth";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      const isLoggedIn = await checkAuth();
      if (isLoggedIn) {
        setIsAuthenticated(true);
      }
    }
    checkAuthentication();
  }, [location.pathname]);

  async function logoutUser() {
    const axios = getAxios();
    await axios.post("http://localhost:8000/api/logout/");
    setIsAuthenticated(false);
    navigate("/login");
  }

  const handleHamburgerClick = () => {
    const navLink = document.querySelector('.nav__link');
    navLink.classList.toggle('hide');
  };

  return (
    <div>
      <nav className="nav">
        <NavLink to="/" className="logo"><img src={img} alt="" /></NavLink>
        <div className="hamburger" onClick={handleHamburgerClick}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>

        <div className="nav__link hide">
          <NavLink to='/ideas'><button className='ideaBtn'>Explore Ideas</button></NavLink>
          {!isAuthenticated
            ? <>
              <NavLink style={({ isActive }) => isActive ? { "color": "blue" } : {}} to='/login'>Login</NavLink>
              <NavLink style={({ isActive }) => isActive ? { "color": "blue" } : {}} to='/register'>Register</NavLink>
            </>
            : <>
              <NavLink style={({ isActive }) => isActive ? { "color": "blue" } : {}} to='/profile'>Profile</NavLink>
              <button className="nav-item" onClick={logoutUser}>Logout</button>
            </>
          }
        </div>
      </nav>
    </div>
  )
}