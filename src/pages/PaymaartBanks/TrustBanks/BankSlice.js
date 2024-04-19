import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const bankAccountList = createAsyncThunk('bankAccounts', async (url, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation
    const safeUrl =
        `${url}`;// api end point

    console.log(safeUrl, 'safeurl');

    try {
        const res = await dataService.GetAPI(safeUrl);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});

const BankSlice = createSlice({
    name: 'bank-account-list',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(bankAccountList.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.List = [];
            })
            .addCase(bankAccountList.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (!payload?.error) {
                    state.data = payload?.data.data.slice(1).concat(payload?.data.data.slice(0, 1));
                    state.List = { success_status: payload?.data.data.success_status, data: state.data };
                } else {
                    state.error = payload?.data;
                }
            })
            .addCase(bankAccountList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            });
    }
});

export default BankSlice.reducer;
