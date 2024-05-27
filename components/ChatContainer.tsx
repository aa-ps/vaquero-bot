"use client"
import { FormEvent, useState, useCallback } from "react";

interface Conversation {
  question: string;
  answer: string;
}

async function askQuestion(question: string): Promise<string> {
  try {
    const response = await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: question }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, something went wrong.";
  }
}

export default function ChatContainer() {
  const [chat, setChat] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const question = formData.get("question")?.toString();

    if (question) {
      setLoading(true);
      let fullAnswer = await askQuestion(question);
      let displayedAnswer = '';
      setChat((prevChat) => [...prevChat, { question, answer: '' }]);

      const intervalId = setInterval(() => {
        if (displayedAnswer.length < fullAnswer.length) {
          displayedAnswer += fullAnswer[displayedAnswer.length];
          setChat((prevChat) => {
            const updatedChat = [...prevChat];
            updatedChat[updatedChat.length - 1].answer = displayedAnswer;
            return updatedChat;
          });
        } else {
          clearInterval(intervalId);
          setLoading(false);
        }
      }, 50);

      if (event.currentTarget) {
        event.currentTarget.reset();
      }
    }
  }, []);

  return (
    <div id="chatContainer">
      <form id="questionForm" onSubmit={handleSubmit}>
        <input type="text" name="question" placeholder="Ask a question" disabled={loading} />
        <input type="submit" value="Submit" disabled={loading} />
      </form>
      {loading && <div>Loading...</div>}
      {chat.map((conv, i) => (
        <div key={i} className="conversation">
          <div>{conv.question}</div>
          <div>{conv.answer}</div>
        </div>
      ))}
    </div>
  );
}
