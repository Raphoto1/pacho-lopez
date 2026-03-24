"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      username,
      password,
      callbackUrl,
      redirect: false
    });

    if (result?.error || !result?.ok) {
      setError("Usuario o contraseña inválidos.");
      setIsSubmitting(false);
      return;
    }

    router.push(result.url || callbackUrl);
    router.refresh();
  };

  return (
    <section className='container mx-auto px-4 py-20'>
      <div className='mx-auto max-w-xl rounded-2xl border border-base-content/20 bg-base-100/70 p-8 shadow-lg backdrop-blur'>
        <h1 className='text-3xl font-bold mb-2'>Acceso admin</h1>
        <p className='mb-6 opacity-80'>Inicia sesión para administrar tours y contenido protegido.</p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <label className='form-control w-full'>
            <span className='label-text mb-2'>Usuario</span>
            <input
              type='text'
              className='input input-bordered w-full'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              autoComplete='username'
            />
          </label>

          <label className='form-control w-full'>
            <span className='label-text mb-2'>Contraseña</span>
            <input
              type='password'
              className='input input-bordered w-full'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete='current-password'
            />
          </label>

          {error && <p className='text-error text-sm'>{error}</p>}

          <button type='submit' className='btn btn-primary w-full' disabled={isSubmitting}>
            {isSubmitting ? "Validando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </section>
  );
}
