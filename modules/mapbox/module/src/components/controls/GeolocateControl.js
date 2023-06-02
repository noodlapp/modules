import { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { AddControlPositionEnumType } from '../../constants';

export const DynamicPorts = [
  {
    condition: "c_GeolocateControlEnable = true",
    inputs: [
      "c_GeolocateControlPosition",
      "c_GeolocateControlShowAccuracyCircle",
      "c_GeolocateControlShowUserHeading",
      "c_GeolocateControlShowUserLocation",
      "c_GeolocateControlTrackUserLocation",
    ]
  }
]

// https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol
export const Inputs = {
  c_GeolocateControlEnable: {
    displayName: 'Enable Geolocate',
    type: 'boolean',
    group: 'Controls - Geolocate',
    default: false
  },
  c_GeolocateControlPosition: {
    displayName: 'Geolocate Position',
    type: AddControlPositionEnumType,
    group: 'Controls - Geolocate',
    default: 'top-right'
  },
  c_GeolocateControlShowAccuracyCircle: {
    displayName: 'Show Accuracy Circle',
    tooltip: "A transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location.",
    type: 'boolean',
    group: 'Controls - Geolocate',
    default: true
  },
  c_GeolocateControlShowUserHeading: {
    displayName: 'Show User Heading',
    tooltip: "An arrow will be drawn next to the user location dot indicating the device's heading.",
    type: 'boolean',
    group: 'Controls - Geolocate',
    default: false
  },
  c_GeolocateControlShowUserLocation: {
    displayName: 'Show User Location',
    tooltip: "A dot will be shown on the map at the user's location.",
    type: 'boolean',
    group: 'Controls - Geolocate',
    default: true
  },
  c_GeolocateControlTrackUserLocation: {
    displayName: 'Track User Location',
    tooltip: "The control becomes a toggle button and when active the map will receive updates to the user's location as it changes.",
    type: 'boolean',
    group: 'Controls - Geolocate',
    default: true
  },
}

export function useGeolocateControl(
  map,
  {
    eventHandler,
    c_GeolocateControlEnable,
    c_GeolocateControlPosition,
    c_GeolocateControlShowAccuracyCircle,
    c_GeolocateControlShowUserHeading,
    c_GeolocateControlShowUserLocation,
    c_GeolocateControlTrackUserLocation,
  }
) {
  useEffect(() => {
    if (!map) return;
    if (!c_GeolocateControlEnable) return;

    const control = new mapboxgl.GeolocateControl({
      // fitBoundsOptions:
      // geolocation:
      positionOptions: {
        enableHighAccuracy: true
      },
      showAccuracyCircle: c_GeolocateControlShowAccuracyCircle,
      showUserHeading: c_GeolocateControlShowUserHeading,
      showUserLocation: c_GeolocateControlShowUserLocation,
      trackUserLocation: c_GeolocateControlTrackUserLocation,
    });

    map.addControl(control, c_GeolocateControlPosition);

    function centerOnUser() {
      control?.trigger();
    }

    eventHandler.addEventListener('centerOnUser', centerOnUser);

    return function () {
      // Solve the issue with reseting the input
      try {
        eventHandler.removeEventListener('centerOnUser', centerOnUser);
        map.removeControl(control);
      } catch {}
    };
  }, [
    map,
    c_GeolocateControlEnable,
    c_GeolocateControlPosition,
    c_GeolocateControlShowAccuracyCircle,
    c_GeolocateControlShowUserHeading,
    c_GeolocateControlShowUserLocation,
    c_GeolocateControlTrackUserLocation,
  ]);
}
