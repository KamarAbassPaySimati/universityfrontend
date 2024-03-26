import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../../../services/data.services';

const initialState = {
    loading: true,
    error: '',
    success: ''
};

export const AgentList = createAsyncThunk('agent-user', async (searchParams, { rejectWithValue }) => {
    // Construct URL safely using query parameters instead of string interpolation
    const safeUrl =
        `orders/list?${new URLSearchParams(searchParams).toString()}`;

    try {
        const res = await dataService.GetAPI(safeUrl);
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
    extraReducers: {
        // register user
        [AgentList.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [AgentList.fulfilled]: (state, action) => {
            state.loading = false;
            if (!action?.payload?.error && action?.payload?.data?.success_status) {
                state.List = action?.payload?.data;
            } else {
                state.error = action?.payload?.data?.message;
            }
        },
        [AgentList.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload?.message?.message;
        }
    }
});

export default agentSlice.reducer;
