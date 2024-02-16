import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import styles from './StickerView.module.css';
import AddStickerButton from '../../components/AddStickerButton/AddStickerButton.tsx';
import StickerSelection from '../../components/StickerSelection/StickerSelection.tsx';
import { EmojiDetailData, PostData } from '../../interface/emojiInterface.ts';
import PostView from '../../components/PostView/PostView.tsx';
import { STICKER_SIZE } from '../../const/CONST.ts';
import Menu from '../../components/Menu/Menu.tsx';
import { getCategoryData } from '../../functions/getCategory.ts';
import BackButton from '../../assets/back-button.svg';
import { useNavigate } from 'react-router-dom';

export default function StickerView() {
  const { postId } = useParams();

  const [stickers, setStickers] = useState<EmojiDetailData[]>([]);
  const [toggleStickerButton, setToggleStickerButton] = useState<boolean>(false);
  const [attachment, setAttachment] = useState<string | null>(null);
  const cardTextRef = useRef<HTMLDivElement>(null);
  const navigation = useNavigate();

  const onClickBack = () => {
    navigation(-1);
  }
  const { isLoading: isStickersLoading, data: postData } = useQuery<PostData>(
    {
      queryKey: ['backgroundStickerssss'],
      queryFn: () => axios.get(`/api/post/${postId}`).then((res) => res.data),
      onSuccess: (v) => { setStickers(v.emojis); },
    },
  );

  const onClickDiv: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!event.view.document.defaultView) return;
    if ((event.target as HTMLElement).parentElement !== cardTextRef.current) return;
    if (!attachment) return;
    if (isStickersLoading) return;

    const { clientX, clientY } = event;
    const { innerHeight, innerWidth } = event.view.document.defaultView;
    const top = clientY - (STICKER_SIZE / 2);
    const left = clientX - (STICKER_SIZE / 2);

    const percentGenerator = (length: number, p: number) => (length / p) * 100;

    const currentSticker: {
      x: number;
      y: number;
      emojiUrl: string;
      postId: number
    } = {
      y: percentGenerator(top, innerHeight),
      x: percentGenerator(left, innerWidth),
      emojiUrl: attachment,
      postId: parseInt(postId!, 10),
    };

    setAttachment(null);
    axios.post<EmojiDetailData>('/api/saveEmoji', currentSticker).then((v) => {
      setStickers((state) => [
        ...state,
        v.data,
      ]);
    });
  };

  const emojiColor = getCategoryData(postData?.emotionType ?? 1)?.color ?? '#000000';
  console.log(postData?.content);
  return (
    <>
      <div ref={cardTextRef} className={styles.clickDiv} role="presentation" onClick={onClickDiv}>
        <div style={{ width: '100%', backgroundColor: emojiColor }}>
          <Menu />
        </div>
        <img className={styles.backButton} src={BackButton} alt="back-button" style={{ backgroundColor: emojiColor }} onClick={onClickBack}/>
        <PostView type={postData?.emotionType ?? 1} stickers={stickers} content={postData?.content ?? 'Loading...'} id={postData?.postId ?? 0}/>
      </div>
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
