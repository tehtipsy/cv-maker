'use client';

import { useContext, useState } from "react";
import { FormContext, mandatorySections, PreviewIcons } from "@/contexts/cvForm";
import { FormRefreshContext } from "@/contexts/cvFormRefresh";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/cv/rich-text-editor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react";

export default function CvSections () {
  const { sections, setSections } = useContext(FormContext)
  const { setRefreshKey } = useContext(FormRefreshContext);
  const [newSectionTitle, setNewSectionTitle] = useState("")

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
    setRefreshKey(prevKey => prevKey + 1)
  }

  const updateSectionContent = (id: string, content: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, content } : section)))
  }

  return (
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
  )
}