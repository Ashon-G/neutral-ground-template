"use client";

import React, { useEffect, useState } from "react";
import { LoadingAnimation } from "./loading-animation";

export const SplashScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Reduce timeout to 1.5 seconds and ensure it always hides
    const timer = setTimeout(() => {
      setShow(false);
    }, 1500);

    // Backup timeout in case the first one fails
    const backupTimer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(backupTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <LoadingAnimation className="scale-150" />
    </div>
  );
};