import { configureStore } from "@reduxjs/toolkit";
import accountHoldersReducer from "./AccountHoldersSlice";

export const appStore = configureStore({
    reducer : {
        accountHolders : accountHoldersReducer,
    }
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;