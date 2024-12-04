'use client';

import { Field, Section, TemplateTypes } from "@/types/cvForm"
import { useEffect, useRef, useState } from 'react'
import { createSwapy, type Swapy } from 'swapy'
import { Button } from '@/components/ui/button'
// import RenderPreviewItem from '@/components/cv/cv-preview-items'
import { useSwapyMapContext } from '@/contexts/cvPreviewOrdering'
import Image from 'next/image'
import { useFormContext } from '@/contexts/cvForm'
import ModernCvTemplate from '@/components/cv/templates/modern-cv';
import { CreativeProfessionalCv } from '@/components/cv/templates/creative-professional-cv';
import { TraditionalCv } from '@/components/cv/templates/traditional-cv';

export default function CvPreview () {
  const { fields, sections, template } = useFormContext();
  const [items, setItems] = useState<(Field | Section)[]>([...fields, ...sections])
  const [isUnlocked, setIsUnlocked] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const { map, setMap } = useSwapyMapContext()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const swapyRef = useRef<Swapy | null>(null)
  const mapRef = useRef(map)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // useEffect(() => {
  //   console.log('Items Ordering: ', map, setMap)
  // })

  useEffect(() => {
    if (mapRef.current) {
      const ordering = Object.fromEntries(
        Object.entries(mapRef.current).map(([key, value]) => [value, key])
      )
      setItems([...fields, ...sections].sort((a, b) => ordering[a.id] - ordering[b.id]))
    } else {
      setItems([...fields, ...sections])
    }
  }, [fields, sections])

  // Initialize Swapy AFTER component is mounted
  useEffect(() => {
    if (!isMounted) return

    if (containerRef.current && !swapyRef.current) {
      try {
        swapyRef.current = createSwapy(containerRef.current, {
          animation: 'dynamic'
        })

        swapyRef.current.onSwapStart(() => {
          // Set initial items ordering Ref?
          console.log('Swap Start Event')
        })

        swapyRef.current.onSwap((event) => {
          console.log('Swap Event: ', event.data)
        })

        swapyRef.current.onSwapEnd((event) => {
          console.log('Swap End Event Data: ', event.data)
          setMap(event.data.object)
        })

        if (swapyRef.current) {
          swapyRef.current.enable(true)
        }
      } catch (error) {
        console.error('Swapy initialization error:', error)
      }
    }

    // Destroy swapy Instance AFTER onSwapEnd
    return () => {
      if (swapyRef.current) {
        swapyRef.current.destroy()
      }
    }
  }, [isMounted, setMap])

  useEffect(() => {
    if (swapyRef.current) {
      swapyRef.current.enable(isUnlocked)
    }
  }, [isUnlocked])

  const templateType = (template: TemplateTypes, items: (Field | Section)[]) => {
    switch (template) {
      case TemplateTypes.professional:
        return <ModernCvTemplate items={items} />;
      case TemplateTypes.creative:
        return <CreativeProfessionalCv items={items} />;
      case TemplateTypes.academic:
        return <TraditionalCv items={items} />;
      // default:
      //   return <span>Unknown</span>;
    }
  }

  return (
    <div className={`p-6 border rounded-lg`}>
      <div className='flex flex-row items-center justify-center'>
        <h3 className="font-semibold m-4">CV Preview</h3>
        <Button
          onClick={() => setIsUnlocked(!isUnlocked)}
          className="m-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Image
            className="dark:invert"
            src={isUnlocked ? '/unlocked.svg' : '/locked.svg'}
            alt={isUnlocked ? 'Lock' : 'Unlock'}
            width={16}
            height={16}
          />
          {isUnlocked ? 'Lock' : 'Unlock'} Arrangement
        </Button>
      </div>
      <div ref={containerRef} className="relative space-y-4">
        {items && template && templateType(template, items)}
      </div>
    </div>
  )
}