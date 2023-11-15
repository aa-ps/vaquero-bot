import { createCompletion } from "@/lib/openai";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const data = await createCompletion({
    max_tokens: 500,
    model: "gpt-3.5-turbo-instruct",
    prompt: prompt,
    temperature: 0.09,
  });
  return Response.json({data: data});
}
