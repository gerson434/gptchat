const express = require("express");
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 3000;

const configuration = new Configuration({
  apiKey: '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',
  
});

const openai = new OpenAIApi(configuration);



app.get("/", async (req, res) => {
  const valor = req.query.valor;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "como te llamas?",
    temperature: 0.7,
    max_tokens: 60,
    n: 1,
    
  });

  const chatResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: valor }],
  });


  const indexHtml = fs.readFileSync("index.html", "utf8",{})
  

  const htmlResponse = `
    <h1>Respuestas de OpenAI</h1>
    <p>Respuesta de texto-davinci-003: ${response.data.choices[0].text}</p>
    <p>Respuesta de gpt-3.5-turbo: ${JSON.stringify(chatResponse.data.choices[0].message.content)}</p>
    `;
  res.send(indexHtml+htmlResponse );
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
  