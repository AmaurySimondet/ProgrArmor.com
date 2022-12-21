import { React, useState, useEffect } from 'react';
import NavigBar from '../NavigBar';
import Footer from '../Footer';
import API from '../../utils/API';

const Berger = [
    { rep: 1, percent: 100 },
    { rep: 2, percent: 97.4 },
    { rep: 3, percent: 94.9 },
    { rep: 4, percent: 92.4 },
    { rep: 5, percent: 89.8 },
    { rep: 6, percent: 87.6 },
    { rep: 7, percent: 85.5 },
    { rep: 8, percent: 83.3 },
    { rep: 9, percent: 81.1 },
    { rep: 10, percent: 78.8 },
    { rep: 11, percent: 75 },
    { rep: 12, percent: 72.5 },
    { rep: 13, percent: 70 },
    { rep: 14, percent: 67.5 },
    { rep: 15, percent: 65 },
]

function TestNiveau() {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    const [user, setUser] = useState({});
    const [checkedItems, setCheckedItems] = useState({});
    const [click, setClick] = useState({});
    let [intermediate, setIntermediate] = useState(0);
    let [expert, setExpert] = useState(0);
    let [confirme, setConfirme] = useState(0);
    let [result, setResult] = useState();
    let [textPerf, setTextPerf] = useState("");
    let [textObjective, setTextObjective] = useState("");
    let [total, setTotal] = useState(0);
    const [reps, setReps] = useState(8);
    const [pdc, setPdc] = useState(85);
    const [repsObjective, setRepsObjective] = useState(1);
    const [pdcObjective, setPdcObjective] = useState(100);
    const [convertedObjective, setConvertedObjective] = useState(0);
    const [check, setCheck] = useState(false);

    const handleChange = (event) => {
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked,
        });
    };

    useEffect(() => {
        let sumInterm = 0;
        let sumConfirme = 0;
        let sumExpert = 0;

        Object.entries(checkedItems).forEach((value) => {
            let key = value[0];
            let checked = value[1];

            if (key.includes("Interm") && checked === true) {
                sumInterm += 1;
            } else if (key.includes("Confirme") && checked === true) {
                sumConfirme += 1;
            } else if (key.includes("Expert") && checked === true) {
                sumExpert += 1;
            }
        })

        setIntermediate(sumInterm);
        setConfirme(sumConfirme);
        setExpert(sumExpert);
        setTotal(sumInterm + sumConfirme + sumExpert)


        if (sumInterm === 0 && sumConfirme === 0 && sumExpert === 0) {
            setResult({ text: "Débutant(e) !", color: "#10669C" });
        } else if (sumExpert >= 1) {
            setResult({ text: "Expert(e) !", color: "red" });
        } else if (sumConfirme >= 1 && sumExpert === 0) {
            setResult({ text: "Confirmé(e) !", color: "orange" });
        } else if (sumInterm >= 1 && sumConfirme === 0 && sumExpert === 0) {
            setResult({ text: "Intermédiaire !", color: "yellow" });
        }



    }, [checkedItems])

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

    function handleClick(e) {
        setClick({
            ...click,
            [e.target.id]: !click[e.target.id]
        })
    }

    useEffect(() => {
        console.log("checkedItems", checkedItems);
    }, [checkedItems]);


    useEffect(() => {
        let checkTemp = 0;
        let perfReps = parseFloat(reps);
        let perfPdc = parseFloat(pdc);
        let objectiveReps = parseFloat(repsObjective);
        let objectivePdc = parseFloat(pdcObjective);
        let convertedBergerTemp = 1;
        let convertedObjectiveTemp = parseFloat(objectivePdc);
        let cent = false;

        if (objectiveReps <= 15 && objectiveReps > 0 && perfReps <= 15 && perfReps > 0) {
            if (objectivePdc === 0) {
                objectivePdc = 100;
                perfPdc += 100;
                cent = true
            }

            if (objectiveReps !== perfReps) {
                let bergerInput = Berger.find(e => e.rep === objectiveReps).percent; // 94.9%
                let bergerSerie = Berger.find(e => e.rep === perfReps).percent; // 72.5%

                let conversion = (100 / bergerInput) / 100; // 1.0537

                convertedBergerTemp = (bergerSerie * conversion); // 0.765
                convertedBergerTemp = convertedBergerTemp.toFixed(2)
                convertedObjectiveTemp = objectivePdc * convertedBergerTemp; // 114.6%

                if (cent === true) {
                    convertedObjectiveTemp -= 100;
                    perfPdc -= 100;
                }

                if (perfPdc >= convertedObjectiveTemp) {
                    checkTemp = 1;
                }

            }

            else {
                if (perfReps >= objectiveReps) {
                    if (perfPdc >= objectivePdc) {
                        checkTemp = 1;
                    }
                }
            }

            setTextObjective("");
            setTextPerf("");
        }

        else {
            if (objectiveReps > 15 || objectiveReps <= 0) {
                setTextObjective("Veuillez entrer un nombre de répétitions entre 1 et 15");
            }
            if (perfReps > 15 || perfReps <= 0) {
                setTextPerf("Veuillez entrer un nombre de répétitions entre 1 et 15");
            }

            console.log("perfReps", perfReps)

            if (perfReps >= objectiveReps) {
                if (perfPdc >= objectivePdc) {
                    checkTemp = 1;
                    convertedBergerTemp = "/"
                }
            }
        }

        setCheck(checkTemp);
        setConvertedObjective(convertedObjectiveTemp.toFixed(2));

    }, [reps, pdc, repsObjective, pdcObjective]);



    async function handleLoad() {
        // setText("Chargement des critères en cours...");
        const { data } = await API.getNiveau({ id: localStorage.getItem("id") });

        if (data.success === false) {
            console.log(data.message);
        }
        else {
            // console.log(data);
            // console.log(Object.values(data.checkItems).length)
            setCheckedItems(data.checkItems);
            // setText("Vos critères ont bien été chargés automatiquement, désolé pour toi si tu n'as remplis aucun objectif !")
        }

    }

    useEffect(() => {
        handleLoad()
    }, []);

    return (
        <div>

            <NavigBar />



            <div className='basic-div' style={{ minHeight: "80vh" }}>
                <h1>Test de niveau</h1>

                <p className='large-margin-bottom'>
                    Vous pouvez cocher vous même les critères qui vous correspondent,
                    ou bien cliquer sur le bouton afin de déterminer automatiquement votre niveau basé sur vos séances enregistrées.
                    Les objectifs prennent aussi en compte leur équivalent par la table de Berger des % de 1RM.
                </p>

                <div >
                    <h2 className='large-margin-bottom'> Conversion des tables de Berger (%1RM)</h2>


                    <div className='grid-test large-margin-bottom'>
                        <div>{ }</div>
                        <label className=''>
                            Reps
                        </label>
                        <label className=''>
                            Charge en % PDC
                        </label>
                        <label className=''>
                            % PDC converti
                        </label>
                        <label className=''>
                            {dimensions.width <= 500 ? "Equiva -lent ?" : "Equivalent ?"}
                        </label>


                        <label className=''>
                            Perf
                        </label>

                        <input
                            type="number"
                            name="reps"
                            className={user.modeSombre ? "inputDark form-control " : "form-control "}
                            value={reps}
                            onChange={e => setReps(e.target.value)}
                        />


                        <input
                            type="number"
                            name="pdc"
                            className={user.modeSombre ? "inputDark form-control " : "form-control "}
                            value={pdc}
                            onChange={e => setPdc(e.target.value)}
                        />
                        <div>{ }</div>
                        <div>{ }</div>


                        <label className=''>
                            {dimensions.width <= 500 ? "Obje -ctif" : "Objectif"}
                        </label>

                        <input
                            type="number"
                            className={user.modeSombre ? "inputDark form-control " : "form-control "}
                            name="reps"
                            value={repsObjective}
                            onChange={e => setRepsObjective(e.target.value)}
                        />

                        <input
                            type="number"
                            className={user.modeSombre ? "inputDark form-control " : "form-control "}
                            name="pdc"
                            value={pdcObjective}
                            onChange={e => setPdcObjective(e.target.value)}
                        />
                        <input
                            type="number"
                            name="convertedObjective"
                            className={user.modeSombre ? "inputReadOnlyDark form-control " : "form-control "}
                            value={convertedObjective}
                            readOnly
                        />
                        <div className='basic-form-control'
                            style={check === 1 ? { backgroundColor: "#24B34C" } : { backgroundColor: "#ff0000" }}>
                            {check === 1 ? "Oui !" : "Non !"}
                        </div>
                    </div>


                </div>

                <p>
                    {textObjective}
                </p>
                <p>
                    {textPerf}
                </p>

                {/* CRITERES */}
                <h2 className='large-margin-bottom' id="criteres" onClick={handleClick}>
                    Voir les critères :
                    {click.criteres ?
                        <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                        :
                        <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                    }
                </h2>

                {click.criteres ?
                    <div className='large-margin-bottom'>
                        <h2>1. Débutant(e) :</h2>
                        <p>Vous êtes Débutant(e) si vous avez moins d'un an de pratique, et/ou que vous ne réussissez pas les test des niveaux supérieur.</p>


                        {/* INTERMEDIAIRE */}
                        <div className='large-margin-bottom'>
                            <h2>2. Intermédiaire :</h2>
                            <p>Vous êtes Intermédiaire  si vous êtes à l'aise avec les mouvements de base de notre pratique, vous maitrisez les notions de base de l'entrainement et/ou de la nutrition
                                et commencez le travail de figures avancées. Vous avez entre 6 mois à 2 ans de pratique sérieuse et/ou que vous réussissez certains des test suivant :</p>

                            <h3 id="statiqueInterm" onClick={handleClick}>
                                Statique :
                                {click.statiqueInterm ?
                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                    :
                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                }
                            </h3>


                            {click.statiqueInterm ?
                                <ul>
                                    <li className='li-test'>
                                        <input type="checkbox" name="statiqueIntermItem1"
                                            checked={checkedItems.statiqueIntermItem1}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable de tenir un front lever à une jambe au moins 5 secondes.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="statiqueIntermItem2"
                                            checked={checkedItems.statiqueIntermItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable de tenir une tuck planche 20 secondes ou une advanced tuck planche 5 secondes.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="statiqueIntermItem3"
                                            checked={checkedItems.statiqueIntermItem3}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        avoir un L-sit d'au moins 15 secondes.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="statiqueIntermItem4"
                                            checked={checkedItems.statiqueIntermItem4}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        avoir un back lever en straddle. (prise pronation)
                                    </li>
                                </ul>
                                : null}


                            <h3 id="pdcInterm" onClick={handleClick}>
                                Poids du corps :
                                {click.pdcInterm ?
                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                    :
                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                }
                            </h3>

                            {click.pdcInterm ?
                                <ul>
                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcIntermItem1"
                                            checked={checkedItems.pdcIntermItem1}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 15 dips ou plus. (coudes verrouillés en haut, épaules plus basses ou au même niveau que les coudes en bas)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcIntermItem2"
                                            checked={checkedItems.pdcIntermItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 12 tractions complètes ou plus. (prise au choix, bras tendus en bas, menton au dessus de la barre en haut)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcIntermItem3"
                                            checked={checkedItems.pdcIntermItem3}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 3 muscle up à la barre ou plus.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcIntermItem4"
                                            checked={checkedItems.pdcIntermItem4}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 12 pompes archer ou plus. (torse qui touche le sol en bas, coude verrouillé en haut, le bras qui ne travaille pas doit rester tendu)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcIntermItem5"
                                            checked={checkedItems.pdcIntermItem5}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable d'exécuter 5 pistol squat de la même jambe en équilibre.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcIntermItem6"
                                            checked={checkedItems.pdcIntermItem6}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable d'exécuter 5 demi matrix squat/5 natural leg extension complètes au sol.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcIntermItem7"
                                            checked={checkedItems.pdcIntermItem7}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable d'exécuter 15 flexions/extensions de hanche en position de nordic curl
                                        (comme montré
                                        <a href="https://www.youtube.com/watch?v=h7m0rP0WyU4&ab_channel=ExploreTheMovement " > ici</a>
                                        )
                                    </li>
                                </ul>
                                : null}



                            <h3 id="streetliftInterm" onClick={handleClick}>
                                Musculation / Street Lifting :
                                {click.streetliftInterm ?
                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                    :
                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                }
                            </h3>

                            {click.streetliftInterm ?
                                <ul>
                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftIntermItem1"
                                            checked={checkedItems.streetliftIntermItem1}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 dips avec 50% de votre poids du corps en lest. (coudes verrouillés en haut, épaules plus basses ou au même niveau que les coudes en bas)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftIntermItem2"
                                            checked={checkedItems.streetliftIntermItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 traction avec 30% de votre poids du corps en lest. (prise au choix, bras tendus en bas, menton au dessus de la barre en haut)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftIntermItem3"
                                            checked={checkedItems.streetliftIntermItem3}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 3 muscle up à la barre ou plus.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftIntermItem4"
                                            checked={checkedItems.streetliftIntermItem4}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 squat barre à 130% de votre poids du corps en lest. (hanches plus basse que le niveau des genoux en bas)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftIntermItem5"
                                            checked={checkedItems.streetliftIntermItem5}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 soulevé de terre à 170% de votre poids du corps en lest.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftIntermItem6"
                                            checked={checkedItems.streetliftIntermItem6}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 developpé couché à 100% de votre poids du corps.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftIntermItem7"
                                            checked={checkedItems.streetliftIntermItem7}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 hip-thrust à 200% de votre poids du corps.
                                    </li>
                                </ul>
                                : null}


                            <h3 id="equilibreInterm" onClick={handleClick}>
                                Equilibre :
                                {click.equilibreInterm ?
                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                    :
                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                }
                            </h3>

                            {click.equilibreInterm ?
                                <ul>
                                    <li className='li-test'>
                                        <input type="checkbox" name="equilibreIntermItem1"
                                            checked={checkedItems.equilibreIntermItem1}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir tenir le handstand 10 secondes minimum. (sans marcher)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="equilibreIntermItem2"
                                            checked={checkedItems.equilibreIntermItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 3 pompes en handstand au sol.

                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="equilibreIntermItem3"
                                            checked={checkedItems.equilibreIntermItem3}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir tenir un elbow lever ou figure équivalente 30 secondes minimum.
                                    </li>

                                </ul>
                                : null}

                        </div>


                        {/* CONFIRME */}
                        <div className='large-margin-bottom'>
                            <h2>3. Confirmé(e) :</h2>
                            <p>Vous êtes Confirmé(e) si vous avez plus de trois ans de pratique, vous maitrisez les notions avancées de l'entrainement et/ou de la nutrition, vous êtes capable de périodiser votre entrainement, vous maitrisez une ou plusieurs figures de base et/ou que vous réussissez un des test suivant :</p>


                            <h3 id="statiqueConfirme" onClick={handleClick}>
                                Statique :
                                {click.statiqueConfirme ?
                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                    :
                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                }
                            </h3>


                            {click.statiqueConfirme ?

                                <ul>
                                    <li className='li-test'>
                                        <input type="checkbox" name="statiqueConfirmeItem1"
                                            checked={checkedItems.statiqueConfirmeItem1}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable de tenir un front lever 10 secondes ou plus.
                                    </li>
                                    <li className='li-test'>
                                        <input type="checkbox" name="statiqueConfirmeItem2"
                                            checked={checkedItems.statiqueConfirmeItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable de tenir une straddle planche 10 secondes ou plus.
                                    </li>
                                    <li className='li-test'>
                                        <input type="checkbox" name="statiqueConfirmeItem3"
                                            checked={checkedItems.statiqueConfirmeItem3}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable de tenir un human flag 15 secondes ou plus.
                                    </li>
                                </ul>
                                : null}


                            <h3 id="pdcConfirme" onClick={handleClick}>
                                Poids du corps :
                                {click.pdcConfirme ?
                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                    :
                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                }
                            </h3>

                            {click.pdcConfirme ?
                                <ul>
                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcConfirmeItem1"
                                            checked={checkedItems.pdcConfirmeItem1}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 10 dips en archer du même bras ou plus. (coude verrouillé en haut, épaule plus basse ou égale que le niveau du coude, le bras qui ne travaille pas doit rester tendu)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcConfirmeItem2"
                                            checked={checkedItems.pdcConfirmeItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 traction à un bras ou 10 tractions en archer complètes. (bras tendu en bas, menton au dessus de la barre en haut, le bras qui ne travaille pas doit rester tendu)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcConfirmeItem3"
                                            checked={checkedItems.pdcConfirmeItem3}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 8 muscle up à la barre ou plus.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcConfirmeItem4"
                                            checked={checkedItems.pdcConfirmeItem4}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 20 pompes à un bras ou plus. (torse au sol en bas, bras tendu en haut, écartement des jambes au choix)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcConfirmeItem5"
                                            checked={checkedItems.pdcConfirmeItem5}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable d'exécuter 1 pistol squat avec 40% de votre poids du corps en lest en équilibre. (amplitude complète, pause en bas jambe fléchie, jambe tendue en haut)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcConfirmeItem6"
                                            checked={checkedItems.pdcConfirmeItem6}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable d'exécuter 5 matrix squat complets. (hanches en extension)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcConfirmeItem7"
                                            checked={checkedItems.pdcConfirmeItem7}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable d'exécuter 5 nordic curl. (hanches légèrement fléchies)
                                    </li>

                                </ul>
                                : null}


                            <h3 id="streetliftConfirme" onClick={handleClick}>
                                Musculation / Street Lifting :
                                {click.streetliftConfirme ?
                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                    :
                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                }
                            </h3>


                            {click.streetliftConfirme ?

                                <ul>
                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftConfirmeItem1"
                                            checked={checkedItems.streetliftConfirmeItem1}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter une dips avec 100% de votre poids du corps en lest. (coudes verrouillés en haut, épaules plus basses ou au même niveau que les coudes en bas)
                                    </li>
                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftConfirmeItem2"
                                            checked={checkedItems.streetliftConfirmeItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 traction avec 75% de votre poids du corps en lest. (prise au choix, bras tendus en bas, menton au dessus de la barre en haut)
                                    </li>
                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftConfirmeItem3"
                                            checked={checkedItems.streetliftConfirmeItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 8 muscle up à la barre ou plus.
                                    </li>
                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftConfirmeItem4"
                                            checked={checkedItems.streetliftConfirmeItem3}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 squat barre à 200% de votre poids du corps en lest. (hanches plus basse que le niveau des genoux en bas)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftConfirmeItem5"
                                            checked={checkedItems.streetliftConfirmeItem4}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 soulevé de terre à 250% de votre poids du corps en lest.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftConfirmeItem6"
                                            checked={checkedItems.streetliftConfirmeItem6}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 developpé couché à 150% de votre poids du corps.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftConfirmeItem7"
                                            checked={checkedItems.streetliftConfirmeItem7}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 hip-thrust à 300% de votre poids du corps.
                                    </li>
                                </ul>
                                : null}


                            <h3 id="equilibreConfirme" onClick={handleClick}>
                                Equilibre :
                                {click.equilibreConfirme ?
                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                    :
                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                }
                            </h3>

                            {click.equilibreConfirme ?
                                <ul>
                                    <li className='li-test'>
                                        <input type="checkbox" name="equilibreConfirmeItem1"
                                            checked={checkedItems.equilibreConfirmeItem1}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir tenir le straight handstand 40 secondes minimum. (sans marcher)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="equilibreConfirmeItem2"
                                            checked={checkedItems.equilibreConfirmeItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 5 pompes en handstand aux parallètes. (amplitude complète, bras tendus en haut, visage au ras du sol en bas)

                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="equilibreConfirmeItem3"
                                            checked={checkedItems.equilibreConfirmeItem3}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir tenir un elbow lever un bras ou figure équivalente 30 secondes minimum.
                                    </li>

                                </ul>
                                : null}

                        </div>


                        {/* EXPERT */}
                        <div className='large-margin-bottom'>
                            <h2>4. Expert(e) :</h2>
                            <p>Vous êtes Expert(e) si vous avez atteint un niveau d'excellence et d'expertise sur une ou plusieurs figures, exercices ou branches du street workout, l'entrainement et/ou la nutrition n'ont plus de secrets pour vous, vous êtes compétiteur, vous avez au moins 5 ans de pratique sérieuse du street workout, et/ou que vous réussissez un des test suivant :</p>


                            <h3 id="statiqueExpert" onClick={handleClick}>
                                Statique :
                                {click.statiqueExpert ?
                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                    :
                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                }
                            </h3>

                            {click.statiqueExpert ?
                                <ul>
                                    <li className='li-test'>
                                        <input type="checkbox" name="statiqueExpertItem1"
                                            checked={checkedItems.statiqueExpertItem1}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable de tenir un front lever 20 secondes ou plus ou tenir un front lever à un bras.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="statiqueExpertItem2"
                                            checked={checkedItems.statiqueExpertItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable de tenir une full planche/maltese 10 secondes ou plus
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="statiqueExpertItem3"
                                            checked={checkedItems.statiqueExpertItem3}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable de tenir une iron cross 10 secondes ou plus
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="statiqueExpertItem4"
                                            checked={checkedItems.statiqueExpertItem4}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable de tenir un human flag 30 secondes ou plus.
                                    </li>


                                </ul>

                                : null}


                            <h3 id="pdcExpert" onClick={handleClick}>
                                Poids du corps :
                                {click.pdcExpert ?
                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                    :
                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                }
                            </h3>

                            {click.pdcExpert ?
                                <ul>
                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcExpertItem1"
                                            checked={checkedItems.pdcExpertItem1}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 5 dips à un bras du même bras ou plus. (coude verrouillé en haut, coudes à 90% minimum en bas)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcExpertItem2"
                                            checked={checkedItems.pdcExpertItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 3 traction à un bras complètes. (prise au choix, bras tendu en bas, menton au dessus de la barre en haut)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcExpertItem3"
                                            checked={checkedItems.pdcExpertItem3}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 12 muscle up à la barre sans élan ou plus.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcExpertItem4"
                                            checked={checkedItems.pdcExpertItem4}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 5 full planche pushups . (bras tendus en haut, épaules sous le niveau des coudes en bas)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcExpertItem5"
                                            checked={checkedItems.pdcExpertItem5}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable d'exécuter 1 pistol squat avec 60% de votre poids du corps en lest en équilibre. (amplitude complète, pause en bas jambe fléchie, jambe tendue en haut)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcExpertItem6"
                                            checked={checkedItems.pdcExpertItem6}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable d'exécuter 10 matrix squat complets. (hanches en extension)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="pdcExpertItem7"
                                            checked={checkedItems.pdcExpertItem7}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable d'exécuter 1 full nordic curl. (hanches en extension)
                                    </li>


                                </ul>

                                : null}


                            <h3 id="streetliftExpert" onClick={handleClick}>
                                Musculation / Street Lifting :
                                {click.streetliftExpert ?
                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                    :
                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                }
                            </h3>


                            {click.streetliftExpert ?

                                <ul>
                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftExpertItem1"
                                            checked={checkedItems.streetliftExpertItem1}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter une dips avec 130% de votre poids du corps en lest. (coudes verrouillés en haut, épaules plus basses ou au même niveau que les coudes en bas)
                                    </li>
                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftExpertItem2"
                                            checked={checkedItems.streetliftExpertItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 traction avec 100% de votre poids du corps en lest. (prise au choix, bras tendus en bas, menton au dessus de la barre en haut)
                                    </li>
                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftExpertItem3"
                                            checked={checkedItems.streetliftExpertItem3}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 3 muscle up avec 25% de votre poids du corps en lest à la barre ou plus.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftExpertItem4"
                                            checked={checkedItems.streetliftExpertItem4}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 squat barre à 230% de votre poids du corps en lest. (hanches plus basse que le niveau des genoux en bas)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftExpertItem5"
                                            checked={checkedItems.streetliftExpertItem5}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 soulevé de terre à 300% de votre poids du corps en lest.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftExpertItem6"
                                            checked={checkedItems.streetlifttExperttem6}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 developpé couché à 200% de votre poids du corps.
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="streetliftExpertItem7"
                                            checked={checkedItems.streetliftExpertItem7}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        pouvoir exécuter 1 hip-thrust à 400% de votre poids du corps.
                                    </li>
                                </ul>
                                : null}

                            <h3 id="equilibreExpert" onClick={handleClick}>
                                Equilibre :
                                {click.equilibreExpert ?
                                    <img className="expert-toggle" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                    :
                                    <img className="expert-toggle-inverted" src={require('../../images/icons/icons8-expand-arrow-90.webp')} />
                                }
                            </h3>

                            {click.equilibreExpert ?
                                <ul>
                                    <li className='li-test'>
                                        <input type="checkbox" name="equilibreExpertItem1"
                                            checked={checkedItems.equilibreExpertItem1}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable d'exécuter 1 pistol squat avec 60% de votre poids du corps en lest en équilibre. (amplitude complète, pause en bas jambe fléchie, jambe tendue en haut)
                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="equilibreExpertItem2"
                                            checked={checkedItems.equilibreExpertItem2}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable d'exécuter 10 matrix squat complets. (hanches en extension)

                                    </li>

                                    <li className='li-test'>
                                        <input type="checkbox" name="equilibreExpertItem3"
                                            checked={checkedItems.equilibreExpertItem3}
                                            onChange={handleChange}
                                            className="checkbox-test" />
                                        être capable d'exécuter 1 full nordic curl. (hanches en extension)
                                    </li>

                                </ul>
                                : null}

                        </div>

                    </div>

                    : null}



                <table className={user.modeSombre ? "table table-hover table-responsive-lg table-dark dashboard-table" : "table table-hover table-responsive-lg dashboard-table"}
                    style={{ display: "inline-table" }}>
                    <thead>
                        <tr>
                            <th>Intermédiaire</th>
                            <th>Confirmé</th>
                            <th>Expert</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{intermediate}</td>
                            <td>{confirme}</td>
                            <td>{expert}</td>
                            <td>{total}/62</td>
                        </tr>
                    </tbody>
                </table>

                <h1> Vous êtes officiellement... </h1>
                <h1 style={{ color: result?.color }}>
                    {result?.text}
                </h1>

            </div>





            <Footer />

        </div>
    )
}

export default TestNiveau;