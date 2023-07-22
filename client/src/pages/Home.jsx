import axios from "axios";
import Cookies from 'js-cookie';
import './Home.css'
import img from './18.png'
import {Link} from 'react-router-dom'

export async function loader() {
  try {
    const csrftoken = Cookies.get('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.defaults.withCredentials = true;
    const res = await axios.get("http://localhost:8000/api/")
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;

}

export default function Home() {
  return (
    <div className="home">
      <div className="d1">
          <h1 className="heading">Let&apos;s build something <span>UNIQUE</span></h1>
          <p className="para">We will provide you with the most feasibly solution oriented and unique ideas for your hackathon contests. </p>
          <Link to='/ideas'><button className='btn'>Explore Ideas</button></Link>
      </div>
      <div className="d2">
        <img src={img} alt="" />
      </div>
    </div>
  )
}