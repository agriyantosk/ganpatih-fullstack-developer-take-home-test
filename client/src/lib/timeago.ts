import { format } from "timeago.js";

export function formatTimeAgo(date: string | number | Date) {
  return format(date);
}
