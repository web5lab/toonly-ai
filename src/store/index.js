import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import appSlice from './slices/appSlice';
import imageSlice from './slices/imageSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'app'], // Only persist auth and app state
};

const rootReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
  image: imageSlice, // Not persisted - temporary state
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Remove TypeScript-specific exports for JavaScript compatibility
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;