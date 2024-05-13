"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Loader2, Shield, ShieldOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToggleAdmin } from "@/app/(protected)/admin/users/actions";

function UserAdminBtn({
  id,
  role,
  isHeadAdmin,
}: {
  id: string;
  role: string;
  isHeadAdmin: boolean;
}) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function UpdateUser() {
    try {
      setLoading(true);
      await ToggleAdmin(id, role, isHeadAdmin);
      toast({ description: "User updated." });
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        variant: "destructive",
        description: `${error}`,
      });
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  }

  return (
    <AlertDialog open={dialogOpen}>
      <AlertDialogTrigger
        onClick={() => setDialogOpen(true)}
        className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 flex justify-center items-center"
      >
        {isHeadAdmin && role === "admin" ? (
          <ShieldOff size="17" />
        ) : (
          <Shield size="17" />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will make/remove this user an admin.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={loading}
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={UpdateUser}>
            {loading ? (
              <Loader2 size={20} className="mx-auto my-10 animate-spin" />
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UserAdminBtn;
