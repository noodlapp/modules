import { useState, useRef, useEffect } from 'react';
import { MapContextProvider } from '../contexts/MapContext';

// https://www.npmjs.com/package/mapbox-gl
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// https://www.npmjs.com/package/@mapbox/mapbox-gl-geocoder
// https://docs.mapbox.com/help/tutorials/geocode-and-sort-stores/
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default function Map({
  mapboxStyle,
  interactive,

  longitude,
  latitute,
  zoom,
  bearing,
  
  c_FullscreenControlEnable,
  c_FullscreenControlPosition,

  c_GeolocateControlEnable,
  c_GeolocateControlPosition,
  c_GeolocateControlShowAccuracyCircle,
  c_GeolocateControlShowUserHeading,
  c_GeolocateControlShowUserLocation,
  c_GeolocateControlTrackUserLocation,

  c_NavigationControlEnable,
  c_NavigationControlPosition,
  c_NavigationControlShowCompass,
  c_NavigationControlShowZoom,
  c_NavigationControlVisualizePitch,

  c_ScaleControlEnable,
  c_ScaleControlPosition,
  c_ScaleControlMaxWidth,
  c_ScaleControlUnit,

  c_GeocoderEnable,
  c_GeocoderPosition,
  c_GeocoderPlaceholder,
  c_GeocoderShowMarker,

  outMap,
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
}) {
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

  //
  // MapboxGeocoder
  useEffect(() => {
    if (!map) return;
    if (!c_GeocoderEnable) return;

    const control = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: c_GeocoderPlaceholder,
      marker: c_GeocoderShowMarker,
    });

    map.addControl(control, c_GeocoderPosition);

    return function () {
      // Solve the issue with reseting the input
      try {
        map.removeControl(control);
      } catch {}
    };
  }, [
    map,
    c_GeocoderEnable,
    c_GeocoderPosition,
    c_GeocoderPlaceholder,
    c_GeocoderShowMarker,
  ]);

  //
  // FullscreenControl
  useEffect(() => {
    if (!map) return;
    if (!c_FullscreenControlEnable) return;

    const control = new mapboxgl.FullscreenControl();
    map.addControl(control, c_FullscreenControlPosition);

    return function () {
      // Solve the issue with reseting the input
      try {
        map.removeControl(control);
      } catch {}
    };
  }, [
    map,
    c_FullscreenControlEnable,
    c_FullscreenControlPosition,
  ]);

  //
  // GeolocateControl
  useEffect(() => {
    if (!map) return;
    if (!c_GeolocateControlEnable) return;

    const control = new mapboxgl.GeolocateControl({
      // fitBoundsOptions:
      // geolocation:
      positionOptions: {
        enableHighAccuracy: true
      },
      showAccuracyCircle: c_GeolocateControlShowAccuracyCircle,
      showUserHeading: c_GeolocateControlShowUserHeading,
      showUserLocation: c_GeolocateControlShowUserLocation,
      trackUserLocation: c_GeolocateControlTrackUserLocation,
    });

    map.addControl(control, c_GeolocateControlPosition);

    return function () {
      // Solve the issue with reseting the input
      try {
        map.removeControl(control);
      } catch {}
    };
  }, [
    map,
    c_GeolocateControlEnable,
    c_GeolocateControlPosition,
    c_GeolocateControlShowAccuracyCircle,
    c_GeolocateControlShowUserHeading,
    c_GeolocateControlShowUserLocation,
    c_GeolocateControlTrackUserLocation,
  ]);

  //
  // NavigationControl
  useEffect(() => {
    if (!map) return;
    if (!c_NavigationControlEnable) return;

    const control = new mapboxgl.NavigationControl({
      showCompass: c_NavigationControlShowCompass,
      showZoom: c_NavigationControlShowZoom,
      visualizePitch: c_NavigationControlVisualizePitch
    });

    map.addControl(control, c_NavigationControlPosition);

    return function () {
      // Solve the issue with reseting the input
      try {
        map.removeControl(control);
      } catch {}
    };
  }, [
    map,
    c_NavigationControlEnable,
    c_NavigationControlPosition,
    c_NavigationControlShowCompass,
    c_NavigationControlShowZoom,
    c_NavigationControlVisualizePitch,
  ]);

  //
  // ScaleControl
  useEffect(() => {
    if (!map) return;
    if (!c_ScaleControlEnable) return;

    const control = new mapboxgl.ScaleControl({
      maxWidth: c_ScaleControlMaxWidth,
      unit: c_ScaleControlUnit,
    });

    map.addControl(control, c_ScaleControlPosition);

    return function () {
      // Solve the issue with reseting the input
      try {
        map.removeControl(control);
      } catch {}
    };
  }, [
    map,
    c_ScaleControlEnable,
    c_ScaleControlPosition,
    c_ScaleControlMaxWidth,
    c_ScaleControlUnit,
  ]);

  return (
      <div style={{...{width: '100%', height: '100%'}, ...style}}>
        <div style={{width: '100%', height: '100%'}} ref={containerRef} />
        {containerRef && map && (
          <MapContextProvider map={map}>
            <div style={{width: '100%', height: '100%'}}>{children}</div>
          </MapContextProvider>
        )}
      </div>
  );
}
