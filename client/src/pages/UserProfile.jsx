import { useEffect, useRef } from "react";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import Select from "react-select";
import { useState } from "react";

export async function action({request}) {
  const formData = await request.formData();
  const skills = formData.getAll('skills');

  const csrftoken = Cookies.get('csrftoken');
  axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
  axios.defaults.withCredentials = true;

  const res = await axios.post("http://localhost:8000/api/profile/", {skills})
  
  return res.data;
}

export async function loader() {
    try {
    const csrftoken = Cookies.get('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.defaults.withCredentials = true;

    const res = await axios.get("http://localhost:8000/api/profile/");
    const userSkills = res.data.skills;
    console.log("user skills", userSkills);

    const allSkillsRes = await axios.get("http://localhost:8000/api/skills/");
    console.log("All skills", allSkillsRes.data);
    const allSkills = allSkillsRes.data;

    return { userSkills, allSkills }

  } catch (error) {
    console.log(error);
  }
  return null;
}

export default function UserProfile() {
  const [allowEdit, setAllowEdit] = useState(false)

  const data = useLoaderData()
  const { userSkills, allSkills } = useLoaderData()

  const options = allSkills.map(skill => ({value: skill.id, label: skill.name}));
  const defaultOptions = userSkills.map(skill => ({value: skill.id, label: skill.name}));

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
        <li>Name: {data?.first_name} {data?.last_name}</li>
        <li>Username: {data?.username}</li>
        <li>Email: {data?.email}</li>
        {
          !allowEdit
            ? <li>
                Skills: {userSkills?.map((skill, i) => (<span key={i}>{skill.name}</span>))} 
                <button onClick={() => {setAllowEdit(true)}}>
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
                <button type="submit">{userSkills.length == 0 ? "Add" : "Update"}</button>
              </Form>
            </li>
        }
      </ul>
    </div>
  )
}