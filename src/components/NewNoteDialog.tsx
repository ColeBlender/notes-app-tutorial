import { Dispatch, SetStateAction, useTransition } from "react";
import { Button } from "./ui/button";
import { DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";
import { addNewNoteAction } from "@/actions/notes";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function NewNoteDialog({ setOpen }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleAddNewNote = async (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await addNewNoteAction(formData);
      if (!errorMessage) {
        setOpen(false);
        toast.success("Successfully added note");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>Add New Note</DialogHeader>

      <form action={handleAddNewNote}>
        <Textarea
          id="text"
          name="text"
          disabled={isPending}
          className="mb-6 mt-2 min-h-[300px]"
        />

        <DialogFooter>
          <Button
            type="submit"
            disabled={isPending}
            variant={"secondary"}
            className="w-40"
          >
            {isPending ? "Adding Note..." : "Add Note"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default NewNoteDialog;
