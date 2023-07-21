import './Navbar.css'

export default function Navbar() {
  const handleHamburgerClick = () => {
    const navLink = document.querySelector('.nav__link');
    navLink.classList.toggle('hide');
  };
  return (
    <div>
      <nav className="nav">
        <a href="/" className="logo">Ideator</a>
        <div className="hamburger" onClick={handleHamburgerClick}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>

        <div className="nav__link hide">
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">SignIn</a>
          <a href="">Contact</a>
        </div>
      </nav>
    </div>
  )
}