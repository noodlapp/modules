import { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { AddControlPositionEnumType } from '../../constants';

export const DynamicPorts = [
  {
    condition: "c_ScaleControlEnable = true",
    inputs: [
      "c_ScaleControlPosition",
      "c_ScaleControlMaxWidth",
      "c_ScaleControlUnit",
    ]
  }
]

// https://docs.mapbox.com/mapbox-gl-js/api/markers/#scalecontrol
export const Inputs = {
  c_ScaleControlEnable: {
    displayName: 'Enable Scale',
    type: 'boolean',
    group: 'Controls - Scale',
    default: false
  },
  c_ScaleControlPosition: {
    displayName: 'Scale Position',
    type: AddControlPositionEnumType,
    group: 'Controls - Scale',
    default: 'bottom-right'
  },
  c_ScaleControlMaxWidth: {
    displayName: 'Max Width',
    type: "number",
    group: 'Controls - Scale',
    default: 100,
  },
  c_ScaleControlUnit: {
    displayName: 'Unit',
    type: {
      name: "enum",
      enums: [
        {
          value: "imperial",
          label: "Imperial",
        },
        {
          value: "metric",
          label: "Metric",
        },
        {
          value: "nautical",
          label: "Nautical",
        },
      ]
    },
    group: 'Controls - Scale',
    default: "metric",
  },
}

export function useScaleControl(
  map,
  {
    c_ScaleControlEnable,
    c_ScaleControlPosition,
    c_ScaleControlMaxWidth,
    c_ScaleControlUnit,
  }
) {
  useEffect(() => {
    if (!map) return;
    if (!c_ScaleControlEnable) return;

    const control = new mapboxgl.ScaleControl({
      maxWidth: c_ScaleControlMaxWidth,
      unit: c_ScaleControlUnit,
    });

    map.addControl(control, c_ScaleControlPosition);

    return function () {
      // Solve the issue with reseting the input
      try {
        map.removeControl(control);
      } catch {}
    };
  }, [
    map,
    c_ScaleControlEnable,
    c_ScaleControlPosition,
    c_ScaleControlMaxWidth,
    c_ScaleControlUnit,
  ]);
}
