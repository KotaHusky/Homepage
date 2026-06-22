import React from 'react';

export interface HomepageButtonProps {
  buttonText: string;
  className?: string;
  href?: string;
}

export function HomepageButton(props: HomepageButtonProps) {
  const { buttonText, className, href } = props;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`block text-center bg-white/5 hover:bg-blue-500/20 text-white font-bold py-2 px-4 w-full min-w-[100px] max-w-[200px] mb-4 rounded border border-solid border-white/30 hover:border-blue-400/50 backdrop-blur-sm shadow-md transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${className ?? ''}`}
    >
      {buttonText}
    </a>
  );
}

export default HomepageButton;
