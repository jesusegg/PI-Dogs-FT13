import "./App.css";
import Landing from "./components/Landing";

import { Route } from "react-router-dom";
import Home from "./components/Home";
import Detalle from "./components/Detalle";
import Navegacion from "./components/Navegacion";
import CreacionRaza from "./components/CreacionRaza";

function App() {
  return (
    <div className="App">
      {/* landing */}
      <Route exact path="/" component={Landing} />
      {/* {nav} */}
      <Route path="/Dogs" component={Navegacion} />
      {/* home */}
      <Route exact path="/Dogs/home" component={Home} />
      {/* detalle */}
      <Route exact path="/Dogs/detail/:id" component={Detalle} />
      {/* creacion perro */}
      <Route exact path="/Dogs/Create" component={CreacionRaza} />
    </div>
  );
}

export default App;
