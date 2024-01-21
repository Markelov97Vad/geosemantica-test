import { IGeoObject } from "@/types/api";
import { DEFAULT_POINT } from "@/utils/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  point: string;
  placeData: IGeoObject[];
  error: null;
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

  }
})

export const { addPoint } = placeSlice.actions;
export default placeSlice.reducer;