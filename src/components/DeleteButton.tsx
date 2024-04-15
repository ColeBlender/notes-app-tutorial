"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { deleteNoteAction } from "@/actions/notes";

function DeleteButton({ noteId }: { noteId: number }) {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const handleDeleteNote = async () => {
    startTransition(async () => {
      const { errorMessage } = await deleteNoteAction(noteId);
      if (!errorMessage) {
        setOpen(false);
        toast.success("Successfully deleted note");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger
        className="absolute -right-2"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="text-destructive/50 size-5" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          Are you sure you want to delete this note?
        </AlertDialogHeader>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this note
          from all records.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </AlertDialogCancel>

          <form action={handleDeleteNote}>
            <AlertDialogAction
              type="submit"
              className="bg-destructive hover:bg-destructive hover:brightness-110"
              disabled={isPending}
            >
              {isPending ? "Deleting Note..." : "Delete Note"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteButton;
