import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dropdown: {
        dashboard: false,
        users: false
    },
    setSearchedParamsList: '',
    setSearchedParamsView: ''
};

const GlobalSlice = createSlice({
    name: 'GlobalData',
    initialState,
    reducers: {
        setDropdown: (state, action) => {
            state.dropdown[action.payload] = !state.dropdown[action.payload];
        },
        setSearchedParamsList: (state, action) => {
            state.setSearchedParamsList = action.payload;
        },
        setSearchedParamsView: (state, action) => {
            state.setSearchedParamsView = action.payload;
        }
    }
});

export const { setDropdown, setSearchedParamsList, setSearchedParamsView } = GlobalSlice.actions;
export default GlobalSlice.reducer;
