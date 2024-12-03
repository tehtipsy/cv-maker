'use client';

import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from "@tiptap/react"
import { Bold, Italic } from "lucide-react"
import { Button } from "@/components/ui/button"

const RichTextEditor = ({ content, onChange }: { content: string, onChange: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({
      heading: {
        levels: [1, 2, 3], // Limit to H1-H3
      },
      bulletList: {
        keepMarks: true, // Preserve text formatting in lists
        keepAttributes: true // Preserve other attributes
      }
    })],
    content,
    onUpdate: ({ editor: _editor }) => {
      onChange(_editor.getText())
      // onChange(JSON.stringify(editor.getJSON()))
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[150px] focus:outline-none',
      },
    },
    immediatelyRender: false, // Explicitly set to false when using SSR
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-md p-2 h-full">
      <div className="flex items-center space-x-2 mb-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-muted' : ''}
        >
          <Bold className="h-4 w-4" />
          <span className="sr-only">Toggle bold</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-muted' : ''}
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">Toggle italic</span>
        </Button>
        {/* <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-muted' : ''}
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Toggle bullet list</span>
        </Button> */}
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor