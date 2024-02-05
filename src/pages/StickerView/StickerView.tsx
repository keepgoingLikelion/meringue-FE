import React, { useState, CSSProperties, useRef } from 'react';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as axios from 'axios';
import styles from './StickerView.module.css';
import TextCard from '../../components/TextCard/TextCard.tsx';
import AddStickerButton from '../../components/AddStickerButton/AddStickerButton.tsx';
import StickerSelection from '../../components/StickerSelection/StickerSelection.tsx';
import { EmojiData, EmojiDetailData, PostData } from '../../interface/emojiInterface.tsx';

const stickerSize = 65;

export default function StickerView({ postId }: { postId: number }) {
  const [stickers, setStickers] = useState<EmojiDetailData[]>([]);
  const [toggleStickerButton, setToggleStickerButton] = useState<boolean>(false);
  const [attachment, setAttachment] = useState<EmojiData | null>(null);
  const cardTextRef = useRef<HTMLDivElement>(null);

  const { isLoading: isStickersLoading, data: postData } = useQuery<PostData>(
    {
      queryKey: ['backgroundStickers'],
      queryFn: () => fetch(`http://localhost:3000/api/post/${postId}`).then((res) => res.json()),
      onSuccess: (v) => { setStickers(v.stickerData); },
    },
  );

  const onClickDiv: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!event.view.document.defaultView) return;
    if (event.target !== cardTextRef.current) return;
    if (!attachment) return;
    if (isStickersLoading) return;

    const { clientX, clientY } = event;
    const { innerHeight, innerWidth } = event.view.document.defaultView;
    const top = clientY - (stickerSize / 2);
    const left = clientX - (stickerSize / 2);

    const percentGenerator = (length: number, p: number) => (length / p) * 100;

    const currentSticker: EmojiDetailData = {
      top: percentGenerator(top, innerHeight),
      left: percentGenerator(left, innerWidth),
      ...attachment,
    };

    setStickers((state) => [
      ...state,
      currentSticker,
    ]);
    setAttachment(null);
    axios.default.post('/postRequest', currentSticker);
  };

  return (
    <>
      <div ref={cardTextRef} className={styles.clickDiv} role="presentation" onClick={onClickDiv}>
        {!isStickersLoading && stickers.map((v) => {
          const style: CSSProperties = {
            position: 'fixed',
            top: `${v.top}%`,
            left: `${v.left}%`,
            width: `${stickerSize}px`,
            height: `${stickerSize}px`,
          };
          return <img key={`${(v.top * 31 + v.left * 31) * 31}`} src={v.emojiImgUrl} alt="Sticker" style={style}/>;
        })}
        ;
      </div>
      <TextCard
        text={postData?.content ?? 'Loading...'}
      />
      {toggleStickerButton ? (
        <StickerSelection
          setIsAttachment={setAttachment}
          setToggleStickerButton={setToggleStickerButton}
        />
      )
        : <AddStickerButton setToggleStickerButton={setToggleStickerButton} />}
    </>
  );
}
