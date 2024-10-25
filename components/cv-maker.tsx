"use client"

import { useState } from "react"
import {
  PlusCircle,
  Trash2,
  Bold,
  Italic,
  // List
} from "lucide-react"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Field = {
  id: string
  name: string
  value: string
}

type Section = {
  id: string
  title: string
  content: string
}

type Template = "professional" | "creative" | "academic"

const RichTextEditor = ({ content, onChange }: { content: string, onChange: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getText())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[150px] focus:outline-none',
      },
    },
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

const CVPreview = ({ fields, sections, template }: { fields: Field[], sections: Section[], template: Template }) => {
  return (
    <div className={`p-6 border rounded-lg ${template === 'professional' ? 'bg-white' : template === 'creative' ? 'bg-gray-100' : 'bg-blue-50'}`}>
      <h2 className="text-2xl font-bold mb-4">CV Preview</h2>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id}>
            <strong>{field.name}:</strong> {field.value}
          </div>
        ))}
        {sections.map((section) => (
          <div key={section.id}>
            <h3 className="text-xl font-semibold mt-4 mb-2">{section.title}</h3>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                h2: ({ ...props }) => <h2 className="text-xl font-semibold mt-3 mb-2" {...props} />,
                h3: ({ ...props }) => <h3 className="text-lg font-medium mt-2 mb-1" {...props} />,
                ul: ({ ...props }) => <ul className="list-disc list-outside pl-5 mb-2" {...props} />,
                ol: ({ ...props }) => <ol className="list-decimal list-outside pl-5 mb-2" {...props} />,
                li: ({ ...props }) => <li className="mb-1" {...props} />,
                p: ({ ...props }) => <p className="mb-2" {...props} />,
                a: ({ ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
              }}
            >
              {section.content}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CvMaker() {
  const [fields, setFields] = useState<Field[]>([
    { id: "1", name: "Full Name", value: "" },
    { id: "2", name: "Email", value: "" },
    { id: "3", name: "Phone", value: "" },
  ])
  const [sections, setSections] = useState<Section[]>([
    { id: "1", title: "Summary", content: "" },
    { id: "2", title: "Experience", content: "" },
    { id: "3", title: "Education", content: "" },
  ])
  const [template, setTemplate] = useState<Template>("professional")
  const [newFieldName, setNewFieldName] = useState("")
  const [newSectionTitle, setNewSectionTitle] = useState("")

  const addField = () => {
    if (newFieldName.trim() !== "") {
      const name = newFieldName.charAt(0).toUpperCase() + newFieldName.slice(1)
      if (!fields.map((obj) => obj.name).includes(name)) {
        setFields([...fields, {
          id: Date.now().toString(),
          name,
          value: ""
        }])
      }
      setNewFieldName("")
    }
  }

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id))
  }

  const updateFieldValue = (id: string, value: string) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, value } : field)))
  }

  const addSection = () => {
    if (newSectionTitle.trim() !== "") {
      const title = newSectionTitle.charAt(0).toUpperCase() + newSectionTitle.slice(1)
      if (!sections.map((obj) => obj.title).includes(title)) {
        setSections([...sections, {
          id: Date.now().toString(),
          title,
          content: ""
        }])
      }
    }
    setNewSectionTitle("")
  }

  const removeSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id))
  }

  const updateSectionContent = (id: string, content: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, content } : section)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("CV Data:", { template, fields, sections })
    // Send this data to a server or generate a CV
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">CV Maker</h1>
      <div className="lg:flex lg:space-x-6">
        <form onSubmit={handleSubmit} className="lg:w-1/2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CV Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="template">Choose a template</Label>
                <Select value={template} onValueChange={(value: Template) => setTemplate(value)}>
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Fields</h3>
                {fields.map((field) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={field.value}
                      onChange={(e) => updateFieldValue(field.id, e.target.value)}
                      placeholder={field.name}
                    />
                    {field.id !== "1" && field.id !== "2" && field.id !== "3" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeField(field.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove field</span>
                      </Button>
                    )}
                  </div>
                ))}
                
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    placeholder="New field name"
                  />
                  <Button type="button" onClick={addField} size="icon">
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only">Add field</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sections</h3>
                {sections.map((section) => (
                  <Card key={section.id}>
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{section.title}</CardTitle>
                        {section.id !== "1" && section.id !== "2" && section.id !== "3" && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSection(section.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove section</span>
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <RichTextEditor
                        content={section.content}
                        onChange={(content) => updateSectionContent(section.id, content)}
                      />
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    placeholder="New section title"
                  />
                  <Button type="button" onClick={addSection} size="icon">
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only">Add section</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Generate CV</Button>
            </CardFooter>
          </Card>
        </form>
        <div className="lg:w-1/2 mt-6 lg:mt-0">
          <CVPreview fields={fields} sections={sections} template={template} />
        </div>
      </div>
    </div>
  )
}