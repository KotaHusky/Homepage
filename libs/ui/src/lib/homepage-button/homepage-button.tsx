export interface HomepageButtonProps {
  buttonText: string;
  className?: string; // Add className as an optional parameter
}

export function HomepageButton(props: HomepageButtonProps) {
  const { buttonText, className } = props;

  return (
    <button className={`bg-blue-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded ${className}`}>
      {buttonText}
    </button>
  );
}

export default HomepageButton;
