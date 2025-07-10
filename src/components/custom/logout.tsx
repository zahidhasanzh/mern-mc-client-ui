"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { logout } from "@/lib/action/logout";
import { getSession, Session } from "@/lib/session";
import Link from "next/link";

const UserAuthButton = () => {
  const [session, setSession] = useState<Session | null>()
  async function getSessionFunc (): Promise<void> {
     setSession( await getSession())
  }

  useEffect(() => {
    getSessionFunc();
  }, []);

  return (
    <div>
      {session ? (
        <Button
          className="cursor-pointer"
          size={"sm"}
          onClick={async () => {
            await logout();
            setSession(null)
          }}
        >
          Logout
        </Button>
      ) : (
        <Button size={"sm"} asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
};

export default UserAuthButton;
