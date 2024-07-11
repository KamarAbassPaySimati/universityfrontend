import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../../../services/data.services';
import convertTimestampToCAT from '../../../../../CommonMethods/timestampToCAT';
import { formattedAmount } from '../../../../../CommonMethods/formattedAmount';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const PayOutRequestView = createAsyncThunk('adminUsers', async (uuid, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation

    try {
        const res = await dataService.GetAPI(`payout-transactions/specific-payout?_id=${uuid}`);
        return res;
    } catch (error) {
        // Log error or send notification
        return rejectWithValue({ message: error });
    }
});

const ViewPayOutRequestSlice = createSlice({
    name: 'admin-view',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(PayOutRequestView.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PayOutRequestView.fulfilled, (state, action) => {
                state.loading = false;
                console.log('action.payload', action.payload);
                if (!action.payload.error) {
                    state.View = action?.payload?.data;
                    console.log('state?.View', state?.View);
                    state.TransactionDetails = {
                        'Transaction ID': state?.View.transaction_id,
                        'Paymaart ID': state?.View.recipient_id,
                        'Date/Time': `${convertTimestampToCAT(state?.View?.created_at)} CAT`,
                        Amount: `${formattedAmount(state?.View?.amount)} MWK`
                        // Email: state?.View?.email,
                        // Role: state?.View?.user_type,
                        // Last_Logged_In: state?.View?.last_logged_in
                        //     ? isTimestampFiveMinutesAgo(state?.View?.last_logged_in)
                        //         ? `${convertTimestampToCAT(state?.View?.last_logged_in)} CAT`
                        //         : 'Online'
                        //     : ''
                    };
                    state.BankDetails = {
                        'Bank Name': state?.View.bank_name,
                        'Bank Account Name': state?.View.account_name,
                        'Bank Account Number': state?.View.account_number
                    };
                    state.Reason = {
                        'By Agent': 'Lorem Ipsum is simply dummy text'
                    };
                    state.keys = Object.keys(state.Reason);
                    state.keys = Object.keys(state.BankDetails);
                    state.keys = Object.keys(state.TransactionDetails);
                } else {
                    state.error = action?.payload?.data?.message;
                }
            })
            .addCase(PayOutRequestView.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message?.message;
            });
    }
});

export default ViewPayOutRequestSlice.reducer;
