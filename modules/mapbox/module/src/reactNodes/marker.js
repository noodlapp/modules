import { defineReactNode } from '@noodl/noodl-sdk';
import React, { useState, useRef, useEffect } from 'react';
import { useMapContext } from '../contexts/MapContext';

import mapboxgl from 'mapbox-gl';

export default defineReactNode({
  name: 'Mapbox Marker',
  category: 'Mapbox',
  docs: 'https://docs.noodl.net/library/modules/mapbox/mapbox-map',
  getReactComponent() {
    return function ({
      color,
      zindex,
      tooltipContent,

      geopoint,
      longitude,
      latitude,
      
      draggable,
      rotation,
      rotationAlignment,
      pitchAlignment,
      offsetX,
      offsetY,

      outLongitude,
      outlatitude,

      onDragStart,
      onDrag,
      onDragEnd,

      children
    }) {
      const mapContext = useMapContext();
      const containerRef = useRef(null);
      const [marker, setMarker] = useState(null);

      useEffect(() => {
        if (!mapContext.map) return;

        const newMarker = new mapboxgl.Marker({
          color,
          element: containerRef.current
        });

        if (geopoint) {
          newMarker.setLngLat([geopoint.longitude, geopoint.latitude]);
        } else {
          newMarker.setLngLat([longitude, latitude]);
        }
        newMarker.addTo(mapContext.map);

        function updateLngLat() {
          const { lng, lat } = newMarker.getLngLat();
          outLongitude(lng);
          outlatitude(lat);
        }

        newMarker.on("dragstart", () => {
          updateLngLat();
          onDragStart();
        });

        newMarker.on("drag", () => {
          updateLngLat();
          onDrag();
        });

        newMarker.on("dragend",() => {
          updateLngLat();
          onDragEnd();
        });

        updateLngLat();
        setMarker(newMarker);

        return function () {
          newMarker.remove();
          setMarker(null);
        }
      }, [color, containerRef, children]);

      if (marker) {
        if (geopoint) {
          marker.setLngLat([geopoint.longitude, geopoint.latitude]);
        } else {
          marker.setLngLat([longitude, latitude]);
        }
        if (tooltipContent) {
          marker.setPopup(new mapboxgl.Popup().setHTML(tooltipContent))
        } else {
          marker.setPopup(null)
        }
        marker.setDraggable(draggable)
        marker.setRotation(rotation)
        marker.setRotationAlignment(rotationAlignment)
        marker.setPitchAlignment(pitchAlignment)
        marker.setOffset([offsetX, offsetY])

        const element = marker.getElement();
        if (element) {
          element.style.zIndex = zindex;
        }
      }

      if (children) {
        // Have to wrap the containerRef, since Mapbox will delete the DOM element.
        return (
          <div>
            <div ref={containerRef}>{children}</div>
          </div>
        )
      }

      return null;
    };
  },
  initialize() {},
  inputProps: {
    color: {
      displayName: 'Color',
      type: 'color',
      group: 'General',
      default: "#3FB1CE"
    },
    zindex: {
      displayName: 'z-Index',
      type: 'number',
      group: 'General',
      default: 0
    },
    tooltipContent: {
      displayName: 'Tooltip',
      group: 'General',
      type: {
        name: 'string',
        codeeditor: 'html'
      },
    },
    geopoint: {
      displayName: 'Geopoint',
      type: 'object',
      group: 'Coordinates',
      default: undefined
    },
    longitude: {
      displayName: 'Longitude',
      type: 'number',
      group: 'Coordinates',
      default: 0
    },
    latitude: {
      displayName: 'Latitude',
      type: 'number',
      group: 'Coordinates',
      default: 0
    },
    draggable: {
      displayName: 'Draggable',
      type: 'boolean',
      group: 'General',
      default: false
    },
    rotation: {
      displayName: 'Rotation',
      type: 'number',
      group: 'General',
      default: 0
    },
    rotationAlignment: {
      displayName: 'Rotation Alignment',
      type: {
        name: "enum",
        enums: [
          {
            label: "Auto",
            value: "auto"
          },
          {
            label: "Viewport",
            value: "viewport"
          },
          {
            label: "Map",
            value: "map"
          },
          {
            label: "Horizon",
            value: "horizon"
          }
        ]
      },
      group: "General",
      default: "auto"
    },
    pitchAlignment: {
      displayName: 'Pitch Alignment',
      type: {
        name: "enum",
        enums: [
          {
            label: "Auto",
            value: "auto"
          },
          {
            label: "Viewport",
            value: "viewport"
          },
          {
            label: "Map",
            value: "map"
          },
          {
            label: "Horizon",
            value: "horizon"
          }
        ]
      },
      group: "General",
      default: "auto"
    },
    offsetX: {
      displayName: 'Offset X',
      type: 'number',
      group: 'General',
      default: 0
    },
    offsetX: {
      displayName: 'Offset X',
      type: 'number',
      group: 'General',
      default: 0
    },
    offsetY: {
      displayName: 'Offset Y',
      type: 'number',
      group: 'General',
      default: 0
    },
  },
  outputProps: {
    outLongitude: {
      displayName: 'Longitude',
      type: 'number',
      group: 'Coordinates'
    },
    outlatitude: {
      displayName: 'Latitude',
      type: 'number',
      group: 'Coordinates'
    },

    onDragStart: {
      displayName: 'Drag Start',
      type: 'signal',
      group: 'Events',
    },
    onDrag: {
      displayName: 'Drag',
      type: 'signal',
      group: 'Events',
    },
    onDragEnd: {
      displayName: 'Drag End',
      type: 'signal',
      group: 'Events',
    },
  },
  changed: {},
  signals: {},
  methods: {},
})
