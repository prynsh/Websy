// import dotenv from "dotenv"
// import Anthropic from "@anthropic-ai/sdk";
// import express from "express"
// import { basePrompt as NodeBasePrompt } from "./defaults/node";
// import { basePrompt as ReactBasePrompt } from "./defaults/node";
// import { TextBlock } from "@anthropic-ai/sdk/resources";
// import { BASE_PROMPT, getSystemPrompt } from "./prompts";

// dotenv.config()

// const anthropic = new Anthropic();
// const app = express();
// app.use(express.json())

// app.post("/template",async (req,res)=>{
//     const prompt = req.body.prompt;
//     const response = await anthropic.messages.create({
//         messages: [{
//             role:'user',
//             content:prompt
//         }],
//         model: "claude-3-7-sonnet-20250219",
//         max_tokens: 1024,
//         system:"Return either node or react based on what do you think this project should be.Return only a single word either 'node' or 'react'. Do not return anything extra"
//     })
//     const answer = (response.content[0] as TextBlock).text;
//     if(answer==="react"){
//         res.json({
//             prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
//             uiPrompts: [ReactBasePrompt]
//     })
//         return;
    
//     }
//     if(answer==="node"){
//         res.json({
//             prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
//             uiPrompts: [NodeBasePrompt]
//     })
//         return;
    
//     }
//     res.status(403).json({
//         message:"You can't access this"
//     })

// })

// app.post("/chat",async (req,res)=>{
//     const messages= req.body.messages
//     const response = await anthropic.messages.create({
//         messages:messages,
//         model: "claude-3-7-sonnet-20250219",
//         max_tokens: 1024,
//         system:getSystemPrompt()
//     })
// })


// app.listen(3000)
// // async function main(){
   
// // }
// // main();


import dotenv from "dotenv";
import OpenAI from "openai";
import express from "express";
import { basePrompt as NodeBasePrompt } from "./defaults/node";
import { basePrompt as ReactBasePrompt } from "./defaults/node";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();
app.use(express.json());

app.post("/template", async (req, res) => {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: "Return either node or react based on what do you think this project should be. Return only a single word either 'node' or 'react'. Do not return anything extra." },
                   { role: "user", content: prompt }],
        model: "gpt-4",
        max_tokens: 1024,
        temperature: 0
    });

    const answer = response.choices[0].message.content!.trim();
    
    if (answer === "react") {
        res.json({
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${ReactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [ReactBasePrompt]
        });
        return;
    }
    
    if (answer === "node") {
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${NodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [NodeBasePrompt]
        });
        return;
    }
    
    res.status(403).json({
        message: "You can't access this"
    });
});

app.post("/chat", async (req, res) => {
    const messages = req.body.messages;
    const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: getSystemPrompt() }, ...messages],
        model: "gpt-4",
        max_tokens: 1024,
        temperature: 0
    });

    res.json(response.choices[0].message);
});

app.listen(3000);