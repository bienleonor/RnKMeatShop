"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PublicRoutes from "@/src/routes/PublicRoutes";
import { ApiError, login } from "@/src/lib/api";

export default function LoginPage() {
  return (
    <PublicRoutes>
      <LoginForm />
    </PublicRoutes>
  );
}

function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
      setError("Enter your username and password to continue.");
      return;
    }

    setIsSubmitting(true);

    try {
      await login(username.trim(), password);
      router.replace("/dashboard");
    } catch (requestError: unknown) {
      setError(
        requestError instanceof ApiError && requestError.status === 401
          ? "The username or password is incorrect."
          : requestError instanceof Error
            ? requestError.message
            : "Unable to sign in right now.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-panel login-panel-light">
        <div className="login-content">
          <div className="login-heading">
            <p className="login-brand">RK Meat Shop</p>
            <p className="login-subtitle">Purchase Order Machine</p>
          </div>

          <form className="login-card" onSubmit={handleSubmit} noValidate>
            <div className="login-card-heading">
              <p className="login-card-title">Login</p>
              <p className="login-card-caption">Sign in to continue</p>
            </div>

            <label className="login-field">
              <span>Username</span>
              <span className="login-input-wrap">
                <UserRound aria-hidden="true" size={15} />
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Username"
                  autoComplete="username"
                  disabled={isSubmitting}
                  required
                />
              </span>
            </label>

            <label className="login-field">
              <span>Password</span>
              <span className="login-input-wrap">
                <LockKeyhole aria-hidden="true" size={15} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </span>
            </label>

            {error ? (
              <p className="login-error" role="alert">
                {error}
              </p>
            ) : null}

            <button className="login-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Log In"}
            </button>

            <p className="login-switch">
              New to the POS? <Link href="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </section>

      <section className="login-panel login-panel-brand" aria-label="R&K Meat Shop logo placeholder">
        <div className="login-brand-stage">
          <div className="login-logo-placeholder" aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
