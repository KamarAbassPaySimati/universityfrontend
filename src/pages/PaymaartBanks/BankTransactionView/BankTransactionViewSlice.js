import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const BankTransactionViewData = createAsyncThunk('bankTransactionViewData', async (searchParams, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation
    try {
        const res = await dataService.GetAPI(`admin-users/${searchParams}`);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});

const BankTransactionViewSlice = createSlice({
    name: 'bank-account-list',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(BankTransactionViewData.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.List = [];
            })
            .addCase(BankTransactionViewData.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (!payload?.error) {
                    state.Data = payload?.data;
                } else {
                    state.error = payload?.data;
                }
            })
            .addCase(BankTransactionViewData.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            });
    }
});

export default BankTransactionViewSlice.reducer;
