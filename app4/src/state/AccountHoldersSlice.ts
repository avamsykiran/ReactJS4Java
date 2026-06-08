import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AccountHolder } from "../models/AccountHolder";

interface AccountHoldersSliceState {
    recordsList: AccountHolder[];
}

const initialState: AccountHoldersSliceState = {
    recordsList: [
        { ahId: 1, fullName: "Vamsy", mailId: "vamsy@gmail.com", mobile: "9052224751", currentBalance: 0 },
        { ahId: 2, fullName: "Sagar", mailId: "sagar@gmail.com", mobile: "9052224752", currentBalance: 0 },
        { ahId: 3, fullName: "Suresh", mailId: "suresh@gmail.com", mobile: "9052224753", currentBalance: 0 },
    ]
};

const AccountHoldersSlice = createSlice({
    name: "AccountHoldersSlice",
    initialState,
    reducers: {
        addAccoiuntHolder: (state, action: PayloadAction<AccountHolder>) => {
            state.recordsList.push(action.payload)
        },
        updateAccountHolder: (state, action: PayloadAction<AccountHolder>) => {
            let index = state.recordsList.findIndex( x => x.ahId === action.payload.ahId);
            if (index > -1) {
                state.recordsList[index] = action.payload;
            } /*else{
                throw "No such record found";
            }*/
        },
        deleteAccountHolder: (state, action: PayloadAction<Number>) => {
            let index = state.recordsList.findIndex(x => x.ahId === action.payload);
            if (index > -1) {
                state.recordsList.splice(index, 1);
            }/*else{
                throw "No such record found";
            }*/
        }
    }
});

const AccountHoldersReducer = AccountHoldersSlice.reducer;

export const { addAccoiuntHolder,updateAccountHolder,deleteAccountHolder } = AccountHoldersSlice.actions;
export default AccountHoldersReducer;