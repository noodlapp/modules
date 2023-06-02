import {
  useState,
  useRef,
  useEffect
} from 'react';
import {
  AddControlPositionEnumType
} from '../../constants';

// https://github.com/mapbox/mapbox-gl-draw/tree/main
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

export const DynamicPorts = []

export const Inputs = {
  c_MapboxDrawEnable: {
    displayName: 'Enable Mapbox Draw',
    type: 'boolean',
    group: 'Controls - Mapbox Draw',
    default: false
  },
  c_MapboxDrawPosition: {
    displayName: 'Mapbox Draw Position',
    type: AddControlPositionEnumType,
    group: 'Controls - Mapbox Draw',
    default: 'top-right'
  },
  c_MapboxDrawKeybindings: {
    displayName: 'Enable Draw Keybindings',
    type: 'boolean',
    group: 'Controls - Mapbox Draw',
    default: false
  },
  c_MapboxDrawTouch: {
    displayName: 'Enable Draw Touch',
    type: 'boolean',
    group: 'Controls - Mapbox Draw',
    default: true
  },
  c_MapboxDrawBoxSelect: {
    displayName: 'Enable Draw Box Select',
    type: 'boolean',
    group: 'Controls - Mapbox Draw',
    default: true
  },
  c_MapboxDrawDisplayControls: {
    displayName: 'Display Draw Controls',
    type: 'boolean',
    group: 'Controls - Mapbox Draw',
    default: false
  },

  c_MapboxDrawControlPoints: {
    displayName: 'Points',
    type: 'boolean',
    group: 'Controls - Mapbox Draw - Controls',
    default: false
  },
  c_MapboxDrawControlLineString: {
    displayName: 'Line String',
    type: 'boolean',
    group: 'Controls - Mapbox Draw - Controls',
    default: false
  },
  c_MapboxDrawControlPloygon: {
    displayName: 'Polygon',
    type: 'boolean',
    group: 'Controls - Mapbox Draw - Controls',
    default: true
  },
  c_MapboxDrawControlTrash: {
    displayName: 'Trash',
    type: 'boolean',
    group: 'Controls - Mapbox Draw - Controls',
    default: true
  },
  c_MapboxDrawControlCombineFeatures: {
    displayName: 'Combine Features',
    type: 'boolean',
    group: 'Controls - Mapbox Draw - Controls',
    default: false
  },
  c_MapboxDrawControlUncombineFeatures: {
    displayName: 'Uncombine Features',
    type: 'boolean',
    group: 'Controls - Mapbox Draw - Controls',
    default: false
  },
}

export function useMapboxDraw(
  map, {
    c_MapboxDrawEnable,
    c_MapboxDrawPosition,
    c_MapboxDrawKeybindings,
    c_MapboxDrawTouch,
    c_MapboxDrawBoxSelect,
    c_MapboxDrawDisplayControls,
    c_MapboxDrawControlPoints,
    c_MapboxDrawControlLineString,
    c_MapboxDrawControlPloygon,
    c_MapboxDrawControlTrash,
    c_MapboxDrawControlCombineFeatures,
    c_MapboxDrawControlUncombineFeatures,

    outMapboxDraw,
  }
) {
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    if (!map) return;
    if (!c_MapboxDrawEnable) return;

    // https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md#options
    const control = new MapboxDraw({
      keybindings: c_MapboxDrawKeybindings,
      touchEnabled: c_MapboxDrawTouch,
      boxSelect: c_MapboxDrawBoxSelect,
      controls: {
        point: c_MapboxDrawControlPoints,
        line_string: c_MapboxDrawControlLineString,
        polygon: c_MapboxDrawControlPloygon,
        trash: c_MapboxDrawControlTrash,
        combine_features: c_MapboxDrawControlCombineFeatures,
        uncombine_features: c_MapboxDrawControlUncombineFeatures
      },
      displayControlsDefault: c_MapboxDrawDisplayControls,
      // styles: undefined,
    });

    map.addControl(control, c_MapboxDrawPosition);

    setDraw(control);
    outMapboxDraw(control);

    return function () {
      // Solve the issue with reseting the input
      try {
        map.removeControl(control);
      } catch {
        // noop
      }
    };
  }, [
    map,
    c_MapboxDrawPosition,
    c_MapboxDrawKeybindings,
    c_MapboxDrawTouch,
    c_MapboxDrawBoxSelect,
    c_MapboxDrawDisplayControls,
    c_MapboxDrawControlPoints,
    c_MapboxDrawControlLineString,
    c_MapboxDrawControlPloygon,
    c_MapboxDrawControlTrash,
    c_MapboxDrawControlCombineFeatures,
    c_MapboxDrawControlUncombineFeatures,
  ]);

  return {
    draw
  }
}