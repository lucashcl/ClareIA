"use server"

const API_URL = process.env.BACKEND_URL
if(!API_URL) {
    throw new Error("BACKEND_URL environment variable is not set")
}

type JSONData = {
  id: string,
  title: string
  content: string,
  discipline: string,
  createdAt: string,
  updatedAt: string,
}

type Summary = {
    id: string,
    title: string
    summary: string,
    discipline: string,
    date: Date,
}

const transformJSONToSummaries = (item: JSONData) => ({
    id: item.id,
    title: item.title,
    summary: item.content,
    discipline: item.discipline,
    date: new Date(item.createdAt),
  })

export async function getAllSummaries(): Promise<Summary[]> {
    const response = await fetch(`${API_URL}/summaries`)
    const data = await response.json() as JSONData[]
    return data.map(transformJSONToSummaries)
}

export async function getSummaryById(id: string): Promise<Summary | null> {
    const response = await fetch(`${API_URL}/summaries/${id}`)
    if(response.status === 404) {
        return null
    }
    const data = await response.json() as JSONData
    return transformJSONToSummaries(data)
}

export async function createSummary(file: File): Promise<string> {
    const data = new FormData()
    data.append("file", file)

    const response = await fetch(`${API_URL}/summaries`, {
      method: "POST",
      body: data
    })

    const result = await response.json()
    if (response.ok) {
        return result.id
    }

    console.error(
        "Failed to create summary",
        result,
        "Status code:", response.status,
        "Response:", await response.text()
    )

    throw new Error("Failed to create summary: " + JSON.stringify(result))
}