"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton({ className }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className={className || "bg-brand-green text-brand-navy font-bold px-4 py-2 rounded-lg hover:bg-brand-green/80 transition-colors shadow-sm"}
    >
      Sign Out
    </button>
  );
}
