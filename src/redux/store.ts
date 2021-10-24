import { combineReducers } from 'redux'
import {configureStore} from '@reduxjs/toolkit';
import sessionReducer from './reducers/session';
import instagramSessionReducer from './reducers/instagramSession';

const reducer = combineReducers({
    session: sessionReducer,
    instagramSession: instagramSessionReducer,
})

export const store = configureStore({
    reducer
})


export type RootState = ReturnType<typeof store.getState>