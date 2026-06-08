import { configureStore } from "@reduxjs/toolkit";
import accountHoldersReducer from "./accountHoldersSlice";

export const appStore = configureStore({
    reducer : {
        accountHolders : accountHoldersReducer,
    }
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;