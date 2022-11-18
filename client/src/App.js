import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Inscription from "./components/Inscription";
import Connexion from "./components/Connexion";
import CGU from "./components/CGU";
import Token from "./components/Token";

import Stats from "./components/Dashboard/Stats";
import PrivateRoute from "./components/PrivateRoute.js";
import Travaux from "./components/Dashboard/Travaux";
import Session from "./components/Dashboard/Session";
import Compte from "./components/Dashboard/Compte";
import Admin from "./components/Dashboard/Admin.jsx";

function App() {

    // document.body.style.zoom = "95%";

    return (
        <Routes>
            <Route exact path="/" element={<Inscription />} />
            <Route exact path="/inscription" element={<Inscription />} />
            <Route exact path="/cgu" element={<CGU />} />
            <Route exact path="/connexion" element={<Connexion />} />
            <Route exact path="/token/*" element={<Token />} />

            <Route path="/dashboard/*" element={<PrivateRoute />}>
                <Route exact path='/dashboard/*' element={<Dashboard />} />
            </Route>

            <Route path="/stats/*" element={<PrivateRoute />}>
                <Route exact path='/stats/*' element={<Stats />} />
            </Route>

            <Route path="/programme/*" element={<PrivateRoute />}>
                <Route exact path='/programme/*' element={<Travaux />} />
            </Route>

            <Route path="/social/*" element={<PrivateRoute />}>
                <Route exact path='/social/*' element={<Travaux />} />
            </Route>

            <Route path="/compte/*" element={<PrivateRoute />}>
                <Route exact path='/compte/*' element={<Compte />} />
            </Route>

            <Route path="/a_propos/*" element={<PrivateRoute />}>
                <Route exact path='/a_propos/*' element={<Travaux />} />
            </Route>

            <Route path="/aide/*" element={<PrivateRoute />}>
                <Route exact path='/aide/*' element={<Travaux />} />
            </Route>

            <Route path="/cgu/*" element={<PrivateRoute />}>
                <Route exact path='/cgu/*' element={<Travaux />} />
            </Route>

            <Route path="/session/*" element={<PrivateRoute />}>
                <Route exact path='/session/*' element={<Session />} />
            </Route>

            <Route path="/admin" element={<PrivateRoute />}>
                <Route exact path='/admin' element={<Admin />} />
            </Route>
        </Routes>
    );
};

export default App;