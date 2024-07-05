import { Configuration, OpenAIApi } from "openai";
import {ChatPromptTemplate,SystemMessagePromptTemplate,HumanMessagePromptTemplate} from "@langchain/core/prompts"
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
dotenv.config();

// const openaiApiKey = process.env.OPENAI_API_KEY;

// if (!openaiApiKey) {
//   console.error('OPENAI_API_KEY is not set.');
//   process.exit(1);
// }

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
  const chat = new ChatOpenAI({
    openAIApiKey:process.env.OPENAI_API_KEY,
    modelName:"gpt-3.5-turbo"
  })
  const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
    "You are an sql query generator and explainer. You will get a human generated statement in text form which will be in english describing a problem related to sql queries.Your task is to convert the problem in english language or situation into an sql query.You might also be required to correct a query given by user if it is not correct according to the desired result.You might also need to explain the result of a query.If the input to you is out of this domain you should say 'Sorry I do not speciallize in this.I am only aware about sql query generation & correction .'"
  )
  const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate("{asked_question}");
  const chatprompt = ChatPromptTemplate.fromMessages([
    systemMessagePrompt,humanMessagePrompt
  ])

export {chat,chatprompt};
