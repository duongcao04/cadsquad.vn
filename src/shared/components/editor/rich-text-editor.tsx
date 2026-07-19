import type { RichTextEditorProps } from './types';

import { Editor } from './editor';

export function RichTextEditor({
  minHeight,
  contentClassName,
  ...rootProps
}: RichTextEditorProps) {
  return (
    <Editor {...rootProps}>
      <Editor.Toolbar />
      <Editor.FloatingToolbar />
      <Editor.Content minHeight={minHeight} className={contentClassName} />
      <Editor.Error />
    </Editor>
  );
}
