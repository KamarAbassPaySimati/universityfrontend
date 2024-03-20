import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../pages/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice
    }
});
