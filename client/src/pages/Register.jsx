import axios from "axios";
import { Form, useActionData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  try {
    const res = await axios.post(
      "http://localhost:8000/api/register/",
      formData,
    );

    console.log(res.data);

    if (res.data?.errors) {
      const { errors } = res.data;
      const values = Object.fromEntries(formData);
      return { errors, values };
    }
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export default function Register() {
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
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.username}
          </div>
        </div>
        <div style={{ margin: "20px" }}>
          <label style={{ margin: "20px" }} htmlFor="first_name">
            First Name
            <input
              defaultValue={actionData?.values?.first_name}
              type="text"
              name="first_name"
              id="first_name"
              placeholder="First Name"
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.first_name}
          </div>
        </div>
        <div style={{ margin: "20px" }}>
          <label style={{ margin: "20px" }} htmlFor="last_name">
            Last Name
            <input
              defaultValue={actionData?.values?.last_name}
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Last Name"
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.last_name}
          </div>
        </div>
        <div style={{ margin: "20px" }}>
          <label style={{ margin: "20px" }} htmlFor="email">
            Email
            <input
              defaultValue={actionData?.values?.email}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.email}
          </div>
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
            {actionData?.errors?.password}
          </div>
        </div>
        <div style={{ margin: "20px" }}>
          <label style={{ margin: "20px" }} htmlFor="password2">
            Confirm Password
            <input
              defaultValue={actionData?.values?.password2}
              type="password"
              name="password2"
              id="password2"
              placeholder="Confirm Password"
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.password2}
          </div>
        </div>
        <button style={{ margin: "40px" }} type="submit">
          Register
        </button>
      </Form>
    </div>
  );
}
