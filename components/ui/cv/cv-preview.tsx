'use client'

import type { Field, Section, Template } from '../../cv-maker'
import { useContext, useEffect, useRef, useState } from 'react'
import { createSwapy, type Swapy } from 'swapy'
import { Button } from '@/components/ui/button'
import { RenderPreviewItem } from '@/components/ui/cv/cv-preview-items'
import { OrderingContext } from '@/contexts/cvPreviewOrdering'

type CVPreviewProps = {
  fields: Field[]
  sections: Section[]
  template: Template
}

const CVPreview: React.FC<CVPreviewProps> = ({ fields, sections, template }) => {
  const [items, setItems] = useState<(Field | Section)[]>([...fields, ...sections])
  const [isUnlocked, setIsUnlocked] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const { map, setMap } = useContext(OrderingContext)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const swapyRef = useRef<Swapy | null>(null)
  const mapRef = useRef(map)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    console.log('Items Ordering: ', map, setMap)
  })

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

  return (
    <div className={`p-6 border rounded-lg ${template === 'professional' ? 'bg-white' :
      template === 'creative' ? 'bg-gray-100' :
        'bg-blue-50'
      }`}>
      <h2 className="text-2xl font-bold mb-4">CV Preview</h2>
      <div
        ref={containerRef}
        className="relative space-y-4"
      >
        {items && [...items]
          .map((item, index) => {
            return (
            <div
              key={`${index}-slot-key`}
              data-swapy-slot={index}
              className="p-2 border border-transparent hover:border-gray-200 rounded-lg transition-colors duration-200"
            >
              <div
                key={`${item.id}-${'title' in item ? item.title : item.name}-item-key`}
                data-swapy-item={item.id}
              >
                <RenderPreviewItem item={item} />
              </div>
            </div>
          )})
        }
      </div>

      <Button
        onClick={() => setIsUnlocked(!isUnlocked)}
        className="mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {isUnlocked ? 'Lock' : 'Unlock'} Arrangement
      </Button>
    </div>
  )
}

export default CVPreview