export type Field = {
  type: string
  id: string
  name: string
  value: string
  icon: string
}

export type Section = {
  type: string
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
  Title = 'Job Title',
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
  { type: "field", id: "1", name: FieldNames.Name, value: "", icon: PreviewIcons.user },
  { type: "field", id: "2", name: FieldNames.Email, value: "", icon: PreviewIcons.email },
  { type: "field", id: "3", name: FieldNames.Phone, value: "", icon: PreviewIcons.phone },
]

export const optionalFields = [
  { type: "field", id: "4", name: FieldNames.Location, value: "", icon: PreviewIcons.location },
  { type: "field", id: "5", name: FieldNames.Git, value: "", icon: PreviewIcons.github },
  { type: "field", id: "6", name: FieldNames.Meta, value: "", icon: PreviewIcons.facebook },
  { type: "field", id: "7", name: FieldNames.Instagram, value: "", icon: PreviewIcons.insta },
  { type: "field", id: "8", name: FieldNames.Linkedin, value: "", icon: PreviewIcons.linked },
  { type: "field", id: "9", name: FieldNames.Telegram, value: "", icon: PreviewIcons.telegram },
  { type: "field", id: "10", name: FieldNames.Website, value: "", icon: PreviewIcons.globe },
  { type: "field", id: "11", name: FieldNames.Title, value: "", icon: PreviewIcons.globe },
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
  { type: "section", id: "b", title: SectionNames.Experience, content: "", icon: PreviewIcons.file },
  { type: "section", id: "c", title: SectionNames.Education, content: "", icon: PreviewIcons.hat },
]

export const optionalSections = [
  { type: "section", id: "a", title: SectionNames.Summary, content: "", icon: PreviewIcons.file },
  { type: "section", id: "d", title: SectionNames.Certifications, content: "", icon: PreviewIcons.cert },
]

export const defaultSections = [
  ...mandatorySections,
  ...optionalSections,
]

const nameDelimiterRegex = /[\s.,\-_]+/;
const wordLimit = 4;

export const getInitials = (fullName: string | undefined) =>
  fullName?.split(nameDelimiterRegex, wordLimit)?.map((string) =>
    string?.[0]?.toLocaleUpperCase()
  )?.join('');

export function getValuesFromFields (fields: Field[]) {
  const nameField = fields?.find((field) =>
    field.name === FieldNames.Name
  )
  const fullName = nameField?.value
  const initials = getInitials(fullName)

  const titleField = fields?.find((field) =>
    field.name === FieldNames.Title
  )
  const jobTitle = titleField?.value

  return { fullName, initials, jobTitle }
}