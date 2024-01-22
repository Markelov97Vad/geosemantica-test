import Map, { NavigationControl, Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
// import '../maplibre-gl.scss';
import './App.scss';
import { useEffect, useState } from 'react';
import { ApiGeocoderResponseType } from '@/types/apiPlace';
import Navigation from '../Navigation/Navigation';
import '../../assets/styles/_index.scss';
import MapSection from '../MapSection/MapSection';
// import dotenv, { config } from 'dotenv';
// dotenv.config();

function App() {
  return (
    <main className="root">
      <MapSection />
    </main>
  );
}

export default App;
