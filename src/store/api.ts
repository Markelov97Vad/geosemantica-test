import { ApiGeocoderResponseType, featureMemberType } from '@/types/api';
import { KEY } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchPlace = createAsyncThunk<
  featureMemberType[],
  string,
  { rejectValue: string }
>('place', async function (queryString, { rejectWithValue }) {
  try {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${KEY}&geocode=${queryString}&results=4&format=json`
    );
    console.log(queryString);
    
    if (!response.ok) {
      return await Promise.reject(new Error(`Status: ${response.status}`));
    }
    const json = (await response.json()) as ApiGeocoderResponseType;
    const geolocationData: featureMemberType[] =
      json.response.GeoObjectCollection.featureMember;

    return geolocationData;
  } catch (err) {
    return rejectWithValue(`Ошибка при получении данных места: ${err}`);
  }
});

export { fetchPlace };
