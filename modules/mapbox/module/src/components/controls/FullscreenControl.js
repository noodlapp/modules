import { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { AddControlPositionEnumType } from '../../constants';

export const DynamicPorts = [
  {
    condition: "c_FullscreenControlEnable = true",
    inputs: [
      "c_FullscreenControlPosition",
    ]
  }
]

// https://docs.mapbox.com/mapbox-gl-js/api/markers/#fullscreencontrol
export const Inputs = {
  c_FullscreenControlEnable: {
    displayName: 'Enable Fullscreen',
    type: 'boolean',
    group: 'Controls - Fullscreen',
    default: false
  },
  c_FullscreenControlPosition: {
    displayName: 'Fullscreen Position',
    type: AddControlPositionEnumType,
    group: 'Controls - Fullscreen',
    default: 'top-right'
  },
}

export function useFullscreenControl(
  map,
  {
    c_FullscreenControlEnable,
    c_FullscreenControlPosition,
  }
) {
  useEffect(() => {
    if (!map) return;
    if (!c_FullscreenControlEnable) return;

    const control = new mapboxgl.FullscreenControl();
    map.addControl(control, c_FullscreenControlPosition);

    return function () {
      // Solve the issue with reseting the input
      try {
        map.removeControl(control);
      } catch {}
    };
  }, [
    map,
    c_FullscreenControlEnable,
    c_FullscreenControlPosition,
  ]);
}
