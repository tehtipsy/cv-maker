"use client"

import { useContext } from "react"
import { OrderingContextProvider } from "@/contexts/cvPreviewOrdering"
import { FormContextProvider } from "@/contexts/cvForm"
import { FormRefreshContext } from "@/contexts/cvFormRefresh"
import CvPreview from "@/components/cv/cv-preview"
import CvForm from "@/components/cv/cv-form"

export function CvMaker() {
  const { refreshKey } = useContext(FormRefreshContext);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">CV Maker</h1>
      <div className="lg:flex lg:space-x-6">
        <FormContextProvider>
          <CvForm />
          <div className="lg:w-1/2 mt-6 lg:mt-0">
            <OrderingContextProvider>
              <CvPreview
                key={refreshKey} // avoid caching when removing fields etc.
              />
            </OrderingContextProvider>
          </div>
        </FormContextProvider>
      </div>
    </div>
  )
}