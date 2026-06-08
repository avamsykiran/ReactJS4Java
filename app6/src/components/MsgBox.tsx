
const MsgBox = ({msg,msgType}:{msg:string,msgType:'info'|'err'}) => (
    <div className={`alert ${msgType==='info'?"alert-info":"alert-danger"} p-4 m-2 mx-auto fw-bold`}>
        {msg}
    </div>
);

export default MsgBox;