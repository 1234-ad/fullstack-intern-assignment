import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;