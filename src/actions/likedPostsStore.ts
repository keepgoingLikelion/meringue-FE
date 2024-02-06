import create from 'zustand';

interface PostSimpleDTO {
  postId: number;
  createdDate: Date;
  userId: number;
  username: string;
  emotionType: number;
  content: string;
}

interface LikedPostsStore {
  likedPosts: PostSimpleDTO[];
  setLikedPosts: (posts: PostSimpleDTO[]) => void;
}

const useLikedPostsStore = create<LikedPostsStore>((set) => ({
  likedPosts: [],
  setLikedPosts: (posts) => set({ likedPosts: posts }),
}));

export default useLikedPostsStore;
