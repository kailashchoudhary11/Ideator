import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import getAxios from "../utils/getAxios";
import Select from "react-select";

export async function action({ request }) {
  const formData = await request.formData();
  const theme = formData.get("theme");
  const includeSkills = formData.get("skills") === "on" ? true : false;

  const axios = getAxios();
  const data = { theme, includeSkills };
  const res = await axios.post("http://localhost:8000/api/ideas/", data);
  console.log(res.data);

  return res.data;
}

export async function loader() {
  try {
    const axios = getAxios();

    const res = await axios.get("http://localhost:8000/api/themes/");
    console.log("All themes", res.data);
    return res.data;

  } catch (error) {
    if (error.response.status === 403) {
      return redirect("/login")
    }
    console.log(error);
  }
  return null;
}

export default function ExploreIdeas() {

  const actionData = useActionData();

  const data = useLoaderData();
  const options = data?.map(theme => ({ value: theme.id, label: theme.name }));

  return (
    <div>
      {
        !actionData
          ? <Form method="post">
            <Select
              options={options}
              name="theme"
            />
            <div>
              <input type="checkbox" name="skills" id="skills" />
              <label htmlFor="skills">Provide Idea based on my skills</label>
            </div>
            <button type="submit">Find Ideas</button>
          </Form>
          : <ul>
              {
                actionData?.map((idea, i) => (<li key={i}>{idea}</li>))
              }
          </ul>
      }
    </div>
  )
}