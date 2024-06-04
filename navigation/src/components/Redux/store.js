import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './reducers/counterSlice';
import { postSlice } from './reducers/postSlice';

export const store = configureStore({
    reducer: {
        // counter: counterSlice.reducer,
        posts: postSlice.reducer
    },
});