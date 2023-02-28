import { useState, useRef, useEffect } from 'react';
import { MapContextProvider } from '../contexts/MapContext';

// https://www.npmjs.com/package/mapbox-gl
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useFullscreenControl } from './controls/FullscreenControl';
import { useMapboxGeocoder } from './controls/MapboxGeocoder';
import { useGeolocateControl } from './controls/GeolocateControl';
import { useNavigationControl } from './controls/NavigationControl';
import { useScaleControl } from './controls/ScaleControl';
import { useMapboxDraw } from './controls/MapboxDraw';

export default function Map(props) {
  const {
    mapboxStyle,
    interactive,

    longitude,
    latitute,
    zoom,
    bearing,

    outMap,
    outMapboxDraw,
    outLongitude,
    outLatitute,
    outZoom,
    outBearing,

    onLoaded,
    onMoved,
    onClick,
    onClickLongitude,
    onClickLatitude,

    style,
    children,
  } = props;

  const containerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const accessToken = Noodl.getProjectSettings().mapboxAccessToken;
    mapboxgl.accessToken = accessToken;

    // You can also send in a JSON string for a custom style
    let mapStyle = mapboxStyle || 'mapbox://styles/mapbox/streets-v12';
    if (mapStyle.startsWith("{")) {
      try {
        mapStyle = JSON.parse(mapStyle);
      } catch (error) {
        console.error("Failed to parse Map Style", error);
      }
    }

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: mapStyle,
      center: [longitude || 0, latitute || 0],
      zoom: zoom || 0,
      // Allow taking screenshots
      preserveDrawingBuffer: true,
      bearing,
      interactive
    });

    const resizeObserver = new ResizeObserver(() => {
      map.resize()
    }); 
    resizeObserver.observe(containerRef.current)

    setMap(map);
    outMap(map);

    map.on('move', () => {
      const { lng, lat } = map.getCenter();
      outLongitude(lng);
      outLatitute(lat);
      outZoom(map.getZoom());
      outBearing(map.getBearing());
      onMoved();
    });

    map.on('load', () => {
      onLoaded();
    })
    
    map.on('click', (e) => {
      onClickLongitude(e.lngLat.lng);
      onClickLatitude(e.lngLat.lat);
      onClick();
    });

    return function () {
      map.remove();
      resizeObserver.disconnect();
    }
  }, [containerRef]);

  useEffect(() => {
    if (!map) return;
    map.flyTo({ center: [longitude || 0, latitute || 0] });
  }, [map, longitude, latitute]);

  useEffect(() => {
    if (!map) return;
    map.flyTo({ zoom: zoom || 0 });
  }, [map, zoom]);

  useEffect(() => {
    if (!map) return;
    map.flyTo({ bearing: bearing || 0 });
  }, [map, bearing]);

  // TODO: There is an issue where the controls will show up in the order they are added.

  // Add controls
  useMapboxGeocoder(map, props);
  useFullscreenControl(map, props);
  useGeolocateControl(map, props);
  useNavigationControl(map, props);
  useScaleControl(map, props);
  const { draw } = useMapboxDraw(map, props);

  return (
    <div style={{...{width: '100%', height: '100%'}, ...style}}>
      <div style={{width: '100%', height: '100%'}} ref={containerRef} />
      {containerRef && map && (
        <MapContextProvider map={map} draw={draw}>
          <div style={{width: '100%', height: '100%'}}>{children}</div>
        </MapContextProvider>
      )}
    </div>
  );
}
