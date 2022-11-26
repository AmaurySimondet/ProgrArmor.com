import { React } from 'react';
import Footer from '../Footer';
import NavigBar from '../NavigBar';
import Select from 'react-select';
import { customStyles, customStylesDark, customStylesMini, customStylesDarkMini } from './customStyles';

function Programme(props) {


    return (
        <div>
            <NavigBar />

            <div className="basic-div">

                <h1>Programmes</h1>

                <div className="tri">
                    <Select
                        options={[
                            { label: 'test', value: 'test' }
                        ]}
                        styles={
                            props.dimensions?.width <= 500 ?
                                props.modeSombre === true ?
                                    customStylesDarkMini
                                    :
                                    customStylesMini
                                :
                                props.modeSombre === true ?
                                    customStylesDark
                                    :
                                    customStyles
                        }
                    />
                </div>

                <button className="btn btn-dark">Créer un programme</button>

            </div>

            <Footer />
        </div>
    );
}

export default Programme;