import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { formatInputPhone } from '../../../CommonMethods/phoneNumberFormat';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const KYCProfileView = createAsyncThunk('agentUser', async (url, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation
    try {
        const res = await dataService.GetAPI(`admin-users/${url}`);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});
const AddressKeys = ['po_box_no', 'house_number', 'street_name', 'landmark', 'town_village_ta', 'district'];
const KYCProfileViewSlice = createSlice({
    name: 'agent-view',
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
                console.log('state', action?.payload.data.data.purpose_of_relation);

                if (!action.payload.error && action.payload.data.success_status) {
                    state.View = action?.payload?.data?.data;
                    const AddressValues = [];
                    AddressKeys.forEach((item) => {
                        if (state.View[item] !== null) {
                            AddressValues.push(state.View[item]);
                        }
                    });
                    // console.log(state?.View?.purpose_of_relation, 'bbbbbbbbbb');
                    state.userDetails = {
                        basicDetails: {
                            'Phone Number':
                            `${state?.View?.country_code} ${state?.View?.phone_number
                                ? formatInputPhone(state?.View?.phone_number)
                                : ''}`,
                            Email: state?.View?.email,
                            Address: AddressValues.join(', ')
                        },
                        identityDetails: {
                            'ID Document': [state?.View?.id_document_front, state?.View?.id_document_back],
                            'Verification Document': [state?.View?.verification_document_front,
                                state?.View?.verification_document_back],
                            'Biometrics | Live Selfie': [state?.View?.selfie]

                        },
                        personalDetails: {
                            Gender: state?.View?.gender,
                            'Date of Birth': new Date(state?.View.dob * 1000).toLocaleDateString('en-US',
                                { day: '2-digit', month: 'short', year: 'numeric' })

                        },
                        purpose: state?.View?.purpose_of_relation,
                        incomeDetails: {
                            'Monthly Withdrawal': state?.View?.monthly_withdrawal,
                            'Monthly Income': state?.View?.monthly_income
                        },
                        bankDetails: {
                            'Bank Name': state?.View?.bank_details[0]?.bank_name,
                            'Account Number': state?.View?.bank_details[0]?.account_number,
                            'Account Name': state?.View?.bank_details[0]?.account_name
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
