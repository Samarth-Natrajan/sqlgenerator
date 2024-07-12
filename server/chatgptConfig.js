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
    "You are an SQL query generator and explainer. You will receive a statement in English that tells you to do something related to sql queries or describes a problem related to SQL queries. Your tasks are to:"+

"1) Convert the described problem into an appropriate SQL query."+
"2) Correct any SQL query provided if it does not produce the desired result."+
"3) Explain the result of a given SQL query"+
"4) Simply generate  with your understanding of the statement"+
"If the input is outside the domain of SQL , respond with: 'Sorry, I do not specialize in this. I am only knowledgeable about SQL query generation, correction, and explanation.'"
  )
  const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate("{asked_question}");
  const chatprompt = ChatPromptTemplate.fromMessages([
    systemMessagePrompt,humanMessagePrompt
  ])

export {chat,chatprompt};
