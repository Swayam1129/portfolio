"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="admin-login">
      <label htmlFor="password">Admin password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required />
      {state?.error && (
        <p role="alert" className="field-error">
          {state.error}
        </p>
      )}
      <button type="submit" className="btn" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
