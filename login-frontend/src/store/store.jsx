import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { persistStore ,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './feature/userReducer';
import adminReducer from './feature/adminReducer';

const persitConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: userSlice,
    admin: adminReducer,
});

const persistedReducer = persistReducer(persitConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDeufaultMiddleware) => getDeufaultMiddleware({
        serializableCheck: false    
    }),   
});

export const persistor = persistStore(store);