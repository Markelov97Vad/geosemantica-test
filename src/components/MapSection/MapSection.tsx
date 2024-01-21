import { useCallback, useEffect, useState } from "react";
import maplibregl from 'maplibre-gl';
import Map, { NavigationControl, Marker, GeolocateControl, GeolocateResultEvent } from 'react-map-gl/maplibre';
import Navigation from "../Navigation/Navigation";
import { ApiGeocoderResponseType } from "@/types/api";
import './MapSection.scss';
import { useAppSelector } from "@/hooks/reduxHooks";
import { ViewStateChangeEvent } from "react-map-gl";
// import { GeolocateResultEvent } from "react-map-gl";

function MapSection() {
  const [response, setResponse] = useState<ApiGeocoderResponseType>();
  const { point } = useAppSelector(state => state.place)
  const longValue = Number(point.split(' ')[0]);
  const longValue2 = Number('0.329089');
  const latValue = Number(point.split(' ')[1]);
  const latValue2 = Number('42.826748');

  const [viewState, setViewState] = useState({
    longitude: longValue,
    latitude: latValue,
    zoom: 14
  });

  const handleGeolocate = (e: GeolocateResultEvent) => {
      const { } = e.originalEvent
  }
  const onMove = useCallback((e : any) => {
    // dispatch({type: 'setViewState', payload: e.viewState});
    setViewState(e.viewState)
    console.log(e.viewState);
    
  }, []);

  useEffect(() => {
    // console.log(response.response.GeoObjectCollection.featureMember.forEach(data => console.log(data.GeoObject.Point)));
    // longValue
    console.log(longValue, latValue);
    setViewState({
      longitude: Number(point.split(' ')[0]),
      latitude: Number(point.split(' ')[1]),
      zoom: 12
    })
  }, [point]);
  return (
    <section className="map-section">
      <Navigation />
      <Map
        mapLib={maplibregl}
        // trackResize={true}
        // initialViewState={{
        //   longitude: longValue,
        //   latitude: latValue,
        //   zoom: 14,
        // }}
        // initialViewState={viewState}
        {...viewState}
        onMove={onMove}
        style={{ width: '100%', height: ' calc(100vh - 77px)' }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=TtkWw04Kri0pzq5wPr6w"
      >
        <NavigationControl position="top-left" />
        <GeolocateControl 
          onGeolocate={handleGeolocate}
        />
        <Marker longitude={longValue} latitude={latValue} color="red" />
        {/* <Marker longitude={longValue2} latitude={latValue2} color="red" fly/> */}
      </Map>
    </section>
  );
}

export default MapSection;
