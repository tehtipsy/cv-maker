'use client';

import { FieldNames } from "@/lib/cvFields"
import { useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormContext } from "@/contexts/cvForm"
import CvTemplate from "@/components/cv/form/cv-template";
import CvFields from "@/components/cv/form/cv-fields";
import CvSections from "@/components/cv/form/cv-sections";

const CvForm: React.FC = () => {
  const { fields, sections, template } = useContext(FormContext)

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
    <form onSubmit={handleSubmit} className="lg:w-1/2 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>CV Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CvTemplate />
          <CvFields />
          <CvSections />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Generate CV</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default CvForm