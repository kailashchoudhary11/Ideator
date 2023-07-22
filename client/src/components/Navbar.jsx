import { Link } from "react-router-dom"
import img from './Ideator_2-modified.png'
import './Navbar.css'
export default function Navbar() {
  const handleHamburgerClick = () => {
    const navLink = document.querySelector('.navmentnk');
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
          <Link to='/profile'>Profile</Link>
          <Link to='/'><button className='ideaBtn'>Generate Idea</button></Link>
        </div>
      </nav>
    </div>
  )
}