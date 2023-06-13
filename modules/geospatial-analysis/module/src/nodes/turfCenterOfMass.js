import { defineNode } from '@noodl/noodl-sdk';

import * as turf from '@turf/turf';

export default defineNode({
  name: 'geospatial-analysis.turf.center-of-mass',
  displayName: 'Geospatial Center Of Mass',
  color: 'logic',
  category: 'Geospatial Analysis',
  docs: "https://docs.noodl.net/library/modules/geospatial-analysis/nodes/v1/geospatial-center-of-mass",
  inputs: {
    coordinates: {
      type: 'array',
      tsdef: '[lat: number, lon: number][][]',
      displayName: 'Coordinates',
      group: 'General',
    }
  },
  outputs: {
    centerOfMass: {
      type: 'array',
      tsdef: '[lat: number, lon: number]',
      displayName: 'Center Of Mass',
      group: 'Result'
    },
    centroid: {
      type: 'array',
      tsdef: '[lat: number, lon: number]',
      displayName: 'Centroid',
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
      const centerOfMass = turf.centerOfMass(polygon);
      const centroid = turf.centroid(polygon);

      this.setOutputs({
        centerOfMass,
        centroid,
      });

      this.sendSignalOnOutput('onChanged');
    }
  },
});
