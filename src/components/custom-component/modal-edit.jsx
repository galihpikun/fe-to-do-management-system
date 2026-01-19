// "use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, Pencil } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Plus, Flag } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";
import StatusEnum from "@/constant/enums/status.enum"

export function ModalEdit({ taskId, isOpen, onClose }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const [formData, setFormData] = React.useState({
        title: "",
        desc: "",
        priority: "",
        deadline: new Date(),
        status: StatusEnum.todo,
        updated_by: ''
    })

    React.useEffect(() => {
        if (isOpen && taskId) {
            fetchTaskData();
        }
    }, [isOpen, taskId]);

    async function fetchTaskData() {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                const jsonData = await response.json();
                const data = jsonData.data;

                setFormData({
                    title: data.title || "",
                    desc: data.desc || data.description || "",
                    priority: data.priority || "",
                    deadline: data.deadline ? new Date(data.deadline) : new Date(),
                    status: data.status || 1,
                    created_by: data.created_by || "",
                    updated_by: data.updated_by || ""
                });
            } else {
                alert("Failed to fetch task data");
            }
        } catch (error) {
            console.error("Error fetching task data:", error);
            alert("Error fetching task data");
        } finally {
            setIsLoading(false);
        }
    }

    function handleInputChanges({ name, value }) {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function handleSubmit() {
        try {
            const result = await fetch(`http://localhost:8080/tasks/${taskId}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" }
            })

            if (result.ok) {
                router.push("/dashboard");
                onClose();
            } else {
                alert("Failed to update task");
            }
        } catch (err) {
            console.error("Error updating task:", err);
            alert("Error updating task");
        }
    }

    React.useEffect(() => {
        if (!isOpen) {
            setFormData({
                title: "",
                desc: "",
                priority: "",
                deadline: new Date(),
                status: StatusEnum.todo,
                created_by: '',
                updated_by: ''
            });
        }
    }, [isOpen]);

    return (
        <Dialog  open={isOpen}
  onOpenChange={(open) => {
    if (!open) onClose();
  }}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit task</DialogTitle>
                    <DialogDescription>
                        Edit your task here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="text-center">Loading...</div>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                placeholder="Title"
                                name="title"
                                value={formData.title}
                                onChange={(e) => handleInputChanges(e.target)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="Description"
                                placeholder="Description"
                                name="desc"
                                value={formData.desc}
                                onChange={(e) => handleInputChanges(e.target)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Priority" className="text-right">
                                Priority
                            </Label>
                            <Select name="priority" value={formData.priority} onValueChange={(e) => handleInputChanges({ value: e, name: "priority" })}>
                                <SelectTrigger className="sm:w-[280px]" >
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent id="Priority">
                                    <SelectItem value="high">
                                        High
                                    </SelectItem>
                                    <SelectItem value="medium">
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="low">
                                        Low
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="deadline" className="text-right">
                                Deadline
                            </Label>

                        
                                
                                    <Calendar
                                        mode="single"
                                        selected={new Date(formData.deadline)}
                                        onSelect={(day) => {
                                            if (day) {
                                                handleInputChanges({ name: 'deadline', value: day });
                                            }
                                        }}
                                        initialFocus
                                    />

                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Status" className="text-right">
                                Status
                            </Label>
                            <Select name="status" value={formData.status} onValueChange={(e) => handleInputChanges({ value: e, name: "status" })}>
                                <SelectTrigger className="sm:w-[280px]" >
                                    <SelectValue placeholder="status" />
                                </SelectTrigger>
                                <SelectContent id="status">
                                    {Object.values(StatusEnum).map((status, index) =>
                                        <SelectItem key={index} value={status}>
                                            {status}
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                )}

                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}