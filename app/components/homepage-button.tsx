import React from 'react';

export interface HomepageButtonProps {
  buttonText: string;
  className?: string;
  href?: string;
}

export function HomepageButton(props: HomepageButtonProps) {
  const { buttonText, className, href } = props;

  return (
    <a href={href} target="_blank" rel="noreferrer">
      <button
        className={`bg-gray-800 hover:bg-blue-500 text-white font-bold py-2 px-4 w-full min-w-[100px] max-w-[200px] mb-4 rounded ${className}`}
      >
        {buttonText}
      </button>
    </a>
  );
}

export default HomepageButton;
