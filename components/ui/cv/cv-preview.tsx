import type { Field, Section, Template } from '../../cv-maker'
import { useEffect, useRef, useState } from 'react'
import { createSwapy, type Swapy } from 'swapy'
import { Button } from '@/components/ui/button'
// import { CvFieldPreview, CvSectionPreview, RenderItem } from '@/components/ui/cv/cv-preview-items'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type CVPreviewProps = {
  fields: Field[]
  sections: Section[]
  template: Template
}

const CVPreview: React.FC<CVPreviewProps> = ({ fields, sections, template }) => {
  const [items, setItems] = useState<(Field | Section)[]>([...fields, ...sections])
  // const [orderedItems, setOrderedItems] = useState<(Field | Section)[]>([])
  const [isUnlocked, setIsUnlocked] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const swapyRef = useRef<Swapy | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // // Get current ordered IDs
    // const currentIds = new Set(orderedItems.map(item => item.id))
    // const newItems = [...fields, ...sections]
    // const newIds = new Set(newItems.map(item => item.id))

    // // Keep existing order for items that still exist and append new items
    // const remainingOrderedItems = orderedItems.filter(item => newIds.has(item.id))
    // const newOrderedItems = [
    //   ...remainingOrderedItems,
    //   ...newItems.filter(item => !currentIds.has(item.id))
    // ]

    // setOrderedItems(newOrderedItems)
    setItems([...fields, ...sections])
  }, [fields, sections])

  // Initialize Swapy after component is mounted
  useEffect(() => {
    if (!isMounted) return

    if (containerRef.current && !swapyRef.current) {
      try {
        swapyRef.current = createSwapy(containerRef.current)

        swapyRef.current.onSwap((event) => {
          console.log('Swap Event: ', event.data)
          // const swapArray = event.data.array
          // if (!Array.isArray(swapArray) || swapArray.length < 2) return

          // setOrderedItems(prevItems => {
          //   const fromIndex = prevItems.findIndex(item =>
          //     `${item.id}-${('value' in item ? item.name : item.title)}-item` === swapArray[0].itemId
          //   )
          //   const toIndex = prevItems.findIndex(item =>
          //     `${item.id}-${('value' in item ? item.name : item.title)}-item` === swapArray[1].itemId
          //   )

          //   if (fromIndex === -1 || toIndex === -1) return prevItems

          //   const newItems = [...prevItems]
          //   const [movedItem] = newItems.splice(fromIndex, 1)
          //   newItems.splice(toIndex, 0, movedItem)
          //   return newItems
          // })

          // console.log('Ordered Items: ', orderedItems)
        })

        if (swapyRef.current) {
          swapyRef.current.enable(true)
        }
      } catch (error) {
        console.error('Swapy initialization error:', error)
      }
    }

    return () => {
      if (swapyRef.current) {
        swapyRef.current.destroy()
      }
    }
  }, [isMounted])

  useEffect(() => {
    if (swapyRef.current) {
      swapyRef.current.enable(isUnlocked)
    }
  }, [isUnlocked])

  const renderItem = (item: Field | Section) => {
    if ('value' in item) {
      // It's a Field
      return (
        <div
          key={`${item.id}-${item.name}-item-key`}
          data-swapy-item={`${item.id}-${item.name}-item`}
        >
          <div className="flex flex-row items-center space-x-2 p-2 rounded-lg bg-white shadow-sm">
            <Image
              className="dark:invert"
              src={item.icon}
              alt={item.id}
              width={16}
              height={16}
            />
            <strong>{item.name}:</strong>
            <p>{item.value}</p>
          </div>
        </div>
      )
    } else {
      // It's a Section
      return (
        <div
          key={`${item.id}-${item.title}-item-key`}
          data-swapy-item={`${item.id}-${item.title}-item`}
        >
          <div className="p-2 rounded-lg bg-white shadow-sm">
            <div className="flex flex-row items-center space-x-2 mb-2">
              <Image
                className="dark:invert"
                src={item.icon}
                alt={item.id}
                width={16}
                height={16}
              />
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
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
              {item.content}
            </ReactMarkdown>
          </div>
        </div>
      )
    }
  }

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
        {items && items.map((item, index) => (
          <div
            key={`${index}-slot-key`}
            data-swapy-slot={`${index}-slot`}
            className="p-2 border border-transparent hover:border-gray-200 rounded-lg transition-colors duration-200"
          >
            {/* <RenderItem item={item} /> */}
            {renderItem(item)}
          </div>
        ))}
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