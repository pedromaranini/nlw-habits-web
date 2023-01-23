import React, { createContext, useState } from 'react';

interface ToastifyContextProps {
  openToastify: boolean;
  setOpenToastify: React.Dispatch<React.SetStateAction<boolean>>
}

// Create Context
export const ToastifyContext = createContext<ToastifyContextProps>({} as ToastifyContextProps);

// Create Provider
export const ToastifyProvider = (props: any) => {
  const [openToastify, setOpenToastify] = useState(false);

  return (
    <ToastifyContext.Provider value={{
      openToastify, setOpenToastify
    }}>
      {props.children}
    </ToastifyContext.Provider>
  )
}