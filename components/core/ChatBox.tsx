"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

const ChatBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [disableForBot, setDisableForBot] = useState(false);
  const [messages, setMessages] = useState([
    { text: "How Much Do You Love Her?", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // Add user's message
    setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);

    // Disable input for bot response duration
    setDisableForBot(true);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "yessir", sender: "bot" }]);
      // Re-enable input after bot responds
      setDisableForBot(false);
    }, 1000); // Bot responds after 1 second

    // Clear input
    setInputValue("");
  };

  return (
    <motion.div className="max-w-lg w-full py-5 flex no-scrollbar flex-col  max-h-[500px]">
      {/* Set a fixed height for the container */}
      <motion.div
        layout
        className="flex-1 no-scrollbar overflow-y-auto pb-4 relative"
      >
        {/* Make the messages container scrollable */}
        <motion.div layout className="space-y-1 no-scrollbar ">
          <AnimatePresence mode="wait">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 10, filter: `blur(10px)` }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: `blur(0px)`,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 1, 0.5, 1],
                  },
                }}
                className={`${
                  msg.sender === "bot"
                    ? "flex items-center justify-start"
                    : "flex items-center justify-end"
                }`}
              >
                <div
                  className={`${
                    msg.sender === "bot"
                      ? "bg-neutral-900 border-neutral-700 "
                      : "bg-blue-900 border-blue-700 "
                  } border rounded-full text-white px-2.5 py-1 text-sm w-fit`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isTyping && (
              <>
                <motion.div
                  key={isTyping ? "comingBot" : "exitingBot"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.25,
                      duration: 0.5,
                      ease: [0.25, 1, 0.5, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: {
                      delay: 0.25,
                      duration: 0.5,
                      ease: [0.5, 0, 0.75, 0],
                    },
                  }}
                  className="flex items-end w-full justify-start"
                >
                  <div className=" text-white/50 flex items-center gap-2 px-2.5 py-1 text-sm w-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />
                      <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" />
                    </svg>
                    <div className=" text-xs ">Bot is listening ...</div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div className="relative">
        {" "}
        {/* Keep the input area at the bottom */}
        <form onSubmit={handleSubmit}>
          <input
            disabled={disableForBot}
            placeholder="Send Message..."
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full transition-all duration-300 ease-in-out disabled:opacity-25 border px-5 py-2 border-zinc-700 rounded-full placeholder:opacity-25 text-sm focus-visible:outline-none bg-background"
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-3">
            <button type="submit">
              <div className="flex items-center gap-2 bg-blue-600 transition-all shadow-lg hover:bg-blue-700 px-1 py-1 rounded-full text-xs">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ChatBox;
