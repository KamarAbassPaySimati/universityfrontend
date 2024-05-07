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
const InternatinalAddressKeys = ['intl_po_box_no', 'intl_house_number', 'intl_street_name', 'intl_landmark',
    'intl_town_village_ta', 'intl_district'];
const TradingAddressKeys = ['trading_house_name', 'trading_street_name', 'trading_town_village_ta', 'trading_district'];

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
                    const malawiAddress = [];
                    const tradingAddressValues = [];
                    const businessTypes = [];
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
                    InternatinalAddressKeys.forEach((item) => {
                        if (state.View[item] !== null) {
                            malawiAddress.push(state.View[item]);
                        }
                    });
                    TradingAddressKeys.forEach((item) => {
                        if (state.View[item] !== null) {
                            tradingAddressValues.push(state.View[item]);
                        }
                    });

                    if (state?.View?.trading_type) {
                        state.View.trading_type.forEach((item) => {
                            if (item !== null) {
                                businessTypes.push(item);
                            }
                        });
                    }
                    state.address = {
                        'Phone Number':
                        `${state?.View?.country_code} ${state?.View?.phone_number
                            ? formatInputPhone(state?.View?.phone_number)
                            : ''}`,
                        Email: state?.View?.email,
                        Address: AddressValues.join(', ')
                    };
                    state.nonMalawiAddress = {
                        'Phone Number':
                        `${state?.View?.country_code} ${state?.View?.phone_number
                            ? formatInputPhone(state?.View?.phone_number)
                            : ''}`,
                        Email: state?.View?.email,
                        Nationality: state?.View?.citizen,
                        'Malawi Address': AddressValues.join(', '),
                        'International Address': malawiAddress.join(', ')

                    };
                    state.not_started = {
                        'Phone Number':
                        `${state?.View?.country_code} ${state?.View?.phone_number
                            ? formatInputPhone(state?.View?.phone_number)
                            : ''}`,
                        Email: state?.View?.email
                    };
                    state.userDetails = {
                        basicDetails: state.View.user_kyc_status === 'not_started'
                            ? state.not_started
                            : state.View.citizen !== 'Malawian' ? state.nonMalawiAddress : state.address,
                        identityDetails: {
                            'ID Document': [state?.View?.id_document_front, state?.View?.id_document_back],
                            'Verification Document': [state?.View?.verification_document_front,
                                state?.View?.verification_document_back],
                            'Biometrics | Live Selfie': [state?.View?.selfie]

                        },
                        tradingDetails: {
                            'Trading Name': state?.View?.trading_name,
                            'Business Types': businessTypes.join(', '),
                            'Trading Address': tradingAddressValues.join(', ')
                        },
                        businessImages: state?.View?.trading_images,
                        personalDetails: {
                            Gender: state?.View?.gender,
                            'Date of Birth': state?.View.dob === null
                                ? undefined
                                : new Date(state?.View.dob * 1000).toLocaleDateString('en-UK', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })

                        },
                        purpose: state?.View?.purpose_of_relation,
                        incomeDetails: {
                            'Monthly Withdrawal': state?.View?.monthly_withdrawal,
                            'Monthly Income': state?.View?.monthly_income
                        },
                        bankDetails: {
                            'Bank Name': state?.View?.bank_details ? state?.View?.bank_details[0]?.bank_name : '',
                            'Account Number': state?.View?.bank_details
                                ? state?.View?.bank_details[0]?.account_number
                                : '',
                            'Account Name': state?.View?.bank_details
                                ? state?.View?.bank_details[0]?.account_name
                                : ''
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
