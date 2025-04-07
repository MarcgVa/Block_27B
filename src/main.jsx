import ReactDOM from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";
import App from "./app/App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"))
  
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
