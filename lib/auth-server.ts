"use server"

// lib/auth-server.ts (Server-side function)
import { headers } from 'next/headers';
import { auth } from './auth'; // Ensure this is correctly imported from your auth logic

export async function signOut() {
  // This is where you handle sign-out logic, e.g., clearing cookies, revoking sessions, etc.
  return await auth.api.signOut({headers: await headers()});
}

export async function getSession() {
    // This is where you handle sign-out logic, e.g., clearing cookies, revoking sessions, etc.
    return await auth.api.getSession({headers: await headers()});
}
  