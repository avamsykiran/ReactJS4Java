import { Link, useLocation } from "react-router";

const allLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
];

const Header = (props: { appTitle: string }) => {

    const {pathname} = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    {props.appTitle}
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {allLinks.map(l => (
                            <li className="nav-item" key={l.path}>
                                {/*
                                    <Link className={pathname===l.path ? "nav-link active":"nav-link" } to={l.path}>{l.label}</Link>
                                */}
                                <Link className={`nav-link ${(pathname===l.path) && "active" }`} to={l.path}>{l.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;