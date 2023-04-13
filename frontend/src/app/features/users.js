import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        allUsers: [],
        currentUser: null,
    },
    reducers: {
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
});

export const { setAllUsers, setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
