import type { Field, Section, Template } from '../cv-maker'
import { useEffect, useRef, useState } from 'react'
import { createSwapy, type Swapy } from 'swapy'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui/button'

type CVPreviewProps = {
  fields: Field[]
  sections: Section[]
  template: Template
}

const CVPreview: React.FC<CVPreviewProps> = ({ fields, sections, template }) => {
  // const [items, setItems] = useState<(Field | Section)[]>([...fields, ...sections])
  const [isUnlocked, setIsUnlocked] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const swapyRef = useRef<Swapy | null>(null)


  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Initialize Swapy after component is mounted
  useEffect(() => {
    if (!isMounted) return

    if (containerRef.current && !swapyRef.current) {
      try {
        swapyRef.current = createSwapy(containerRef.current)

        swapyRef.current.onSwap((event) => {
          console.log('Swap event:', event.data)
          // const swapArray = event.data.array
          // if (swapArray.length >= 2) {
          //   const fromIndex = items.findIndex(item => item.id === swapArray[0].itemId)
          //   const toIndex = items.findIndex(item => item.id === swapArray[1].itemId)
          //   if (fromIndex !== -1 && toIndex !== -1) {
          //     setItems(prevItems => {
          //       const newItems = [...prevItems]
          //       const [removed] = newItems.splice(fromIndex, 1)
          //       newItems.splice(toIndex, 0, removed)
          //       return newItems
          //     })
          //   }
          // }
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

  // useEffect(() => {
  //   setItems([...fields, ...sections])
  // }, [fields, sections])

  useEffect(() => {
    if (swapyRef.current) {
      swapyRef.current.enable(isUnlocked)
    }
  }, [isUnlocked])

  // const renderItem = (item: Field | Section) => {
  //   if ('value' in item) {
  //     // It's a Field
  //     return (
  //       <div className="flex flex-row items-center space-x-2 p-2 rounded-lg bg-white shadow-sm">
  //         <Image
  //           className="dark:invert"
  //           src={item.icon}
  //           alt={item.id}
  //           width={16}
  //           height={16}
  //         />
  //         <strong>{item.name}:</strong>
  //         <p>{item.value}</p>
  //       </div>
  //     )
  //   } else {
  //     // It's a Section
  //     return (
  //       <div className="p-2 rounded-lg bg-white shadow-sm">
  //         <div className="flex flex-row items-center space-x-2 mb-2">
  //           <Image
  //             className="dark:invert"
  //             src={item.icon}
  //             alt={item.id}
  //             width={16}
  //             height={16}
  //           />
  //           <h3 className="text-xl font-semibold">{item.title}</h3>
  //         </div>
  //         <ReactMarkdown
  //           remarkPlugins={[remarkGfm]}
  //           components={{
  //             h1: ({ ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
  //             h2: ({ ...props }) => <h2 className="text-xl font-semibold mt-3 mb-2" {...props} />,
  //             h3: ({ ...props }) => <h3 className="text-lg font-medium mt-2 mb-1" {...props} />,
  //             ul: ({ ...props }) => <ul className="list-disc list-outside pl-5 mb-2" {...props} />,
  //             ol: ({ ...props }) => <ol className="list-decimal list-outside pl-5 mb-2" {...props} />,
  //             li: ({ ...props }) => <li className="mb-1" {...props} />,
  //             p: ({ ...props }) => <p className="mb-2" {...props} />,
  //             a: ({ ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
  //           }}
  //         >
  //           {item.content}
  //         </ReactMarkdown>
  //       </div>
  //     )
  //   }
  // }

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
        {/* {items.map((item, index) => (
          <div
            key={`${item.id}-${index}-slot`}
            data-swapy-slot
            className="p-2 border border-transparent hover:border-gray-200 rounded-lg transition-colors duration-200"
          >
            <div
              key={`${item.id}-${index}-item`}
              data-swapy-item={`${item.id}-${index}-item`}
            >
              {renderItem(item)}
            </div>
          </div>
        ))} */}
        {fields.map((field) => (
          <div
            key={field.id + '-' + field.name + '-slot'}
            data-swapy-slot={field.id + field.name + '-slot'}
          >
            <div
              className="flex flex-row space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-grab active:cursor-grabbing select-none transition-colors duration-200 active:bg-gray-100"
              key={field.name + '-' + field.id + '-item'}
              data-swapy-item={field.name + field.id + '-item'}
            >
              <Image
                className="dark:invert"
                src={field.icon}
                alt={field.id}
                width={12}
                height={12}
              />
              <strong>{field.name}:</strong>
              <p>{field.value}</p>
            </div>
          </div>
        ))}

        {sections.map((section) => (
          <div
            key={section.id + '-' + section.title + '-slot'}
            data-swapy-slot={section.id + section.title + '-slot'}
          >
            <div
              key={section.title + '-' + section.id + '-item'}
              data-swapy-item={section.title + section.id + '-item'}
              className="p-2 rounded-lg hover:bg-gray-50 cursor-grab active:cursor-grabbing select-none transition-colors duration-200 active:bg-gray-100"
            >
              <div className="flex flex-row space-x-2">
                <Image
                  className="dark:invert"
                  src={section.icon}
                  alt={section.id}
                  width={12}
                  height={12}
                />
                <h3 className="text-xl font-semibold mt-4 mb-2">{section.title}</h3>
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
                {section.content}
              </ReactMarkdown>
            </div>
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