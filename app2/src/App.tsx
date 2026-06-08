import ArthOpt from "./components/ArthOpt";
import Header from "./components/Header";
import Welcome from "./components/Welcome";

const App = () => (
  <>
    <Header appTitle="My React App2" />
    <div className="container-fluid m-0 p-2">
      <div className="row">
        <div className="col-6">
          <Welcome />
        </div>
        <div className="col-6">
          <ArthOpt />
        </div>
      </div>
    </div>
  </>
);

export default App;
