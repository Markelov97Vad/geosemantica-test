import Map, { NavigationControl, Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import '../maplibre-gl.scss';
import './App.scss';
import { useEffect, useState } from 'react';
import { ApiGeocoderResponseType } from '@/types/api';
// import dotenv, { config } from 'dotenv';
// dotenv.config();

function App() {
  const [response, setResponse] = useState<ApiGeocoderResponseType>();
  const longValue = 55.278675;
  const latValue = 25.192897;

  // useEffect(() => {
  //   const fetchData = async(): Promise<ApiGeocoderResponseType> => {
  //     try {
  //       //  const API_GEOCODE_URL = 'https://geocode-maps.yandex.ru/'
  // //       const API_GEOCODE_URL_TEST = 'https://geocode-maps.yandex.ru/1.x/?apikey=8b6c1bba-81f4-4b9b-9664-0c98c9d3682d&geocode=бульвар+Мухаммед+Бин+Рашид+1';
  //       const API_GEOCODE_URL_TEST2 = 'https://geocode-maps.yandex.ru/1.x/?apikey=8b6c1bba-81f4-4b9b-9664-0c98c9d3682d&geocode=Дубай, бульвар Мухаммед Бин Рашид, дом&format=json';
  //       // const JSONPLACE_TEST = 'https://jsonplaceholder.typicode.com/todos/1'
  //       const response = await fetch(API_GEOCODE_URL_TEST2);
  //       const res = await response.json()
  // //       // console.log(response.json());
  //       return res
        
  //     } catch(err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchData().then(res => setResponse(() => res))
  // }, []);

  useEffect(() => {
    // console.log(response.response.GeoObjectCollection.featureMember.forEach(data => console.log(data.GeoObject.Point)));
    longValue
  }, [response]);
  return (
    <>
      <h1 className="title">Test geosemantica</h1>
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
    </>
  );
}

export default App;
