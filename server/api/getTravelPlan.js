import { readBody, createError, sendError } from "h3";

export default async function (event) {
  // Use `readBody` to get the request body in Nuxt 3
  const body = await readBody(event);

  if (!body || !body.place || !body.days) {
    // Use `createError` and `sendError` for error handling in Nuxt 3
    return sendError(
      event,
      createError({ statusCode: 400, message: "Missing required fields" })
    );
  }

  const { place, days } = body;

  const messages = [
    { role: "system", content: "You are a travel assistant." },
    {
      role: "user",
      content: `Create a travel itinerary for ${days} day(s) in ${place}. Provide three suggestions strictly for each day: one in the morning, one in the afternoon, and one in the evening.`,
    },
  ];

  try {
    const response = await $fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: {
          model: "gpt-3.5-turbo",
          messages,
          max_tokens: 1200,
          temperature: 0.7,
        },
      }
    );

    let plan = response.choices[0].message.content
      .trim()
      .split("\n")
      .filter((line) => line)
      .map((line) => line.replace(/^- |^\d+\.\s/g, ""));

    console.log(plan);
    console.log(
      "-------------------------------------------------------------------"
    );

    let newArray = [];
    plan.forEach((item) => {
      // Check for each time of day and split accordingly
      if (item.includes("Morning:")) {
        const index = item.indexOf("Morning:") + "Morning:".length;
        newArray.push("Morning");
        newArray.push(item.substring(index).trim());
      } else if (item.includes("Afternoon:")) {
        const index = item.indexOf("Afternoon:") + "Afternoon:".length;
        newArray.push("Afternoon");
        newArray.push(item.substring(index).trim());
      } else if (item.includes("Evening:")) {
        const index = item.indexOf("Evening:") + "Evening:".length;
        newArray.push("Evening");
        newArray.push(item.substring(index).trim());
      } else if (item.includes("Morning - ")) {
        const index = item.indexOf("Morning - ") + "Morning - ".length;
        newArray.push("Morning");
        newArray.push(item.substring(index).trim());
      } else if (item.includes("Afternoon - ")) {
        const index = item.indexOf("Afternoon - ") + "Afternoon - ".length;
        newArray.push("Afternoon");
        newArray.push(item.substring(index).trim());
      } else if (item.includes("Evening - ")) {
        const index = item.indexOf("Evening - ") + "Evening - ".length;
        newArray.push("Evening");
        newArray.push(item.substring(index).trim());
      } else {
        // For entries without time of day labels, just append them as is
        newArray.push(item);
      }
    });
    plan = newArray;

    if (days == 1 && (plan.length === 8 || plan.length === 11)) {
      plan.pop(); // Removing last unnecessary item
    }

    console.log(plan);
    return {
      plan,
    };
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    // Use `sendError` for error handling
    return sendError(
      event,
      createError({
        statusCode: 500,
        message: "Failed to generate travel plan",
      })
    );
  }
}
