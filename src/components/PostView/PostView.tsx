import { CSSProperties } from 'react';
import { EmojiDetailData } from '../../interface/emojiInterface.ts';
import TextCard from '../TextCard/TextCard.tsx';
import styles from './PostView.module.css';
import { STICKER_SIZE } from '../../const/CONST.ts';
import { getCategoryData } from '../../functions/getCategory.ts';

export default function PostView({ stickers, content, type, postId }
: { stickers: EmojiDetailData[]; content: string; type: number, postId: number }) {
  return (
    <div className={styles.wrap} style={{ backgroundColor: getCategoryData(type)?.color ?? '#000000' }}>
      {stickers.map((v) => {
        const style: CSSProperties = {
          position: 'fixed',
          top: `${v.y}%`,
          left: `${v.x}%`,
          width: `${STICKER_SIZE}px`,
          height: `${STICKER_SIZE}px`,
        };
        return <img key={`${v.id}`} src={v.emojiUrl} alt="Sticker" style={style} />;
      })}
      <TextCard
        className={styles.CardTextWrapper}
        text={content}
        postId={postId}
      />
    </div>
  );
}
