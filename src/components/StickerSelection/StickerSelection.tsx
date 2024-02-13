import { useQuery } from 'react-query';
import React, { useState } from 'react';
import styles from './StickerSelection.module.css';
import QuitButton from '../../assets/quit-button.svg';
import NextButton from '../../assets/next-button.svg';
import { EmojiCategory } from '../../interface/emojiInterface.ts';

export default function StickerSelection({ setToggleStickerButton, setIsAttachment }
: { setToggleStickerButton: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAttachment: React.Dispatch<React.SetStateAction<string | null>> }) {
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const { isLoading, data } = useQuery<EmojiCategory>(
    {
      queryKey: ['stickerData'],
      queryFn: () => fetch('http://localhost:3000/api/category').then((res) => res.json()),
      onSuccess: () => { setCurrentCategory(0); },
    },
  );

  const onClickQuitButton = () => {
    setToggleStickerButton(false);
  };

  const onClickCategoryButton: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setCurrentCategory(parseInt(e.currentTarget.id, 10));
  };

  const onClickStickerImg: React.MouseEventHandler<HTMLImageElement> = (e) => {
    setIsAttachment(e.currentTarget.src ?? null);
    setToggleStickerButton(false);
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Category}>
        <div className={styles.QuitButton} role="presentation" onClick={onClickQuitButton}>
          <img width="24px" height="24px" src={QuitButton} alt="Quit Button" />
        </div>
        {isLoading ? <div>Loading...</div> : data?.emojiTypeUrls.map((v, i) => <div key={v} id={`${i}`} style={{ margin: '5px auto' }} onClick={onClickCategoryButton} role="presentation"><img width="34px" height="34px" src={v} alt="category" /></div>)}
        <div className={styles.NextButton}>
          <img width="28px" height="28px" src={NextButton} alt="Next Button" />
        </div>
      </div>
      <div className={styles.Items}>
        <div className={styles.ItemFlex}>
          {data?.emojiUrls[currentCategory].map((v) => <img role="presentation" className={styles.Item} onClick={onClickStickerImg} width="48px" height="48px" src={v} alt={`${v}`} key={v} />)}
        </div>
      </div>
    </div>
  );
}
