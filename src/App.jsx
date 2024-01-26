// import { store } from "./src/Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store";
import Routing from "./routing";
import { persistStore } from "redux-persist";

// import "antd/dist/antd.css";
import "./App.css";
// import "./App.less";

function App() {
  const persist = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <Routing />
      </PersistGate>
    </Provider>
  );
}

export default App;
