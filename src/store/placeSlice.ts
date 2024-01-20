import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
})

// export { } = placeSlice.actions;
export default placeSlice.reducer;