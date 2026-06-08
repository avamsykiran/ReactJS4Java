import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { AccountHolder } from "../models/AccountHolder";
import type { RootState } from "./AppStore";

const accountHoldersAdapter = createEntityAdapter<AccountHolder>({
    selectId: ah => ah.ahId
});

const accountHoldersSlice = createSlice({
    name: "accountHolders",
    initialState: accountHoldersAdapter.getInitialState(),
    reducers: {
        addAccountHolder: accountHoldersAdapter.addOne,
        updateAccountHolder: accountHoldersAdapter.updateOne,
        deleteAccountHolder: accountHoldersAdapter.removeOne
    }
});

const accountHoldersReducer = accountHoldersSlice.reducer;

export const { addAccountHolder,updateAccountHolder,deleteAccountHolder } = accountHoldersSlice.actions;

export const { 
    selectAll:selectAllAccountHolders , 
    selectById:selectAccountHolderById 
} = accountHoldersAdapter.getSelectors( (state:RootState) => state.accountHolders)

export default accountHoldersReducer;