import {
  defineModule
} from '@noodl/noodl-sdk';

import MapboxNode from './nodes/map';
import MapboxMarker from './nodes/marker';
import MapboxPolygon from './nodes/polygon';

Noodl.defineModule({
  reactNodes: [
    MapboxNode,
    MapboxMarker,
    MapboxPolygon,
  ],
  nodes: [],
  settings: [{
    name: 'mapboxAccessToken',
    type: 'string',
    displayName: 'Mapbox Access Token',
    plug: 'input',
    group: 'Mapbox'
  }],
  setup() {

  }
});
