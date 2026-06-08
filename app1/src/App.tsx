import Counter from "./Counter";
import CounterFC from "./CounterFC";
import Header from "./Header";

const App = () => (
  <>    
      <Header appTitle="ReactJS SPA 1.0" />    
      <Counter />      
      <hr />
      <CounterFC />

  </>
);

/*import { Component, type ReactNode } from "react";

class App extends Component< {} , {} > {

  constructor(props : {}) {
    super(props);    
  }

  render(): ReactNode {
    return (
      <>    
        <Header appTitle="ReactJS SPA 1.0" />    
        <Counter />
        <Counter />
        <Counter />
      </>
    );
  }
}*/

export default App
