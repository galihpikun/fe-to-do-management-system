import { CalendarClock, CheckCircle, Clock, Flag, Pencil } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import DropdownAction from "./dropdown-action";
import StatusEnum from "@/constant/enums/status.enum";

export default async function Datalist() {
    const data = await fetch(`http://localhost:8080/tasks`);
    const jsonData = await data.json();
    const tasks = jsonData.data;
    const dataTask = {};

    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        const statusKey = task.status;

        if (!dataTask[statusKey]) {
            dataTask[statusKey] = [];
        }

        dataTask[statusKey].push(task);
    }

    function formatDate(dateString) {
        const date = Date.parse(dateString)
        const formatter = new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return formatter.format(date);
    }




    return (
        <div className="grid auto-rows-min md:grid-rows-1 gap-4 md:grid-cols-3">
            <div className="bg-muted/70 rounded-xl">
                <div className="p-6 flex gap-3 items-center">
                    <Pencil size={15} />
                    <p className="font-semibold bg-gray-500 px-2 rounded-full text-white">To Do</p>
                </div>

                <ScrollArea className="px-6 h-[75vh]">
                    {dataTask[StatusEnum.todo] ? dataTask[StatusEnum.todo].map((post) => (
                        <Card className="mb-3" key={post.id}>
                            <div className="flex justify-between py-3 pr-6">

                                <CardContent>
                                    <h1 className="font-semibold">{post.title}</h1>
                                    <p className="text-gray-500 pt-1">{post.desc}</p>
                                </CardContent>
                                <DropdownAction id={post.id} />
                            </div>
                            <Separator />
                            <CardFooter>
                                <div className="flex justify-between mt-2 items-center w-full">
                                    <div className="flex items-center gap-2">
                                        <CalendarClock size={18} color="gray" />
                                        <p className="text-gray-500 text-sm font-semibold">{formatDate(post.deadline)}</p>
                                    </div>
                                    <div className={`font-semibold text-sm text-white px-2 py-1 rounded-full ${post.priority === "high" ? "bg-red-500" : post.priority === "medium" ? "bg-yellow-600" : "bg-gray-600"}`}>{post.priority}</div>
                                </div>
                            </CardFooter>
                        </Card>
                    )) : <p className="w-full text-center text-gray-400 font-semibold">No Data :(</p>}
                </ScrollArea>
            </div>
            <div className="bg-muted/70 rounded-xl">
                <div className="p-6 flex gap-3 items-center">
                    <Clock size={15} />
                    <p className="font-semibold bg-yellow-600 px-2 rounded-full text-white">In Progress</p>
                </div>

                <ScrollArea className="px-6 h-[75vh]">
                    {dataTask[StatusEnum.in_progress] ? dataTask[StatusEnum.in_progress].map((post) => (
                        <Card className="mb-3" key={post.id}>
                            <div className="flex justify-between py-3 pr-6">

                                <CardContent>
                                    <h1 className="font-semibold">{post.title}</h1>
                                    <p className="text-gray-500 pt-1">{post.desc}</p>
                                </CardContent>
                                <DropdownAction id={post.id} />
                            </div>
                            <Separator />
                            <CardFooter>
                                <div className="flex justify-between items-center w-full mt-2">
                                    <div className="flex items-center gap-2">
                                        <CalendarClock size={18} color="gray" />
                                        <p className="text-gray-500 text-sm font-semibold">{formatDate(post.deadline)}</p>
                                    </div>
                                    <div className={`font-semibold text-sm text-white px-2 py-1 rounded-full ${post.priority === "high" ? "bg-red-500" : post.priority === "medium" ? "bg-yellow-600" : "bg-gray-600"}`}>{post.priority}</div>
                                </div>
                            </CardFooter>
                        </Card>
                    )) : <p className="w-full text-center text-gray-400 font-semibold">No Data :(</p>}
                </ScrollArea>

            </div>
            <div className="bg-muted/70 rounded-xl">
                <div className="p-6 flex gap-3 items-center">
                    <CheckCircle size={15} />
                    <p className="font-semibold bg-green-500 px-2 rounded-full text-white">Done</p>
                </div>

                <ScrollArea className="px-6 h-[75vh]">
                    {dataTask[StatusEnum.done] ? dataTask[StatusEnum.done].map((post) => (
                        <Card className="mb-3" key={post.id}>
                            <div className="flex justify-between py-3 pr-6">

                                <CardContent>
                                    <h1 className="font-semibold">{post.title}</h1>
                                    <p className="text-gray-500 pt-1">{post.desc}</p>
                                </CardContent>
                                <DropdownAction id={post.id} />
                            </div>
                            <Separator />
                            <CardFooter>
                                <div className="flex justify-between items-center w-full mt-2">
                                    <div className="flex items-center gap-2">
                                        <CalendarClock size={18} color="gray" />
                                        <p className="text-gray-500 text-sm font-semibold">{formatDate(post.deadline)}</p>
                                    </div>
                                    <div className={`font-semibold text-sm text-white rounded-full px-2 py-1 ${post.priority === "high" ? "bg-red-500" : post.priority === "medium" ? "bg-yellow-600" : "bg-gray-600"}`}>{post.priority}</div>
                                </div>
                            </CardFooter>
                        </Card>
                    )) : <p className="w-full text-center text-gray-400 font-semibold">No Data :(</p>}
                </ScrollArea>
            </div>
        </div>
    )
}