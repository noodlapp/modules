import {
  defineModule
} from '@noodl/noodl-sdk';

import MapboxNode from './reactNodes/map';
import MapboxMarker from './reactNodes/marker';
import MapboxPolygon from './reactNodes/polygon';

import mapboxgl from 'mapbox-gl';
// Allow use of any other Mapbox features,
// like MercatorCoordinate etc
window.mapboxgl = mapboxgl;

defineModule({
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
