import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Datalist from "@/components/custom-component/data-list"
import { ModalForm } from "@/components/custom-component/modal-form"

export default function Page() {
  return (
    <div className="flex flex-col justify-center gap-4">
      <nav className="flex justify-between border-b-2 w-full items-center px-10 h-15 py-3 bg-black">
        <h1 className="text-white font-semibold">Todo-List</h1>
        <ModalForm></ModalForm>
        
      </nav>
      <Datalist></Datalist>
    </div>
  )

}
