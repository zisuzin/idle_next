import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './redux';

const store = configureStore({
    reducer: {
        image: imageReducer,
    },
});

export default store;