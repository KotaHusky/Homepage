'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export function QrModal() {
  const [isOpen, setIsOpen] = useState(false);
  // Resolved from window.location after mount so the QR always encodes whatever
  // origin this page is served from — no hardcoded host to keep in sync.
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') setPageUrl(window.location.origin);
  }, []);

  const host = pageUrl.replace(/^https?:\/\//, '');

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
        aria-label="Show QR code for this page"
        className="fixed z-30 bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] flex h-10 w-10 items-center justify-center rounded-md border border-solid border-white/15 bg-white/10 text-white backdrop-blur-md shadow-lg transition duration-200 hover:bg-brand-500/30 hover:border-brand-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <i className="fa-solid fa-qrcode text-lg" aria-hidden="true"></i>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`QR code for ${host}`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/80 p-6 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] rounded-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <div
            className="rounded-2xl bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <QRCodeSVG
              value={pageUrl}
              level="M"
              marginSize={2}
              className="h-auto w-[min(72vw,72vh,360px)]"
            />
          </div>
          <a
            href={pageUrl}
            className="text-lg font-medium text-white transition-colors hover:text-brand-300 text-shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            {host}
          </a>
        </div>
      )}
    </>
  );
}

export default QrModal;
