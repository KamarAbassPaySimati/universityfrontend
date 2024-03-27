import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../pages/auth/authSlice';
import agentSlice from '../pages/Users/Agent/agentSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        agentUsers: agentSlice
    }
});
