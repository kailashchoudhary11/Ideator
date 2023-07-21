import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Cookies from "js-cookie";
export async function loader() {
  try {
    const csrftoken = Cookies.get('csrftoken');

    // Set the CSRF token and withCredentials in the default headers for Axios
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
  const data = useLoaderData()
  return (
    <div>
      <h1>Home Page</h1>
      <h4>Endpoints are:</h4>
      <ul>
        {
          data?.map((endpoint, i) => (
            <li key={i}>{endpoint}</li>
          ))
        }
      </ul>
    </div>
  )
}