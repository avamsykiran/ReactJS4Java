import { Component, type ReactNode } from "react";

class Counter extends Component < {} , {count:number,packets:number} >  {
    constructor(props:{}) {
        super(props);

        //assuming 10 items make one packet
        // side-effect: number of packets must be updated based on the change of the count

        this.state = {
            count:0,
            packets:0
        };
    }

    componentDidMount(): void {
        this.setState({count:1})    
    }

    render(): ReactNode {

        const {count,packets} = this.state; //destructured assignemnt

        return (
            <div>
                <button onClick={ _e => this.setState({ count:count-1 }) } > REMOVE </button>
                <strong> {count} Items and {packets} Packs </strong>
                <button onClick={ _e => this.setState({ count:count+1 }) } > ADD </button>
            </div>
        );
    }

    componentDidUpdate(){
        const {count,packets} = this.state; //destructured assignemnt

        if(count===10){
            this.setState({count:0,packets:packets+1});
        }else if(count<0){
            if(packets>0){
                this.setState({count:9,packets:packets-1});
            }else{
                this.setState({count:0});
            }
        }
    }
}

export default Counter;