import dotenv from "dotenv"
import Anthropic from "@anthropic-ai/sdk";
import express from "express"

dotenv.config()

const anthropic = new Anthropic();
const app = express();

app.post("/template",(req,res)=>{
    const prompt = req.body.prompt;

})

async function main(){
    const msg = await anthropic.messages.stream({
        messages: [{
            role:'user',
            content:"Create a simple todo application"
        }],
        model: "claude-3-7-sonnet-20250219",
        max_tokens: 1024,
    }).on('text',(text)=>{
        console.log(text);
    })
}
main();