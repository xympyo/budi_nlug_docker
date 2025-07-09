import React, { useRef, useState, useEffect } from "react";
import budiLogo from "./assets/budi_logo.png";

const USER_AVATAR_COLOR = "#54fed5";

const ChatBot = () => {
  const [messages, setMessages] = useState([]); // { sender: 'user'|'bot', text: string }
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);
  const chatSectionRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom only if there are messages
    if (messages.length > 0 && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // For anchor scroll from Hero.jsx
  useEffect(() => {
    window.scrollToChatBot = () => {
      if (chatSectionRef.current) {
        chatSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setError("");
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Server error");
      }
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInputKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError("");
    setInput("");
  };

  return (
    <section
      ref={chatSectionRef}
      id="chatbot-section"
      className="w-full flex flex-col items-center py-12 px-6 sm:px-0 bg-[#303030] min-h-[80vh]"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg flex flex-col h-[70vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-[#1d1d1d]">Budi ChatBot</h2>
          <button
            onClick={handleClear}
            className="text-xs text-white bg-[#54fed5] hover:bg-[#39bfa7] px-3 py-1 rounded transition"
          >
            Clear Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-[#fbfbfb]">
          {messages.length === 0 && !loading && (
            <div className="text-center text-gray-400 mt-10">
              Start a conversation with Budi!
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <img
                  src={budiLogo}
                  alt="Bot"
                  className="w-10 h-10 rounded-full border-2 border-[#54fed5] mr-2 bg-white object-cover"
                />
              )}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-[#54fed5] text-[#1d1d1d] rounded-br-none"
                    : "bg-[#fbfbfb] text-[#1d1d1d] rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <div className="w-10 h-10 rounded-full bg-[#54fed5] ml-2 border-2 border-[#54fed5] flex items-center justify-center"></div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start items-center">
              <img
                src={budiLogo}
                alt="Bot"
                className="w-10 h-10 rounded-full border-2 border-[#54fed5] mr-2 bg-white object-cover"
              />
              <div className="max-w-[70%] px-4 py-2 rounded-2xl bg-[#fbfbfb] text-[#1d1d1d] rounded-bl-none flex items-center">
                <svg
                  className="animate-spin mr-2 h-5 w-5 text-[#54fed5]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>
        {error && (
          <div className="px-6 py-2 text-red-600 text-xs bg-red-50 border-t border-red-200">
            {error}
          </div>
        )}
        <form
          className="flex items-center gap-2 px-6 py-4 border-t"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#54fed5] text-sm"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKey}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-[#54fed5] hover:bg-[#39bfa7] text-white px-4 py-2 rounded-lg font-semibold transition"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatBot;
