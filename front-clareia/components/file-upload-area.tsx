"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, File, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { createSummary } from "@/data/summariesRepo"
import SpinnerCircle from "./ui/spinner"
import { useRouter } from "next/navigation"

function useFile(maxSizeMB = 10) {
  const [file, setFile] = useState<File | null>(null)

  const attachFile = useCallback((file: File, onError: (error: Error) => void) => {
    if (file.type !== "application/pdf") {
      onError(new Error("Apenas arquivos PDF são aceitos"))
      return
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      onError(new Error(`O arquivo deve ter no máximo ${maxSizeMB} MB`))
      return
    }
    if (file.size === 0) {
      onError(new Error("O arquivo não pode estar vazio"))
      return
    }
    setFile(file)
  }, [setFile, maxSizeMB])

  const detachFile = useCallback(() => {
    setFile(null)
  }, [setFile])

  return {
    file,
    attachFile,
    detachFile,
  }
}

export function FileUploadArea() {
  const { file, attachFile, detachFile } = useFile()
  const [isUploading, setUploading] = useState(false)
  const router = useRouter()
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop(files: File[]) {
      if (files.length > 1) {
        toast.error("Por favor, envie apenas um arquivo PDF de cada vez.")
        return
      }
      if(files.length > 0) {
        attachFile(files[0], (error) => toast.error("Erro ao anexar arquivo", {
          description: error.message
        }))
      }
    },
    accept: {
      "application/pdf": [".pdf"]
    },
  })

  const handleUpload = async () => {
    setUploading(true)
    if(!file) {
      toast.warning("Por favor, selecione um arquivo PDF para enviar.")
      setUploading(false)
      return
    }
    try {
      const id = await createSummary(file)
      toast.success("Arquivo enviado com sucesso")
      detachFile()
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push(`/resumos/${id}`)
    } catch (error) {
      toast.error("Erro ao enviar arquivo", {
        description: error instanceof Error ? error.message : "Erro desconhecido"
      })
      detachFile()
      console.error("Upload error:", error)
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="w-full max-w-3xl space-y-6">
      {!file && <div
        {...getRootProps()}
        className={`
        border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
        ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-primary/10 p-4">
          <Upload className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Envie um arquivo de aula</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Arraste e solte seu arquivo PDF aqui, ou clique para selecionar. Nós vamos resumir e converter para áudio.
          </p>
        </div>
        </div>
      </div>}

      {file && (
        <div className="space-y-4">
        <h4 className="font-medium">Arquivo para enviar</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center space-x-3">
            {file.type === "application/pdf" ? (
              <FileText className="h-5 w-5 text-red-500" />
            ) : (
              <File className="h-5 w-5 text-blue-500" />
            )}
            <span className="text-sm truncate max-w-[250px]">{file.name}</span>
            <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <Button variant="ghost" size="icon" onClick={detachFile} disabled={isUploading}>
            <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isUploading && (
          <div className="space-y-2">
          <SpinnerCircle />
          <p className="text-xs text-center text-muted-foreground">Enviando...</p>
          <p className="text-xs text-center text-muted-foreground">Isto pode levar alguns segundos</p>
          </div>
        )}

        <Button className="w-full" onClick={handleUpload} disabled={isUploading}>
          {isUploading ? "Enviando..." : "Enviar e Resumir"}
        </Button>
        </div>
      )}
      </div>
    </div>
  )
}
