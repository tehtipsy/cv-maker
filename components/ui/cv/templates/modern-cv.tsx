'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Phone, MapPin } from "lucide-react"
import { EnvelopeClosedIcon } from "@radix-ui/react-icons"

export function ModernCv() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
      <main className="container mx-auto space-y-6">
        <Card className="overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <Avatar className="h-24 w-24">
                <AvatarImage alt="John Doe" src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">John Doe</h1>
                <p className="text-xl text-muted-foreground">Senior Software Engineer</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <EnvelopeClosedIcon className="h-3 w-3" />
                    john.doe@example.com
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    (123) 456-7890
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    San Francisco, CA
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    linkedin.com/in/johndoe
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    github.com/johndoe
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-2">
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
          </Card>
        </div>
      </main>
    </div>
  )
}