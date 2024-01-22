import { ApiOrganizationResponseType, OrganizationDataType } from '@/types/apiOrganization';
import { ApiGeocoderResponseType, featureMemberType } from '@/types/apiPlace';
// import { KEY } from '@/utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchPlace = createAsyncThunk<featureMemberType[], string, { rejectValue: string }>(
  'search/place',
  async function (queryString, { rejectWithValue }) {
    try {
      const key = process.env.API_KEY_PLACE;
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${key}&geocode=${queryString}&results=4&format=json`,
      );
      console.log(queryString);

      if (!response.ok) {
        return await Promise.reject(new Error(`Status: ${response.status}`));
      }
      const json = (await response.json()) as ApiGeocoderResponseType;
      const geolocationData: featureMemberType[] = json.response.GeoObjectCollection.featureMember;

      return geolocationData;
    } catch (err) {
      return rejectWithValue(`Ошибка при получении данных места: ${err}`);
    }
  },
);

const fetchOrganization = createAsyncThunk<OrganizationDataType[], string, { rejectValue: string }>(
  'search/organization',
  async function (queryString, { rejectWithValue }) {
    try {
      const key = process.env.API_KEY_ORG;
      console.log(key);
      
      const response = await fetch(
        `https://search-maps.yandex.ru/v1/?text=${queryString}&results=3&lang=ru_RU&apikey=${key}`
      );

      if (!response.ok) {
        return await Promise.reject(new Error(`Status: ${response.status}`));
      }

      const json = (await response.json()) as ApiOrganizationResponseType;
      const organizationData: OrganizationDataType[] = json.features;
      console.log(organizationData);
      
      return organizationData;
    } catch (err) {
      return rejectWithValue(`Ошибка при получении данных организации: ${err}`);
    }
  },
);

export { fetchPlace, fetchOrganization };
