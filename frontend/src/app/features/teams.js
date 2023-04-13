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
            state.allLeagues = action.payload;
        },
        setMyTeams: (state, action) => {
            state.myLeagues = action.payload;
        },
        setCurrentTeam: (state, action) => {
            state.currentLeague = action.payload;
        },
    },
});

export const { setAllTeams, setMyTeams, setCurrentTeam } = teamsSlice.actions;

export default teamsSlice.reducer;
