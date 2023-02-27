import { defineNode } from '@noodl/noodl-sdk';

import * as turf from '@turf/turf';

export default defineNode({
	name: 'geospatial-analysis.turf.center',
	displayName: "Geospatial Center",
	color: 'logic',
	category: 'Geospatial Analysis',
  inputs: {
    coordinates: {
      type: "array",
      tsdef: '[lat: number, lon: number][]',
      displayName: 'Coordinates',
      group: 'General',
    }
  },
  outputs: {
		center: {
			type: 'array',
			tsdef: '[lat: number, lon: number]',
			displayName: "Center",
			group: "Result"
		},
  },
	changed: {
		coordinates() {
			const coordinates = this.inputs.coordinates;

			const center = turf.center(coordinates);

			this.setOutputs({
				center,
			});
		}
	},
});
