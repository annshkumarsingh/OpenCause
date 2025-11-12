"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function Login_Button({ className }) {

  const { data: session } = useSession()

  if (session) {
    return (
      <button className={className} onClick={() => signOut()}>Sign out</button>
    )
  }
  return (
    <button className={`${className}`} onClick={() => signIn()}>Sign in</button>
  )
}