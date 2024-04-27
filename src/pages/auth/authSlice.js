import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: localStorage.getItem('userInfo') === null ? '' : JSON.parse(localStorage.getItem('userInfo')),
    loggedIn: localStorage.getItem('userLogedIn')
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
    const newObject = {};
    Object.entries(object).forEach(([key, value]) => {
        if (key.startsWith('custom:')) {
            const newKey = key.slice(7);
            newObject[newKey] = value;
        } else {
            newObject[key] = value;
        }
    });
    return Object.fromEntries(
        Object.entries(newObject).filter(([key]) => !keysToRemove.includes(key))
    );
}

const keysToRemoveFromAttributes = ['mfa_secret', 'email_verified', 'phone_number_verified', 'sub'];

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const userData = filterObjectKeys(action.payload, keysToRemoveFromAttributes);
            state.user = { ...userData };
            localStorage.setItem('userInfo', JSON.stringify({ ...userData }));
        },
        login: (state, action) => {
            state.loggedIn = true;
            localStorage.setItem('userLogedIn', true);
        },
        logout: (state, action) => {
            localStorage.clear();
            state.loggedIn = false;
            state.user = '';
            localStorage.removeItem('userLogedIn');
            localStorage.removeItem('userInfo');
        }
    }
});

export const { setUser, login, logout } = authSlice.actions;
export default authSlice.reducer;
