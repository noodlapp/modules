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

      onClick,
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
          newMarker.setLngLat([geopoint.longitude % 180 % -180, geopoint.latitude % 90 % -90]);
        } else {
          newMarker.setLngLat([longitude % 180 % -180, latitude % 90 % -90]);
        }
        newMarker.addTo(mapContext.map);

        function updateLngLat() {
          const { lng, lat } = newMarker.getLngLat();
          outLongitude(lng);
          outlatitude(lat);
        }

        const handleClick = () => {
          onClick();
        }

        newMarker._element.addEventListener("click", handleClick);

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
          newMarker._element.removeEventListener("click", handleClick);
          newMarker.remove();
          setMarker(null);
        }
      }, [color, containerRef, children]);

      if (marker) {
        if (geopoint) {
          marker.setLngLat([geopoint.longitude % 180 % -180, geopoint.latitude % 90 % -90]);
        } else {
          marker.setLngLat([longitude % 180 % -180, latitude % 90 % -90]);
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
    draggable: {
      displayName: 'Draggable',
      type: 'boolean',
      group: 'General',
      default: false
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
    color: {
      displayName: 'Color',
      type: 'color',
      group: 'Style',
      default: "#3FB1CE"
    },
    tooltipContent: {
      displayName: 'Tooltip',
      group: 'Content',
      type: {
        name: 'string',
        codeeditor: 'html'
      },
    },
    rotationAlignment: {
      displayName: 'Rotation',
      editorName: 'Rotation Alignment',
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
      group: "Alignment",
      default: "auto"
    },
    pitchAlignment: {
      displayName: 'Pitch',
      editorName: 'Pitch Alignment',
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
      group: "Alignment",
      default: "auto"
    },
    rotation: {
      displayName: 'Rotation',
      type: 'number',
      group: 'Offset',
      default: 0
    },
    offsetX: {
      displayName: 'X',
      editorName: 'Offset X',
      type: 'number',
      group: 'Offset',
      default: 0
    },
    offsetY: {
      displayName: 'Y',
      editorName: 'Offset Y',
      type: 'number',
      group: 'Offset',
      default: 0
    },
    zindex: {
      displayName: 'z-Index',
      type: 'number',
      group: 'Advanced Style',
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

    onClick: {
      displayName: 'Click',
      type: 'signal',
      group: 'Events',
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
