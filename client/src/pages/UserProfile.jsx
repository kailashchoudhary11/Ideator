import { useEffect, useRef } from "react";
import { Form, redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import getAxios from "../utils/getAxios";

export async function action({ request }) {
  const formData = await request.formData();
  const skills = formData.getAll('skills');

  const axios = getAxios();

  const res = await axios.post("http://localhost:8000/api/profile/", { skills })

  return res.data;
}

export async function loader() {
  try {
    const axios = getAxios();

    const res = await axios.get("http://localhost:8000/api/profile/");
    const userSkills = res.data.skills;
    const userData = res.data;
    console.log("user skills", userSkills);

    const allSkillsRes = await axios.get("http://localhost:8000/api/skills/");
    console.log("All skills", allSkillsRes.data);
    const allSkills = allSkillsRes.data;

    return { userSkills, allSkills, userData }

  } catch (error) {
    if (error.response.status === 403) {
      return redirect("/login")
    }
    console.log(error);
  }
  return null;
}

export default function UserProfile() {
  const [allowEdit, setAllowEdit] = useState(false)

  const { userSkills, allSkills, userData } = useLoaderData()

  const options = allSkills.map(skill => ({ value: skill.id, label: skill.name }));
  const defaultOptions = userSkills.map(skill => ({ value: skill.id, label: skill.name }));

  const actionData = useActionData();

  const form = useRef(Form)
  const navigation = useNavigation()

  useEffect(function resetFormOnSuccess() {
    if (navigation.state === "idle" && actionData?.success) {
      setAllowEdit(false);
    }
  }, [navigation.state, actionData])


  return (
    <div>
      <h1>Profile</h1>
      <ul>
        <li>Name: {userData?.first_name} {userData?.last_name}</li>
        <li>Username: {userData?.username}</li>
        <li>Email: {userData?.email}</li>
        {
          !allowEdit
            ? <li>
              Skills: {userSkills?.map((skill, i) => (<span key={i}>{skill.name}</span>))}
              <button onClick={() => { setAllowEdit(true) }}>
                {userSkills.length == 0 ? "Add" : "Edit"}
              </button>
            </li>
            : <li>
              <Form method="post" ref={form}>
                <Select
                  defaultValue={defaultOptions}
                  options={options}
                  isMulti
                  name="skills"
                />
                <button disabled={navigation.state === "submitting" || navigation.state === "loading"} type="submit">{(navigation.state === "submitting" || navigation.state === "loading") ? "Updating.." : "Update"}</button>
              </Form>
            </li>
        }
      </ul>
    </div>
  )
}