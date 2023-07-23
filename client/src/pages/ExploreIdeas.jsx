import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import getAxios from "../utils/getAxios";
import Select from "react-select";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function action({ request }) {
  const formData = await request.formData();
  const theme = formData.get("theme");
  const includeSkills = formData.get("skills") === "on" ? true : false;

  // gets users skills
  const axios = getAxios();
  const res1 = await axios.get("http://localhost:8000/api/profile/");
  const userSkills = res1.data.skills;

  // formatting data
  let themesList = ["WEB3", "Cyber Security", "IOT", "Machine Learning", "VR"];
  let content1;
  let content2;

  let usersSkillsList = [];
  userSkills.map((element) => {
    usersSkillsList.push(element.name);
  });

  if (includeSkills) {
    content1 =
      "You will be provided with a list of skills and themes, and your task is to generate hackathon project ideas based off of this. ";
    content2 = `Dev skills: ${usersSkillsList} & theme: ${
      themesList[theme - 1]
    }`;
  } else {
    content1 =
      "You will be provided with a theme, and your task is to generate hackathon project ideas related to that theme.";
    content2 = `Dev skills: ${usersSkillsList} & theme: ${
      themesList[theme - 1]
    }`;
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: content1,
      },
      {
        role: "user",
        content: content2,
      },
    ],
    temperature: 0.8,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response.data.choices[0].message.content);

  return response.data.choices[0].message.content;
}

export async function loader() {
  try {
    const axios = getAxios();

    const res = await axios.get("http://localhost:8000/api/themes/");
    console.log("All themes", res.data);
    return res.data;
  } catch (error) {
    if (error.response.status === 403) {
      return redirect("/login");
    }
    console.log(error);
  }
  return null;
}

export default function ExploreIdeas() {
  const actionData = useActionData();

  const data = useLoaderData();
  const options = data?.map((theme) => ({
    value: theme.id,
    label: theme.name,
  }));

  return (
    <div>
      {!actionData ? (
        <Form method="post">
          <Select options={options} name="theme" />
          <div>
            <input type="checkbox" name="skills" id="skills" />
            <label htmlFor="skills">Provide Idea based on my skills</label>
          </div>
          <button type="submit">Find Ideas</button>
        </Form>
      ) : (
        <div>
          <br />
          <h1>Here are some hackathon project ideas just for you!</h1>
          <br />
          <br />
          <ul>
            {actionData
              .split(/[0-9]+\./g)
              .filter(Boolean)
              .map((idea, i) => (
                <div key={i}>
                  <li>{idea}</li>
                  <br />
                </div>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
