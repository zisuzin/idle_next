/* Redux toolkit 불러오기 */
import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './redux';

const store = configureStore({
    reducer: {
        ref: imageReducer,
    },
});

export default store;