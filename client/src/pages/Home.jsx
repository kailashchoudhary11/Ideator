import axios from "axios";
import Cookies from 'js-cookie';

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
    <div>
      
    </div>
  )
}