                <tbody>
                  {seances ? seances.map((seance,index) => {
                    return(
                        <tr>
                            <td className="dashboard-td">
                                {seance.date}
                            </td>
                            <td className="dashboard-td">
                                {seance.poids}
                            </td>
                            {seance.exercices ? seance.exercices.map((exercice, index) => {
                                return(
                                <div>
                                    <td className="dashboard-td">
                                        {exercice.exercice.name==="own-exercice" ? exercice.exercice.ownExercice : exercice.exercice.name}
                                    </td>
                                    {exercice.Series ? Object.values(exercice.Series).map(serie => {
                                        return(
                                        <div>
                                            <td className="dashboard-td">
                                                {serie.typeSerie}
                                            </td>
                                            <td className="dashboard-td">
                                                {serie.repsTime}
                                            </td>
                                            <td className="dashboard-td">
                                                {serie.charge}
                                            </td>
                                            <td className="dashboard-td">
                                                {serie.percent}
                                            </td>
                                        </div>
                                        )
                                    })
                                    : null }
                                </div>
                                )
                            })
                            : null }
                        </tr>
                    );
                  })
                  : null
                  }
                </tbody>