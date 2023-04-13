import { createSlice } from '@reduxjs/toolkit';

export const loadedSlice = createSlice({
    name: 'loaded',
    initialState: {value: false},
    reducers: {
        setLoaded: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setLoaded } = loadedSlice.actions;

export default loadedSlice.reducer;
