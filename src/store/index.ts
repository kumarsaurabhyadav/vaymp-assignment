import { configureStore } from '@reduxjs/toolkit';
import bagReducer from './bagSlice';

export const store = configureStore({
  reducer: {
    bag: bagReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
