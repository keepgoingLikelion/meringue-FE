import { useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import styles from './StickerSelection.module.css';
import QuitButton from '../../assets/quit-button.svg';
import NextButton from '../../assets/next-button.svg';
import { EmojiCategory, EmojiData } from '../../interface/emojiInterface.tsx';

export default function StickerSelection({ setToggleStickerButton, setIsAttachment }
: { setToggleStickerButton: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAttachment: React.Dispatch<React.SetStateAction<EmojiData | null>> }) {
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const [items, setItems] = useState<EmojiData[] | null>(null);

  const { isLoading, data } = useQuery<EmojiCategory[]>(
    {
      queryKey: ['stickerData'],
      queryFn: () => fetch('http://localhost:3000/api/category').then((res) => res.json()),
      onSuccess: () => { setCurrentCategory(1); },
    },
  );

  useEffect(() => {
    if (!currentCategory) return;
    setItems(null);
    fetch(`http://localhost:3000/api/category/${currentCategory}`).then((res) => res.json()).then((v) => setItems(v));
  }, [currentCategory]);

  const onClickQuitButton = () => {
    setToggleStickerButton(false);
  };

  const onClickCategoryButton: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setCurrentCategory(parseInt(e.currentTarget.id, 10));
  };

  const onClickStickerImg: React.MouseEventHandler<HTMLImageElement> = (e) => {
    const stickerData = items?.find((v) => v.emojiId === parseInt(e.currentTarget.alt, 10));
    setIsAttachment(stickerData ?? null);
    setToggleStickerButton(false);
  };

  // height: 256px
  // category: 42px
  // items: 214px
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Category}>
        <div className={styles.QuitButton} role="presentation" onClick={onClickQuitButton}>
          <img width="24px" height="24px" src={QuitButton} alt="Quit Button" />
        </div>
        {isLoading ? <div>Loading...</div> : data?.map((v) => <div key={v.emojiType} id={`${v.emojiType}`} style={{ margin: '5px auto' }} onClick={onClickCategoryButton} role="presentation"><img width="34px" height="34px" src={v.emojiTypeUrl} alt="category" /></div>)}
        <div className={styles.NextButton}>
          <img width="28px" height="28px" src={NextButton} alt="Next Button" />
        </div>
      </div>
      <div className={styles.Items}>
        <div className={styles.ItemFlex}>
          {items?.map((v) => <img role="presentation" className={styles.Item} onClick={onClickStickerImg} width="48px" height="48px" src={v.emojiImgUrl} alt={`${v.emojiId}`} key={v.emojiId} />)}
        </div>
      </div>
    </div>
  );
}
