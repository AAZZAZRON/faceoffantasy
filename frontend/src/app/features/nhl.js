import { createSlice } from '@reduxjs/toolkit';

export const nhlSlice = createSlice({
    name: 'nhl',
    initialState: {
        skaters: [],
        goalies: [],
        positions: [],
        nhlteams: [],
    },
    reducers: {
        setSkaters: (state, action) => {
            state.skaters = action.payload;
        },
        setGoalies: (state, action) => {
            state.goalies = action.payload;
        },
        setPositions: (state, action) => {
            state.positions = action.payload;
        },
        setNHLTeams: (state, action) => {
            state.nhlteams = action.payload;
        },
    },
});

export const { setSkaters, setGoalies, setPositions, setNHLTeams } = nhlSlice.actions;

export default nhlSlice.reducer;
