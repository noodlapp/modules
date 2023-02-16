import {
  defineReactNode
} from '@noodl/noodl-sdk';
import MapComponent from '../components/Map';

// https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addcontrol
const AddControlPositionEnumType = {
  name: "enum",
  enums: [
    {
      value: "top-left",
      label: "Top Left",
    },
    {
      value: "top-right",
      label: "Top Right",
    },
    {
      value: "bottom-left",
      label: "Bottom Left",
    },
    {
      value: "bottom-right",
      label: "Bottom Right",
    },
  ]
}

// https://docs.mapbox.com/mapbox-gl-js/api/markers/#fullscreencontrol
const FullscreenControlInputs = {
  c_FullscreenControlEnable: {
    displayName: 'Enable Fullscreen',
    type: 'boolean',
    group: 'Controls - Fullscreen',
    default: false
  },
  c_FullscreenControlPosition: {
    displayName: 'Fullscreen Position',
    type: AddControlPositionEnumType,
    group: 'Controls - Fullscreen',
    default: 'top-right'
  },
}

// https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol
const GeolocateControlInputs = {
  c_GeolocateControlEnable: {
    displayName: 'Enable Geolocate',
    type: 'boolean',
    group: 'Controls - Geolocate',
    default: false
  },
  c_GeolocateControlPosition: {
    displayName: 'Geolocate Position',
    type: AddControlPositionEnumType,
    group: 'Controls - Geolocate',
    default: 'top-right'
  },
  c_GeolocateControlShowAccuracyCircle: {
    displayName: 'Show Accuracy Circle',
    tooltip: "A transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location.",
    type: 'boolean',
    group: 'Controls - Geolocate',
    default: true
  },
  c_GeolocateControlShowUserHeading: {
    displayName: 'Show User Heading',
    tooltip: "An arrow will be drawn next to the user location dot indicating the device's heading.",
    type: 'boolean',
    group: 'Controls - Geolocate',
    default: false
  },
  c_GeolocateControlShowUserLocation: {
    displayName: 'Show User Location',
    tooltip: "A dot will be shown on the map at the user's location.",
    type: 'boolean',
    group: 'Controls - Geolocate',
    default: true
  },
  c_GeolocateControlTrackUserLocation: {
    displayName: 'Track User Location',
    tooltip: "The control becomes a toggle button and when active the map will receive updates to the user's location as it changes.",
    type: 'boolean',
    group: 'Controls - Geolocate',
    default: true
  },
}

// https://docs.mapbox.com/mapbox-gl-js/api/markers/#navigationcontrol
const NavigationControlInputs = {
  c_NavigationControlEnable: {
    displayName: 'Enable Navigation',
    type: 'boolean',
    group: 'Controls - Navigation',
    default: false
  },
  c_NavigationControlPosition: {
    displayName: 'Navigation Position',
    type: AddControlPositionEnumType,
    group: 'Controls - Navigation',
    default: 'top-right'
  },
  c_NavigationControlShowCompass: {
    displayName: 'Show Compass',
    type: 'boolean',
    group: 'Controls - Navigation',
    default: true
  },
  c_NavigationControlShowZoom: {
    displayName: 'Show Zoom',
    type: 'boolean',
    group: 'Controls - Navigation',
    default: true
  },
  c_NavigationControlVisualizePitch: {
    displayName: 'Visualize Pitch',
    type: 'boolean',
    group: 'Controls - Navigation',
    default: false
  },
}

// https://docs.mapbox.com/mapbox-gl-js/api/markers/#scalecontrol
const ScaleControlInputs = {
  c_ScaleControlEnable: {
    displayName: 'Enable Scale',
    type: 'boolean',
    group: 'Controls - Scale',
    default: false
  },
  c_ScaleControlPosition: {
    displayName: 'Scale Position',
    type: AddControlPositionEnumType,
    group: 'Controls - Scale',
    default: 'bottom-right'
  },
  c_ScaleControlMaxWidth: {
    displayName: 'Max Width',
    type: "number",
    group: 'Controls - Scale',
    default: 100,
  },
  c_ScaleControlUnit: {
    displayName: 'Unit',
    type: {
      name: "enum",
      enums: [
        {
          value: "imperial",
          label: "Imperial",
        },
        {
          value: "metric",
          label: "Metric",
        },
        {
          value: "nautical",
          label: "Nautical",
        },
      ]
    },
    group: 'Controls - Scale',
    default: "metric",
  },
}

// https://github.com/mapbox/mapbox-gl-geocoder/blob/main/API.md#mapboxgeocoder
const GeocoderInputs = {
  c_GeocoderEnable: {
    displayName: 'Enable Geocoder',
    type: 'boolean',
    group: 'Controls - Geocoder',
    default: false
  },
  c_GeocoderPosition: {
    displayName: 'Geocoder Position',
    type: AddControlPositionEnumType,
    group: 'Controls - Geocoder',
    default: 'top-right'
  },
  c_GeocoderPlaceholder: {
    displayName: 'Placeholder',
    type: 'string',
    group: 'Controls - Geocoder',
    default: 'Search'
  },
  c_GeocoderShowMarker: {
    displayName: 'Show Marker',
    type: 'boolean',
    group: 'Controls - Geocoder',
    default: true
  },
}

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
    // Fullscreen Control
    {
      condition: "c_FullscreenControlEnable = true",
      inputs: [
        "c_FullscreenControlPosition",
      ]
    },
    // Geolocate Control
    {
      condition: "c_GeolocateControlEnable = true",
      inputs: [
        "c_GeolocateControlPosition",
        "c_GeolocateControlShowAccuracyCircle",
        "c_GeolocateControlShowUserHeading",
        "c_GeolocateControlShowUserLocation",
        "c_GeolocateControlTrackUserLocation",
      ]
    },
    // Navigation Control
    {
      condition: "c_NavigationControlEnable = true",
      inputs: [
        "c_NavigationControlPosition",
        "c_NavigationControlShowCompass",
        "c_NavigationControlShowZoom",
        "c_NavigationControlVisualizePitch",
      ]
    },
    // Scale Control
    {
      condition: "c_ScaleControlEnable = true",
      inputs: [
        "c_ScaleControlPosition",
        "c_ScaleControlMaxWidth",
        "c_ScaleControlUnit",
      ]
    },
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

    //coordinates and zoom
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
    ...FullscreenControlInputs,
    ...GeolocateControlInputs,
    ...NavigationControlInputs,
    ...ScaleControlInputs,
    ...GeocoderInputs,
  },
  signals: {
    centerOnUser: {
      displayName: 'Center on user',
      group: 'Actions',
      signal() {
        this.geolocate && this.geolocate.trigger();
      }
    }
  },
  outputProps: {
    outMap: {
      displayName: 'Mapbox Object',
      type: '*',
      group: 'Mapbox'
    },

    outLongitude: {
      displayName: 'Longitude',
      type: 'number',
      group: 'Coordinates'
    },
    outLatitute: {
      displayName: 'Latitude',
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
