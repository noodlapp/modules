import { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { AddControlPositionEnumType } from '../../constants';

// https://github.com/mapbox/mapbox-gl-draw/tree/main
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

export const DynamicPorts = []

export const Inputs = {
  c_MapboxDrawEnable: {
    displayName: 'Enable Mapbox Draw',
    type: 'boolean',
    group: 'Controls - Mapbox Draw',
    default: false
  },
  c_MapboxDrawPosition: {
    displayName: 'Geolocate Position',
    type: AddControlPositionEnumType,
    group: 'Controls - Mapbox Draw',
    default: 'top-right'
  },
  c_MapboxDrawDisplayControls: {
    displayName: 'Display Mapbox Draw Controls',
    type: 'boolean',
    group: 'Controls - Mapbox Draw',
    default: true
  },
}

export function useMapboxDraw(
  map,
  {
    c_MapboxDrawEnable,
    c_MapboxDrawPosition,
    c_MapboxDrawDisplayControls,
    
    outMapboxDraw,
  }
) {
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    if (!map) return;
    if (!c_MapboxDrawEnable) return;

    const control = new MapboxDraw({
      displayControlsDefault: c_MapboxDrawDisplayControls
    });
    
    map.addControl(control, c_MapboxDrawPosition);

    setDraw(control);
    outMapboxDraw(control);

    return function () {
      // Solve the issue with reseting the input
      try {
        map.removeControl(control);
      } catch {}
    };
  }, [
    map,
    c_MapboxDrawPosition,
    c_MapboxDrawDisplayControls,
  ]);

  return { draw }
}
