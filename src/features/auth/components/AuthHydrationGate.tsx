"use client";

import { useEffect, useState } from "react";

interface AuthHydrationGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthHydrationGate({
  children,
  fallback = null,
}: AuthHydrationGateProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
