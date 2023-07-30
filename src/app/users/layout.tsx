"use client";

import FormUserModal from "@/components/FomUserModal";
import { UserModalProvider } from "@/context/UserModalProvider";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserModalProvider>
      <FormUserModal />
      {children}
    </UserModalProvider>
  );
}
