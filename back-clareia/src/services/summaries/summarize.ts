import { extractTextFromPDF } from "../../lib/pdf/extractTextFromPdf";
import { summaryTemplate } from "../../lib/ai/summaryTemplate";
import { model } from "../../lib/ai/model";

export async function summarize(file: File): Promise<{
  title: string;
  content: string;
  discipline: string;
  createdAt: Date;
}> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const text = await extractTextFromPDF(buffer);
    const content = await model.invoke([
      {
        role: "system",
        content: summaryTemplate(text),
      },
    ]);
    const [title, discipline] = await Promise.all([
      model.invoke([
        {
          role: "system",
          content: `Por favor, gere um título conciso e descritivo para o seguinte conteúdo:\n\n${content.text}`,
        },
      ]),
      model.invoke([
        {
          role: "system",
          content: `Identifique a disciplina ou área de estudo mais relevante para o seguinte conteúdo:\n\n${content.text}. Responda apenas com uma string curta como por exemplo "Linguagens Formais" ou "Interação Humano Computador"`,
        },
      ]),
    ]);
    return {
      title: title.text.trim(),
      content: content.text.trim(),
      discipline: discipline.text.trim(), // You can modify this to extract discipline from the file or context
      createdAt: new Date(),
    };
  } catch (error) {
    throw error;
  }
}
