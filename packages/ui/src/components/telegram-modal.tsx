'use client';

import React, { useState, useEffect } from 'react';

export interface TelegramModalProps {
  /** Telegram deep link, e.g. `https://t.me/YourHandle`. */
  telegramUrl: string;
  /** Modal heading. */
  title?: string;
  /** CTA button label. */
  ctaLabel?: string;
  /** App-supplied body copy (the gate / etiquette message). */
  children: React.ReactNode;
}

/**
 * Brand-neutral Telegram gate. The trigger is a Telegram icon; clicking opens a
 * modal with app-supplied copy and a CTA out to `telegramUrl`. All wording is
 * passed in by the consumer so the shell carries no app-specific content.
 */
export function TelegramModal({
  telegramUrl,
  title = 'Before you message me',
  ctaLabel = 'Continue to Telegram',
  children,
}: TelegramModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      document.addEventListener('keydown', onKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKeyDown);
      };
    }
    document.body.style.overflow = '';
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="transition-colors duration-200 ease-in-out hover:text-brand-500"
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="telegram-modal-title"
            className="relative mx-4 max-w-md rounded-xl bg-gray-900 border border-solid border-gray-700 p-6 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 rounded-sm text-gray-500 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <h2 id="telegram-modal-title" className="text-xl font-semibold text-white mb-4">{title}</h2>

            <div className="space-y-3 text-sm text-gray-300">
              {children}
            </div>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium py-2.5 px-4 transition-colors"
            >
              <i className="fa-solid fa-brands fa-telegram"></i>
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default TelegramModal;
