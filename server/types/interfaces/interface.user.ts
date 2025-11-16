export interface IUser {
  id: string; // UUID
  username: string;
  password_hash: string;
  created_at: Date;
}
