import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const PanelContext = createContext({
  updateTab: null,
});

export function useDockPanelContext() {
  const context = useContext(PanelContext);

  if (context === undefined) {
    throw new Error('useDockPanelContext must be a child of PanelContext.Provider');
  }

  return context;
}