import { useState } from "react";

const ArthOpt = () => {

    const [op1, setOp1] = useState<number>(0);
    const [op2, setOp2] = useState<number>(0);
    
    return (
        <section className="card card-primary m-4 p-4">            
            <form>
                <div className="m-2">
                    <label className="form-label">First Operand: </label>
                    <input className="form-control" type="number" value={op1} 
                        onChange={ e => setOp1(Number(e.target.value)) } />
                </div>
                <div className="m-2">
                    <label className="form-label">Second Operand: </label>
                    <input className="form-control" type="number" value={op2} 
                        onChange={ e => setOp2(Number(e.target.value)) } />
                </div>
            </form>

            <div className="alert alert-info fw-bold p-2">
                <p>Sum : {op1+op2}</p>
                <p>Diff : {op1-op2}</p>
            </div>
        </section>                    
    );
}

export default ArthOpt;