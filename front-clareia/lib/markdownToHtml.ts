// Simple markdown to HTML converter (in a real app, use a proper markdown library)
export function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/\*\*(.*)\*\*/gm, "<strong>$1</strong>")
    .replace(/\*(.*)\*/gm, "<em>$1</em>")
    .replace(/\n- (.*)/gm, "<ul><li>$1</li></ul>")
    .replace(/<\/ul><ul>/gm, "")
    .replace(/\n/gm, "<br />")
}
