"use client";

import { UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { signOutAction } from "@/actions/users";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
  className?: string;
};

export function UserButton({ user, className }: Props) {
  const router = useRouter();

  const handleSignOut = async () => {
    const toastId = toast.loading("Singing out...");
    await signOutAction();
    router.replace("/login");
    toast.dismiss(toastId);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={cn(
          "text-secondary hover:text-primary transition-colors duration-200 ease-in-out",
          className,
        )}
      >
        <UserCircle className="size-10 sm:size-12" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="ml-4 mt-5 sm:mt-4">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut} className="rounded-md p-2">
          <h3 className="text-sm">Sign Out</h3>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
