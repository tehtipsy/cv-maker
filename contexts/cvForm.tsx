'use client'

import { createContext, ReactNode, useState } from "react";

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

export enum TemplateTypes {
  professional = 'professional',
  creative = 'creative',
  academic = 'academic',
}

export type Template = TemplateTypes

export enum PreviewIcons {
  file = '/file.svg',
  window = '/window.svg',
  globe = '/globe.svg',
  next = '/next.svg',
  vercel = '/vercel.svg',
  email = '/email.svg',
  location = '/location.svg',
  phone = '/phone.svg',
  tealRect = '/teal-rect.svg',
  hat = '/hat.svg',
  github = '/github.svg',
  facebook = '/facebook.svg',
  insta = '/insta.svg',
  linked = '/linkedin.svg',
  telegram = '/telegram.svg',
  cert = '/cert.svg',
  locked = '/locked.svg',
  unlocked = '/unlocked.svg',
  user = '/user.svg',
}

export enum FieldNames {
  Name = 'Full Name',
  Email = 'Email',
  Phone = 'Phone',
  Location = 'Location',
  Git = 'Git',
  Meta = 'Facebook',
  Instagram = 'Instagram',
  Linkedin = 'LinkedIn',
  Telegram = 'Telegram',
  Website = 'Website',
}

export const mandatoryFields = [
  { id: "1", name: FieldNames.Name, value: "", icon: PreviewIcons.user },
  { id: "2", name: FieldNames.Email, value: "", icon: PreviewIcons.email },
  { id: "3", name: FieldNames.Phone, value: "", icon: PreviewIcons.phone },
]

export const optionalFields = [
  { id: "4", name: FieldNames.Location, value: "", icon: PreviewIcons.location },
  { id: "5", name: FieldNames.Git, value: "", icon: PreviewIcons.github },
  { id: "6", name: FieldNames.Meta, value: "", icon: PreviewIcons.facebook },
  { id: "7", name: FieldNames.Instagram, value: "", icon: PreviewIcons.insta },
  { id: "8", name: FieldNames.Linkedin, value: "", icon: PreviewIcons.linked },
  { id: "9", name: FieldNames.Telegram, value: "", icon: PreviewIcons.telegram },
  { id: "10", name: FieldNames.Website, value: "", icon: PreviewIcons.globe },
]

export const defaultFields = [
  ...mandatoryFields,
  ...optionalFields
]

export enum SectionNames {
  Summary = 'Summary',
  Experience = 'Experience',
  Education = 'Education',
  Certifications = 'Certifications',
}

export const mandatorySections = [
  { id: "b", title: SectionNames.Experience, content: "", icon: PreviewIcons.file },
  { id: "c", title: SectionNames.Education, content: "", icon: PreviewIcons.hat },
]

export const optionalSections = [
  { id: "a", title: SectionNames.Summary, content: "", icon: PreviewIcons.file },
  { id: "d", title: SectionNames.Certifications, content: "", icon: PreviewIcons.cert },
]

export const defaultSections = [
  ...mandatorySections,
  ...optionalSections,
]

type FormContextProps = {
  fields: Field[]
  setFields: (fields: Field[]) => void
  sections: Section[]
  setSections: (sections: Section[]) => void
  template: Template
  setTemplate: (template: Template) => void
  refreshKey: number,
  setRefreshKey: (refreshKey: number) => void
}

export const FormContext = createContext<FormContextProps>({
  fields: defaultFields,
  setFields: () => { },
  sections: defaultSections,
  setSections: () => { },
  template: TemplateTypes.professional,
  setTemplate: () => { },
  refreshKey: 0,
  setRefreshKey: () => { }
});

interface FormContextProviderProps {
  children: ReactNode;
}

export const FormContextProvider = (props: FormContextProviderProps) => {
  const [fields, setFields] = useState<Field[]>(defaultFields)
  const [sections, setSections] = useState<Section[]>(defaultSections)
  const [template, setTemplate] = useState<Template>(TemplateTypes.professional)
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <FormContext.Provider
      value={{
        fields,
        setFields,
        sections,
        setSections,
        template,
        setTemplate,
        refreshKey,
        setRefreshKey
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};