"use client";

import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/lib/action/logout";

const Logout = () => {
  return (
    <Button
    className="cursor-pointer"
      size={"sm"}
      onClick={async () => {
       await logout();
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
