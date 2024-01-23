import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import Map, { NavigationControl, Marker, ScaleControl, MapRef } from 'react-map-gl/maplibre';
import Navigation from '../Navigation/Navigation';
import './MapSection.scss';
import { useAppSelector } from '@/hooks/reduxHooks';

function MapSection() {
  const KEY = process.env.API_KEY_MAP;
  const { point } = useAppSelector(state => state.search);
  const longValue = Number(point.split(' ')[0]);
  const latValue = Number(point.split(' ')[1]);
  const mapRef = useRef<MapRef>();

  useEffect(() => {
    if (point) {
      mapRef?.current?.flyTo({ center: [longValue, latValue], duration: 2000 });
    }
  }, [point]);

  const initialViewState = {
    latitude: 59.95294975379594,
    longitude: 30.30181113722973,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  };

  return (
    <section className="map-section">
      <Navigation />
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={initialViewState}
        style={{ width: '100%', height: ' calc(100vh - 77px)' }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${KEY}`}
      >
        <ScaleControl />
        <NavigationControl position="top-left" />
        {point && <Marker longitude={longValue} latitude={latValue} color="red" />}
      </Map>
    </section>
  );
}

export default MapSection;
