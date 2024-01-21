import { featureMemberType } from "@/types/api";
import { DEFAULT_POINT } from "@/utils/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPlace } from "./api";

type InitialStateType = {
  point: string;
  placeData: featureMemberType[];
  error: null | string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: InitialStateType = {
  point: DEFAULT_POINT,
  placeData: [],
  error: null,
  loading: 'idle'
}

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    addPoint(state, action : PayloadAction<string>) {
      state.point = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlace.pending,(state) => {
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
  }
})



export const { addPoint } = placeSlice.actions;
export default placeSlice.reducer;