import {
  defineModule
} from '@noodl/noodl-sdk';

import MapboxNode from './nodes/map';
import MapboxMarker from './nodes/marker';

Noodl.defineModule({
  reactNodes: [
    MapboxNode,
    MapboxMarker,
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
