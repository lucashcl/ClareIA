//@ts-ignore
import pdf from "pdf-parse-debugging-disabled";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const content = await pdf(buffer);
  return content.text.trim();
}
