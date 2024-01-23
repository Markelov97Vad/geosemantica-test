import { useCallback, useEffect, useRef, useState } from 'react';
import Map, { NavigationControl, Marker, GeolocateControl, GeolocateResultEvent, useMap, useControl, ScaleControl, MapRef, ViewStateChangeEvent } from 'react-map-gl/maplibre';
// import Map, {MapRef , Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import Navigation from '../Navigation/Navigation';
import './MapSection.scss';
import { useAppSelector } from '@/hooks/reduxHooks';


function MapSection() {
  const { point } = useAppSelector(state => state.search);
  const longValue = Number(point.split(' ')[0]);
  const latValue = Number(point.split(' ')[1]);

  const geoControlRef = useRef<maplibregl.GeolocateControl>();
  const mapRef = useRef<MapRef>();

  useEffect(() => {
    // Activate as soon as the control is loaded
    geoControlRef.current?.trigger();
    // geoControlRef.current?.
  }, [geoControlRef.current]);

  const [viewState, setViewState] = useState({
    longitude: 30.30181113722973,
    latitude: 59.95294975379594,
    zoom: 14,
  });

  // const geocoder = useControl(viewState)

  // const {current: map} = useMap();
  const onMove = useCallback((e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
    // setViewState2(e.viewState.);
    // console.log(e.originalEvent.view.location)
    // map?.flyTo({ center: [longValue, latValue]},);
  }, []);
  const onZoom = (e: ViewStateChangeEvent) => {
    // mapRef.current?.flyTo({center: [longValue, latValue], duration: 2000});
    setViewState(e.viewState);
  }
  const onPitch = (e: ViewStateChangeEvent) => {
    // mapRef.current?.flyTo({center: [longValue, latValue], duration: 2000});
    setViewState(e.viewState);
  }
  // const onSelectCity = useCallback(() => {
  //   mapRef.current?.flyTo({center: [viewState.longitude, viewState.latitude], duration: 2000});
  // }, []);
  
  // const onMapLoad = useCallback(() => {
  //   mapRef?.current?.flyTo({center: [viewState.longitude, viewState.latitude], duration: 2000});
  // }, [viewState]);
  useEffect(() => {
    // map?.flyTo({ center: [longValue, latValue ], essential: true});
    // if (mapRef.current) {
    //   mapRef.current.flyTo(({ center: [longValue, latValue ], essential: true}))
      
    // }
    if (point) {
      // onSelectCity();
      // onMapLoad();
      mapRef?.current?.flyTo({center: [longValue, latValue], duration: 2000});
      setViewState({
        longitude: longValue,
        latitude: latValue,
        zoom: 14,
      });
    }
    console.log('render',point);
    
  }, [point]);

  // const mapRef = useRef<MapRef>();


  
  // const onClick = () => {
  //   map.flyTo({center: [-122.4, 37.8]});
  // };

  const initialViewState = {
    latitude: 59.95294975379594,
    longitude: 30.30181113722973,
    zoom: 14,
    bearing: 0,
    pitch: 0
  };

  const KEY = process.env.API_KEY_MAP

  return (
    <section className="map-section">
      <Navigation />
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        // {...viewState}
        initialViewState={initialViewState}
        // onMove={onMove}
        // onZoom={onZoom}
        // onPitch={onPitch}
        style={{ width: '100%', height: ' calc(100vh - 77px)' }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${KEY}`}
        // touchPitch={true}
      >
        {/* <ScaleControl /> */}
        <NavigationControl position="top-left" />
        {/* <GeolocateControl ref={geoControlRef} position="top-left" /> */}
        {point && <Marker longitude={longValue} latitude={latValue} color="red" />}
      </Map>
    </section>
  );
}

export default MapSection;
