import React from 'react';
import styles from './AddStickerButton.module.css';
import AddStickerButtonImg from '../../assets/add-sticker-button.svg';

export default function AddStickerButton({ setToggleStickerButton }
:{ setToggleStickerButton: React.Dispatch<React.SetStateAction<boolean>> }) {
  const onClickAddButton = () => {
    setToggleStickerButton(true);
  };

  return (
    <div className={styles.AddButton} onClick={onClickAddButton} role="presentation">
      <img src={AddStickerButtonImg} alt="AddStickerButtonImg" />
    </div>
  );
}
