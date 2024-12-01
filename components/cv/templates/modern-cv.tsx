'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

import { Field, FieldNames, PreviewIcons, Section } from "@/lib/cvFields"

import { MapPin } from "lucide-react"
import {
  LinkedInLogoIcon,
  MobileIcon,
  EnvelopeClosedIcon,
  InstagramLogoIcon,
  GitHubLogoIcon,
  GlobeIcon,
  VercelLogoIcon,
  FileIcon
} from "@radix-ui/react-icons"

import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm' // remove from dependencies

import { getValuesFromFields } from "@/lib/cvFields"
const ModernIcons: Record<string, React.ReactNode> = {
  [PreviewIcons.file]: <FileIcon className="h-3 w-3" />,
  // [PreviewIcons.window]: 'window',
  [PreviewIcons.globe]: <GlobeIcon className="h-3 w-3" />,
  // [PreviewIcons.next]: 'next',
  [PreviewIcons.vercel]: <VercelLogoIcon className="h-3 w-3" />,
  [PreviewIcons.email]: <EnvelopeClosedIcon className="h-3 w-3" />,
  [PreviewIcons.location]: <MapPin className="h-3 w-3" />,
  [PreviewIcons.phone]: <MobileIcon className="h-3 w-3" />,
  // [PreviewIcons.hat]: 'hat',
  [PreviewIcons.github]: <GitHubLogoIcon className="h-3 w-3" />,
  // [PreviewIcons.facebook]: <svg xmlns="http://www.w3.org/2000/svg" height="10" width="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  [PreviewIcons.insta]: <InstagramLogoIcon className="h-3 w-3" />,
  [PreviewIcons.linked]: <LinkedInLogoIcon className="h-3 w-3" />,
  // [PreviewIcons.telegram]: 'telegram',
  // [PreviewIcons.cert]: 'cert',
  // [PreviewIcons.locked]: 'locked',
  // [PreviewIcons.unlocked]: 'unlocked',
  // [PreviewIcons.user]: 'user',
}

const nonSwapyFieldNames = [FieldNames.Name, FieldNames.Title]

export default function ModernCvTemplate ({ items }: { items: (Field | Section)[] }) {
  const fields = items.filter((item): item is Field => item.type === 'field');
  const sections = items.filter((item): item is Section => item.type === 'section');
  const { fullName, initials, jobTitle } = getValuesFromFields(fields)

  return (
    <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
      <main className="container mx-auto space-y-6">
        <Card className="overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              {initials &&
                <Avatar key={initials} className="h-24 w-24">
                  <AvatarImage
                    alt={initials}
                    src="/placeholder.svg?height=96&width=96"
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              }
              <div className="space-y-2">
                {fullName && <h1 className="text-3xl font-bold">{fullName}</h1>}
                {jobTitle && <p className="text-xl text-muted-foreground">{jobTitle}</p>}
                <div className="flex flex-wrap gap-2">
                  {fields && fields.map((field, index) => {
                    if (!nonSwapyFieldNames.includes(field.name as FieldNames) && field.value) 
                      return (
                        <div
                          key={`${index}-slot-key`}
                          data-swapy-slot={index}
                        >
                          <Badge
                            key={index}
                            data-swapy-item={field.id}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {field.icon && ModernIcons[field.icon]}
                            {field.value}
                          </Badge>
                        </div>
                      )
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
          {sections && sections.map((section, index) => {
            return (
              <div
                key={`${index}-section-slot-key`}
                data-swapy-slot={`${index}-section-slot`}
              >
                <Card
                  key={section.id}
                  data-swapy-item={section.id}
                  className="col-span-2"
                >
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ReactMarkdown
                      // remarkPlugins={[remarkGfm]}
                      components={{
                        hr: ({ ...props }) => <Separator {...props} />,
                        h1: ({ ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                        h2: ({ ...props }) => <h2 className="text-xl font-semibold mt-3 mb-2" {...props} />,
                        h3: ({ ...props }) => <h3 className="text-lg font-medium mt-2 mb-1" {...props} />,
                        ul: ({ ...props }) => <ul className="list-disc list-outside pl-5 mb-2" {...props} />,
                        ol: ({ ...props }) => <ol className="list-decimal list-outside pl-5 mb-2" {...props} />,
                        li: ({ ...props }) => <li className="mb-1" {...props} />,
                        p: ({ ...props }) => <p className="mb-2" {...props} />,
                        a: ({ ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
                      }}
                    >
                      {section.content}
                    </ReactMarkdown>
                  </CardContent>
                </Card>
              </div>
            )
          })}

          {/* <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Experienced software engineer with a strong background in full-stack development, cloud technologies, and agile
                methodologies. Passionate about creating scalable and efficient solutions to complex problems. Proven track
                record of leading teams and delivering high-quality projects on time.
              </p>
            </CardContent>
          </Card>

          <Card className="col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold">Senior Software Engineer</h3>
                <p className="text-sm text-muted-foreground">TechCorp Inc. | 2018 - Present</p>
                <ul className="mt-2 list-inside list-disc text-sm">
                  <li>Led the development of a microservices-based e-commerce platform</li>
                  <li>Implemented CI/CD pipelines, reducing deployment time by 50%</li>
                  <li>Mentored junior developers and conducted code reviews</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold">Software Engineer</h3>
                <p className="text-sm text-muted-foreground">InnoSoft Solutions | 2015 - 2018</p>
                <ul className="mt-2 list-inside list-disc text-sm">
                  <li>Developed and maintained multiple web applications using React and Node.js</li>
                  <li>Optimized database queries, improving application performance by 30%</li>
                  <li>Collaborated with cross-functional teams to deliver projects on schedule</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold">Master of Science in Computer Science</h3>
                <p className="text-sm text-muted-foreground">Stanford University | 2013 - 2015</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold">Bachelor of Science in Computer Engineering</h3>
                <p className="text-sm text-muted-foreground">University of California, Berkeley | 2009 - 2013</p>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Node.js",
                  "Python",
                  "AWS",
                  "Docker",
                  "Kubernetes",
                  "GraphQL",
                  "MongoDB",
                  "PostgreSQL",
                  "Git",
                  "CI/CD",
                  "Agile",
                  "Scrum",
                ].map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold">E-commerce Platform Redesign</h3>
                <p className="text-sm">{`Led a team of 5 developers to redesign and optimize the company's e-commerce platform,
                  resulting in a 25% increase in conversion rates.`}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold">AI-powered Chatbot</h3>
                <p className="text-sm">Developed a customer service chatbot using natural language processing, reducing
                  support ticket volume by 40%.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 md:col-span-1">
            <CardHeader>
              <CardTitle>Awards and Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold">AWS Certified Solutions Architect</h3>
                <p className="text-sm text-muted-foreground">Amazon Web Services | 2020</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold">Employee of the Year</h3>
                <p className="text-sm text-muted-foreground">TechCorp Inc. | 2019</p>
              </div>
            </CardContent>
          </Card> */}

        </div>
      </main>
    </div>
  )
}