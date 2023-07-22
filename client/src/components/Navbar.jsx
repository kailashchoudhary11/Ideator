import { Link } from "react-router-dom"
import img from '../assets/images/logo.png'
import '../styles/Navbar.css'
export default function Navbar() {
  const handleHamburgerClick = () => {
    const navLink = document.querySelector('.nav__link');
    navLink.classList.toggle('hide');
  };
  return (
    <div>
      <nav className="nav">
        <Link to="/" className="logo"><img src={img} alt="" /></Link>
        <div className="hamburger" onClick={handleHamburgerClick}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>

        <div className="nav__link hide">
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          <Link to='/'><button className='ideaBtn'>Generate Idea</button></Link>
        </div>
      </nav>
    </div>
  )
}