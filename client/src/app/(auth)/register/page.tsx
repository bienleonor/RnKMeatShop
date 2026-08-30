"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PublicRoutes from "@/src/routes/PublicRoutes";
import { ApiError, register } from "@/src/lib/api";

export default function RegisterPage() {
  return (
    <PublicRoutes>
      <RegisterForm />
    </PublicRoutes>
  );
}

function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.username.trim() || !form.password) {
      setError("Complete your name, username, and password to continue.");
      return;
    }

    if (form.password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        name: form.name.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      router.replace("/");
    } catch (requestError: unknown) {
      setError(
        requestError instanceof ApiError && requestError.status === 409
          ? "That username is already in use."
          : requestError instanceof Error
            ? requestError.message
            : "Unable to create your account right now.",
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

          <form className="login-card register-card" onSubmit={handleSubmit} noValidate>
            <div className="login-card-heading">
              <p className="login-card-title">Create account</p>
              <p className="login-card-caption">Register a local POS user</p>
            </div>

            <label className="login-field">
              <span>Full name</span>
              <span className="login-input-wrap">
                <UserRound aria-hidden="true" size={15} />
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  autoComplete="name"
                  disabled={isSubmitting}
                  required
                />
              </span>
            </label>

            <label className="login-field">
              <span>Username</span>
              <span className="login-input-wrap">
                <UserRound aria-hidden="true" size={15} />
                <input
                  type="text"
                  value={form.username}
                  onChange={(event) => updateField("username", event.target.value)}
                  autoComplete="username"
                  disabled={isSubmitting}
                  required
                />
              </span>
            </label>

            <label className="login-field">
              <span>Email <em>(optional)</em></span>
              <span className="login-input-wrap">
                <Mail aria-hidden="true" size={15} />
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  autoComplete="email"
                  disabled={isSubmitting}
                />
              </span>
            </label>

            <label className="login-field">
              <span>Password</span>
              <span className="login-input-wrap">
                <LockKeyhole aria-hidden="true" size={15} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  autoComplete="new-password"
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

            <label className="login-field">
              <span>Confirm password</span>
              <span className="login-input-wrap">
                <LockKeyhole aria-hidden="true" size={15} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(event) => updateField("confirmPassword", event.target.value)}
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  required
                />
              </span>
            </label>

            {error ? (
              <p className="login-error" role="alert">
                {error}
              </p>
            ) : null}

            <button className="login-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create account"}
            </button>

            <p className="login-switch">
              Already registered? <Link href="/login">Log in</Link>
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
