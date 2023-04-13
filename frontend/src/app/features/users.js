import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        allUsers: [],
    },
    reducers: {
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        }
    },
});

export const { setAllUsers } = usersSlice.actions;

export default usersSlice.reducer;
