import { defineNode } from '@noodl/noodl-sdk';

import * as turf from '@turf/turf';

export default defineNode({
  name: 'geospatial-analysis.turf.area',
  displayName: 'Geospatial Area',
  color: 'logic',
  category: 'Geospatial Analysis',
  docs: "https://docs.noodl.net/library/modules/geospatial-analysis/nodes/v1/geospatial-area",
  inputs: {
    coordinates: {
      type: 'array',
      tsdef: '[lat: number, lon: number][][]',
      displayName: 'Coordinates',
      group: 'General',
    }
  },
  outputs: {
    squareMeters: {
      type: 'number',
      displayName: 'Square Meters',
      group: 'Result'
    },
    squareHectares: {
      type: 'number',
      displayName: 'Square Hectares',
      group: 'Result'
    },
    squareKm: {
      type: 'number',
      displayName: 'Square Km',
      group: 'Result'
    },
    acres: {
      type: 'number',
      displayName: 'Acres',
      group: 'Result'
    },
    onChanged: {
      type: 'signal',
      displayName: 'Changed',
      group: 'Events'
    }
  },
  changed: {
    coordinates() {
      const coordinates = this.inputs.coordinates;

      const polygon = turf.polygon(coordinates);
      const squareMeters = turf.area(polygon);

      // NOTE: Could look into using turf.convertArea instead
      this.setOutputs({
        squareMeters,
        squareHectares: (squareMeters / 10000).toFixed(2),
        squareKm: (squareMeters / 1000000).toFixed(2),
        acres: (squareMeters / 4046.8564224).toFixed(2),
      });

      this.sendSignalOnOutput('onChanged');
    }
  },
});
