import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: '',
    loggedIn: null
};

const authSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        login: (state, action) => {
            state.loggedIn = true;
        },
        logout: (state, action) => {
            localStorage.clear();
            state.loggedIn = false;
        }
    }
});

export const { setUser, login, logout } = authSlice.actions;
export default authSlice.reducer;
