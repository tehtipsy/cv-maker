"use client"

import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CVPreview from "@/components/ui/cv-preview"
import RichTextEditor from "@/components/ui/rich-text-editor"

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

enum TemplateTypes {
  professional = 'professional',
  creative = 'creative',
  academic = 'academic',
}

export type Template = TemplateTypes

enum PreviewIcons {
  file = '/file.svg',
  window = '/window.svg',
  globe = '/globe.svg',
  next = '/next.svg',
  vercel = '/vercel.svg',
  email = '/email.svg',
  location = '/location.svg',
  phone = '/phone.svg',
  tealRect = '/teal-rect.svg',
}

enum FieldNames {
  Name = 'Full Name',
  Email = 'Email',
  Phone = 'Phone',
  Location = 'Location',
  Git = 'Git',
  Meta = 'Meta',
  Instagram = 'Instagram',
  Linkedin = 'Linkedin',
  Telegram = 'Telegram',
  Website = 'Website',
}

const mandatoryFields = [
  { id: "1", name: FieldNames.Name, value: "", icon: PreviewIcons.file },
  { id: "2", name: FieldNames.Email, value: "", icon: PreviewIcons.email },
  { id: "3", name: FieldNames.Phone, value: "", icon: PreviewIcons.phone },
]

const optionalFields = [
  { id: "4", name: FieldNames.Location, value: "", icon: PreviewIcons.location },
  { id: "5", name: FieldNames.Git, value: "", icon: PreviewIcons.globe },
  { id: "6", name: FieldNames.Meta, value: "", icon: PreviewIcons.globe },
  { id: "7", name: FieldNames.Instagram, value: "", icon: PreviewIcons.globe },
  { id: "8", name: FieldNames.Linkedin, value: "", icon: PreviewIcons.globe },
  { id: "9", name: FieldNames.Telegram, value: "", icon: PreviewIcons.globe },
  { id: "10", name: FieldNames.Website, value: "", icon: PreviewIcons.globe },
]

const defaultFields = [
  ...mandatoryFields,
  ...optionalFields
]

enum SectionNames {
  Summary = 'Summary',
  Experience = 'Experience',
  Education = 'Education',
  Certifications = 'Certifications',
}

const mandatorySections = [
  { id: "2", title: SectionNames.Experience, content: "", icon: PreviewIcons.file },
  { id: "3", title: SectionNames.Education, content: "", icon: PreviewIcons.file },
]

const optionalSections = [
  { id: "1", title: SectionNames.Summary, content: "", icon: PreviewIcons.file },
  { id: "4", title: SectionNames.Certifications, content: "", icon: PreviewIcons.file },
]

const defaultSections = [
  ...mandatorySections,
  ...optionalSections,
]

export function CvMaker() {
  const [fields, setFields] = useState<Field[]>(defaultFields)
  const [sections, setSections] = useState<Section[]>(defaultSections)
  const [template, setTemplate] = useState<Template>(TemplateTypes.professional)
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
    const email = fields.find((field) => { if (field.name === FieldNames.Email) return field.value })
    const phone = fields.find((field) => { if (field.name === FieldNames.Phone) return field.value })
    const name = fields.find((field) => { if (field.name === FieldNames.Name) return field.value })

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