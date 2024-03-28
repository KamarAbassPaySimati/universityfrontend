import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../pages/auth/authSlice';
import GlobalSlice from './GlobalSlice';
import agentSlice from '../pages/Users/Agent/agentSlice';

export const store = configureStore({
    reducer: {
        globalData: GlobalSlice,
        auth: authSlice,
        agentUsers: agentSlice
    }
});
