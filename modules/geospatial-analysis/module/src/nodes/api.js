import { defineNode } from '@noodl/noodl-sdk';

import * as turf from '@turf/turf';

export default defineNode({
	name: 'geospatial-analysis',
	displayName: "Geospatial API",
	color: 'logic',
	category: 'Geospatial Analysis',
  inputs: {},
  outputs: {
		turf: {
			type: 'object',
			displayName: "Turf",
			group: "API"
		},
  },
	initialize() {
		this.setOutputs({
			turf,
		});
	}
});
