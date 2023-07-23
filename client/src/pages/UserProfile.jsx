import { useEffect, useRef } from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import getAxios from "../utils/getAxios";
import "../styles/UserProfile.css";
import userProfile from "../assets/images/profile.png";
import { FaEdit } from 'react-icons/fa';

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

    return { userSkills, allSkills, userData };
  } catch (error) {
    if (error.response.status === 403) {
      return redirect("/login");
    }
    console.log(error);
  }
  return null;
}

export default function UserProfile() {
  const [allowEdit, setAllowEdit] = useState(false);

  const { userSkills, allSkills, userData } = useLoaderData();

  const options = allSkills.map((skill) => ({
    value: skill.id,
    label: skill.name,
  }));
  const defaultOptions = userSkills.map((skill) => ({
    value: skill.id,
    label: skill.name,
  }));

  const actionData = useActionData();

  const form = useRef(Form);
  const navigation = useNavigation();

  useEffect(
    function resetFormOnSuccess() {
      if (navigation.state === "idle" && actionData?.success) {
        setAllowEdit(false);
      }
    },
    [navigation.state, actionData]
  );

  return (
    <div className="profileContainer">
      <div className="profileImg">
        <img className="profile" src={userProfile} alt="userProfile" />
      </div>
      <div className="userDetails">
        <div className="profileText">
          <h1>Profile</h1>
        </div>
        <div className="details">
          <ul className="userData">
            <li>
              <span className="leftDataItem">Name:</span>{" "}
              <span className="dataItem">
                {userData?.first_name} {userData?.last_name}
              </span>
            </li>
            <li>
              <span className="leftDataItem">Username:</span> <span className="dataItem">{userData?.username}</span>
            </li>
            <li>
            <span className="leftDataItem">Email:</span><span className="dataItem">{userData?.email}</span>
            </li>
            {!allowEdit ? (
              <li className="skills">
                <span className="leftDataItem">Skills:</span>{" "}
                {userSkills?.map((skill, i) => (
                  <span className="skill" key={i}>
                    {skill.name}
                  </span>
                ))}
                <button
                  onClick={() => {
                    setAllowEdit(true);
                  }}
                >
                  <FaEdit/>
                </button>
              </li>
            ) : (
              <li className="formList">
                Skills:
                <Form className="skillForm" method="post" ref={form}>
                  <Select
                    defaultValue={defaultOptions}
                    options={options}
                    isMulti
                    name="skills"
                  />
                  <button className="updateBtn"
                    disabled={
                      navigation.state === "submitting" ||
                      navigation.state === "loading"
                    }
                    type="submit"
                  >
                    {navigation.state === "submitting" ||
                    navigation.state === "loading"
                      ? "Updating.."
                      : "Update"}
                  </button>
                </Form>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
