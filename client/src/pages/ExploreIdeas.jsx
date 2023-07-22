import { Form, redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import getAxios from "../utils/getAxios";
import Select from "react-select";
import { useEffect, useState, useRef } from "react";

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

  const [showSearch, setShowSearch] = useState(true);

  const actionData = useActionData();

  const data = useLoaderData();
  const options = data?.map(theme => ({ value: theme.id, label: theme.name }));

  const form = useRef(Form)
  const navigation = useNavigation()

  useEffect(function resetFormOnSuccess() {
    if (navigation.state === "idle" && actionData) {
      setShowSearch(false);
      form.current?.reset()
    }
  }, [navigation.state, actionData])

  return (
    <div>
      {
        showSearch
          ? <Form method="post" ref={form}>
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
          : <div>
            <button onClick={() => {setShowSearch(true)}}>Search Again</button>
            <ul>
              {
                actionData?.map((idea, i) => (<li key={i}>{idea}</li>))
              }
            </ul>
          </div>
      }
    </div>
  )
}