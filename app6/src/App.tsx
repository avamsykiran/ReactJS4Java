import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header";
import AccountHoldersList from "./components/AccountHoldersList";
import AccountHolderForm from "./components/AccountHolderForm";
import Home from "./components/Home";

const App = () => (
  <BrowserRouter>
    <Header appTitle="Budget Tracker 2.0" />

    <div className="container-fluid p-4">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/accounts" element={<AccountHoldersList />} />
        <Route path="/addAccount" element={<AccountHolderForm />} />
        <Route path="/editAccount/:id" element={<AccountHolderForm />} />

        <Route path="*" element={
          <div className="alert alert-danger m-5 p-4 fw-bold">
            <p>No Such Path Found</p>
          </div>
        } />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App
