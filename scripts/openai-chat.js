const openai  = require("@ai-sdk/openai")
const { generateText } = require('ai');
const doubao = openai.createOpenAI({
  baseURL: "https://ark.cn-beijing.volces.com/api/v3",
  apiKey: "xxxxx，请填写自己的",
  compatibility: 'compatible',
})
// Doubao-pro-32k
const MODEL_DOUBAO_PRO_32K = "xxxxx，请填写自己的"
async function doubaoTranslate(prompt) {
  const { text } = await generateText({
    model: doubao(MODEL_DOUBAO_PRO_32K),
    prompt: prompt,
  });
  return {
    choices: [
      {
        message: {
          content: text
        }
      }
    ]
  };
}
export async function translate(prompt) {
  return await  doubaoTranslate(prompt)
}

export async function main() {
  const result = await doubaoTranslate('翻译这一句：hello world 为中文')
  console.log(JSON.stringify(result))
}

// main()

