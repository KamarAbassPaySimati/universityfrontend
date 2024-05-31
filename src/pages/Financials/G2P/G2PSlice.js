import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const G2PList = createAsyncThunk('G2P', async (url, { rejectWithValue }) => {
    try {
        const res = await dataService.GetAPI(url);
        return res;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error.message }); // Error message needs to be accessed via error.message
    }
});

const G2PSlice = createSlice({
    name: 'G2P-list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(G2PList.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.List = [];
            })
            .addCase(G2PList.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (!payload?.error) {
                    state.List = payload?.data;
                } else {
                    state.error = payload?.data;
                }
            })
            .addCase(G2PList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            });
    }
});

export default G2PSlice.reducer;
