import { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { AddControlPositionEnumType } from '../../constants';

export const DynamicPorts = [
  {
    condition: "c_NavigationControlEnable = true",
    inputs: [
      "c_NavigationControlPosition",
      "c_NavigationControlShowCompass",
      "c_NavigationControlShowZoom",
      "c_NavigationControlVisualizePitch",
    ]
  }
]

// https://docs.mapbox.com/mapbox-gl-js/api/markers/#navigationcontrol
export const Inputs = {
  c_NavigationControlEnable: {
    displayName: 'Enable Navigation',
    type: 'boolean',
    group: 'Controls - Navigation',
    default: false
  },
  c_NavigationControlPosition: {
    displayName: 'Navigation Position',
    type: AddControlPositionEnumType,
    group: 'Controls - Navigation',
    default: 'top-right'
  },
  c_NavigationControlShowCompass: {
    displayName: 'Show Compass',
    type: 'boolean',
    group: 'Controls - Navigation',
    default: true
  },
  c_NavigationControlShowZoom: {
    displayName: 'Show Zoom',
    type: 'boolean',
    group: 'Controls - Navigation',
    default: true
  },
  c_NavigationControlVisualizePitch: {
    displayName: 'Visualize Pitch',
    type: 'boolean',
    group: 'Controls - Navigation',
    default: false
  },
}

export function useNavigationControl(
  map,
  {
    c_NavigationControlEnable,
    c_NavigationControlPosition,
    c_NavigationControlShowCompass,
    c_NavigationControlShowZoom,
    c_NavigationControlVisualizePitch,
  }
) {
  useEffect(() => {
    if (!map) return;
    if (!c_NavigationControlEnable) return;

    const control = new mapboxgl.NavigationControl({
      showCompass: c_NavigationControlShowCompass,
      showZoom: c_NavigationControlShowZoom,
      visualizePitch: c_NavigationControlVisualizePitch
    });

    map.addControl(control, c_NavigationControlPosition);

    return function () {
      // Solve the issue with reseting the input
      try {
        map.removeControl(control);
      } catch {}
    };
  }, [
    map,
    c_NavigationControlEnable,
    c_NavigationControlPosition,
    c_NavigationControlShowCompass,
    c_NavigationControlShowZoom,
    c_NavigationControlVisualizePitch,
  ]);
}
