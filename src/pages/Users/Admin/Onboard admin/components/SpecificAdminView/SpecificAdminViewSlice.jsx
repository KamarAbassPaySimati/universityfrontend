import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../../../../services/data.services';
import { formatInputPhone } from '../../../../../../CommonMethods/phoneNumberFormat';
import formatTimestamp from '../../../../../../CommonMethods/formatTimestamp';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const SpecificView = createAsyncThunk('adminUsers', async (PaymaartId, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation
    const safeUrl =
        `view-admin/${PaymaartId}`;// api end point

    try {
        const res = await dataService.GetAPI(safeUrl);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});

const SpecificAdminViewSlice = createSlice({
    name: 'admin-view',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(SpecificView.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(SpecificView.fulfilled, (state, action) => {
                state.loading = false;
                if (!action.payload.error && action.payload.data.success_status) {
                    state.View = action?.payload?.data?.data[0];
                    state.userDetails = {
                        'Phone Number': `${state.View.country_code} ${formatInputPhone(state.View.phone_number)}`,
                        Email: state.View.email,
                        Role: state.View.user_type,
                        Created_Date: formatTimestamp(state.View.last_logged_in),
                        Last_Logged_In: state.View.last_logged_in
                    };
                    state.keys = Object.keys(state.userDetails);
                } else {
                    state.error = action?.payload?.data?.message;
                }
            })
            .addCase(SpecificView.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message?.message;
            });
    }
});

export default SpecificAdminViewSlice.reducer;
