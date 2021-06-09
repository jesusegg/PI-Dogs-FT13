import "./App.css";
import Landing from "./components/Landing";

import { Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      {/* landing */}
      <Route exact path="/" component={Landing} />

      {/* home */}
      <Route exact path="/home" component={Home} />
      {/* detalle */}
      {/* creacion perro */}
    </div>
  );
}

export default App;
