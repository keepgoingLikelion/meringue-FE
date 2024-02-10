import { useQuery } from 'react-query';
import styles from './MainPage.module.css';
import UserTextCard from '../../components/UserTextCard/UserTextCard.tsx';
import { PostSimpleDTO } from '../../interface/postInterface.ts';
import filterButton from '../../assets/filter-button.svg';
import React, {useState} from "react";
import {getCategoryDataList} from "../../functions/getCategory.ts";
import QuitButton from '../../assets/quit-button.svg';

function MyText({ content }: { content: string }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.CardText}>{content}</p>
    </div>
  );
}
function UserPostList({ ignoreList }: { ignoreList: number[] }) {
  const { isLoading, data } = useQuery<PostSimpleDTO[]>(
    {
      queryKey: ['backgroundStickers'],
      queryFn: () => fetch('http://localhost:3000/api/post/simple').then((res) => res.json()),
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
      <input checked={isChecked} onChange={onChange} type="checkbox" id={type.toString()} style={{ marginRight: '9px', marginBottom: '2px' }} />
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

export default function MainPage() {
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [ignoreList, setIgnoreList] = useState<number[]>([]);
  const onClickFilter = () => {
    setIsFilter(true);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <MyText content="테테스트스슽테테테스스트트세트세트세트트테스트스슽테테테스스트트세트세트세트트스트스슽테테테스스트트세트세트세트트" />
      </div>
      <div className={styles.wave} />
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
            ) }
          <UserPostList ignoreList={ignoreList} />
        </div>
      </div>
    </div>
  );
}
