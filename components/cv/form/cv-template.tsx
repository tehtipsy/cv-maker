'use client';

import { Template, TemplateTypes } from "@/lib/cvFields"
import { useFormContext } from "@/contexts/cvForm"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CvTemplate () {
  const { template, setTemplate } = useFormContext()

  return (
    <div>
      <Label htmlFor="template">Choose a template</Label>
      <Select value={template} onValueChange={(value: Template) => setTemplate(value)}>
        <SelectTrigger id="template">
          <SelectValue placeholder="Select a template" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(TemplateTypes).map((value) => {
            return (
              <SelectItem key={value} value={value}>{value[0].toUpperCase() + value.slice(1)}</SelectItem>
          )})}
        </SelectContent>
      </Select>
    </div>
  )
}