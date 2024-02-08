import { useQuery } from 'react-query';
import styles from './MainPage.module.css';
import UserTextCard from '../../components/UserTextCard/UserTextCard.tsx';
import { PostSimpleDTO } from '../../interface/postInterface.ts';

function MyText({ content }: { content: string }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.CardText}>{content}</p>
    </div>
  );
}
function UserPostList() {
  const { isLoading, data } = useQuery<PostSimpleDTO[]>(
    {
      queryKey: ['backgroundStickers'],
      queryFn: () => fetch('http://localhost:3000/api/post/simple').then((res) => res.json()),
    },
  );

  return (
    <div>
      {!isLoading && data && data.map((v) => <UserTextCard data={v} />)}
    </div>
  );
}

export default function MainPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <MyText content="테테스트스슽테테테스스트트세트세트세트트테스트스슽테테테스스트트세트세트세트트스트스슽테테테스스트트세트세트세트트" />
      </div>
      <div className={styles.wave} />
      <div className={styles.body}>
        <UserPostList />
      </div>
    </div>
  );
}
