"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  PaperAirplaneIcon,
  XMarkIcon,
  SparklesIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
};

type Source = {
  title?: string;
  url?: string;
};

type ApiResponse = {
  message?: string;
  sessionId?: string;
  sources?: Source[];
  error?: string;
};

const QUICK_PROMPTS = [
  "What services do you offer?",
  "Show me your portfolio",
  "How can I contact support?",
  "Do you do mobile app development?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sources, setSources] = useState<Source[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.localStorage.getItem("ajx_ai_session_id") || undefined;
    setSessionId(id || undefined);

    const savedMessages = window.localStorage.getItem("ajx_ai_chat_messages");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      } catch (e) {
        console.error("Failed to parse saved messages", e);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, sources]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    const handleToggle = () => setOpen((prev) => !prev);
    window.addEventListener("AJX_TOGGLE_CHAT", handleToggle);
    return () => window.removeEventListener("AJX_TOGGLE_CHAT", handleToggle);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      window.localStorage.setItem(
        "ajx_ai_chat_messages",
        JSON.stringify(messages.slice(-50))
      );
    }
  }, [messages]);

  async function send(message?: string) {
    const messageToSend = message || input.trim();
    if (!messageToSend) return;

    const userMsg: Message = {
      role: "user",
      content: messageToSend,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setSources([]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          sessionId,
        }),
      });

      const data = (await res.json()) as ApiResponse;

      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
        window.localStorage.setItem("ajx_ai_session_id", data.sessionId);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const reply =
        data.message ||
        "Sorry, I am currently unavailable. Please try again later.";

      if (data.sources && data.sources.length > 0) {
        setSources(data.sources);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (e: unknown) {
      console.error("Chat API error:", e);
      const errorMessage =
        e instanceof Error
          ? e.message
          : "Connection failed. Please check your internet connection.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ **Error**: ${errorMessage}\n\nPlease check your configuration or try again later.`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
    setSources([]);
    window.localStorage.removeItem("ajx_ai_chat_messages");
  }

  return (
    <div className="fixed right-6 bottom-6 z-[9999] print:hidden flex flex-col items-end gap-4 pointer-events-none">

      <div
        className={`pointer-events-auto transition-all duration-300 ease-out origin-bottom-right ${open
          ? "scale-100 opacity-100"
          : "scale-95 opacity-0 pointer-events-none"
          }`}
      >
        {open && (
          <div className="flex flex-col ai-heading-box border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] overflow-hidden">

            <div className="px-6 py-4 flex bg-white items-center justify-between shadow-lg">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 shadow-inner">
                    <SparklesIcon className="w-5 h-5 text-green-300" />
                  </div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                </div>
                <div>
                  <h2 className="text-[24px] uppercase text-black">AJX AI</h2>
                  <p className="text-[12px] font-medium text-black tracking-wider uppercase">
                    Online Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="p-2 bg-[#108a00] rounded-full transition-all duration-200"
                  title="Clear conversation"
                  data-magnetic
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 bg-[#108a00] rounded-full transition-all duration-200"
                  data-magnetic
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>


            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full flex items-center justify-center mb-6 shadow-md">
                    <SparklesIcon className="w-8 h-8 text-black dark:text-white opacity-80" />
                  </div>
                  <h4 className="font-bold text-xl mb-3">
                    Welcome to AJX
                  </h4>
                  <p className="text-sm mb-8 max-w-[240px] leading-relaxed font-medium">
                    I can help you explore our services, portfolio, or answer
                    any questions you have.
                  </p>


                  <div className="grid gap-2.5 w-full max-w-xs">
                    {QUICK_PROMPTS.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => send(prompt)}
                        className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200 text-xs text-gray-800 dark:text-gray-100 font-semibold group"
                        data-magnetic
                      >
                        <span className="flex items-center justify-between">
                          {prompt}
                          <ArrowTopRightOnSquareIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${m.role === "user"
                          ? "bg-black dark:bg-white text-white dark:text-black"
                          : "bg-gradient-to-br from-blue-600 to-violet-600 text-white"
                          }`}
                      >
                        {m.role === "user" ? (
                          <span className="text-[10px] font-bold">You</span>
                        ) : (
                          <SparklesIcon className="w-4 h-4" />
                        )}
                      </div>

                      <div
                        className={`max-w-[85%] flex flex-col ${m.role === "user" ? "items-end" : "items-start"
                          }`}
                      >
                        <div
                          className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm font-medium ${m.role === "user"
                            ? "bg-black dark:bg-white text-white dark:text-black rounded-br-none border-2 border-black dark:border-white"
                            : "bg-white dark:bg-gray-800 text-black dark:text-white rounded-bl-none border border-gray-200 dark:border-gray-600"
                            }`}
                        >
                          <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:text-current">
                            {m.content.split("\n").map((line, i) => (
                              <p
                                key={i}
                                className="mb-1 last:mb-0"
                                dangerouslySetInnerHTML={{
                                  __html: line
                                    .replace(
                                      /\*\*(.*?)\*\*/g,
                                      "<strong>$1</strong>"
                                    )
                                    .replace(/\*(.*?)\*/g, "<em>$1</em>")
                                    .replace(/^- (.*)/, "• $1"),
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        {m.timestamp && (
                          <span className="text-[10px] mt-1.5 px-1 font-medium chat-clr">
                            {new Date(m.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {loading && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-violet-600 text-white">
                    <SparklesIcon className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm">
                    <div className="flex space-x-1.5 items-center h-4">
                      <div className="w-1.5 h-1.5 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-1.5 h-1.5 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>


            <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-950">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-full flex items-center p-1.5 border-2 border-gray-200 dark:border-gray-800 focus-within:border-black dark:focus-within:border-white transition-colors">
                <input
                  ref={inputRef}
                  className="flex-1 h-15 bg-transparent border-0 focus:ring-0 px-2 pl-10 text-[16px] text-gray-900 dark:text-white placeholder:text-gray-500 font-medium"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) send();
                  }}
                  disabled={loading}
                />
                <button
                  disabled={loading || !input.trim()}
                  className={`h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 ${input.trim() && !loading
                    ? "bg-black text-white hover:scale-110 shadow-md"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                    }`}
                  onClick={() => send()}
                >
                  <PaperAirplaneIcon className="w-4 h-4 -ml-0.5 mt-0.5 -rotate-45" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>


      <button
        className="pointer-events-auto h-20 w-20 md:h-24 md:w-24 rounded-full shadow-2xl hidden md:flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1"
        onClick={() => setOpen(!open)}
        data-magnetic
        data-tooltip="Chat"
      >
        {open ? (
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
            <XMarkIcon className="w-14 h-14 md:w-16 md:h-16 text-black dark:text-white" />
          </div>
        ) : (
          <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900 p-0.5 relative">
            <Image
              src="/chat-bot/chat-bot2.gif"
              alt="Chat bot"
              fill
              className="rounded-full object-cover"
              unoptimized
            />
          </div>
        )}
      </button>
    </div>
  );
}