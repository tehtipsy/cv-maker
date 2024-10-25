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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CVPreview from "@/components/ui/cv-preview"

export type Field = {
  id: string
  name: string
  value: string
  icon: string
}

export type Section = {
  id: string
  title: string
  content: string
  icon: string
}

export type Template = "professional" | "creative" | "academic"

enum PreviewIcons {
  file = '/file.svg',
  window = '/window.svg',
  globe = '/globe.svg',
  next = '/next.svg',
  vercel = '/vercel.svg',
}

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

const mandatoryFields = [
  { id: "1", name: "Full Name", value: "", icon: PreviewIcons.file },
  { id: "2", name: "Email", value: "", icon: PreviewIcons.window },
  { id: "3", name: "Phone", value: "", icon: PreviewIcons.globe },
]

const optionalFields = [
  { id: "4", name: "Location", value: "", icon: PreviewIcons.globe },
  { id: "5", name: "Git", value: "", icon: PreviewIcons.globe },
  { id: "6", name: "Meta", value: "", icon: PreviewIcons.globe },
  { id: "7", name: "Instagram", value: "", icon: PreviewIcons.globe },
  { id: "8", name: "Linkedin", value: "", icon: PreviewIcons.globe },
  { id: "9", name: "Telegram", value: "", icon: PreviewIcons.globe },
  { id: "10", name: "Website", value: "", icon: PreviewIcons.globe },
]

const defaultFields = [
  ...mandatoryFields,
  ...optionalFields
]

const mandatorySections = [
  { id: "2", title: "Experience", content: "", icon: PreviewIcons.file },
  { id: "3", title: "Education", content: "", icon: PreviewIcons.file },
]

const optionalSections = [
  { id: "1", title: "Summary", content: "", icon: PreviewIcons.file },
  { id: "4", title: "Certifications", content: "", icon: PreviewIcons.file },
]

const defaultSections = [
  ...mandatorySections,
  ...optionalSections,
]

export function CvMaker() {
  const [fields, setFields] = useState<Field[]>(defaultFields)
  const [sections, setSections] = useState<Section[]>(defaultSections)
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
          icon: fields.filter((field) => field.name === name)?.[0]?.icon ?? PreviewIcons.vercel,
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
          icon: sections.filter((section) => section.title === title)?.[0]?.icon ?? PreviewIcons.file,
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
    const email = fields.find((field) => { if (field.name === 'Email') return field.value })
    const phone = fields.find((field) => { if (field.name === 'Phone') return field.value })
    const name = fields.find((field) => { if (field.name === 'Full Name') return field.value })

    if (email || phone) {
      // Send this data to a server or generate a CV
      console.log(email, phone, name)
    }
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
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                        }
                      }}
                    />
                    {!mandatoryFields.map((field) => field.id).includes(field.id) && (
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addField()
                      }
                    }}
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
                        {!mandatorySections.map((section) => section.id).includes(section.id) && (
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addSection()
                      }
                    }}
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