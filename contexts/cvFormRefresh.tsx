'use client'

import { createContext, ReactNode, useState } from "react";

type FormContextProps = {
  refreshKey: number,
  setRefreshKey: (value: number | ((prevKey: number) => number)) => void
}

export const FormRefreshContext = createContext<FormContextProps>({
  refreshKey: 0,
  setRefreshKey: () => {}
});

interface FormRefreshContextProviderProps {
  children: ReactNode;
}

export const FormRefreshContextProvider = (props: FormRefreshContextProviderProps) => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <FormRefreshContext.Provider
      value={{
        refreshKey,
        setRefreshKey
      }}
    >
      {props.children}
    </FormRefreshContext.Provider>
  );
};