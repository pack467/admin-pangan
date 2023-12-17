import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes";
import store from "./store";

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </div>
  );
}
