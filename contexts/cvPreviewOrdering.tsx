'use client'

import type { SwapEventObject } from "swapy";
import { createContext, ReactNode, useState } from "react";

type OrderingContextProps = {
  map: SwapEventObject | null
  setMap: (map: SwapEventObject) => void
}

export const OrderingContext = createContext<OrderingContextProps>({
  map: null,
  setMap: () => {}
});


interface OrderingContextProviderProps {
  children: ReactNode;
}

export const OrderingContextProvider = (props: OrderingContextProviderProps) => {
  const [map, setMap] = useState<SwapEventObject | null>(null);

  return (
    <OrderingContext.Provider
      value={{
        map,
        setMap,
      }}
    >
      {props.children}
    </OrderingContext.Provider>
  );
};