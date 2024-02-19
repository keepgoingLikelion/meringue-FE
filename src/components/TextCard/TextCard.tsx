import { useEffect, useState } from 'react';
import styles from './TextCard.module.css';
import { editContent } from '../../actions/todayPost.ts';

export default function TextCard({ className, text, postId }:
{ className: string; text: string, postId: number }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(text);

  const handleIsEdit = () => {
    setIsEditing(true);
  };
  const handleEditContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  };
  const handleSaveContent = () => {
    setIsEditing(false);
    setNewContent(newContent);
    editContent(newContent, postId);
  };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === 'Enter') {
  //     handleSaveContent();
  //   }
  // };

  return (
    <div className={`${className} ${styles.Wrapper}`}>
      { isEditing ? (
        <>
          <textarea
            value={newContent}
            onChange={handleEditContent}
            // onKeyDown={handleKeyDown}
            className={styles.editBox}
          />
          <button
            type="button"
            onClick={handleSaveContent}
            className={styles.saveBtn}
          />
        </>
      ) : (
        <>
          <p className={styles.CardText}>{newContent || text}</p>
          <button className={styles.editBtn} onClick={handleIsEdit} />
        </>
      )}
    </div>
  );
}
