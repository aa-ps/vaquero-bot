"use client";
import { FormEvent, SetStateAction, useState, Dispatch } from "react";

interface Conversation {
  question: String;
  answer: String;
}

async function onSubmit(
  event: FormEvent<HTMLFormElement>,
  chat: Conversation[],
  setChat: Dispatch<SetStateAction<Conversation[]>>
) {
  event.preventDefault();

  let question = new FormData(event.currentTarget).get("question")
  event.currentTarget.reset();

  if (question != undefined) {
    question = question.toString();
    console.log(question);
    const response = await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: question,
      }),
    });
    const { data } = await response.json();
    setChat([...chat, { question: question, answer: data }]);
  }
}

export default function ChatContainer() {
  const [chat, setChat] = useState<Conversation[]>([]);
  return (
    <div id="chatContainer">
      <form
        id="questionForm"
        method="POST"
        onSubmit={(event) => onSubmit(event, chat, setChat)}
      >
        <input type="text" name="question" placeholder="Ask a question"/>
        <input type="submit" value="Submit" />
      </form>
      {chat.map((conv, i) => (
        <div key={i} className="conversation">
          <div>Question: {conv.question}</div>
          <div>Answer: {conv.answer}</div>
        </div>
      ))}
    </div>
  );
}
