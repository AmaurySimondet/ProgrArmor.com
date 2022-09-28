import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Inscription from "./components/Inscription";
import Connexion from "./components/Connexion";
import CGU from "./components/CGU";
import PrivateRoute from "./components/PrivateRoute.js";
import Travaux from "./components/Dashboard/Travaux";
import Session from "./components/Dashboard/Session";

function App() {

    return (
          <Routes>
            <Route exact path="/" element={<Inscription/>} />
            <Route exact path="/inscription" element={<Inscription/>} />
            <Route exact path="/cgu" element={<CGU/>} />
            <Route exact path="/connexion" element={<Connexion />} />

            <Route path="/dashboard/*" element={<PrivateRoute/>}>
                <Route exact path='/dashboard/*' element={<Dashboard/>}/>
            </Route>

            <Route path="/stats/*" element={<PrivateRoute/>}>
                <Route exact path='/stats/*' element={<Travaux/>}/>
            </Route>

            <Route path="/programme/*" element={<PrivateRoute/>}>
                <Route exact path='/programme/*' element={<Travaux/>}/>
            </Route>

            <Route path="/social/*" element={<PrivateRoute/>}>
                <Route exact path='/social/*' element={<Travaux/>}/>
            </Route>

            <Route path="/aide/*" element={<PrivateRoute/>}>
                <Route exact path='/aide/*' element={<Travaux/>}/>
            </Route>

            <Route path="/cgu/*" element={<PrivateRoute/>}>
                <Route exact path='/cgu/*' element={<Travaux/>}/>
            </Route>

            <Route path="/session/*" element={<PrivateRoute/>}>
                <Route exact path='/session/*' element={<Session/>}/>
            </Route>
          </Routes>
    );
};

export default App;