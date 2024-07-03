
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
dotenv.config();
import {ChatPromptTemplate,SystemMessagePromptTemplate,HumanMessagePromptTemplate} from "@langchain/core/prompts"
const generate = async (queryDescription) => {

  // const daVinci = async (queryDescription) => {
  //   const response = await openaiClient.createCompletion({
  //     model: 'text-davinci-003',
  //     prompt: `Convert the following natural language description into a SQL query:\n\n${queryDescription}`,
  //     max_tokens: 100,
  //     temperature: 0,
  //   });
  //   return response.data.choices[0].text;
  // };

  // const chatGPT = async (queryDescription) => {
  //   const message = [
  //     { role: "system", content: `You are a translator from plain English to SQL.` },
  //     { role: "user", content: `Convert the following natural language description into a SQL query:\n\nShow all all the elements in the table users` },
  //     { role: "assistant", content: "SELECT * FROM users;" },
  //     { role: "user", content: `Convert the following natural language description into a SQL query:\n\n${queryDescription}` },
  //   ];
  //   const response = await openaiClient.createChatCompletion({
  //     model: "gpt-3.5-turbo",
  //     messages: message,
  //   });

  //   return response.data.choices[0].message.content;
  // }

  // const sqlQuery = await chatGPT(queryDescription);
  // return sqlQuery;
  const chat = new ChatOpenAI({openAIApiKey:process.env.OPENAI_API_KEY})
  const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
    "You are an sql query generator. You will get a human generated statement in text form which will be in english describing a problem related to sql queries.Your task is to convert the problem in english language or situation into an sql query.If the input to you is out of this domain you should say 'Sorry I do not speciallize in this.I am only aware about sql query generation .'"
  )
  const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate("{asked_question}");
  const chatprompt = ChatPromptTemplate.fromMessages([
    systemMessagePrompt,humanMessagePrompt
  ])
  const formattedChatPrompt = await chatprompt.formatMessages({
    asked_question:queryDescription
  })
  const response = await chat.invoke(formattedChatPrompt)
  return response.content;

};

export default generate;
