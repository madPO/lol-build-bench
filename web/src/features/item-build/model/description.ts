/**
 * Strips HTML/XML tags from an item description string.
 * Replaces <br> with space. Removes all other tags.
 * Returns plain text suitable for tooltip display.
 */
export function stripHtmlTags(html: string): string {
  if (!html) return "";

  // Replace <br> and <br/> with space
  let text = html.replace(/<br\s*\/?>/gi, " ");

  // Remove all other HTML/XML tags
  text = text.replace(/<[^>]*>/g, "");

  // Collapse consecutive whitespace and trim
  return text.replace(/\s+/g, " ").trim();
}
