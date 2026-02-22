"use client";

import { useState, useEffect } from "react";

export function TelegramModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="transition-colors duration-200 ease-in-out hover:text-blue-500"
        aria-label="Telegram"
      >
        <i className="fa-solid fa-brands fa-telegram"></i>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative mx-4 max-w-md rounded-xl bg-gray-900 border border-gray-700 p-6 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <h2 className="text-xl font-semibold text-white mb-4">Before you message me</h2>

            <div className="space-y-3 text-sm text-gray-300">
              <p>
                For all <strong className="text-white">Barks & Rec</strong> inquiries, please reach out at{" "}
                <a href="mailto:hello@bandr.org" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                  hello@bandr.org
                </a>
              </p>
              <p>
                I only respond to <strong className="text-white">thoughtful messages</strong> &mdash; tell me who you are and what you&rsquo;re reaching out about so I can respond in kind.
              </p>
              <p className="text-gray-400 text-sm">
                I don&rsquo;t do casual chats except with friends &mdash; expect async replies.
              </p>
              <p className="text-orange-400 text-sm font-medium">
                Simple pleasantries (&ldquo;hi&rdquo;, &ldquo;hello&rdquo;) will be ignored, deleted, and likely blocked.
              </p>
            </div>

            <a
              href="https://t.me/KotaHusky"
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 transition-colors"
            >
              <i className="fa-solid fa-brands fa-telegram"></i>
              Continue to Telegram
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default TelegramModal;
