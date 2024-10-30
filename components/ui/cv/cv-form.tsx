// import { Field, Section, Template } from "@/components/cv-maker"
// import { useState } from "react"

// type CvFormProps = {
//   fields: Field[]
//   sections: Section[]
//   template: Template
// }

// export const CvForm: React.FC<CvFormProps> = ({ fields, sections, template }) => {
//   const [fields, setFields] = useState<Field[]>(fields)
//   const [sections, setSections] = useState<Section[]>(sections)
//   const [template, setTemplate] = useState<Template>(template)
//   const [newFieldName, setNewFieldName] = useState("")
//   const [newSectionTitle, setNewSectionTitle] = useState("")
  
//   const addField = () => {
//     if (newFieldName.trim() !== "") {
//       const name = newFieldName.charAt(0).toUpperCase() + newFieldName.slice(1)
//       if (!fields.map((obj) => obj.name).includes(name)) {
//         setFields([...fields, {
//           id: Date.now().toString(),
//           name,
//           icon: fields.filter((field) => field.name === name)?.[0]?.icon ?? PreviewIcons.vercel,
//           value: ""
//         }])
//       }
//       setNewFieldName("")
//     }
//   }

//   const removeField = (id: string) => {
//     setFields(fields.filter((field) => field.id !== id))
//   }

//   const updateFieldValue = (id: string, value: string) => {
//     setFields(fields.map((field) => (field.id === id ? { ...field, value } : field)))
//   }

//   const addSection = () => {
//     if (newSectionTitle.trim() !== "") {
//       const title = newSectionTitle.charAt(0).toUpperCase() + newSectionTitle.slice(1)
//       if (!sections.map((obj) => obj.title).includes(title)) {
//         setSections([...sections, {
//           id: Date.now().toString(),
//           title,
//           icon: sections.filter((section) => section.title === title)?.[0]?.icon ?? PreviewIcons.file,
//           content: ""
//         }])
//       }
//     }
//     setNewSectionTitle("")
//   }

//   const removeSection = (id: string) => {
//     setSections(sections.filter((section) => section.id !== id))
//   }

//   const updateSectionContent = (id: string, content: string) => {
//     setSections(sections.map((section) => (section.id === id ? { ...section, content } : section)))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log("CV Data:", { template, fields, sections })
//     // const email = fields.find((field) => { if (field.name === FieldNames.Email) return field.value })
//     // const phone = fields.find((field) => { if (field.name === FieldNames.Phone) return field.value })
//     // const name = fields.find((field) => { if (field.name === FieldNames.Name) return field.value })

//     // if (email || phone) {
//     //   // Send this data to a server or generate a CV
//     //   console.log(email, phone, name)
//     // }
//   }

//  return ( <form onSubmit={handleSubmit} className="lg:w-1/2 space-y-6">
//     <Card>
//       <CardHeader>
//         <CardTitle>CV Details</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div>
//           <Label htmlFor="template">Choose a template</Label>
//           <Select value={template} onValueChange={(value: Template) => setTemplate(value)}>
//             <SelectTrigger id="template">
//               <SelectValue placeholder="Select a template" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="professional">Professional</SelectItem>
//               <SelectItem value="creative">Creative</SelectItem>
//               <SelectItem value="academic">Academic</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Fields</h3>
//           {fields.map((field) => (
//             <div key={field.id} className="flex items-center space-x-2">
//               <Input
//                 type="text"
//                 value={field.value}
//                 onChange={(e) => updateFieldValue(field.id, e.target.value)}
//                 placeholder={field.name}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     e.preventDefault()
//                   }
//                 }}
//               />
//               {!mandatoryFields.map((field) => field.id).includes(field.id) && (
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => {
//                     console.log(field)
//                     removeField(field.id)
//                   }}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                   <span className="sr-only">Remove field</span>
//                 </Button>
//               )}
//             </div>
//           ))}

//           <div className="flex items-center space-x-2">
//             <Input
//               type="text"
//               value={newFieldName}
//               onChange={(e) => setNewFieldName(e.target.value)}
//               placeholder="New field name"
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   e.preventDefault()
//                   addField()
//                 }
//               }}
//             />
//             <Button type="button" onClick={addField} size="icon">
//               <PlusCircle className="h-4 w-4" />
//               <span className="sr-only">Add field</span>
//             </Button>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Sections</h3>
//           {sections.map((section) => (
//             <Card key={section.id}>
//               <CardHeader className="py-3">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-base">{section.title}</CardTitle>
//                   {!mandatorySections.map((section) => section.id).includes(section.id) && (
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => removeSection(section.id)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                       <span className="sr-only">Remove section</span>
//                     </Button>
//                   )}
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <RichTextEditor
//                   content={section.content}
//                   onChange={(content) => updateSectionContent(section.id, content)}
//                 />
//               </CardContent>
//             </Card>
//           ))}

//           <div className="flex items-center space-x-2">
//             <Input
//               type="text"
//               value={newSectionTitle}
//               onChange={(e) => setNewSectionTitle(e.target.value)}
//               placeholder="New section title"
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   e.preventDefault()
//                   addSection()
//                 }
//               }}
//             />
//             <Button type="button" onClick={addSection} size="icon">
//               <PlusCircle className="h-4 w-4" />
//               <span className="sr-only">Add section</span>
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button type="submit" className="w-full">Generate CV</Button>
//       </CardFooter>
//     </Card>
//   </form>)
// }