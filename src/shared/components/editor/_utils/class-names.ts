export function editorCx(
  ...values: Array<string | false | null | undefined>
) {
  return values.filter(Boolean).join(' ')
}
