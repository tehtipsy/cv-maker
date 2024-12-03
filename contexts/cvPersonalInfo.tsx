'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getInitials } from "@/lib/cvFields";

type PersonalInfoContextProps = {
  fullName: string
  setFullName: (value: string) => void
  initials: string
  setInitials: (initials: string) => void
  jobTitle: string
  setJobTitle: (jobTitle: string) => void
}

const PersonalInfoContext = createContext<PersonalInfoContextProps>({
  fullName: '',
  setFullName: () => {},
  initials: '',
  setInitials: () => {},
  jobTitle: '',
  setJobTitle: () => {}
});

interface PersonalInfoContextProviderProps {
  children: ReactNode;
}

export const PersonalInfoContextProvider = (props: PersonalInfoContextProviderProps) => {
  // TODO: Set from user info
  const [fullName, setFullName] = useState('');
  const [initials, setInitials] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    console.log(`${fullName} in personal info`)
    setInitials(getInitials(fullName) ?? '')
  }, [fullName])

  return (
    <PersonalInfoContext.Provider
      value={{
        fullName,
        setFullName,
        initials,
        setInitials,
        jobTitle,
        setJobTitle
      }}
    >
      {props.children}
    </PersonalInfoContext.Provider>
  );
};

export const usePersonalInfoContext = () =>
  useContext(PersonalInfoContext);