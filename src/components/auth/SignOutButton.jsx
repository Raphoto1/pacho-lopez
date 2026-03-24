"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type='button'
      className='btn btn-primary'
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Cerrar sesión
    </button>
  );
}
