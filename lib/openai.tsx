import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function createCompletion({
  model,
  prompt,
  temperature,
  max_tokens,
}: {
  model: string;
  prompt: string;
  temperature: number;
  max_tokens: number;
}) {
  const completion = await openai.completions.create({
    model: model,
    prompt: prompt,
    temperature: temperature,
    max_tokens: max_tokens,
  });
  return completion.choices[0].text;
}
