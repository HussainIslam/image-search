import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Layout from "./Layout/Layout";

function App() {
    return (
        <div className="App">
            <Layout>
                <Switch>
                    <Route path="/" component={Home} exact />
                </Switch>
            </Layout>
        </div>
    );
}

export default App;
