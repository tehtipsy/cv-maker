'use client';

import { useContext, useState } from "react";
import { FormContext, mandatoryFields, PreviewIcons } from "@/contexts/cvForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { FormRefreshContext } from "@/contexts/cvFormRefresh";

export default function CvFields () {
  const { fields, setFields } = useContext(FormContext)
  const { setRefreshKey } = useContext(FormRefreshContext);
  const [newFieldName, setNewFieldName] = useState("");

  const addField = () => {
    if (newFieldName.trim() !== "") {
      const name = newFieldName.charAt(0).toUpperCase() + newFieldName.slice(1)
      if (!fields.map((obj) => obj.name).includes(name)) {
        setFields([...fields, {
          id: Date.now().toString(),
          name,
          icon: fields.filter((field) => field.name === name)?.[0]?.icon ?? PreviewIcons.globe,
          value: ""
        }])
      }
      setNewFieldName("")
    }
  }

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id))
    setRefreshKey(prevKey => prevKey + 1)
  }

  const updateFieldValue = (id: string, value: string) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, value } : field)))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Fields</h3>
      {fields.map((field) => (
        <div key={field.id} className="flex items-center space-x-2">
          <Input
            type="text"
            value={field.value}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            placeholder={field.name}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          />
          {!mandatoryFields.map((field) => field.id).includes(field.id) && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                console.log(field)
                removeField(field.id)
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove field</span>
            </Button>
          )}
        </div>
      ))}

      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={newFieldName}
          onChange={(e) => setNewFieldName(e.target.value)}
          placeholder="New field name"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addField()
            }
          }}
        />
        <Button type="button" onClick={addField} size="icon">
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only">Add field</span>
        </Button>
      </div>
    </div>
  )
}