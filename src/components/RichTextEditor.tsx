'use client'

import { useEffect, useRef, useState } from 'react'

import {
    Button,
    Divider,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectItem,
    Spinner,
} from '@heroui/react'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import {
    EditorContent,
    Extension,
    Node,
    NodeViewWrapper,
    ReactNodeViewRenderer,
    mergeAttributes,
    useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import axios from 'axios'
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Columns2,
    Columns3,
    Highlighter,
    Image as ImageIcon,
    Indent as IndentIcon,
    Italic,
    Link2,
    List,
    ListOrdered,
    Outdent as OutdentIcon,
    PaintRoller,
    Redo,
    RemoveFormatting,
    Strikethrough,
    Underline as UnderlineIcon,
    Undo,
} from 'lucide-react'

// ==========================================
// 1. CUSTOM RESIZABLE IMAGE COMPONENT WITH OPTIMISTIC UI
// ==========================================
const ResizableImageComponent = (props: any) => {
    const imgRef = useRef<HTMLImageElement>(null)

    const isUploading = props.node.attrs.src?.startsWith('blob:')

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        const startX = e.pageX
        const startWidth = imgRef.current?.clientWidth || 0

        const onMouseMove = (moveEvent: MouseEvent) => {
            const newWidth = startWidth + (moveEvent.pageX - startX)
            props.updateAttributes({ width: Math.max(100, newWidth) })
        }

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    return (
        <NodeViewWrapper className="relative inline-block group max-w-full my-4">
            <div
                className={`relative transition-opacity duration-200 ${isUploading ? 'opacity-60 blur-[2px]' : 'opacity-100'}`}
            >
                <img
                    ref={imgRef}
                    src={props.node.attrs.src}
                    alt={props.node.attrs.alt || ''}
                    style={{
                        width: props.node.attrs.width
                            ? `${props.node.attrs.width}px`
                            : 'auto',
                        height: 'auto',
                    }}
                    className={`max-w-full rounded-lg ${props.selected ? 'ring-2 ring-secondary' : ''}`}
                />

                {isUploading && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg z-10">
                        <Spinner size="sm" color="secondary" />
                    </div>
                )}
            </div>

            {!isUploading && (
                <div
                    onMouseDown={handleMouseDown}
                    className="absolute bottom-2 right-2 w-4 h-4 bg-secondary border-2 border-white rounded-full cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                />
            )}
        </NodeViewWrapper>
    )
}

const ResizableImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
                renderHTML: (attributes) => ({ width: attributes.width }),
            },
        }
    },
    addNodeView() {
        return ReactNodeViewRenderer(ResizableImageComponent)
    },
})

// ==========================================
// 2. CUSTOM COLUMNS EXTENSIONS
// ==========================================
const ColumnBlock = Node.create({
    name: 'columnBlock',
    group: 'block',
    content: 'column+',
    parseHTML() {
        return [{ tag: 'div[data-type="column-block"]' }]
    },
    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, {
                'data-type': 'column-block',
                class: 'flex gap-4 w-full my-4',
            }),
            0,
        ]
    },
})

const Column = Node.create({
    name: 'column',
    content: 'block+',
    parseHTML() {
        return [{ tag: 'div[data-type="column"]' }]
    },
    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, {
                'data-type': 'column',
                class: 'flex-1 min-w-0 border border-dashed border-default-200 p-3 rounded-lg min-h-[3rem]',
            }),
            0,
        ]
    },
})

// ==========================================
// 3. LINE HEIGHT & INDENT EXTENSIONS
// ==========================================
const LineHeightExtension = Extension.create({
    name: 'lineHeight',
    addOptions() {
        return { types: ['paragraph', 'heading'] }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: null,
                        parseHTML: (element) =>
                            element.style.lineHeight || null,
                        renderHTML: (attributes) => {
                            if (!attributes.lineHeight) return {}
                            return {
                                style: `line-height: ${attributes.lineHeight}`,
                            }
                        },
                    },
                },
            },
        ]
    },
    addCommands() {
        return {
            setLineHeight:
                (lineHeight: string) =>
                ({ commands }: any) =>
                    this.options.types.every((type: string) =>
                        commands.updateAttributes(type, { lineHeight })
                    ),
            unsetLineHeight:
                () =>
                ({ commands }: any) =>
                    this.options.types.every((type: string) =>
                        commands.resetAttributes(type, 'lineHeight')
                    ),
        }
    },
})

const IndentExtension = Extension.create({
    name: 'indent',
    addOptions() {
        return {
            types: ['paragraph', 'heading'],
            min: 0,
            max: 8,
            multiplier: 2,
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    indent: {
                        default: 0,
                        parseHTML: (element) =>
                            parseInt(element.style.marginLeft) || 0,
                        renderHTML: (attributes) => {
                            if (!attributes.indent) return {}
                            return {
                                style: `margin-left: ${attributes.indent * this.options.multiplier}rem`,
                            }
                        },
                    },
                },
            },
        ]
    },
    addCommands() {
        return {
            indent:
                () =>
                ({ tr, state, dispatch }: any) => {
                    let applied = false
                    tr.doc.nodesBetween(
                        state.selection.from,
                        state.selection.to,
                        (node: any, pos: number) => {
                            if (this.options.types.includes(node.type.name)) {
                                const indent = (node.attrs.indent || 0) + 1
                                if (indent <= this.options.max && dispatch) {
                                    tr.setNodeMarkup(pos, node.type, {
                                        ...node.attrs,
                                        indent,
                                    })
                                    applied = true
                                }
                            }
                        }
                    )
                    return applied
                },
            outdent:
                () =>
                ({ tr, state, dispatch }: any) => {
                    let applied = false
                    tr.doc.nodesBetween(
                        state.selection.from,
                        state.selection.to,
                        (node: any, pos: number) => {
                            if (this.options.types.includes(node.type.name)) {
                                const indent = (node.attrs.indent || 0) - 1
                                if (indent >= this.options.min && dispatch) {
                                    tr.setNodeMarkup(pos, node.type, {
                                        ...node.attrs,
                                        indent,
                                    })
                                    applied = true
                                }
                            }
                        }
                    )
                    return applied
                },
        }
    },
})

// ==========================================
// HOOK: Subscribe to editor state changes to force re-renders
// ==========================================
/**
 * This hook is the core fix. It listens to both `selectionUpdate` and
 * `transaction` events on the editor, and bumps a counter to trigger a
 * React re-render whenever the cursor moves or content changes.
 * Without this, `editor.isActive()` / `editor.getAttributes()` calls in
 * the toolbar read stale state and don't reflect the current cursor position.
 */
function useEditorState(editor: ReturnType<typeof useEditor>) {
    const [, forceUpdate] = useState(0)

    useEffect(() => {
        if (!editor) return

        const handler = () => forceUpdate((n) => n + 1)

        editor.on('selectionUpdate', handler)
        editor.on('transaction', handler)

        return () => {
            editor.off('selectionUpdate', handler)
            editor.off('transaction', handler)
        }
    }, [editor])
}

// ==========================================
// MAIN COMPONENT
// ==========================================
interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export default function RichTextEditor({
    value,
    onChange,
    placeholder,
}: RichTextEditorProps) {
    const [isLinkOpen, setIsLinkOpen] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const [linkText, setLinkText] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const savedSelectionRef = useRef<{ from: number; to: number } | null>(null)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({ openOnClick: false, autolink: true }),
            LineHeightExtension,
            IndentExtension,
            ResizableImage,
            ColumnBlock,
            Column,
        ],
        content: value,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-slate sm:prose-base max-w-none focus:outline-none min-h-[400px]',
            },
            handleDrop: (view, event, slice, moved) => {
                if (
                    !moved &&
                    event.dataTransfer &&
                    event.dataTransfer.files &&
                    event.dataTransfer.files[0]
                ) {
                    const file = event.dataTransfer.files[0]
                    if (file.type.startsWith('image/')) {
                        event.preventDefault()
                        const coordinates = view.posAtCoords({
                            left: event.clientX,
                            top: event.clientY,
                        })
                        if (coordinates) {
                            handleInstantImage(file, coordinates)
                        }
                        return true
                    }
                }
                return false
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    // ✅ FIX: Subscribe to editor selection/transaction events to keep toolbar in sync
    useEditorState(editor)

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, false)
        }
    }, [value, editor])

    // ==========================================
    // OPTIMISTIC UI IMAGE UPLOAD LOGIC
    // ==========================================
    const handleInstantImage = async (
        file: File,
        coordinates?: { pos: number }
    ) => {
        if (!file.type.startsWith('image/') || !editor) return

        const tempUrl = URL.createObjectURL(file)

        if (coordinates) {
            editor
                .chain()
                .focus()
                .insertContentAt(coordinates.pos, {
                    type: 'image',
                    attrs: { src: tempUrl },
                })
                .run()
        } else {
            editor.chain().focus().setImage({ src: tempUrl }).run()
        }

        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            const realUrl = response.data.url

            if (realUrl) {
                editor.state.doc.descendants((node, pos) => {
                    if (
                        node.type.name === 'image' &&
                        node.attrs.src === tempUrl
                    ) {
                        editor
                            .chain()
                            .command(({ tr, dispatch }) => {
                                if (dispatch)
                                    tr.setNodeMarkup(pos, null, {
                                        ...node.attrs,
                                        src: realUrl,
                                    })
                                return true
                            })
                            .run()
                    }
                })
            }
        } catch (error) {
            console.error('Upload failed', error)
            editor.state.doc.descendants((node, pos) => {
                if (node.type.name === 'image' && node.attrs.src === tempUrl) {
                    editor
                        .chain()
                        .command(({ tr, dispatch }) => {
                            if (dispatch) tr.delete(pos, pos + node.nodeSize)
                            return true
                        })
                        .run()
                }
            })
        } finally {
            URL.revokeObjectURL(tempUrl)
        }
    }

    if (!editor) return null

    const getBtnProps = (isActive: boolean) => ({
        variant: isActive ? ('flat' as const) : ('light' as const),
        color: isActive ? ('secondary' as const) : ('default' as const),
        size: 'sm' as const,
        isIconOnly: true,
        radius: 'md' as const,
    })

    const openLinkPopover = () => {
        // Save selection NOW before the popover causes the editor to lose focus
        const { from, to } = editor.state.selection
        savedSelectionRef.current = { from, to }

        const previousUrl = editor.getAttributes('link').href
        const selectedText = editor.state.doc.textBetween(from, to, ' ')

        setLinkUrl(previousUrl || '')
        setLinkText(selectedText || '')
        setIsLinkOpen(true)
    }

    const saveLink = () => {
        const saved = savedSelectionRef.current

        if (!linkUrl) {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
        } else if (saved && saved.from !== saved.to) {
            // Restore the saved selection, then apply the link
            editor
                .chain()
                .focus()
                .setTextSelection(saved)
                .extendMarkRange('link')
                .setLink({ href: linkUrl })
                .run()
        } else if (linkText) {
            editor
                .chain()
                .focus()
                .insertContent(`<a href="${linkUrl}">${linkText}</a>`)
                .run()
        }
        savedSelectionRef.current = null
        setIsLinkOpen(false)
    }

    // ==========================================
    // ✅ FIXED: These now read live state on every re-render triggered by
    //    useEditorState, so they accurately reflect the cursor position.
    // ==========================================

    const activeTextStyle = editor.isActive('heading', { level: 1 })
        ? 'h1'
        : editor.isActive('heading', { level: 2 })
          ? 'h2'
          : editor.isActive('heading', { level: 3 })
            ? 'h3'
            : 'p'

    // ✅ FIX: Also check orderedList and bulletList as they are block-level
    //    nodes that don't map to heading/paragraph, so they need their own key.
    const activeLineHeight =
        editor.getAttributes('paragraph')?.lineHeight ||
        editor.getAttributes('heading')?.lineHeight ||
        'default'

    return (
        <div className="flex flex-col border border-default-200 rounded-xl overflow-hidden bg-white shadow-sm h-full">
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleInstantImage(file)
                    if (fileInputRef.current) fileInputRef.current.value = ''
                }}
                accept="image/*"
                className="hidden"
            />

            {/* TOOLBAR — onMouseDown preventDefault stops the toolbar from stealing
                focus away from the editor, which is what caused the double-click issue
                on Select, Popover, and any other non-button toolbar element. */}
            <div
                className="flex flex-col gap-2 bg-default-50 border-b border-default-200 p-2 shrink-0"
                onMouseDown={(e) => e.preventDefault()}
            >
                {/* Top Row */}
                <div className="flex items-center gap-1 flex-wrap">
                    <Button
                        {...getBtnProps(false)}
                        onClick={() => editor.chain().focus().undo().run()}
                        isDisabled={!editor.can().undo()}
                    >
                        <Undo size={16} />
                    </Button>
                    <Button
                        {...getBtnProps(false)}
                        onClick={() => editor.chain().focus().redo().run()}
                        isDisabled={!editor.can().redo()}
                    >
                        <Redo size={16} />
                    </Button>
                    <Button
                        {...getBtnProps(false)}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .clearNodes()
                                .unsetAllMarks()
                                .run()
                        }
                    >
                        <PaintRoller size={16} />
                    </Button>

                    <Divider orientation="vertical" className="h-5 mx-1" />

                    {/* TEXT STYLE DROPDOWN — updates on cursor move */}
                    <Select
                        size="sm"
                        variant="flat"
                        aria-label="Text Style"
                        className="w-32"
                        selectedKeys={new Set([activeTextStyle])}
                        onSelectionChange={(keys) => {
                            const val = Array.from(keys)[0] as string
                            editor.chain().focus()
                            if (val === 'p')
                                editor.chain().focus().setParagraph().run()
                            else if (val === 'h1')
                                editor
                                    .chain()
                                    .focus()
                                    .setHeading({ level: 1 })
                                    .run()
                            else if (val === 'h2')
                                editor
                                    .chain()
                                    .focus()
                                    .setHeading({ level: 2 })
                                    .run()
                            else if (val === 'h3')
                                editor
                                    .chain()
                                    .focus()
                                    .setHeading({ level: 3 })
                                    .run()
                        }}
                    >
                        <SelectItem key="p">Paragraph</SelectItem>
                        <SelectItem key="h1">Heading 1</SelectItem>
                        <SelectItem key="h2">Heading 2</SelectItem>
                        <SelectItem key="h3">Heading 3</SelectItem>
                    </Select>

                    {/* LINE HEIGHT DROPDOWN — updates on cursor move */}
                    <Select
                        size="sm"
                        variant="flat"
                        aria-label="Line Height"
                        className="w-36"
                        selectedKeys={new Set([activeLineHeight])}
                        onSelectionChange={(keys) => {
                            const val = Array.from(keys)[0] as string
                            if (val === 'default')
                                (editor.chain().focus() as any)
                                    .unsetLineHeight()
                                    .run()
                            else
                                (editor.chain().focus() as any)
                                    .setLineHeight(val)
                                    .run()
                        }}
                    >
                        <SelectItem key="default">Default</SelectItem>
                        <SelectItem key="1">1 (Single)</SelectItem>
                        <SelectItem key="1.25">1.25 (Tight)</SelectItem>
                        <SelectItem key="1.5">1.5</SelectItem>
                        <SelectItem key="2">2 (Double)</SelectItem>
                    </Select>

                    <Divider orientation="vertical" className="h-5 mx-1" />

                    <Button
                        {...getBtnProps(editor.isActive('bold'))}
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        <Bold size={16} />
                    </Button>
                    <Button
                        {...getBtnProps(editor.isActive('italic'))}
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    >
                        <Italic size={16} />
                    </Button>
                    <Button
                        {...getBtnProps(editor.isActive('underline'))}
                        onClick={() =>
                            editor.chain().focus().toggleUnderline().run()
                        }
                    >
                        <UnderlineIcon size={16} />
                    </Button>
                    <Button
                        {...getBtnProps(editor.isActive('strike'))}
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                    >
                        <Strikethrough size={16} />
                    </Button>
                    <Button
                        {...getBtnProps(editor.isActive('highlight'))}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHighlight({ color: '#fef08a' })
                                .run()
                        }
                    >
                        <Highlighter size={16} />
                    </Button>

                    <Divider orientation="vertical" className="h-5 mx-1" />

                    {/* Link Popover */}
                    <Popover
                        isOpen={isLinkOpen}
                        onOpenChange={setIsLinkOpen}
                        placement="bottom"
                    >
                        <PopoverTrigger>
                            <Button
                                {...getBtnProps(editor.isActive('link'))}
                                onClick={openLinkPopover}
                            >
                                <Link2 size={16} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="flex flex-col gap-4 p-4 w-full">
                                <h3 className="text-sm font-semibold">
                                    Insert Link
                                </h3>
                                <Input
                                    label="URL"
                                    placeholder="https://..."
                                    value={linkUrl}
                                    onValueChange={setLinkUrl}
                                    size="sm"
                                    variant="flat"
                                />
                                <Input
                                    label="Display Text"
                                    placeholder="Click here..."
                                    value={linkText}
                                    onValueChange={setLinkText}
                                    size="sm"
                                    variant="flat"
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <Button
                                        size="sm"
                                        variant="light"
                                        onClick={() => setIsLinkOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        onClick={saveLink}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Image Upload Trigger */}
                    <Button
                        {...getBtnProps(false)}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <ImageIcon size={16} />
                    </Button>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center gap-1 flex-wrap">
                    <Button
                        {...getBtnProps(editor.isActive('bulletList'))}
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        <List size={16} />
                    </Button>
                    <Button
                        {...getBtnProps(editor.isActive('orderedList'))}
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                    >
                        <ListOrdered size={16} />
                    </Button>

                    <Divider orientation="vertical" className="h-5 mx-1" />

                    {/* Indent / Outdent */}
                    <Button
                        {...getBtnProps(false)}
                        onClick={() =>
                            (editor.chain().focus() as any).outdent().run()
                        }
                    >
                        <OutdentIcon size={16} />
                    </Button>
                    <Button
                        {...getBtnProps(false)}
                        onClick={() =>
                            (editor.chain().focus() as any).indent().run()
                        }
                    >
                        <IndentIcon size={16} />
                    </Button>

                    <Divider orientation="vertical" className="h-5 mx-1" />

                    <Button
                        {...getBtnProps(editor.isActive({ textAlign: 'left' }))}
                        onClick={() =>
                            editor.chain().focus().setTextAlign('left').run()
                        }
                    >
                        <AlignLeft size={16} />
                    </Button>
                    <Button
                        {...getBtnProps(
                            editor.isActive({ textAlign: 'center' })
                        )}
                        onClick={() =>
                            editor.chain().focus().setTextAlign('center').run()
                        }
                    >
                        <AlignCenter size={16} />
                    </Button>
                    <Button
                        {...getBtnProps(
                            editor.isActive({ textAlign: 'right' })
                        )}
                        onClick={() =>
                            editor.chain().focus().setTextAlign('right').run()
                        }
                    >
                        <AlignRight size={16} />
                    </Button>
                    <Button
                        {...getBtnProps(
                            editor.isActive({ textAlign: 'justify' })
                        )}
                        onClick={() =>
                            editor.chain().focus().setTextAlign('justify').run()
                        }
                    >
                        <AlignJustify size={16} />
                    </Button>

                    <Divider orientation="vertical" className="h-5 mx-1" />

                    {/* Columns */}
                    <Button
                        {...getBtnProps(false)}
                        title="2 Columns"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .insertContent(
                                    `<div data-type="column-block"><div data-type="column"><p></p></div><div data-type="column"><p></p></div></div>`
                                )
                                .run()
                        }
                    >
                        <Columns2 size={16} />
                    </Button>
                    <Button
                        {...getBtnProps(false)}
                        title="3 Columns"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .insertContent(
                                    `<div data-type="column-block"><div data-type="column"><p></p></div><div data-type="column"><p></p></div><div data-type="column"><p></p></div></div>`
                                )
                                .run()
                        }
                    >
                        <Columns3 size={16} />
                    </Button>

                    <Divider orientation="vertical" className="h-5 mx-1" />

                    <Button
                        {...getBtnProps(false)}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .clearNodes()
                                .unsetAllMarks()
                                .run()
                        }
                    >
                        <RemoveFormatting size={16} />
                    </Button>
                </div>
            </div>

            {/* EDITOR CONTENT AREA */}
            <div className="flex-1 overflow-y-auto bg-white cursor-text p-6 lg:p-10">
                <EditorContent
                    editor={editor}
                    className="h-full min-h-[500px]"
                />
            </div>
        </div>
    )
}
