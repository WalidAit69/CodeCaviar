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
import { ToggleStatus } from "@/app/(protected)/admin/posts/actions";
import { CirclePause, CirclePlay, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";


function DashBtn({ id, status }: { id: string; status: boolean }) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function TogglePostStatus() {
    try {
      setLoading(true);
      await ToggleStatus(id , status);
      toast({ description: "Post updated." });
      window.location.reload();
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        variant: "destructive",
        description: "An error occurred. Please try again.",
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
        {!status ? <CirclePlay size="17" /> : <CirclePause size="17" />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will activate/deactivate the post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={loading}
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={TogglePostStatus}>
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

export default DashBtn;
