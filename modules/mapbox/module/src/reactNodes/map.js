import { defineReactNode } from '@noodl/noodl-sdk';

import MapComponent from '../components/Map';
import * as FullscreenControl from '../components/controls/FullscreenControl';
import * as MapboxGeocoder from '../components/controls/MapboxGeocoder';
import * as GeolocateControl from '../components/controls/GeolocateControl';
import * as NavigationControl from '../components/controls/NavigationControl';
import * as ScaleControl from '../components/controls/ScaleControl';
import * as MapboxDraw from '../components/controls/MapboxDraw';

export default defineReactNode({
  name: 'Mapbox Map',
  category: 'Mapbox',
  docs: 'https://docs.noodl.net/library/modules/mapbox/mapbox-map',
  getReactComponent() {
    return MapComponent;
  },
  initialize() {
    const accessToken = Noodl.getProjectSettings().mapboxAccessToken;
    if (!accessToken) {
      this.sendWarning('access-token-missing', 'No access token. Please specify one in project settings and reload');
    } else {
      this.clearWarnings();
    }
  },
  dynamicports: [
    ...FullscreenControl.DynamicPorts,
    ...MapboxGeocoder.DynamicPorts,
    ...NavigationControl.DynamicPorts,
    ...ScaleControl.DynamicPorts,
    ...MapboxDraw.DynamicPorts,
  ],
  inputProps: {
    //options
    mapboxStyle: {
      displayName: 'Style',
      group: 'Options',
      type: 'string',
      default: 'mapbox://styles/mapbox/streets-v12'
    },
    interactive: {
      displayName: 'Interactive',
      type: 'boolean',
      default: true
    },
    antialias: {
      displayName: 'Anti-alias',
      type: 'boolean',
      default: false
    },

    //coordinates and zoom
    geopoint: {
      displayName: 'Geopoint',
      type: 'object',
      group: 'Coordinates',
      default: undefined
    },
    longitude: {
      displayName: 'Longitude',
      type: 'number',
      group: 'Coordinates',
      default: 0
    },
    latitute: {
      displayName: 'Latitude',
      type: 'number',
      group: 'Coordinates',
      default: 0
    },
    zoom: {
      displayName: 'Zoom',
      type: 'number',
      group: 'Coordinates',
      default: 0
    },
    bearing: {
      displayName: 'Bearing',
      type: 'number',
      group: 'Coordinates',
      default: 0
    },

    // Controls
    ...FullscreenControl.Inputs,
    ...MapboxGeocoder.Inputs,
    ...GeolocateControl.Inputs,
    ...NavigationControl.Inputs,
    ...ScaleControl.Inputs,
    ...MapboxDraw.Inputs,
  },
  // signals: {
  //   centerOnUser: {
  //     displayName: 'Center on user',
  //     group: 'Actions',
  //     signal() {
  //       this.geolocate && this.geolocate.trigger();
  //     }
  //   }
  // },
  outputProps: {
    outMap: {
      displayName: 'Mapbox Object',
      type: 'object',
      group: 'Mapbox'
    },
    outMapboxDraw: {
      displayName: 'Mapbox Draw Object',
      type: 'object',
      group: 'Mapbox'
    },

    outLongitude: {
      displayName: 'Longitude',
      editorName: 'Camera Longitude',
      type: 'number',
      group: 'Coordinates'
    },
    outLatitute: {
      displayName: 'Latitude',
      editorName: 'Camera Latitude',
      type: 'number',
      group: 'Coordinates'
    },
    outZoom: {
      displayName: 'Zoom',
      type: 'number',
      group: 'Coordinates'
    },
    outBearing: {
      displayName: 'Bearing',
      type: 'number',
      group: 'Coordinates',
      default: 0
    },

    onLoaded: {
      displayName: 'Map Loaded',
      type: 'signal',
      group: 'Events'
    },
    onMoved: {
      displayName: 'Map Moved',
      type: 'signal',
      group: 'Events'
    },

    // Map Clicked
    onClick: {
      displayName: 'Click',
      type: 'signal',
      group: 'Map Clicked'
    },
    onClickLongitude: {
      displayName: 'Longitude',
      type: 'number',
      group: 'Map Clicked',
      editorName: 'Clicked Longitude'
    },
    onClickLatitude: {
      displayName: 'Latitude',
      type: 'number',
      group: 'Map Clicked',
      editorName: 'Clicked Latitude'
    },
  }
})
