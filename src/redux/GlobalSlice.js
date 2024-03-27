import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dropdown: {
        dashboard: false,
        users: false
    }
};

const GlobalSlice = createSlice({
    name: 'GlobalData',
    initialState,
    reducers: {
        setDropdown: (state, action) => {
            state.dropdown[action.payload] = !state.dropdown[action.payload];
        }
    }
});

export const { setDropdown } = GlobalSlice.actions;
export default GlobalSlice.reducer;
