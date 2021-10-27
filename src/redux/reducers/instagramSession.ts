import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InstagramSession } from "../../types";

// Default
const instaSession: InstagramSession = {
  userId: 0,
  token: ''
}
const initialState  = {
  instaSession
};

//Slice
const sessionSlice = createSlice({
  name: 'instagramSession',
  initialState,
  reducers: {
    storeInstagramSessionInMemory: (state, action: PayloadAction<InstagramSession>) => {
        console.log(action.payload)
        state.instaSession.token = action.payload.token
        state.instaSession.userId = action.payload.userId
    },
    logoutInstagramAccount: state => {
        state.instaSession = initialState.instaSession
    },
  },
});

//Actions
export const { storeInstagramSessionInMemory, logoutInstagramAccount } = sessionSlice.actions

//Reducer
export default sessionSlice.reducer
