"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "blog_anonymous_id";

function generateUUID(): string {
  return crypto.randomUUID();
}

export function useAnonymousId(): string | null {
  const [anonymousId, setAnonymousId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = generateUUID();
      localStorage.setItem(STORAGE_KEY, id);
    }
    setAnonymousId(id);
  }, []);

  return anonymousId;
}
