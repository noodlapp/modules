import { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { AddControlPositionEnumType } from '../../constants';

// https://www.npmjs.com/package/@mapbox/mapbox-gl-geocoder
// https://docs.mapbox.com/help/tutorials/geocode-and-sort-stores/
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export const DynamicPorts = []

// https://github.com/mapbox/mapbox-gl-geocoder/blob/main/API.md#mapboxgeocoder
export const Inputs = {
  c_GeocoderEnable: {
    displayName: 'Enable Geocoder',
    type: 'boolean',
    group: 'Controls - Geocoder',
    default: false
  },
  c_GeocoderPosition: {
    displayName: 'Geocoder Position',
    type: AddControlPositionEnumType,
    group: 'Controls - Geocoder',
    default: 'top-right'
  },
  c_GeocoderPlaceholder: {
    displayName: 'Placeholder',
    type: 'string',
    group: 'Controls - Geocoder',
    default: 'Search'
  },
  c_GeocoderShowMarker: {
    displayName: 'Show Marker',
    type: 'boolean',
    group: 'Controls - Geocoder',
    default: true
  },
}

export function useMapboxGeocoder(
  map,
  {
    c_GeocoderEnable,
    c_GeocoderPosition,
    c_GeocoderPlaceholder,
    c_GeocoderShowMarker,
  }
) {
  useEffect(() => {
    if (!map) return;
    if (!c_GeocoderEnable) return;

    const control = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: c_GeocoderPlaceholder,
      marker: c_GeocoderShowMarker,
    });

    map.addControl(control, c_GeocoderPosition);

    return function () {
      // Solve the issue with reseting the input
      try {
        map.removeControl(control);
      } catch {}
    };
  }, [
    map,
    c_GeocoderEnable,
    c_GeocoderPosition,
    c_GeocoderPlaceholder,
    c_GeocoderShowMarker,
  ]);
}
