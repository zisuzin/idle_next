import React from "react";
import { Provider } from "react-redux";
import store from "./ts/store";
import Home from "./page";

export default function App() {
    return (
    <Provider store={store}>
        <Home/>
    </Provider>
    );
}
