"use client";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog } from "./ui/dialog";
import { Plus } from "lucide-react";
import NewNoteDialog from "./NewNoteDialog";
import { cn } from "@/lib/utils";
import { useState } from "react";

function NewNoteButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger
        className={cn(
          "text-secondary hover:text-primary transition-colors duration-200 ease-in-out",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <Plus className="size-10 sm:size-12" />
      </DialogTrigger>

      <NewNoteDialog setOpen={setOpen} />
    </Dialog>
  );
}

export default NewNoteButton;
