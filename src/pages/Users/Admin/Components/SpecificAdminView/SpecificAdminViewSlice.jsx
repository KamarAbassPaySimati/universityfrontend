import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { formatInputPhone } from '../../../../../CommonMethods/phoneNumberFormat';
import formatTimestamp from '../../../../../CommonMethods/formatTimestamp';
import { dataService } from '../../../../../services/data.services';
import isTimestampFiveMinutesAgo from '../../../../../CommonMethods/lastLoggedInTimeStamp';

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
                        'Phone Number':
                            `${state?.View?.country_code} ${state?.View?.phone_number
                                ? formatInputPhone(state?.View?.phone_number)
                                : ''}`,
                        Email: state?.View?.email,
                        Role: state?.View?.user_type,
                        Created_Date: formatTimestamp(state?.View?.created_at),
                        Last_Logged_In: state?.View?.last_logged_in
                            ? isTimestampFiveMinutesAgo(state?.View?.last_logged_in)
                                ? formatTimestamp(state?.View?.last_logged_in)
                                : 'Online'
                            : ''
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
