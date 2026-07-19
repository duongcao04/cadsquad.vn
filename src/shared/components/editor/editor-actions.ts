import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Columns2,
  Columns3,
  Columns4,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  RectangleHorizontal,
  Redo2,
  RemoveFormatting,
  SquareCode,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Undo2,
} from 'lucide-react'

import type { Editor as TiptapEditor } from '@tiptap/react'
import type { LucideIcon } from 'lucide-react'

type EditorActionDefinition = {
  label: string
  icon: LucideIcon
  run: (editor: TiptapEditor) => void
  isActive?: (editor: TiptapEditor) => boolean
  canRun?: (editor: TiptapEditor) => boolean
}

const ACTION_MAP = {
  undo: {
    label: 'Hoàn tác',
    icon: Undo2,
    run: (editor) => editor.chain().focus().undo().run(),
    canRun: (editor) => editor.can().undo(),
  },
  redo: {
    label: 'Làm lại',
    icon: Redo2,
    run: (editor) => editor.chain().focus().redo().run(),
    canRun: (editor) => editor.can().redo(),
  },
  paragraph: {
    label: 'Đoạn văn',
    icon: Pilcrow,
    run: (editor) => editor.chain().focus().setParagraph().run(),
    isActive: (editor) => editor.isActive('paragraph'),
  },
  heading1: {
    label: 'Tiêu đề H1',
    icon: Heading1,
    run: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 1 }),
  },
  heading2: {
    label: 'Tiêu đề H2',
    icon: Heading2,
    run: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 2 }),
  },
  heading3: {
    label: 'Tiêu đề H3',
    icon: Heading3,
    run: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 3 }),
  },
  bulletList: {
    label: 'Danh sách',
    icon: List,
    run: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive('bulletList'),
  },
  orderedList: {
    label: 'Danh sách đánh số',
    icon: ListOrdered,
    run: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive('orderedList'),
  },
  blockquote: {
    label: 'Trích dẫn',
    icon: Quote,
    run: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive('blockquote'),
  },
  bold: {
    label: 'Đậm',
    icon: Bold,
    run: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive('bold'),
  },
  italic: {
    label: 'Nghiêng',
    icon: Italic,
    run: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive('italic'),
  },
  strike: {
    label: 'Gạch ngang',
    icon: Strikethrough,
    run: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive('strike'),
  },
  underline: {
    label: 'Gạch chân',
    icon: Underline,
    run: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive('underline'),
  },
  highlight: {
    label: 'Đánh dấu',
    icon: Highlighter,
    run: (editor) => editor.chain().focus().toggleHighlight().run(),
    isActive: (editor) => editor.isActive('highlight'),
  },
  code: {
    label: 'Mã inline',
    icon: Code2,
    run: (editor) => editor.chain().focus().toggleCode().run(),
    isActive: (editor) => editor.isActive('code'),
  },
  codeBlock: {
    label: 'Khối mã',
    icon: SquareCode,
    run: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive('codeBlock'),
  },
  horizontalRule: {
    label: 'Đường kẻ ngang',
    icon: Minus,
    run: (editor) => editor.chain().focus().setHorizontalRule().run(),
  },
  clearFormat: {
    label: 'Xoá định dạng',
    icon: RemoveFormatting,
    run: (editor) => editor.chain().focus().clearNodes().unsetAllMarks().run(),
  },
  superscript: {
    label: 'Chỉ số trên',
    icon: Superscript,
    run: (editor) => editor.chain().focus().toggleSuperscript().run(),
    isActive: (editor) => editor.isActive('superscript'),
  },
  subscript: {
    label: 'Chỉ số dưới',
    icon: Subscript,
    run: (editor) => editor.chain().focus().toggleSubscript().run(),
    isActive: (editor) => editor.isActive('subscript'),
  },
  alignLeft: {
    label: 'Căn trái',
    icon: AlignLeft,
    run: (editor) => editor.chain().focus().setTextAlign('left').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'left' }),
  },
  alignCenter: {
    label: 'Căn giữa',
    icon: AlignCenter,
    run: (editor) => editor.chain().focus().setTextAlign('center').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'center' }),
  },
  alignRight: {
    label: 'Căn phải',
    icon: AlignRight,
    run: (editor) => editor.chain().focus().setTextAlign('right').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'right' }),
  },
  alignJustify: {
    label: 'Căn đều',
    icon: AlignJustify,
    run: (editor) => editor.chain().focus().setTextAlign('justify').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'justify' }),
  },
  columns2: {
    label: 'Chia 2 cột',
    icon: Columns2,
    run: (editor) => editor.chain().focus().setColumns(2).run(),
    isActive: (editor) => editor.isActive('columns', { count: 2 }),
  },
  columns3: {
    label: 'Chia 3 cột',
    icon: Columns3,
    run: (editor) => editor.chain().focus().setColumns(3).run(),
    isActive: (editor) => editor.isActive('columns', { count: 3 }),
  },
  columns4: {
    label: 'Chia 4 cột',
    icon: Columns4,
    run: (editor) => editor.chain().focus().setColumns(4).run(),
    isActive: (editor) => editor.isActive('columns', { count: 4 }),
  },
  columnsOff: {
    label: 'Bỏ chia cột',
    icon: RectangleHorizontal,
    run: (editor) => editor.chain().focus().unsetColumns().run(),
    canRun: (editor) => editor.isActive('columns'),
  },
} satisfies Record<string, EditorActionDefinition>

export type EditorAction = keyof typeof ACTION_MAP

export const EDITOR_ACTIONS: Record<EditorAction, EditorActionDefinition> =
  ACTION_MAP
