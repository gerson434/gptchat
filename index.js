const express = require("express");
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 3000;

const configuration = new Configuration({
  apiKey: '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',
  username: 'gers0nl4r6o2001@gmail.com',
  password: 'Zk9c6b12',
  organization: "org-jmdUuZKZUv1JnLm4P2Vjgri6"
});

const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "como te llamas?",
    temperature: 0.7,
    max_tokens: 60,
    n: 1,
  });

  const chatResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "hola quien eres?" }],
  });

  const indexHtml = fs.readFileSync("index.html", "utf8");
  const htmlResponse = `
    <h1>Respuestas de OpenAI</h1>
    <p>Respuesta de texto-davinci-003: ${response.data.choices[0].text}</p>
    <p>Respuesta de gpt-3.5-turbo: ${chatResponse.data.choices[0].text}</p>
  `;
  res.send(indexHtml.replace("{{RESPUESTA}}", htmlResponse));
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});


  //gpt chat tutbo 
  /**
   *  try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: "hola quien eres?"}],
      });
   */
  