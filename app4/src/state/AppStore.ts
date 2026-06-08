import { configureStore } from "@reduxjs/toolkit";
import AccountHoldersReducer from "./AccountHoldersSlice";

export const appStore = configureStore({
    reducer : {
        accountHolders : AccountHoldersReducer,
        //txns: TxnsReducer
    }
});

/*
    appStore
        |- rootState
            |-accountHolders    (one slice)
                |- recordsList      //rootState.accountHolders.recordsList
            |-txns              (another slice)
                |- recordsList      //rootState.txns.recordsList
*/

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;