import avatarPlaceholder from "@/assets/images/avatar_placeholder.png";
import { Lock, LogOut, Settings } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useMenu } from "@/store/store";

interface UserButtonProps {
  user: User;
}

export default function UserButton({ user }: UserButtonProps) {
  const { closeMenu } = useMenu();

  function handleSignOut() {
    closeMenu();
    signOut({ callbackUrl: "/" });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="flex-none rounded-full">
          <Image
            src={user.image || avatarPlaceholder}
            alt="User profile picture"
            width={50}
            height={50}
            className="aspect-square rounded-full bg-background object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[9999]">
        <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings" onClick={closeMenu}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          {user.role === "ADMIN" && (
            <DropdownMenuItem asChild>
              <Link href="/admin" onClick={closeMenu}>
                <Lock className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <div onClick={handleSignOut} className="flex w-full items-center">
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
