
const Header = (props: {appTitle:string} ) => (
    <header >
        <h3>{props.appTitle}</h3>
    </header>
);

/*import { Component, type ReactNode } from "react";

class Header extends Component<{appTitle:string},{}> {
    constructor(props){
        super(props);
    }

    render(): ReactNode {
        return (
            <header >
                <h3>{this.props.appTitle}</h3>
            </header>
        )
    }
}*/

export default Header;