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

export enum SectionNames {
  Summary = 'Summary',
  Experience = 'Experience',
  Education = 'Education',
  Certifications = 'Certifications',
}

export type CvPreviewProps = {
  items: (Field | Section)[]
}