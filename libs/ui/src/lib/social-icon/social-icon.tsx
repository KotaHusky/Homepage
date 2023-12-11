import styles from './social-icon.module.css';

export interface SocialIconProps {
  icon: string;
  text?: string;
  href: string;
}

export function SocialIcon(props: SocialIconProps) {
  return (
    <a className={`${styles.container} transition-colors duration-200 ease-in-out hover:text-blue-500`} href={props.href} target="_blank" rel="noreferrer">
      <i className={`fa-solid ${props.icon}`}></i>
      <span>{props.text}</span>
    </a>
  );
}

export default SocialIcon;