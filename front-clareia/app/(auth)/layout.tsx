import { RevisionSidebar } from "@/components/revision-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { getAllSummaries } from "@/data/summariesRepo"
import { transformSummariesIntoPeriods } from "@/lib/summariesIntoPeriods"
import { ReactNode } from "react"


export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const summaries = await getAllSummaries()
  const periods = transformSummariesIntoPeriods(summaries)
  return (
    <SidebarProvider>
      <RevisionSidebar periods={periods} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}