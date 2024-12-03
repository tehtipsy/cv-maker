"use client";

import { OrderingContextProvider } from "@/contexts/cvPreviewOrdering"
import { FormContextProvider } from "@/contexts/cvForm"
import {  useRefreshKeyContext } from "@/contexts/cvFormRefresh"
import CvPreview from "@/components/cv/cv-preview"
import CvForm from "@/components/cv/cv-form"
import { PersonalInfoContextProvider } from "@/contexts/cvPersonalInfo";

export function CvMaker() {
  const { refreshKey } = useRefreshKeyContext();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">CV Maker</h1>
      <div className="lg:flex lg:space-x-6">
        <FormContextProvider>
          <PersonalInfoContextProvider>
            <CvForm />
            <div className="lg:w-1/2 mt-6 lg:mt-0">
              <OrderingContextProvider>
                <CvPreview
                  key={refreshKey} // avoid caching when removing fields etc.
                />
              </OrderingContextProvider>
            </div>
        </PersonalInfoContextProvider>
      </FormContextProvider>
      </div>
    </div>
  )
}