import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient, { ahApiEndPoint, txnsApiEndPoint } from "./apiClient";
import type { AccountHolder } from "../models/AccountHolder";
import type { AxiosResponse } from "axios";

//createAsyncThunk<TypeOfDataBeiongReturnedByTheAsyncFunc,TypeOfArgOfTheAsyncFunc,{configData when rejceted}>

/*
    distributed joins
        AccountHolder in profiles has ahId,fullName,mailId and mobile
        AccountHolder in txns has ahId,currentBalance

    Option1: Aggregator Service (aggregation at back-end)
        the react-app will send a req to not profiel nor txns but to a aggregator-service
        the aggregator-service
            will req for all accountHolder from profiles
            and will req for all accountHolder from txns
            and they will be merged and sent back to the reactJS app

    Option2: CQRS
        Saggragate the COMMAD part and QUERY part on the micro-service side
        anmd orchestrate the consistency via event-driven-model
        using RabbitMQ / Kafka ...etc.,

    Option3: Aggregation at UI/UX
        ReactJS app will req for all accountHolder from profiles
        ReactJS app will for all accountHolder from txns
        the above two req-resp cycles can happen parellely
        and they will be merged here on the client side.
*/

export const fetechAccountHolders = createAsyncThunk<AccountHolder[],void,{}>(
    'accountHolders/fetechAccountHolders',
    async () => {
        /*
        //sequential chain of requests
        let ahsFromProfiles:AccountHolder[] = (await apiClient.get<AxiosResponse<AccountHolder[]>>(ahApiEndPoint)).data;
        let ahsFromTxns:AccountHolder[] = (await apiClient.get<AxiosResponse<AccountHolder[]>>(txnsApiEndPoint + "balances/")).data;
        */
        
        //Parellel requests
        const [profilesResp,txnsResp] = await Promise.all([
            apiClient.get<AxiosResponse<AccountHolder[]>>(ahApiEndPoint),
            apiClient.get<AxiosResponse<AccountHolder[]>>(txnsApiEndPoint + "balances/")
        ]);

        let ahsFromProfiles:AccountHolder[] = profilesResp.data;
        let ahsFromTxns:AccountHolder[] = txnsResp.data;

        var ahs : AccountHolder[] = ahsFromProfiles.map( 
            (ax:AccountHolder) => {
                let ay = ahsFromTxns.find( a => a.ahId===ax.ahId);
                let bal = ay? ay.currentBalance : 0;
                return {...ax,currentBalance:bal}
            })

        return ahs;
    }
);

export const deleteAccountHolder = createAsyncThunk<number,number,{}>(
    'accountHolders/deleteAccountHolder',
    async (ahId) => {
        await apiClient.delete(ahApiEndPoint+ahId);
        return ahId;
    }
);

export const addAccountHolder = createAsyncThunk<AccountHolder,AccountHolder,{}>(
    'accountHolders/addAccountHolder',
    async (ah) => {
        return (await apiClient.post(ahApiEndPoint,ah)).data;
    }
);

export const updateAccountHolder = createAsyncThunk<AccountHolder,AccountHolder,{}>(
    'accountHolders/updateAccountHolder',
    async (ah) => {
        return (await apiClient.put(ahApiEndPoint,ah)).data;
    }
);