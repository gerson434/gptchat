const express = require('express');

const app = express();
const port = 3002;
const openai = new OpenAIApi(apiKey);

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>OpenAI Query</title>
  </head>
  <body>
    <form id="query-form">
      <label for="prompt">Query:</label>
      <input type="text" id="prompt" name="prompt" placeholder="Type your query here">
      <button type="submit">Submit</button>
    </form>
    <div id="answer"></div>
    <script>
      const form = document.getElementById('query-form');
      const answerDiv = document.getElementById('answer');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const prompt = formData.get('prompt');
        const response = await fetch('/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt })
        });
        const answer = await response.text();
        answerDiv.innerHTML = answer;
      });
    </script>
  </body>
  </html>
  `);
});

app.post('/ask', async (req, res) => {
 
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
