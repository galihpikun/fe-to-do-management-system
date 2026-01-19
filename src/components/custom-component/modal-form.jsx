'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, CalendarIcon, Route, Router } from 'lucide-react';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import StatusEnum from '@/constant/enums/status.enum';

export function ModalForm() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    title: '',
    desc: '',
    priority: '',
    deadline: new Date(),
    status: StatusEnum.todo,
    user_id: 1,
  });

  function handleInputChanges({ name, value }) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    if (!formData.title || !formData.desc || !formData.priority || !formData.deadline) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(response);
        router.push('/dashboard');
      }
    } catch (error) {
      alert('gagal lol');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              onChange={(e) => handleInputChanges(e.target)}
              value={formData.title}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-right">
              Description
            </Label>
            <Input
              id="desc"
              name="desc"
              onChange={(e) => handleInputChanges(e.target)}
              value={formData.desc}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="" className="text-right">
              Priority
            </label>
            <Select
              name="priority"
              required
              onValueChange={(e) =>
                handleInputChanges({ value: e, name: 'priority' })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="" className="text-right">
              Deadline
            </label>
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
        </div>
        <DialogFooter>
          <DialogClose asChild>
             <Button type="submit" onClick={handleSubmit} >
            Save changes
          </Button>
          </DialogClose>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
