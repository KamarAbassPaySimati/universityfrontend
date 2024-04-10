import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const KycVerificationList = createAsyncThunk('kycVerifications', async (searchParams, url, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation
    const safeUrl =
        `${url}?${searchParams.toString()}`;// api end point

    try {
        const res = await dataService.GetAPI(safeUrl);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});

const kycVerificationSlice = createSlice({
    name: 'admin-list',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(KycVerificationList.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.List = [];
            })
            .addCase(KycVerificationList.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (!payload?.error) {
                    state.List = payload?.data;
                } else {
                    state.error = payload?.data;
                }
            })
            .addCase(KycVerificationList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            });
    }
});

export default kycVerificationSlice.reducer;
