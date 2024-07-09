import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generate from "./generate.js";
dotenv.config();
const app = express();
app.use(express.json()); 

const allowedOrigin = process.env.ACCESS_ORIGIN;


app.use(cors({ // restricted access to api calls
  origin: function (origin, callback) {
    if (origin && origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS, ${origin,allowedOrigin}`));
    }
  }
}));

const port = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.post("/generate", async (req, res) => {
  const { queryDescription } = req.body
  try {
    const sqlQuery = await generate(queryDescription);
    res.json({ sqlQuery });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});