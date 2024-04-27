import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const CustomerList = createAsyncThunk('agentUsers', async (searchParams, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation

    try {
        const res = await dataService.GetAPI(`admin-users/customer-list?${searchParams.toString()}`);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});

const customerSlice = createSlice({
    name: 'customer-list',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(CustomerList.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.List = [];
            })
            .addCase(CustomerList.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (!payload?.error) {
                    state.List = payload?.data;
                } else {
                    state.error = payload?.data;
                }
            })
            .addCase(CustomerList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            });
    }
});

export default customerSlice.reducer;
