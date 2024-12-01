'use client'

import { defaultFields, defaultSections, Field, Section, Template, TemplateTypes } from "@/lib/cvFields";
import { createContext, ReactNode, useState } from "react";

type FormContextProps = {
  fields: Field[]
  setFields: (fields: Field[]) => void
  sections: Section[]
  setSections: (sections: Section[]) => void
  template: Template
  setTemplate: (template: Template) => void
  refreshKey: number,
  setRefreshKey: (refreshKey: number) => void
}

export const FormContext = createContext<FormContextProps>({
  fields: defaultFields,
  setFields: () => { },
  sections: defaultSections,
  setSections: () => { },
  template: TemplateTypes.professional,
  setTemplate: () => { },
  refreshKey: 0,
  setRefreshKey: () => { }
});

interface FormContextProviderProps {
  children: ReactNode;
}

export const FormContextProvider = (props: FormContextProviderProps) => {
  const [fields, setFields] = useState<Field[]>(defaultFields)
  const [sections, setSections] = useState<Section[]>(defaultSections)
  const [template, setTemplate] = useState<Template>(TemplateTypes.professional)
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <FormContext.Provider
      value={{
        fields,
        setFields,
        sections,
        setSections,
        template,
        setTemplate,
        refreshKey,
        setRefreshKey
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};