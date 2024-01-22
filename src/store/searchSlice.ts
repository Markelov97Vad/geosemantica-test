import { featureMemberType } from '@/types/apiPlace';
import { DEFAULT_POINT } from '@/utils/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrganization, fetchPlace } from './api';
import { OrganizationDataType } from '@/types/apiOrganization';

type InitialStateType = {
  point: string;
  placeData: featureMemberType[];
  organizationData: OrganizationDataType[];
  error: null | string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState: InitialStateType = {
  point: DEFAULT_POINT,
  placeData: [],
  organizationData: [],
  error: null,
  loading: 'idle',
};

const searcSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    addPoint(state, action: PayloadAction<string>) {
      state.point = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPlace.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchPlace.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.placeData = action.payload;
      })
      .addCase(fetchPlace.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchOrganization.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchOrganization.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.organizationData = action.payload;
      })
      .addCase(fetchOrganization.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
  },
});

export const { addPoint } = searcSlice.actions;
export default searcSlice.reducer;
