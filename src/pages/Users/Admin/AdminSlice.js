import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const AdminList = createAsyncThunk('adminUsers', async (searchParams, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation
    const safeUrl =
        `get-admin?${new URLSearchParams(searchParams).toString()}`;// api end point

    try {
        const res = await dataService.GetAPI(safeUrl);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});

const adminSlice = createSlice({
    name: 'admin-list',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(AdminList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AdminList.fulfilled, (state, action) => {
                state.loading = false;
                if (!action.payload.error && action.payload.data.success_status) {
                    state.List = action.payload.data;
                } else {
                    state.error = action.payload.data.message;
                }
            })
            .addCase(AdminList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message.message;
            });
    }
});

export default adminSlice.reducer;
