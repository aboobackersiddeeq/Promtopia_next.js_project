"use client";

import { SessionProvider } from "next-auth/react";

type childComponents = {
  children: React.ReactNode;
  session?: any;
};

const Provider: React.FC<childComponents> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
