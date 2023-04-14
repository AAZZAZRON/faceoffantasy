import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        allUsers: [],
        currentUser: null,
        isLoggedIn: false,
    },
    reducers: {
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    },
});

export const { setAllUsers, setCurrentUser, setIsLoggedIn } = usersSlice.actions;

export default usersSlice.reducer;
