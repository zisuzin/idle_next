import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './redux';

const store = configureStore({
    reducer: {
        ref: imageReducer,
    },
});

export default store;