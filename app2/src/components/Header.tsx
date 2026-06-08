
const Header = ( props : {appTitle:string}) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">
                {props.appTitle}
            </a>
        </div>
    </nav>
);

export default Header;