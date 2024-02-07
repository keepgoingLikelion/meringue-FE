import styles from './TextCard.module.css';

export default function TextCard({ text }: { text: String }) {
  return (
    <div className={styles.CardTextWrapper}>
      <p className={styles.CardText}>{text}</p>
    </div>
  );
}
