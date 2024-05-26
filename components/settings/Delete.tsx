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
import { Loader2, Trash } from "lucide-react";
import { SelfDeleteUser } from "@/app/(protected)/admin/users/actions";
import { useToast } from "@/components/ui/use-toast";
import { signOut } from "next-auth/react";

function Delete({ id }: { id: string | undefined }) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      await SelfDeleteUser(id || "");
      signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast({
        variant: "destructive",
        description: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

  return (
    <div className="mt-5 w-full bg-white rounded-xl p-5 space-y-7">
      <span className="font-bold">Delete account</span>

      <div className="flex flex-col gap-1">
        <span>
          Delete your account and all of your data. This is irreversible.
        </span>

        <AlertDialog open={dialogOpen}>
          <AlertDialogTrigger
            onClick={() => setDialogOpen(true)}
            className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 w-[200px] py-3 flex justify-center items-center"
          >
            <span className="flex items-center gap-1">
              <Trash size={17} />
              Delete Account
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                post and remove all data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={loading}
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction disabled={loading} onClick={handleSubmit}>
                {loading ? (
                  <Loader2 size={20} className="mx-auto my-10 animate-spin" />
                ) : (
                  <span className="flex items-center gap-1">
                    <Trash size={17} />
                    Delete Account
                  </span>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default Delete;
