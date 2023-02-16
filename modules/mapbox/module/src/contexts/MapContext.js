import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const MapContext = createContext({
  map: null
});

export function MapContextProvider({ children, map }) {
  return (
    <MapContext.Provider
      value={{
        map
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);

  if (context === undefined) {
    throw new Error('useMapContext must be a child of MapContextProvider');
  }

  return context;
}
