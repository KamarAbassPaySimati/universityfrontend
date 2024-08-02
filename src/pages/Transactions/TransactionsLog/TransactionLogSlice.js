import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const TransactionLogList = createAsyncThunk('TransactionLog', async (url, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation

    try {
        const res = await dataService.GetAPI(url);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});

const TransactionLogSlice = createSlice({
    name: 'transaction-log',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(TransactionLogList.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.List = [];
            })
            .addCase(TransactionLogList.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (!payload?.error) {
                    state.List = payload?.data;
                } else {
                    state.error = payload?.data;
                }
            })
            .addCase(TransactionLogList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            });
    }
});

export default TransactionLogSlice.reducer;
