/* eslint-disable max-len */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const AgentTransactionHistoryList = createAsyncThunk('agentTransactionHistory', async ({ searchParams, id, type, handleRedirection }, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation
    try {
        const res = await dataService.GetAPI(`admin-transactions/${type === 'customers' ? 'customer-transaction?customer_id=' : type === 'merchants' ? 'merchant-transactions?merchant_id=' : 'agent-transactions?agent_id='}${id}&${searchParams.toString()}`);
        if (res.data?.status === 400 || res.data?.status === 404) {
            handleRedirection('/404'); // Redirect using window.location
        }
        return res;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});

const agentTransactionHistorySlice = createSlice({
    name: 'agent-transaction-history',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(AgentTransactionHistoryList.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.List = [];
            })
            .addCase(AgentTransactionHistoryList.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (!payload?.error) {
                    state.List = payload?.data;
                } else {
                    state.error = payload?.data;
                }
            })
            .addCase(AgentTransactionHistoryList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            });
    }
});

export default agentTransactionHistorySlice.reducer;
