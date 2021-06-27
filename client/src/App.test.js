import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";
import Home from "./components/Home";
import Nav from "./components/Navegacion";
import Detalle from "./components/Detalle";
import Landing from "./components/Landing";
import CreacionRaza from "./components/CreacionRaza";

configure({ adapter: new Adapter() });

describe("App", () => {
  let store;
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe("El componente Nav debe renderizar en todas las rutas que contengan /dogs.", () => {
    it('Debería renderizarse en la ruta "/dogs"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/dogs"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Nav)).toHaveLength(1);
    });
    it('Nav Debería renderizarse en la ruta "/Dogs/Home"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/Dogs/Home"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Nav)).toHaveLength(1);
    });
  });

  it('El componente Home debe renderizar en la ruta /Dogs/Home (Sólo en la ruta "/Dogs/Home")', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/Dogs/Home"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(Nav)).toHaveLength(1);
    expect(wrapper.find(CreacionRaza)).toHaveLength(0);
    expect(wrapper.find(Landing)).toHaveLength(0);
  });

  it("El componente CrearRaza debe renderizar en la ruta /Dogs/Create - este test no pasará si Otro componente (que no sea Nav) se renderiza en esta ruta.", () => {
    const container = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/Dogs/Create"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(container.find(Nav)).toHaveLength(1);
    expect(container.find(Home)).toHaveLength(0);
    expect(container.find(CreacionRaza)).toHaveLength(1);
  });

  describe("El componente Detalle debe renderizar", () => {
    it("El componente Detalle debe renderizar en la ruta /Dogs/detalle/:id", () => {
      const container = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/Dogs/detail/:1"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(container.find(Nav)).toHaveLength(1);
      expect(container.find(Home)).toHaveLength(0);
      expect(container.find(Landing)).toHaveLength(0);
      expect(container.find(Detalle)).toHaveLength(1);
      expect(container.find(CreacionRaza)).toHaveLength(0);
    });
  });
});
