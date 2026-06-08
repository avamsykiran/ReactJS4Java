import type { AccountHolder } from "../models/AccountHolder";
import type { AppDispatch, RootState } from "../state/appStore";
import { useDispatch, useSelector } from "react-redux";
import { selectAccountHolderById, selectAccountHoldersError, selectAccountHoldersStatus } from "../state/accountHoldersSlice";
import { addAccountHolder,updateAccountHolder } from "../state/accountHoldersThunks";
import { useNavigate, useParams } from "react-router";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import MsgBox from "./MsgBox";

const AccountHolderForm = () => {

    const status = useSelector(selectAccountHoldersStatus);
    const error = useSelector(selectAccountHoldersError);

    const ahSchema: Yup.ObjectSchema<AccountHolder> = Yup.object({
        ahId: Yup.number().optional(),
        fullName: Yup.string()
            .required('Full Name is a mandatory field')
            .min(5, "Expecting a minimum length of 5 chars")
            .max(25, "Expecting a maximum length of 5 chars"),
        mobile: Yup.string()
            .required('Mobile Number is a mandatory field')
            .matches(/^[1-9][0-9]{9}$/, 'Mobile Number must be of 10 digits'),
        mailId: Yup.string()
            .required('Mail Id is a mandatory field')
            .email("A Valid email id expected"),
        currentBalance: Yup.number().optional()
    });

    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate(); //the 'navigate' function is used to goto another component by-script

    const { id } = useParams<{ id: string }>(); //any path param or qryParam is always a string.

    const accountHolder = useSelector((state: RootState) => selectAccountHolderById(state, Number(id)));

    const [isEditing, setEditing] = useState<boolean>(false);

    const {
        register,                   //helps in binding a entity-field with a input-control
        handleSubmit,               //helps in handling the form-submit event on client side
        reset,                      //helps to change the values of all input-controls in the form.
        formState: { errors, isValid },
    } = useForm<AccountHolder>({
        resolver: yupResolver(ahSchema),
        mode: "onTouched",
        defaultValues: {
            ahId: 0,
            fullName: "",
            mobile: "",
            mailId: "",
            currentBalance: 0
        }
    });

    //componentDidUpdate
    useEffect(() => {
        if (accountHolder) {
            reset(accountHolder);
            setEditing(true);
        } else {
            reset({
                ahId: 0,
                fullName: "",
                mobile: "",
                mailId: "",
                currentBalance: 0
            });
            setEditing(false);
        }
    }, [accountHolder, reset])

    const formSubmitted = (ah: AccountHolder) => {
        isEditing ?
            dispatch(updateAccountHolder(ah)) :
            dispatch(addAccountHolder(ah));

        navigate("/accounts");
    }

    return (
        <section className="card card-info m-2 p-2 col-md-5 mx-auto">
            <h4>{isEditing ? "Edit" : "New"} AccountHolder</h4>

            {status === "pending" && <MsgBox msg="Please wait while saving...!" msgType="info" />}

            {error && <MsgBox msg={error} msgType="err" />}

            <form onSubmit={handleSubmit(formSubmitted)}>
                <div className="mb-1">
                    <label className="form-label">ID</label>
                    <input className="form-control" type="number" {...register('ahId')} readOnly={true} />                    
                </div>
                <div className="mb-1">
                    <label className="form-label">Full Name</label>
                    <input className="form-control" type="text" {...register('fullName')} />
                    {errors.fullName && (<p className="text-danger">{errors.fullName.message}</p>)}
                </div>
                <div className="mb-1">
                    <label className="form-label">Mobile Number</label>
                    <input className="form-control" type="text" {...register('mobile')} />
                    {errors.mobile && (<p className="text-danger">{errors.mobile.message}</p>)}
                </div>
                <div className="mb-1">
                    <label className="form-label">Mail Id</label>
                    <input className="form-control" type="text" {...register('mailId')} />
                    {errors.mailId && (<p className="text-danger">{errors.mailId.message}</p>)}
                </div>
                <div className="d-grid">
                    <button className="btn btn-primary" disabled={!isValid || status === "pending"}>SAVE</button>
                </div>
            </form>

        </section>
    );
}

export default AccountHolderForm;