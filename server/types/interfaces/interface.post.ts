export interface IPost {
  id: string;
  user_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface IPostWithUser extends IPost {
  user?: {
    id: string;
    username: string;
  };
}
