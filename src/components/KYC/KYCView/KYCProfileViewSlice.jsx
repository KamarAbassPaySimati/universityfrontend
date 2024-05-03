import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { formatInputPhone } from '../../../CommonMethods/phoneNumberFormat';
import { dataService } from '../../../services/data.services';
import { occupationEduction } from '../KYCComponents/KYCFunctions';

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
                if (!action.payload.error && action.payload.data.success_status) {
                    state.View = action?.payload?.data?.data;
                    const AddressValues = [];
                    const Occupation = {};
                    const array = [];
                    switch (action?.payload?.data?.data.occupation) {
                    case 'Employed':
                        Occupation.Details = action?.payload?.data?.data.employed_role;
                        Occupation['Employer Name'] = action?.payload?.data?.data.employer_name;
                        Occupation['Industry Sector'] = action?.payload?.data?.data.industry;
                        Occupation['Town/District'] = action?.payload?.data?.data.occupation_town;
                        break;
                    case 'Others':
                        Occupation.Details = action?.payload?.data?.data.occupation_specify;
                        break;
                    case 'Self Employed':
                        Occupation.Details = action?.payload?.data?.data.self_employed_specify;
                        break;
                    case 'In Full-time Education':
                        if (action?.payload?.data?.data.institute === 'Others (Please Specify)') {
                            array.push(action?.payload?.data?.data.institute_specify);
                        } else {
                            occupationEduction.forEach((item) => {
                                array.push(action?.payload?.data?.data[item]);
                            });
                        }
                        Occupation.Details = array.join(', ');
                        break;
                    default:
                        break;
                    }
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
                        },
                        Occupation: { 'Occupation / Source of Funds': state?.View?.occupation, ...Occupation }
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
