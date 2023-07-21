import { useLoaderData } from "react-router-dom";
import axios from "../utils/getAxios";

export async function loader() {
  try {
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