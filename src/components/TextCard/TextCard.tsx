import styles from './TextCard.module.css';

export default function TextCard({ className, text }: { className: string; text: String }) {
  return (
    <div className={`${className} ${styles.Wrapper}`}>
      <p className={styles.CardText}>{text}</p>
    </div>
  );
}
