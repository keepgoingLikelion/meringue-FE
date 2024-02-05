import styles from './TextCard.module.css';

export default function CardText({ text }: { text: String }) {
  return (
    <div className={styles.CardTextWrapper}>
      <p className={styles.CardText}>{text}</p>
    </div>
  );
}
