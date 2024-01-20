import { useEffect, useState } from "react";
import maplibregl from 'maplibre-gl';
import Map, { NavigationControl, Marker } from 'react-map-gl/maplibre';
import Navigation from "../Navigation/Navigation";
import { ApiGeocoderResponseType } from "@/types/api";
import './MapSection.scss';

function MapSection() {
  const [response, setResponse] = useState<ApiGeocoderResponseType>();
  const longValue = 55.278675;
  const latValue = 25.192897;

  useEffect(() => {
    // console.log(response.response.GeoObjectCollection.featureMember.forEach(data => console.log(data.GeoObject.Point)));
    longValue
  }, [response]);
  return (
    <section className="map-section">
      <Navigation />
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: longValue,
          latitude: latValue,
          zoom: 14,
        }}
        style={{ width: '100%', height: ' calc(100vh - 77px)' }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=TtkWw04Kri0pzq5wPr6w"
      >
        <NavigationControl position="top-left" />
        <Marker longitude={longValue} latitude={latValue} color="red" />
      </Map>
    </section>
  );
}

export default MapSection;
