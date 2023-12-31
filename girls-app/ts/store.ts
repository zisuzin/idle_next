/* Redux toolkit 불러오기 */
import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage, // localStorage에 저장
}

const persistedReducer = persistReducer(persistConfig, imageReducer);

const store = configureStore({
    reducer: {
        ref: persistedReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export {store, persistor};