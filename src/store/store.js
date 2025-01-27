import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CustomizerReducer from './customizer/CustomizerSlice';
import AuthenticationReducer from './AuthenticationSlice';
import ToolsReducer from './toolsSlice';
import SystemReducer from './systemSlice';
import UserReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage,
};
export const store = configureStore({
  reducer: {
    customizer: persistReducer(persistConfig, CustomizerReducer),
    authData: persistReducer(persistConfig, AuthenticationReducer),
    toolsData: ToolsReducer,
    systemData: SystemReducer,
    userData: UserReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export const persistor = persistStore(store);
