import styles from './social-icon.module.css';

export interface SocialIconProps {
  icon: string;
  text?: string; // Make the text option optional
}

export function SocialIcon(props: SocialIconProps) {
  return (
    <div className={styles['container']}>
      <i className={`fa-solid ${props.icon}`}></i>
      {props.text && <span>{props.text}</span>} {/* Render the text only if it's present */}
    </div>
  );
}

export default SocialIcon;