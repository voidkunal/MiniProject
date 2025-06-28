import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import popupReducer from "./slice/popupSlice";
import userReducer from "./slice/userSlice";
import bookReducer from "./slice/bookSlice";
import borrowReducer from "./slice/borrowSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["isAuthenticated", "user"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    popup: popupReducer,
    user: userReducer,
    book: bookReducer, 
    borrow: borrowReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);