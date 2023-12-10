import styles from './social-icon.module.css';

export interface SocialIconProps {
  icon: string;
  text: string;
}

export function SocialIcon(props: SocialIconProps) {
  return (
    <div className={styles['container']}>
      <i className={`fa-solid ${props.icon}`}></i>
      <span>{props.text}</span>
    </div>
  );
}

export default SocialIcon;