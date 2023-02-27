import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const Context = createContext({
  layout: null,
  setLayout: null,
});

export function useDockContext() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useDockContext must be a child of DockContextProvider');
  }

  return context;
}
