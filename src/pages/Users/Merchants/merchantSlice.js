import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const MerchantList = createAsyncThunk('merchantUsers/fetchAll', async (searchParams, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation
    try {
        const res = await dataService.GetAPI(`admin-users/merchant-list?${searchParams.toString()}`);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});
// Fetch reported merchants
export const ReportedMerchantList = createAsyncThunk('merchantUsers/fetchReported', async (searchParams, { rejectWithValue }) => {
    try {
        const res = await dataService.GetAPI(`admin-users/merchant-list/reported?${searchParams.toString()}`);
        return res;
    } catch (error) {
        console.error('Error fetching reported merchants:', error);
        return rejectWithValue({ message: error });
    }
});

const merchantSlice = createSlice({
    name: 'merchant-list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(MerchantList.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.List = [];
            })
            .addCase(MerchantList.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (!payload?.error) {
                    state.List = payload?.data;
                } else {
                    state.error = payload?.data;
                }
            })
            .addCase(MerchantList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            })

            // Handling reported merchants API response
            .addCase(ReportedMerchantList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ReportedMerchantList.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (!payload?.error) {
                    state.List = payload?.data; // Overwrites the List with reported merchants
                } else {
                    state.error = payload?.data;
                }
            })
            .addCase(ReportedMerchantList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            });
    }
});

export default merchantSlice.reducer;
