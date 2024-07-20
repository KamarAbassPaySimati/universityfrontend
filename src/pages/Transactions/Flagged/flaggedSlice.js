import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const FlaggedList = createAsyncThunk('agentUsers', async (searchParams, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation

    try {
        const res = await dataService.GetAPI(`admin-transactions/list?${searchParams}`);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});

const flaggedSlice = createSlice({
    name: 'flagged-list',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(FlaggedList.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.List = [];
            })
            .addCase(FlaggedList.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (!payload?.error) {
                    state.List = payload?.data;
                } else {
                    state.error = payload?.data;
                }
            })
            .addCase(FlaggedList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            });
    }
});

export default flaggedSlice.reducer;
