import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBlog } from "../../API/endpoint";
export const getPosts = createAsyncThunk(
    'posts/getpost',
    async () => {
        try {
            const response = await getBlog();
            return response.data;
        } catch (error) {
            // Handle error, e.g., logging or displaying an error message
            throw Error('Failed to fetch posts');
        }
    }
);
export const updatePosts = createAsyncThunk(
    'posts/getpost',
    async () => {
        try {
            const response = await getBlog();
            return response.data;
        } catch (error) {
            // Handle error, e.g., logging or displaying an error message
            throw Error('Failed to fetch posts');
        }
    }
);