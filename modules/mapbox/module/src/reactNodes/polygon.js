import {
  defineReactNode
} from '@noodl/noodl-sdk';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useMapContext } from '../contexts/MapContext';

import mapboxgl from 'mapbox-gl';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default defineReactNode({
  name: 'Mapbox Polygon',
  category: 'Mapbox',
  docs: 'https://docs.noodl.net/library/modules/mapbox/mapbox-map',
  allowChildren: false,
  getReactComponent() {
    return function ({
      coordinates,
      enabled,

      outMapbox,
      outMapboxDraw,
      outFeatureId,
      outCoordinates,
      outCenter,
      outCentroid,
      outArea,

      onUpdated,
      onSelected,
      onUnselected,
    }) {
      const mapContext = useMapContext();
      const containerRef = useRef(null);
      const [featureId, setFeatureId] = useState(null);

      if (mapContext) {
        outMapbox(mapContext.map);
        outMapboxDraw(mapContext.draw);
      }
      
      useEffect(() => {
        if (!mapContext.draw) return;

        // Create a unique id for this feature
        const id = guid();

        let wasSelected = false;
        function onSelectionChange(e) {
          //   const features = e.features.filter((x) => x.id !== featureId.current);
          //   mapContext.draw.changeMode('simple_select', { featureIds: features.map((x) => x.id) });
          //   return;
          // }

          const feature = e.features.find((x) => x.id === id);
          if (feature && feature.properties.enabled === false) {
            const otherFeaturesIds = e.features
              .filter((x) => x.id !== id)
              .map((x) => x.id);

            mapContext.draw.changeMode('simple_select', { featureIds: otherFeaturesIds });
            return;
          }

          if (feature) {
            wasSelected = true;
            onSelected();
          } else if (wasSelected) {
            wasSelected = false;
            onUnselected();
          }
        }

        function onUpdate(e) {
          const features = e.features.filter((x) => x.id === id);
          if (features.length > 0) {
            const updated = features[0];
            outCoordinates(updated.geometry.coordinates);
            onUpdated();
          }
        }

        // Create the feature
        const feature = {
          id,
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: coordinates || [[0, 0]]
          }
        }

        mapContext.draw.add(feature);
        outFeatureId(id);
        setFeatureId(id);

        // Register the events
        const onselectionchange = (e) => onSelectionChange(e);
        const onupdate = (e) => onUpdate(e);

        mapContext.map.on('draw.selectionchange', onselectionchange);
        mapContext.map.on('draw.update', onupdate);

        return function () {
          try {
            mapContext.map?.off('draw.selectionchange', onselectionchange);
            mapContext.map?.off('draw.update', onupdate);
            mapContext.draw?.delete(id);
          } catch (_) {
            // noop
          }
        }
      }, [containerRef]);

      if (mapContext.draw && featureId) {
        const feature = mapContext.draw.get(featureId);
        if (feature) {
          if (coordinates) feature.geometry.coordinates = coordinates;
          feature.properties.enabled = enabled;
          feature.properties.active = enabled.toString();
          mapContext.draw.add(feature);
        }
      }

      return null;
    };
  },
  initialize() {},
  inputProps: {
    coordinates: {
      displayName: 'Coordinates',
      type: 'number',
      group: 'Coordinates'
    },
    enabled: {
      displayName: 'Enabled',
      type: 'boolean',
      group: 'General',
      default: true
    },
  },
  outputProps: {
    outMapbox: {
      displayName: 'Mapbox Object',
      type: 'object',
      group: 'Mapbox'
    },
    outMapboxDraw: {
      displayName: 'Mapbox Draw Object',
      type: 'object',
      group: 'Mapbox'
    },

    outFeatureId: {
      displayName: 'Feature Id',
      type: 'string',
      group: 'Data'
    },
    outCoordinates: {
      displayName: 'Coordinates',
      type: 'array',
      tsdef: '[lat: number, lon: number][]',
      group: 'Data'
    },
    outCenter: {
      displayName: 'Center',
      type: 'number',
      group: 'Data',
      tooltip: 'The absolute center point of all Coordinates.'
    },
    outCentroid: {
      displayName: 'Centroid',
      type: 'number',
      group: 'Data',
      tooltip: 'The centroid of all Coordinates.'
    },
    outArea: {
      displayName: 'Area',
      type: 'number',
      group: 'Data',
      tooltip: 'Area in square meters.'
    },

    onUpdated: {
      displayName: 'Updated',
      type: 'signal',
      group: 'Events',
    },
    onSelected: {
      displayName: 'Selected',
      type: 'signal',
      group: 'Events',
    },
    onUnselected: {
      displayName: 'Unselected',
      type: 'signal',
      group: 'Events',
    },
  },
  changed: {},
  signals: {
    Edit() {
      const draw = this._outputs.outMapboxDraw.value;
      if (!draw) return;

      const featureId = this._outputs.outFeatureId.value;
      if (!featureId) return;
      
      draw.changeMode('direct_select', { featureId });
    }
  },
  methods: {},
})
