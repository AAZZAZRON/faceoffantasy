import { createSlice } from '@reduxjs/toolkit';

export const leaguesSlice = createSlice({
    name: 'leagues',
    initialState: {
        allLeagues: [],
        myLeagues: [],
        currentLeague: null,
        currentLeagueId: null,
    },
    reducers: {
        setAllLeagues: (state, action) => {
            state.allLeagues = action.payload;
        },
        setMyLeagues: (state, action) => {
            state.myLeagues = action.payload;
        },
        setCurrentLeague: (state, action) => {
            state.currentLeague = action.payload;
        },
        setCurrentLeagueId: (state, action) => {
            state.currentLeagueId = action.payload;
        },
    },
});

export const { setAllLeagues, setMyLeagues, setCurrentLeague, setCurrentLeagueId } = leaguesSlice.actions;

export default leaguesSlice.reducer;
