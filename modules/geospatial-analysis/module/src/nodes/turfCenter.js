import { defineNode } from '@noodl/noodl-sdk';

import * as turf from '@turf/turf';

export default defineNode({
  name: 'geospatial-analysis.turf.center',
  displayName: 'Geospatial Center',
  color: 'logic',
  category: 'Geospatial Analysis',
  docs: "https://docs.noodl.net/library/modules/geospatial-analysis/nodes/v1/geospatial-center",
  inputs: {
    coordinates: {
      type: 'array',
      tsdef: '[lat: number, lon: number][]',
      displayName: 'Coordinates',
      group: 'General',
    }
  },
  outputs: {
    center: {
      type: 'array',
      tsdef: '[lat: number, lon: number]',
      displayName: 'Center',
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

      const center = turf.center(coordinates);

      this.setOutputs({
        center,
      });

      this.sendSignalOnOutput('onChanged');
    }
  },
});
