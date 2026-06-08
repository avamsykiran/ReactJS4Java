import type { AccountHolder } from "../models/AccountHolder";
import type { AppDispatch } from "../state/AppStore";
import { useDispatch } from "react-redux";
import { addAccoiuntHolder } from "../state/AccountHoldersSlice";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const AccountHolderForm = () => {

    const ahSchema: Yup.ObjectSchema<AccountHolder> = Yup.object({
        ahId: Yup.number()
            .required('Id is a mandatory field')
            .positive()
            .integer(),
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
    const navigate = useNavigate();

    const formSubmitted = (ah: AccountHolder) => {
        dispatch(addAccoiuntHolder(ah));
        navigate("/accounts");
    }

    const {
        register,
        handleSubmit,
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

    return (
        <section className="card card-info m-2 p-2 col-md-5 mx-auto">
            <h4>New AccountHolder</h4>

            <form onSubmit={handleSubmit(formSubmitted)}>
                <div className="mb-1">
                    <label className="form-label">ID</label>
                    <input className="form-control" type="number" {...register('ahId')} />
                    {errors.ahId && ( <p className="text-danger">{errors.ahId.message}</p>)}
                </div>
                <div className="mb-1">
                    <label className="form-label">Full Name</label>
                    <input className="form-control" type="text" {...register('fullName')} />
                    {errors.fullName && ( <p className="text-danger">{errors.fullName.message}</p>)}
                </div>
                <div className="mb-1">
                    <label className="form-label">Mobile Number</label>
                    <input className="form-control" type="text" {...register('mobile')} />
                    {errors.mobile && ( <p className="text-danger">{errors.mobile.message}</p>)}
                </div>
                <div className="mb-1">
                    <label className="form-label">Mail Id</label>
                    <input className="form-control" type="text" {...register('mailId')} />
                    {errors.mailId && ( <p className="text-danger">{errors.mailId.message}</p>)}
                </div>
                <div className="d-grid">
                    <button className="btn btn-primary" disabled={!isValid}>SAVE</button>
                </div>
            </form>

        </section>
    );
}

export default AccountHolderForm;