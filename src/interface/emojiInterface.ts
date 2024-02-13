export interface EmojiCategory {
  emojiType: number;
  emojiTypeUrl: string;
}

export interface EmojiData {
  emojiId: number;
  emojiImgUrl: string;
}

export interface EmojiDetailData extends EmojiData {
  top: number;
  left: number;
}
export interface PostData {
  id: number;
  content: string;
  stickerData: EmojiDetailData[]
}
