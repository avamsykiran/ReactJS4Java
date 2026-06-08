import { useEffect, useState } from "react"

const CounterFC = () => {

    const [count, setCount] = useState<number>(0);
    const [packets, setPackets] = useState<number>(0);

    useEffect(() => {
        setCount(1);
    }, []);

    useEffect(() => {
        if (count === 10) {
            setCount(0);
            setPackets(packets + 1);
        } else if (count < 0) {
            if (packets > 0) {
                setCount(9);
                setPackets(packets - 1);
            } else {
                setCount(0);            
            }
        }
    }, [count]);

    return (
        <div>
            <button onClick={_e => setCount(count - 1)} > REMOVE </button>
            <strong> {count} Items and {packets} Packs </strong>
            <button onClick={_e => setCount(count + 1)} > ADD </button>
        </div>
    );
}

export default CounterFC;