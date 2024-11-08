'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

export function TraditionalCv() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="w-full max-w-4xl mx-auto overflow-hidden bg-white shadow-lg">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
              <div className="space-y-6">
                <Image 
                  src="/placeholder.svg?height=300&width=300" 
                  alt="Jane Professional" 
                  className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-md"
                />
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold text-gray-800">Jane Professional</h1>
                  <p className="text-gray-600 font-medium">Marketing Specialist</p>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>jane@professional.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>New York City, NY</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    {/* <Linkedin className="w-4 h-4" /> */}
                    <span>linkedin.com/in/janepro</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    {/* <Github className="w-4 h-4" /> */}
                    <span>github.com/janepro</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Data Analysis", 
                      "Project Management", "Adobe Creative Suite", "Google Analytics", "Email Marketing", "CRM"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-gray-200 text-gray-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Professional Summary</h2>
                <p className="text-gray-600">
                  Experienced marketing specialist with a proven track record in developing and implementing 
                  successful digital marketing strategies. Skilled in SEO, content creation, and data analysis, 
                  with a passion for driving brand awareness and customer engagement. Adept at managing multiple 
                  projects and collaborating with cross-functional teams to achieve marketing objectives.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Work Experience</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Senior Marketing Specialist</h3>
                    <p className="text-sm text-gray-600">TechGrowth Solutions | 2019 - Present</p>
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                      <li>Led digital marketing campaigns resulting in a 40% increase in online conversions</li>
                      <li>Developed and implemented SEO strategies, improving organic traffic by 55%</li>
                      <li>Managed a team of 5 marketing professionals, overseeing content creation and social media strategies</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Marketing Coordinator</h3>
                    <p className="text-sm text-gray-600">InnovateMark Agency | 2016 - 2019</p>
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                      <li>Assisted in the development and execution of marketing plans for diverse client portfolios</li>
                      <li>Conducted market research and competitor analysis to inform marketing strategies</li>
                      <li>Collaborated with the design team to create engaging marketing materials and social media content</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
                <div className="space-y-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Master of Science in Marketing</h3>
                    <p className="text-sm text-gray-600">New York University | 2014 - 2016</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Bachelor of Business Administration</h3>
                    <p className="text-sm text-gray-600">University of Pennsylvania | 2010 - 2014</p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Certifications & Awards</h2>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Google Analytics Individual Qualification (GAIQ)</li>
                  <li>HubSpot Inbound Marketing Certification</li>
                  <li>Employee of the Year, TechGrowth Solutions (2021)</li>
                  <li>Best Digital Campaign Award, Marketing Excellence Awards (2020)</li>
                </ul>
              </section>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}