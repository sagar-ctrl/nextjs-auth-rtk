import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import authApi from '../../services/api/auth/authApi'
import authSlice from '../../services/api/auth/authSlice'
// ...

export const store = configureStore({
  reducer: {
      auth:authSlice,
    [authApi.reducerPath]:authApi.reducer
  },
  middleware:(gmd)=>gmd().concat(authApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch);