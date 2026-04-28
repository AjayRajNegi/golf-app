"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";

type SignUpResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function signUpWithEmailAction(
  name: string,
  email: string,
  password: string,
): Promise<SignUpResult> {
  if (!name || !email || !password) {
    return { success: false, error: "All fields are required." };
  }

  if (password.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters.",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  if (existingUser) {
    return {
      success: false,
      error: "An account with this email already exists.",
    };
  }

  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!result) {
    return { success: false, error: "Signup failed. Please try again." };
  }

  return { success: true, message: "Account created successfully!" };
}

type LoginResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function loginWithEmailAction(
  email: string,
  password: string,
): Promise<LoginResult> {
  if (!email || !password) {
    return { success: false, error: "All fields are required." };
  }

  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!existingUser) {
    return { success: false, error: "Account does not exist." };
  }

  try {
    const result = await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
      asResponse: true,
    });

    if (!result) {
      return { success: false, error: "Login failed. Please try again." };
    }
  } catch {
    return { success: false, error: "Invalid email or password." };
  }

  return { success: true, message: "Login successful!" };
}
