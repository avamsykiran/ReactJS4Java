import { createEntityAdapter, createSelector, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import type { AccountHolder } from "../models/AccountHolder";
import type { RootState } from "./appStore";
import { addAccountHolder, deleteAccountHolder, fetechAccountHolders, updateAccountHolder } from "./accountHoldersThunks";

const accountHoldersAdapter = createEntityAdapter<AccountHolder>({
    selectId: ah => ah.ahId
});

interface AccountHoldersSliceExtraState {
    status: 'idle' | 'pending' | 'completed' | 'rejected';
    error: string | null;
}

const accountHoldersSlice = createSlice({
    name: "accountHolders",
    initialState: accountHoldersAdapter.getInitialState<AccountHoldersSliceExtraState>({
        status: 'idle',
        error: null
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetechAccountHolders.fulfilled, (state, action) => {
                state.status = 'completed';
                accountHoldersAdapter.setAll(state, action.payload);
            })
            .addCase(addAccountHolder.fulfilled, (state, action) => {
                state.status = 'completed';
                accountHoldersAdapter.addOne(state, action.payload);
            })
            .addCase(updateAccountHolder.fulfilled, (state, action) => {
                state.status = 'completed';
                accountHoldersAdapter.setOne(state, action.payload);
            })
            .addCase(deleteAccountHolder.fulfilled, (state, action) => {
                state.status = 'completed';
                accountHoldersAdapter.removeOne(state, action.payload);
            })
            /*.addCase(fetechAccountHolders.pending, (state, _action) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(addAccountHolder.pending, (state, _action) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(updateAccountHolder.pending, (state, _action) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(deleteAccountHolder.pending, (state, _action) => {
                state.status = 'pending';
                state.error = null;
            })*/
            .addMatcher(
                isPending(fetechAccountHolders, addAccountHolder, deleteAccountHolder, updateAccountHolder),
                (state, _action) => {
                    state.status = 'pending';
                    state.error = null;
                }
            )
            /*
            .addCase(fetechAccountHolders.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = "Failed to get records, please retry later";
                console.error(action.payload);
            })
            .addCase(addAccountHolder.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = "Failed to save the record, please retry later";
                console.error(action.payload);
            })
            .addCase(updateAccountHolder.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = "Failed to save the record, please retry later";
                console.error(action.payload);
            })
            .addCase(deleteAccountHolder.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = "Failed to remove the record, please retry later";
                console.error(action.payload);
            })*/
            .addMatcher(
                isRejected(fetechAccountHolders, addAccountHolder, deleteAccountHolder, updateAccountHolder),
                (state, action) => {
                    state.status = 'rejected';
                    state.error = "Operation failed!, please retry later";
                    console.error(action.payload);
                }
            )
    }
});

const accountHoldersReducer = accountHoldersSlice.reducer;

const selectAccountHoldersState = (state:RootState) => state.accountHolders;

export const {
    selectAll: selectAllAccountHolders,
    selectById: selectAccountHolderById
} = accountHoldersAdapter.getSelectors(selectAccountHoldersState);

export const selectAccountHoldersStatus = createSelector([selectAccountHoldersState], (state) => state.status);

export const selectAccountHoldersError = createSelector([selectAccountHoldersState], (state) => state.error);

export default accountHoldersReducer;