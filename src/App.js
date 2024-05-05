// App.js
import React from "react";
import { Provider } from "react-redux";
import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import store from "./redux/store";
import WebSocketComponent from "./WebSocketComponent";

const App = () => {
  const routing = useRoutes(Themeroutes);

  return (
    <Provider store={store}>
      <div className="dark">
        <WebSocketComponent />
        {routing}
      </div>
    </Provider>
  );
};

export default App;
