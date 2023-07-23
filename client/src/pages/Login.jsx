import { Form, Link, redirect, useActionData, useNavigation } from "react-router-dom";
import '../styles/Login.css'
import getAxios from "../utils/getAxios";


export async function action({ request }) {
  const formData = await request.formData();
  const axios = getAxios()
  
  try {
    const res = await axios.post(
      "http://localhost:8000/api/login/",
      formData,
    );
    console.log(res.data);
    return redirect("/profile");
  } catch (error) {
    return error.response.data;
  }
}

export default function Login() {
  const navigation = useNavigation();
  const actionData = useActionData();

  return (    
    <Form method="post" className="form">
      <div className="formContent">
        <div style={{ margin: "20px" }}>
          <input
              defaultValue={actionData?.values?.username}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
          />
        </div>

        <div style={{ margin: "20px" }}>
          <input
            defaultValue={actionData?.values?.password}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <div id="error">
            {actionData?.error}
          </div>
        </div>
        <div id="btn">
          <button disabled={navigation.state === "submitting" || navigation.state === "loading"} id="loginbtn" type="submit">
              {navigation.state === "submitting" || navigation.state === "loading" ? "Logging In..." : "Log In"}
          </button>
          <Link to='/register'><button id="registerbtn" type="submit">Register</button></Link>
        </div>
      </div>
    </Form> 
  );
}
