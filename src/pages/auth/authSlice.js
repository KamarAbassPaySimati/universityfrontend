import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: '',
    loggedIn: null
};

/**
 * The `filterObjectKeys` function removes specified keys from an object and returns a new object with
 * the remaining keys.
 * @param object - The `object` parameter in the `filterObjectKeys` function refers to the object whose
 * keys you want to filter based on the `keysToRemove` array.
 * @param keysToRemove - The `keysToRemove` parameter in the `filterObjectKeys` function is an array
 * containing the keys that you want to remove from the input `object`.
 * @returns The `filterObjectKeys` function returns a new object that contains all key-value pairs from
 * the input `object`, except for the keys specified in the `keysToRemove` array.
 */
function filterObjectKeys (object, keysToRemove) {
    return Object.fromEntries(
        Object.entries(object).filter(([key]) => !keysToRemove.includes(key))
    );
}

const keysToRemoveFromAttributes = ['custom:mfa_secret', 'email_verified', 'phone_number_verified', 'sub'];

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = filterObjectKeys(action.payload, keysToRemoveFromAttributes);
        },
        login: (state, action) => {
            state.loggedIn = true;
        },
        logout: (state, action) => {
            localStorage.clear();
            state.loggedIn = false;
        }
    }
});

export const { setUser, login, logout } = authSlice.actions;
export default authSlice.reducer;
