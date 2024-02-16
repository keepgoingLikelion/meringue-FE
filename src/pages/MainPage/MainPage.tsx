import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';
import UserTextCard from '../../components/UserTextCard/UserTextCard.tsx';
import { PostSDTO } from '../../interface/postInterface.ts';
import filterButton from '../../assets/filter-button.svg';
import { getCategoryData, getCategoryDataList } from '../../functions/getCategory.ts';
import QuitButton from '../../assets/quit-button.svg';
import Menu from '../../components/Menu/Menu.tsx';

function MyText({ content }: { content: string }) {
  const navigation = useNavigate();

  const onClickCard = () => {
    navigation('/mypost');
  };

  return (
    <div className={styles.wrapper} onClick={onClickCard}>
      <p className={styles.CardText}>{content}
      <button onClick={} className={styles.edit}></button>
      </p>
    </div>
  );
}
function UserPostList({ ignoreList }: { ignoreList: number[] }) {
  const { isLoading, data } = useQuery<PostSDTO[]>(
    {
      queryKey: ['backgroundStickers'],
      queryFn: () => axios.get<{ posts: PostSDTO[] }>('/api/post/postList?category=1,2,3,4,5,6').then((v) => v.data.posts),
    },
  );
  console.log(data);

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
      <div style={{ width: '100%' }}>
        <div className={styles.apply}>
          적용
        </div>
      </div>
    </div>
  );
}

export default function MainPage({ content, type }: { content: string; type: number }) {
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [ignoreList, setIgnoreList] = useState<number[]>([]);
  const onClickFilter = () => {
    setIsFilter(true);
  };

  return (
    <div className={styles.wrap}>
      <div style={{ width: '100%', backgroundColor: getCategoryData(type)?.color ?? '#000000' }}>
        <Menu />
      </div>
      <div className={styles.title} style={{ backgroundColor: getCategoryData(type)?.color ?? '#000000' }}>
        <MyText content={content} />
      </div>
      <div className={styles.wave} style={{ backgroundColor: getCategoryData(type)?.color ?? '#000000' }} />
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
