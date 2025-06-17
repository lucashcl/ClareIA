import { Suspense } from "react"
import { SummaryContent } from "@/components/summary-content"
import { uuid } from "zod/v4-mini"
import { notFound } from "next/navigation"
import { getSummaryById } from "@/data/summariesRepo"

export default async function ResumosPage({ params }: { params: Promise<{ id: string}> }) {
  const { id } = await params
  if (!uuid().safeParse(id).success) {
    return (
      <main className="flex-1 overflow-auto">
        <div className="flex h-screen items-center justify-center">
          <p>Invalid summary ID</p>
        </div>
      </main>
    )
  }

  try {
    const summary = await getSummaryById(id)
    if (!summary) {
      return notFound()
    }
    return (
      <main className="flex-1 overflow-auto">
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
          <SummaryContent
            id={summary.id}
            title={summary.title}
            content={summary.summary}
            discipline={summary.discipline}
            date={summary.date}  
          />
        </Suspense>
      </main>
    )
  } catch (err) {
    return notFound()
  }
}
