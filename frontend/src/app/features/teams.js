import { createSlice } from '@reduxjs/toolkit';

export const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        allTeams: [],
        myTeams: [],
        currentTeam: null,
    },
    reducers: {
        setAllTeams: (state, action) => {
            state.allTeams = action.payload;
        },
        setMyTeams: (state, action) => {
            state.myTeams = action.payload;
        },
        setCurrentTeam: (state, action) => {
            state.currentTeam = action.payload;
        },
    },
});

export const { setAllTeams, setMyTeams, setCurrentTeam } = teamsSlice.actions;

export default teamsSlice.reducer;
