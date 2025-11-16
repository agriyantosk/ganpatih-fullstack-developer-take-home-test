export interface IFollow {
  follower_id: string;
  followee_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
