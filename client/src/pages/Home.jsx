import '../styles/Home.css'
import img from '../assets/images/eclipse.png'
import {Link} from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <div className="d1">
          <h1 className="heading">Let&apos;s build something <span>UNIQUE</span></h1>
          <p className="para">We will provide you with the most feasibly solution oriented and unique ideas for your hackathon contests. </p>
          <Link to='/ideas'><button className='btn'>Explore Ideas</button></Link>
      </div>
      <div className="d2">
        <img src={img} alt="eclipse" />
      </div>
    </div>
  )
}