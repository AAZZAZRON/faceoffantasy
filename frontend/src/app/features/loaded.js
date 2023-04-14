import { createSlice } from '@reduxjs/toolkit';

export const loadedSlice = createSlice({
    name: 'loaded',
    initialState: {
        value: false,
        goTo: null,
    },
    reducers: {
        setLoaded: (state, action) => {
            state.value = action.payload;
        },
        setGoTo: (state, action) => {
            state.goTo = action.payload;
        }
    },
});

export const { setLoaded, setGoTo } = loadedSlice.actions;

export default loadedSlice.reducer;
