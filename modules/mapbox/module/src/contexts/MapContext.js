import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const MapContext = createContext({
  map: null,
  draw: null,
});

export function MapContextProvider({ children, map, draw }) {
  return (
    <MapContext.Provider
      value={{
        map,
        draw
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
