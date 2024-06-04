import { createSlice } from '@reduxjs/toolkit';
import { getPosts } from '../actions/post';

const initialState = {
    loading: false,
    posts: [],
    error: null
};

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true;
            state.error = null; // Reset error state when fetching starts
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
        builder.addCase(getPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
