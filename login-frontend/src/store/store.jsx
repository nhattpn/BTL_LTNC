import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { persistStore ,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './feature/userReducer';
import adminReducer from './feature/adminReducer';
import viewReducer from './feature/viewReducer';

const persitConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
    view: viewReducer
});

const persistedReducer = persistReducer(persitConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDeufaultMiddleware) => getDeufaultMiddleware({
        serializableCheck: false    
    }),   
});

export const persistor = persistStore(store);