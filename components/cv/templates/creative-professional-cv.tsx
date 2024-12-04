'use client';

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, ChevronDown } from 'lucide-react'
import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons"

import Image from 'next/image'
import { CvPreviewProps, Field, Section } from '@/types/cvForm';
import { usePersonalInfoContext } from '@/contexts/cvPersonalInfo';

// TODO: drill da props
export function CreativeProfessionalCv ({ items }: CvPreviewProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fields = items.filter((item): item is Field => item.type === 'field');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sections = items.filter((item): item is Section => item.type === 'section');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fullName, initials, jobTitle } = usePersonalInfoContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-8">
      <Card className="w-full max-w-4xl mx-auto overflow-hidden bg-white shadow-xl">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1 bg-teal-600 p-6 text-white">
              <div className="space-y-6">
                <div className="relative">
                  <div className="w-32 h-32 mx-auto overflow-hidden rounded-full border-4 border-white shadow-inner">
                    <Image 
                      src="/placeholder.svg?height=300&width=300" 
                      alt="Jane Professional" 
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl transform rotate-12">
                    10+
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold">Jane Professional</h1>
                  <p className="text-teal-200 font-medium">Marketing Specialist</p>
                </div>
                <Separator className="bg-teal-400" />
                <div className="space-y-2 text-sm">
                  {[
                    { icon: Mail, text: 'jane@professional.com' },
                    { icon: Phone, text: '+1 (555) 123-4567' },
                    { icon: MapPin, text: 'New York City, NY' },
                    { icon: LinkedInLogoIcon, text: 'linkedin.com/in/janepro' },
                    { icon: GitHubLogoIcon, text: 'github.com/janepro' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-teal-100">
                      <item.icon className="w-4 h-4" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
                <Separator className="bg-teal-400" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Data Analysis", 
                      "Project Management", "Adobe Creative Suite", "Google Analytics", "Email Marketing", "CRM"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-teal-500 text-white hover:bg-teal-400 transition-colors">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 p-6 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-teal-600 mb-2">Professional Summary</h2>
                <p className="text-gray-600">
                  Experienced marketing specialist with a proven track record in developing and implementing 
                  successful digital marketing strategies. Skilled in SEO, content creation, and data analysis, 
                  with a passion for driving brand awareness and customer engagement. Adept at managing multiple 
                  projects and collaborating with cross-functional teams to achieve marketing objectives.
                </p>
              </section>

              {['experience', 'education', 'certifications'].map((section) => (
                <motion.section key={section} animate={{ height: expandedSection === section ? 'auto' : '60px' }} className="overflow-hidden">
                  <div 
                    className="flex justify-between items-center cursor-pointer" 
                    onClick={() => toggleSection(section)}
                  >
                    <h2 className="text-xl font-bold text-teal-600 capitalize">{section}</h2>
                    <ChevronDown className={`w-6 h-6 text-teal-600 transform transition-transform ${expandedSection === section ? 'rotate-180' : ''}`} />
                  </div>
                  <div className="mt-4 space-y-4">
                    {section === 'experience' && (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Senior Marketing Specialist</h3>
                          <p className="text-sm text-teal-600">TechGrowth Solutions | 2019 - Present</p>
                          <ul className="list-disc list-inside mt-2 text-gray-600">
                            <li>Led digital marketing campaigns resulting in a 40% increase in online conversions</li>
                            <li>Developed and implemented SEO strategies, improving organic traffic by 55%</li>
                            <li>Managed a team of 5 marketing professionals, overseeing content creation and social media strategies</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Marketing Coordinator</h3>
                          <p className="text-sm text-teal-600">InnovateMark Agency | 2016 - 2019</p>
                          <ul className="list-disc list-inside mt-2 text-gray-600">
                            <li>Assisted in the development and execution of marketing plans for diverse client portfolios</li>
                            <li>Conducted market research and competitor analysis to inform marketing strategies</li>
                            <li>Collaborated with the design team to create engaging marketing materials and social media content</li>
                          </ul>
                        </div>
                      </>
                    )}
                    {section === 'education' && (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Master of Science in Marketing</h3>
                          <p className="text-sm text-teal-600">New York University | 2014 - 2016</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Bachelor of Business Administration</h3>
                          <p className="text-sm text-teal-600">University of Pennsylvania | 2010 - 2014</p>
                        </div>
                      </>
                    )}
                    {section === 'certifications' && (
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Google Analytics Individual Qualification (GAIQ)</li>
                        <li>HubSpot Inbound Marketing Certification</li>
                        <li>Employee of the Year, TechGrowth Solutions (2021)</li>
                        <li>Best Digital Campaign Award, Marketing Excellence Awards (2020)</li>
                      </ul>
                    )}
                  </div>
                </motion.section>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}