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
import { useToast } from "@/components/ui/use-toast";
import { DeleteUser } from "@/app/admin/users/actions";

function DashUserBtn({ id }: { id: string }) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function deleteuser() {
    try {
      setLoading(true);
      await DeleteUser(id);
      toast({ description: "User deleted." });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
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
        className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 w-9 flex justify-center items-center"
      >
        <Trash size={17} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            and remove all data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={loading}
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={deleteuser}>
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

export default DashUserBtn;
