import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import formatTimestamp from '../../../CommonMethods/formatTimestamp';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const G2PCustomerView = createAsyncThunk('G2PCustomerView', async (endPoint, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation
    try {
        const res = await dataService.GetAPI(`g2p-users/${endPoint}`);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});

const G2pCustomerViewSlice = createSlice({
    name: 'G2PCustomer-view',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(G2PCustomerView.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(G2PCustomerView.fulfilled, (state, action) => {
                console.log(action, 'dhjdhsdhs');
                state.loading = false;
                if (!action.payload.error) {
                    const viewData = action.payload.data;
                    console.log(viewData, 'viewData');
                    state.View = viewData.data;
                    state.userDetails = {
                        Email: state?.View?.sheet_name,
                        Created_Date: formatTimestamp(state?.View?.created_at),
                        Role: state?.View?.upload_by,
                        Amount: state?.View?.transferred_amount
                    };
                    state.keys = Object.keys(state.userDetails);
                } else {
                    state.error = action?.payload?.data?.message;
                }
            })
            .addCase(G2PCustomerView.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message?.message;
            });
    }
});

export default G2pCustomerViewSlice.reducer;
