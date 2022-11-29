import { React, useState, useEffect } from 'react';
import Footer from '../Footer';
import NavigBar from '../NavigBar';
import Select from 'react-select';
import { customStyles, customStylesDark, customStylesMini, customStylesDarkMini } from './customStyles';
import API from '../../utils/API';
import ProgrammeCard from './ProgrammeCard';
import ProgrammeCardExplication from './ProgrammeCardExplication';

import TypeBarres from "./Categories/TypesBarres";

function Programme(props) {
    const [programme, setProgramme] = useState([]);
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    const [programmes, setProgrammes] = useState([]);
    const [user, setUser] = useState({ modeSombre: false })

    async function getUser() {
        const { data } = await API.getUser({ id: localStorage.getItem("id") });
        if (data.success === false) {
            alert(data.message);
        } else {
            console.log(data.profile);
            if (data.profile.modeSombre && data.profile.modeSombre === true) {
                // 👇 add class to body element
                document.body.classList.add('darkMode');
            }
            setUser(data.profile);
        };
    }

    useEffect(() => {
        setTimeout(getUser, 50);
    }, []);

    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }

        var timeout = false;
        window.addEventListener('resize', function () {
            clearTimeout(timeout);;
            timeout = setTimeout(handleResize, 200);
        });
    });

    function styleOnDim() {
        if (dimensions.width > 500) {
            if (user.modeSombre === true) {
                return customStylesDark;
            } else {
                return customStyles;
            }
        } else {
            if (user.modeSombre === true) {
                return customStylesDarkMini;
            } else {
                return customStylesMini;
            }
        }
    }

    async function getProgrammes() {
        const { data } = await API.getProgrammes({});
        if (data.success === true) {
            setProgrammes(data.programmes)
        }
        else {
            alert(data.message)
        }
    }

    useEffect(() => {
        getProgrammes();
    }, []);

    return (
        <div>
            <NavigBar />

            <div className="basic-div">

                <h1>Programmes</h1>

                <div className="tri">
                    <div className="form-group row">
                        <div className="col-6 col-md-3">
                            <label className="col-form-label">Tri par</label>
                            <Select
                                options={[
                                    { label: 'Les plus aimés (défaut)', value: 'Les plus aimés (défaut)' },
                                    { label: 'Les plus récents', value: 'Les plus récents' },

                                ]}
                                placeholder="Les plus aimés (défaut)"
                                styles={styleOnDim(dimensions)}
                            />
                        </div>

                        <div className="col-6 col-md-3">
                            <label className="col-form-label">Type</label>
                            <Select
                                options={[
                                    { label: 'test', value: 'test' }
                                ]}
                                styles={styleOnDim(dimensions)}
                            />
                        </div>

                        <div className="col-6 col-md-3">
                            <label className="col-form-label">Niveau</label>
                            <Select
                                options={[
                                    { label: 'test', value: 'test' }
                                ]}
                                styles={styleOnDim(dimensions)}
                            />
                        </div>

                        <div className="col-6 col-md-3">
                            <label className="col-form-label">Durée max d'une séance</label>
                            <Select
                                options={[
                                    { label: 'test', value: 'test' }
                                ]}
                                styles={styleOnDim(dimensions)}
                            />
                        </div>

                        <div className="col-6 col-md-3">
                            <label className="col-form-label">Séances par semaine</label>
                            <Select
                                options={[
                                    { label: 'test', value: 'test' }
                                ]}
                                styles={styleOnDim(dimensions)}
                            />
                        </div>

                        <div className="col-6 col-md-3">
                            <label className="col-form-label">ID du créateur</label>
                            <input type="text" className={user.modeSombre === true ? "inputDark form-control" : "form-control"} placeholder="123456..." />
                        </div>

                        <div className="col-6 col-md-3">
                            <label className="col-form-label">ID du programme</label>
                            <input type="text" className={user.modeSombre === true ? "inputDark form-control" : "form-control"} placeholder="123456..." />
                        </div>

                        <div className="col-12">
                            <label className="col-form-label">Materiel</label>
                            <Select
                                isMulti
                                options={TypeBarres}
                                styles={styleOnDim(dimensions)}
                                placeholder="Tout (défaut)"
                            />
                        </div>

                    </div>
                </div>

                <div className="programmes">
                    <ProgrammeCardExplication />

                    {programmes.map((programme, index) => (
                        <ProgrammeCard
                            key={programme.id}
                            id={programme.id}
                            index={index}
                            programme={programme}
                        />
                    ))}
                </div>

                <button className="btn btn-dark large-margin-updown">Créer un programme</button>

            </div>

            <Footer />
        </div>
    );
}

export default Programme;