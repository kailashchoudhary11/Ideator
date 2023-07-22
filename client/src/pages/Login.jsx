import { Form, useActionData } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import './Login.css'

export async function action({ request }) {
  const formData = await request.formData();

  const csrftoken = Cookies.get('csrftoken');
  axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
  axios.defaults.withCredentials = true;
  
  try {
    const res = await axios.post(
      "http://localhost:8000/api/login/",
      formData,
    );
    console.log(res.data)
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export default function Login() {
  const actionData = useActionData();
  return (
    <div  className="form">
      <Form method="post">
        <div style={{ margin: "20px" }}>
          <label htmlFor="username">
            Username
            <input
              defaultValue={actionData?.values?.username}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
          </label>
        </div>

        <div style={{ margin: "20px" }}>
          <label htmlFor="password">
            Password
            <input
              defaultValue={actionData?.values?.password}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.error}
          </div>
        </div>
        <div className="btn">
          <button type="submit">
            Log In
          </button>
        </div>
      </Form>
    </div>
  );
}
