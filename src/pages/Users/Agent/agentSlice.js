import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const AgentList = createAsyncThunk('agentUsers', async (searchParams, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation

    try {
        const res = await dataService.GetAPI(`admin-users/agent-list?${searchParams.toString()}`);
        return res;
    } catch (error) {
        // Log error or send notification
        console.error('Error fetching orders:', error);
        return rejectWithValue({ message: error });
    }
});

const agentSlice = createSlice({
    name: 'agent-list',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(AgentList.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.List = [];
            })
            .addCase(AgentList.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (!payload?.error) {
                    state.List = payload?.data;
                } else {
                    state.error = payload?.data;
                }
            })
            .addCase(AgentList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message;
            });
    }
});

export default agentSlice.reducer;
