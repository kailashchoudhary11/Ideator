import { useEffect, useRef } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import getAxios from "../utils/getAxios";
import getOpenAi from "../utils/getOpenAi";
import "../styles/ExploreIdeas.css";

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

    content1 =
      "You will be provided with a list of skills and a theme, and your task is to generate hackathon project ideas based off those skills and theme ";
    content2 = `Dev skills: ${userSkills} & theme: ${theme}`;
  } else {
    content1 =
      "You will be provided with a theme, and your task is to generate hackathon project ideas related to that theme.";
    content2 = `Theme: ${theme}`;
  }

  // const openai = getOpenAi();

  //   const response = await openai.createChatCompletion({
  //     model: "gpt-3.5-turbo",
  //     messages: [
  //       {
  //         role: "system",
  //         content: content1,
  //       },
  //       {
  //         role: "user",
  //         content: content2,
  //       },
  //     ],
  //     temperature: 0.8,
  //     max_tokens: 256,
  //     top_p: 1,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  //   });

  //   console.log(response.data)
  //   console.log(response.data.choices[0].message.content);
  //   return response.data.choices[0].message.content;
  // }

  return `1. Smart Gardener: Develop a machine learning-based system that analyzes environmental factors such as soil moisture, temperature, and sunlight to provide personalized recommendations for optimal plant care.

2. AI Fashion Stylist: Create a machine learning model that can analyze fashion trends, individual preferences, and body types to suggest personalized outfit combinations and styling advice.

3. HealthBot: Build a chatbot powered by machine learning algorithms that can provide personalized health recommendations based on user input, medical history, and lifestyle data.

4. Music Mood Analyzer: Develop a machine learning model that can analyze music tracks and classify them based on the emotions they evoke, allowing users to create personalized playlists for different moods.
`;
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
    <Form method="post" ref={form} className="projectIdeaForm">
      <div className="titleHeading">
        <h1>Project Ideas!</h1>
      </div>
      <div className="tagline">
        <h3>
          Enter an optional theme and generate Hackathon project ideas based off
          of your skills!
        </h3>
      </div>
      <div className="theme">
        <div>
          <input type="checkbox" name="skills" id="skills" />
          <label htmlFor="skills">Want to tailor ideas to your skills?</label>
        </div>
        <div>
          <input type="text" name="theme" id="theme" placeholder="Enter Theme" />
        </div>
        <div>
          <button type="submit" className="ideaSubmitBtn">Find Ideas</button>
        </div>
      </div>
      <div>
        {actionData && (
          <div className="cardContainer">
            <h1>Here are some hackathon project ideas just for you!</h1>
            <ul>
              {actionData
                .split(/[0-9]+\./g)
                .filter(Boolean)
                .map((idea, i) => (
                  <div key={i}>
                    <li>{idea}</li>
                  </div>
                ))}
            </ul>
          </div>
        )}
      </div>
    </Form>
  );
}
