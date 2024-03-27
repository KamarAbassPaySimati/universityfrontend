import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../pages/auth/authSlice';
import GlobalSlice from './GlobalSlice';

export const store = configureStore({
    reducer: {
        globalData: GlobalSlice,
        auth: authSlice
    }
});
