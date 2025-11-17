"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { getErrorMessage } from "@/lib/utils";

type Variant = "login" | "register";

const initialFormState = {
  username: "",
  password: "",
};

export function AuthForm() {
  const router = useRouter();
  const authenticate = useAuthStore((state) => state.authenticate);
  const [variant, setVariant] = useState<Variant>("login");
  const [formState, setFormState] = useState(initialFormState);

  const switchVariant = () => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
    setFormState(initialFormState);
  };

  const { mutateAsync: registerMutate, isPending: isRegistering } = useMutation({
    mutationFn: api.register,
  });
  const { mutateAsync: loginMutate, isPending: isLoggingIn } = useMutation({
    mutationFn: api.login,
  });

  const isSubmitting = isRegistering || isLoggingIn;
  const isDisabled = !formState.username || !formState.password || isSubmitting;

  const title = variant === "login" ? "Welcome back" : "Create an account";
  const subtitle =
    variant === "login"
      ? "Enter your credentials to access the feed."
      : "Pick a unique username to get started.";

  const footerText =
    variant === "login" ? "Need an account?" : "Already have an account?";
  const footerAction = variant === "login" ? "Register" : "Log in";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled) return;

    try {
      if (variant === "register") {
        await registerMutate(formState);
        toast.success("Registration successful. Please log in.");
        setVariant("login");
      } else {
        const tokens = await loginMutate(formState);
        authenticate(tokens);
        toast.success("Logged in successfully.");
        router.push("/feed");
      }
      setFormState(initialFormState);
    } catch (error) {
      toast.error(getErrorMessage(error, "Authentication failed"));
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">{title}</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">{subtitle}</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--color-foreground)]">Username</label>
          <Input
            placeholder="john_doe"
            autoComplete="username"
            value={formState.username}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, username: event.target.value.trim() }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--color-foreground)]">Password</label>
          <Input
            placeholder="••••••••"
            type="password"
            autoComplete={variant === "register" ? "new-password" : "current-password"}
            value={formState.password}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, password: event.target.value }))
            }
          />
        </div>

        <Button type="submit" disabled={isDisabled} className="w-full">
          {isSubmitting ? "Please wait..." : variant === "login" ? "Log in" : "Register"}
        </Button>
      </form>

      <p className="text-center text-sm text-[var(--color-muted-foreground)]">
        {footerText}{" "}
        <button
          type="button"
          className="font-semibold text-[var(--color-primary)] hover:underline"
          onClick={switchVariant}
          disabled={isSubmitting}
        >
          {footerAction}
        </button>
      </p>
    </div>
  );
}
