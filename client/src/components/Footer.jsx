import './Footer.css'
import {BsGithub} from 'react-icons/bs'
export default function Footer() {
  const getCurrentYear=()=>{
    return new Date().getFullYear();
  }
  return (
    <footer className="footer">
      <div className='footer-content'>
        <BsGithub className='icon'/>
        <p>{getCurrentYear()} | ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  )
}