import { FieldNames, PreviewIcons, SectionNames } from "@/types/cvForm"

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