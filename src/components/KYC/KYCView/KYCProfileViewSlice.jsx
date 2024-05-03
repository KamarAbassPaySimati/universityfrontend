import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { formatInputPhone } from '../../../CommonMethods/phoneNumberFormat';
import formatTimestamp from '../../../CommonMethods/formatTimestamp';
import { dataService } from '../../../services/data.services';
import isTimestampFiveMinutesAgo from '../../../CommonMethods/lastLoggedInTimeStamp';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const KYCProfileView = createAsyncThunk('adminUsers', async (PaymaartId, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation
    try {
        const res = await dataService.GetAPI(`admin-users/view-specific-agent?paymaart_id=${PaymaartId}`);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});

const KYCProfileViewSlice = createSlice({
    name: 'admin-view',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(KYCProfileView.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(KYCProfileView.fulfilled, (state, action) => {
                state.loading = false;
                // console.log('state', action?.payload.data.data);
                if (!action.payload.error && action.payload.data.success_status) {
                    state.View = action?.payload?.data?.data;
                    state.userDetails = {
                        basicDetails: {
                            'Phone Number':
                            `${state?.View?.country_code} ${state?.View?.phone_number
                                ? formatInputPhone(state?.View?.phone_number)
                                : ''}`,
                            Email: state?.View?.email
                            // Address :s
                        }
                    };
                    state.keys = Object.keys(state.userDetails);
                } else {
                    state.error = action?.payload?.data?.message;
                }
            })
            .addCase(KYCProfileView.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message?.message;
            });
    }
});

export default KYCProfileViewSlice.reducer;
