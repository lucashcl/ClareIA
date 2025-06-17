import { summarize } from "./summarize";
import { createSummary } from "../../repositories/summaryRepository";

export async function regenerateSummary(_summaryId: string, _file: File) {
    throw new Error("Unimplemented function")
}

export async function generateSummary(file: File) {
    if(file.name.split('.').pop()?.toLowerCase() !== 'pdf') {
        throw new Error("Bad Request", {
            cause: ""
        })
    }
    const { content, title, discipline } = await summarize(file);
    const summary = await createSummary({
        title,
        discipline,
        content,
    })
    return summary
}
