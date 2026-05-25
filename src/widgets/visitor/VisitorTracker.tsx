"use client";

import { useEffect } from "react";

const SESSION_KEY = "blog_visited";

const VisitorTracker = () => {
  useEffect(() => {
    const alreadyVisited = sessionStorage.getItem(SESSION_KEY) === "true";
    if (alreadyVisited) return;

    sessionStorage.setItem(SESSION_KEY, "true");
    fetch("/api/visit", { method: "POST" })
      .then(() => {
        window.dispatchEvent(new Event("visit-tracked"));
      })
      .catch(() => null);
  }, []);

  return null;
};

export default VisitorTracker;
