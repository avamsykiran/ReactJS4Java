import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../state/AppStore";
import type { AccountHolder } from "../models/AccountHolder";
import { deleteAccountHolder, selectAllAccountHolders } from "../state/AccountHoldersSlice";
import { Link } from "react-router";

const AccountHoldersList = () => {

    const accountHolders: AccountHolder[] = useSelector(selectAllAccountHolders);
    
    const dispatch:AppDispatch = useDispatch();

    return (
        <section className="card card-info m-2 p-2">
            <h4>List Of AccountHolders</h4>

            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Mail Id</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (!accountHolders || accountHolders.length === 0) ? (
                            <tr>
                                <td colSpan={6} className="text-dark fw-bold p-2 text-center">
                                    No records to display
                                </td>
                            </tr>
                        ) : (
                            accountHolders.map( ax => (
                                <tr key={ax.ahId}>
                                    <td>{ax.ahId}</td>
                                    <td>{ax.fullName}</td>
                                    <td>{ax.mobile}</td>
                                    <td>{ax.mailId}</td>
                                    <td>{ax.currentBalance}</td>
                                    <td>
                                        <Link 
                                            className="btn btn-sm btn-secondary me-1"
                                            to={`/editAccount/${ax.ahId}`}>
                                            EDIT
                                        </Link>
                                        <button 
                                            type="button" 
                                            className="btn btn-sm btn-danger"
                                            onClick={_e => dispatch(deleteAccountHolder(ax.ahId)) }> 
                                            DEL 
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>

        </section>
    );
}

export default AccountHoldersList;