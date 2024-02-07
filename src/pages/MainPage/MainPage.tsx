import styles from './MainPage.module.css';

function MyText({ content }: { content: string }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.CardText}>{content}</p>
    </div>
  );
}
export default function MainPage() {
  return (
    <>
      <div className={styles.title}>
        <MyText content="테테스트스슽테테테스스트트세트세트세트트테스트스슽테테테스스트트세트세트세트트스트스슽테테테스스트트세트세트세트트" />
      </div>
      <div className={styles.wave} />
    </>
  );
}
