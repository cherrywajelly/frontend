'use client';

import { createContext, useContext } from 'react';

const DialogContext = createContext<boolean | null>(null);
DialogContext.displayName = 'DialogContext';

export function DialogProvider({ children }: { children: React.ReactNode }) {
  return <DialogContext.Provider value>{children}</DialogContext.Provider>;
}

export function useDialogContext() {
  const context = useContext(DialogContext);
  return context;
}
