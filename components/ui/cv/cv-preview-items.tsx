'use client'

import type { Field, Section } from "@/components/cv-maker"
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type CvFieldPreviewProps = {
  item: Field
}

type CvSectionPreviewProps = {
  item: Section
}

type CvRenderItemProps = {
  item: Field | Section
}

export const CvFieldPreview: React.FC<CvFieldPreviewProps> = ({ item }) => { 
  return (
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
  )
}


export const CvSectionPreview: React.FC<CvSectionPreviewProps> = ({ item }) => {
  return (
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
  )
}

export const RenderPreviewItem: React.FC<CvRenderItemProps> = ({ item }) => {
  if ('value' in item) {
    // It's a Field
    return (
      <CvFieldPreview item={item} />
    )
  } else {
    // It's a Section
    return (
      <CvSectionPreview item={item} />
    )
  }
}