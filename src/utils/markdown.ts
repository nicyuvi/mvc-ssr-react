import { remark } from 'remark';
import html from 'remark-html';

// Helper function to convert Markdown to HTML
// TODO: move this to utils
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
