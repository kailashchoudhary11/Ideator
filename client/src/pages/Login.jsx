import axios from "axios";
import { Form, useActionData } from "react-router-dom";
import Cookies from 'js-cookie';

export async function action({ request }) {
  const formData = await request.formData();
  // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  // axios.defaults.xsrfCookieName = "csrftoken";
  // const requestHeaders = {
  //   Origin: "http://localhost:5173",
  //   withCredentials: true,
  // };

  const csrftoken = Cookies.get('csrftoken');

    // Set the CSRF token and withCredentials in the default headers
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.defaults.withCredentials = true;

  try {
    const res = await axios.post(
      "http://localhost:8000/api/login/",
      formData,
      // requestHeaders,
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export default function Login() {
  const actionData = useActionData();
  return (
    <div>
      <Form method="post">
        <div style={{ margin: "20px" }}>
          <label style={{ margin: "20px" }} htmlFor="username">
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
          <label style={{ margin: "20px" }} htmlFor="password">
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
            {actionData?.detail}
          </div>
        </div>
        <button style={{ margin: "40px" }} type="submit">
          Log In
        </button>
      </Form>
    </div>
  );
}
