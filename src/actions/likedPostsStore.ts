import create from 'zustand';
import { PostSimpleDTO } from '../interface/postInterface.ts';

interface LikedPostsStore {
  likedPosts: PostSimpleDTO[];
  setLikedPosts: (posts: PostSimpleDTO[]) => void;
}

const useLikedPostsStore = create<LikedPostsStore>((set) => ({
  likedPosts: [],
  setLikedPosts: (posts) => set({ likedPosts: posts }),
}));

export default useLikedPostsStore;
