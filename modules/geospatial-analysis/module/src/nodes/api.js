import { defineNode } from '@noodl/noodl-sdk';

import * as turf from '@turf/turf';

export default defineNode({
	name: 'geospatial-analysis',
	displayName: 'Turf.js API',
	color: 'logic',
	category: 'Geospatial Analysis',
  docs: "https://docs.noodl.net/library/modules/geospatial-analysis/nodes/v1/geospatial-api",
  inputs: {},
  outputs: {
		turf: {
			type: 'object',
			displayName: 'Turf',
			group: 'API'
		}
  },
	initialize() {
		this.setOutputs({
			turf,
		});
	}
});
