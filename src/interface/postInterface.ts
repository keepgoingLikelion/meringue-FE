export interface PostSimpleDTO {
  postId: number;
  createdDate: Date;
  userId: number;
  username: string;
  emotionType: number;
  content: string;
}

export interface PostsDTO{
  posts: PostSimpleDTO[];
}