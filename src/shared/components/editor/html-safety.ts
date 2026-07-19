/** Chặn các dạng JavaScript thực thi phổ biến trong HTML do người dùng nhập. */
export function containsExecutableHtml(html: string): boolean {
  return (
    /<script\b/i.test(html) ||
    /\son[a-z]+\s*=/i.test(html) ||
    /\b(?:href|src|action|formaction)\s*=\s*(['"]?)\s*javascript:/i.test(html)
  )
}
