'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const PAGE_URL = 'https://kota.dog';

export function QrModal() {
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
        aria-label="Show QR code for this page"
        className="fixed z-30 top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] flex h-10 w-10 items-center justify-center rounded-md border border-solid border-white/15 bg-white/10 text-white backdrop-blur-md shadow-lg transition duration-200 hover:bg-blue-500/30 hover:border-blue-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <i className="fa-solid fa-qrcode text-lg" aria-hidden="true"></i>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="QR code for kota.dog"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/80 p-6 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] rounded-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
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
              value={PAGE_URL}
              level="M"
              marginSize={2}
              className="h-auto w-[min(72vw,72vh,360px)]"
            />
          </div>
          <a
            href={PAGE_URL}
            className="text-lg font-medium text-white transition-colors hover:text-blue-300 [text-shadow:_0_1px_4px_rgb(0_0_0_/_0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            kota.dog
          </a>
        </div>
      )}
    </>
  );
}

export default QrModal;
