export const summaryTemplate = (context: string) => `
    Você é um assistente de IA encarregado de analisar o conteúdo de um PDF e gerar um resumo detalhado. O conteúdo do PDF é fornecido como texto extraído abaixo.

        Seu objetivo é produzir **apenas** um resumo de aproximadamente uma página, em formato Markdown, cobrindo os pontos principais, argumentos centrais, descobertas ou temas do documento. Use títulos, subtítulos, listas e outros elementos Markdown para organizar o conteúdo de forma clara e profissional. Não inclua títulos separados, campos de disciplina, suposições ou qualquer outro texto fora do resumo em Markdown.

        **Instruções:**
        - O resumo deve ter cerca de 400-500 palavras.
        - Use a sintaxe Markdown (\`#\`, \`##\`, \`-\`, \`**\`, etc.) para estruturar o texto.
        - Não inclua nada além do texto em Markdown gerado.
        - Se o conteúdo do PDF for ilegível ou vazio, retorne apenas:
        \`\`\`
        # Erro

        Não foi possível processar o PDF devido a conteúdo ilegível.
        \`\`\`

        Conteúdo do PDF:
        ${context}
`