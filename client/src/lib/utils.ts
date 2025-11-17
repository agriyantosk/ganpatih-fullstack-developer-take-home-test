import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown, fallback = "Something went wrong") {
  if (typeof error === "object" && error !== null) {
    const maybeResponse = error as {
      response?: {
        data?: {
          message?: string;
        };
      };
    };

    if (typeof maybeResponse.response?.data?.message === "string") {
      return maybeResponse.response.data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
