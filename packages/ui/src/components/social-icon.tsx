export interface SocialIconProps {
  icon: string;
  text?: string;
  href: string;
  /** Accessible name for the icon-only link (announced by screen readers). */
  label?: string;
}

export function SocialIcon(props: SocialIconProps) {
  return (
    <a
      className="rounded-sm transition-colors duration-200 ease-in-out hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      href={props.href}
      target="_blank"
      rel="noreferrer"
      aria-label={props.label ?? props.text}
    >
      <i className={`fa-solid ${props.icon}`} aria-hidden="true"></i>
      {props.text && <span>{props.text}</span>}
    </a>
  );
}

export default SocialIcon;
