"use client";

import Logo from "@/app/_components/Logo";

import { Skeleton } from "@/components/ui/skeleton";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const Header = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-5 flex justify-between items-center">
      <Logo />

      <div className="flex items-center gap-2">
        {loading ? (
          <Skeleton className="w-7 h-7 rounded-full" />
        ) : (
          <UserButton />
        )}

      </div>
    </div>
  );
};

export default Header;
