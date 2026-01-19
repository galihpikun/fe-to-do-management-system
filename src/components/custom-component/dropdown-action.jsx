"use client"
import { ModalEdit } from "./modal-edit";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Menu, Pencil, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DropdownAction({ id }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function handleDelete(taskId) {
    const result = await fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (result.ok) router.push("/dashboard");
  }

  function openEditModal() {
    setOpen(false);              // ⬅️ TUTUP DROPDOWN
    setIsEditModalOpen(true);    // ⬅️ BARU BUKA MODAL
  }

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Menu size={20} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => handleDelete(id)}>
            <Trash2Icon />
            <span>Delete</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={openEditModal}>
            <Pencil />
            <span>Edit</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ModalEdit
        taskId={id}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
