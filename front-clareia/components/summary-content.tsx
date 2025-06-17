"use client"

import { useState } from "react"
import { Download, Play, Pause, TagIcon, Telescope, Calendar, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { markdownToHtml } from "@/lib/markdownToHtml"

type SummaryContentProps = {
  id: string
  title: string
  discipline: string
  date: Date
  content: string
}

export function SummaryContent({ id, title, content, discipline, date }: SummaryContentProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  const togglePlayPause = () => {
    if (!audioElement) {
      const audio = new Audio(
        //sampleSummary.audioUrl
         "/sample-audio.mp3"
      )
      setAudioElement(audio)
      audio.play()
      setIsPlaying(true)

      audio.addEventListener("ended", () => {
        setIsPlaying(false)
      })
    } else {
      if (isPlaying) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <span className="flex items-center gap-2 text-muted-foreground">
              <Telescope className="size-4"/>
              {discipline}
            </span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="size-4" />
              {date?.toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={togglePlayPause}>
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pausar áudio
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Reproduzir áudio
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={`/resumos/${id}`} download>
                <Download className="mr-2 h-4 w-4" />
                Baixar
              </a>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList>
            <TabsTrigger value="summary">Resumo</TabsTrigger>
            <TabsTrigger value="audio">Áudio</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content.replaceAll("\\n", "\n")) }} />
                </div>
                {/* <Markdown >{content.replaceAll("\\n", "\n")}</Markdown> */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-10 space-y-6">
                  <div className="rounded-full bg-primary/10 p-6">
                    <Button variant="outline" size="icon" className="h-16 w-16 rounded-full" onClick={togglePlayPause}>
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                    </Button>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground">Audio Summary</p>
                  </div>
                  <Button asChild>
                    <a href={"/"} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Audio
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
