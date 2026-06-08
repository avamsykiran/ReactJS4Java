import { useState } from "react";

const Welcome = () => {

    const [userName, setUserName] = useState<string>("");
    
    return (
        <section className="card card-primary m-4 p-4">
            <h3>Welcome! {userName} </h3>

            <form>
                <div className="m-2">
                    <label className="form-label">User Name: </label>
                    <input className="form-control" type="text" value={userName} 
                        onChange={ e => setUserName(e.target.value) } />
                </div>
            </form>
        </section>                    
    );
}

export default Welcome;