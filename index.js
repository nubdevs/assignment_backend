const express = require("express");
const connectDB = require("./config/dbConnect");
const cors = require("cors");
const dotenv = require("dotenv")
const nsRouter = require("./routes/nsRoute");
const crRouter = require("./routes/callRoute")
const { Configuration, OpenAIApi } = require('openai');


dotenv.config();

const app = express();
app.use(
  express.json({
    limit: "2mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cors());
app.use(express.json())
//------------------------conect db --------------------------------
const client = connectDB();
//-------------------openai config--------------------
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// console.log(client, "ok");
//-------------------------------------end Points-----------------------
app.use("/ns", nsRouter);
app.use("/cr",crRouter);

//------------------------open ai-----------------------------
app.post('/openai', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt)

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,

      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 2047, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      // top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    // console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})


app.post("/imagine",async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt)


    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    // console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

// ---------------------------------------------------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});

