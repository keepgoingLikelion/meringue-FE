import { useState } from 'react';
import styles from './TextCard.module.css';
import { editContent } from '../../actions/todayPost.ts';

export default function TextCard({ className, text, postId }:
{ className: string; text: string, postId: number }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(text);

  const handleIsEdit = () => {
    setIsEditing(true);
  };
  const handleEditContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent(e.target.value);
  };
  const handleSaveContent = () => {
    setIsEditing(false);
    setNewContent(newContent);
    editContent(newContent, postId);
  };

  return (
    <div className={`${className} ${styles.Wrapper}`}>
      { isEditing ? (
        <>
          <input
            type="text"
            value={newContent}
            onChange={handleEditContent}
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
