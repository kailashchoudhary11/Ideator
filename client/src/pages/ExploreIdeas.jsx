import { useEffect, useRef } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import getAxios from "../utils/getAxios";
import getOpenAi from "../utils/getOpenAi";

export async function action({ request }) {

  const formData = await request.formData();
  const theme = formData.get("theme") || "open theme";
  const includeSkills = formData.get("skills") === "on" ? true : false;

  let userSkills = [];
  let content1;
  let content2;


  if (includeSkills) {
    const axios = getAxios();
    const res = await axios.get("http://localhost:8000/api/profile/");
    res.data.skills.map((element) => {
      userSkills.push(element.name);
    });

    content1 = "You will be provided with a list of skills and a theme, and your task is to generate hackathon project ideas based off those skills and theme ";
    content2 = `Dev skills: ${userSkills} & theme: ${theme}`;

  } else {

    content1 = "You will be provided with a theme, and your task is to generate hackathon project ideas related to that theme.";
    content2 = `Theme: ${theme}`;

  }

  const openai = getOpenAi();

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

  console.log(response.data)
  console.log(response.data.choices[0].message.content);
  return response.data.choices[0].message.content;
}

export default function ExploreIdeas() {
  const actionData = useActionData();

  const form = useRef(Form);
  const navigation = useNavigation();

  useEffect(
    function resetFormOnSuccess() {
      if (navigation.state === "idle" && actionData) {
        form.current?.reset();
      }
    },
    [navigation.state, actionData]
  );

  return (
    <div>

      <Form method="post" ref={form}>
        <div>
          <input type="text" name="theme" id="theme" placeholder="Theme" />
          <label htmlFor="skills">Theme</label>
        </div>
        <div>
          <input type="checkbox" name="skills" id="skills" />
          <label htmlFor="skills">Provide Idea based on my skills</label>
        </div>
        <button type="submit">Find Ideas</button>
      </Form>
      {actionData &&
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
      }
    </div>
  );
}
