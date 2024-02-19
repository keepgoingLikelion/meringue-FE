import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import styles from './MainPage.module.css';
import UserTextCard from '../../components/UserTextCard/UserTextCard.tsx';
import { PostSDTO } from '../../interface/postInterface.ts';
import filterButton from '../../assets/filter-button.svg';
import { getCategoryData, getCategoryDataList } from '../../functions/getCategory.ts';
import QuitButton from '../../assets/quit-button.svg';
import Menu from '../../components/Menu/Menu.tsx';
import { useNavigate } from 'react-router-dom';
import { useTodayPostStore } from '../../actions/todayPost.ts';
import { PostData } from '../../interface/emojiInterface.ts';

function MyText({ content }: { content: string }) {
  const { todayPost } = useTodayPostStore();
  const navigation = useNavigate();
  
  const onClickCard = () => {
    navigation(`/post/${todayPost?.postId}`);
  }
  return (
    <div className={styles.wrapper} onClick={onClickCard}>
      <p className={styles.CardText}>{content}</p>
    </div>
  );
}
function UserPostList({ ignoreList }: { ignoreList: number[] }) {
  const { isLoading, data } = useQuery<PostSDTO[]>(
    {
      queryKey: ['backgroundStickers'],
      queryFn: () => axios.get<{posts: PostSDTO[]}>('/api/post/postList?category=1,2,3,4,5,6').then((v) => v.data.posts),
    },
  );

  return (
    <div className={styles.contents}>
      {!isLoading && data && data.filter((v) => !ignoreList.includes(v.emotionType))
        .map((v) => <UserTextCard key={v.postId} data={v} />)}
    </div>
  );
}

function FilterInput({
  type, name, color, setIgnoreList, checked,
}: { type: number; name: string; color: string; checked: boolean;
  setIgnoreList: React.Dispatch<React.SetStateAction<number[]>> }) {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const onChange = () => {
    if (isChecked) {
      setIgnoreList((list) => list.filter((v) => v !== type));
    } else {
      setIgnoreList((list) => [...list, type]);
    }
    setIsChecked((state) => !state);
  };

  return (
    <div className={styles.inputGroup}>
      <input checked={!isChecked} onChange={onChange} type="checkbox" id={type.toString()} style={{ marginRight: '9px', marginBottom: '2px' }} />
      <div className={styles.circle} style={{ marginRight: '8px', marginTop: '1px', backgroundColor: color }} />
      <span>{name}</span>
    </div>
  );
}

function FilterList({ ignoreList, setIgnoreList, setIsFilter }:
{ ignoreList: number[];
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setIgnoreList: React.Dispatch<React.SetStateAction<number[]>> }) {
  const categoryDataList = getCategoryDataList();
  const onClick = () => {
    setIsFilter(false);
  };

  return (
    <div className={styles.filterBorder}>
      <div className={styles.quitButton} onClick={onClick} role="presentation">
        <img src={QuitButton} alt="quit-button" />
      </div>
      <div className={styles.filterList}>
        {categoryDataList.map((v) => (
          <FilterInput
            checked={ignoreList.includes(v.type)}
            setIgnoreList={setIgnoreList}
            type={v.type}
            name={v.name}
            color={v.color}
          />
        ))}
      </div>
      {/* <div style={{ width: '100%' }}>
        <div className={styles.apply}>
          적용
        </div>
      </div> */}
    </div>
  );
}

export default function MainPage() {
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [ignoreList, setIgnoreList] = useState<number[]>([]);
  const [todayPost, setTodayPost] = useState<PostData>();
  const onClickFilter = () => {
    setIsFilter(true);
  };
  useEffect(() => {
    axios.get("/api/post/myPost").then(res => setTodayPost(res.data));
  }, []);

  return (
    <div className={styles.wrap}>
      <div style={{ width: '100%', backgroundColor: getCategoryData(todayPost?.emotionType ?? 0)?.color ?? '#000000' }}>
        <Menu />
      </div>
      <div className={styles.title} style={{ backgroundColor: getCategoryData(todayPost?.emotionType ?? 0)?.color ?? '#000000' }}>
        <MyText content={todayPost?.content ?? ""} />
      </div>
      <div className={styles.wave} style={{ backgroundColor: getCategoryData(todayPost?.emotionType ?? 0)?.color ?? '#000000' }} />
      <div className={styles.bodyWrap}>
        <div className={styles.body}>
          <div className={styles.filter} onClick={onClickFilter} role="presentation">
            <img src={filterButton} alt="filter_button" />
          </div>
          {isFilter
            && (
              <FilterList
                ignoreList={ignoreList}
                setIsFilter={setIsFilter}
                setIgnoreList={setIgnoreList}
              />
            )}
          <UserPostList ignoreList={ignoreList} />
        </div>
      </div>
    </div>
  );
}