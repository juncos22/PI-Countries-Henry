import { useState } from "react"
import { connect } from "react-redux";
import { createActivity } from "../../redux/actions/activityActions";
import { getAllCountries } from "../../redux/actions/countryActions";
import Loader from "../Loader/Loader";
import styles from './Activities.module.css';

export function Activities({
    countries,
    loadingCountries,
    savingActivity,
    loadCountries,
    saveActivity }) {
    const [newActivity, setNewActivity] = useState({
        name: '',
        difficulty: 0,
        duration: 0,
        season: '',
        countries: []
    })
    const seasons = ['Primavera', 'Verano', 'Otoño', 'Invierno']
    const handleActivity = (e) => {
        setNewActivity({ ...newActivity, [e.target.name]: e.target.value })
    }
    const onSubmitActivity = (e) => {
        e.preventDefault();
        console.log(newActivity);
        saveActivity(newActivity)
        setNewActivity({ name: '', difficulty: 0, duration: 0, countries: [] })
    }
    const handleCountries = (e) => {
        newActivity.countries.push(e.target.value)
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Nueva Actividad</h3>
            <form className={styles.formContent} onSubmit={onSubmitActivity}>
                <div className="row">
                    <div className="col">
                        <label className={styles.inputLabel} htmlFor="name">Nombre de la actividad</label>
                        <input type="text"
                            id="name"
                            className={styles.inputForm}
                            name="name"
                            placeholder="Nombre de la actividad"
                            required
                            value={newActivity.name}
                            onChange={handleActivity} />

                        <label className={styles.inputLabel}
                            htmlFor="difficulty">Dificultad</label>
                        <input type="number"
                            className={styles.inputForm}
                            id="difficulty"
                            name="difficulty"
                            min={1} max={5}
                            placeholder={"Dificultad"}
                            required
                            value={newActivity.difficulty}
                            onChange={handleActivity} />

                        <label className={styles.inputLabel}
                            htmlFor="duration">Duraction (min.)</label>
                        <input type="number"
                            className={styles.inputForm}
                            id="duration"
                            name="duration"
                            placeholder="Duracion (min.)"
                            required
                            value={newActivity.duration}
                            onChange={handleActivity} />

                        <label className={styles.inputLabel}
                            htmlFor="season">Temporada</label>
                        <select name="season"
                            id="season"
                            value={newActivity.season}
                            className={styles.inputSelect}
                            required
                            placeholder="Temporada"
                            onChange={handleActivity}>
                            <option value="">Temporada</option>
                            {
                                seasons.map((s, i) => (
                                    <option value={s} key={i}>{s}</option>
                                ))
                            }
                        </select>
                        {
                            savingActivity && (
                                <Loader />
                            )
                        }
                        {
                            !savingActivity && (
                                <button className={styles.btnForm}>Guardar Actividad</button>
                            )
                        }
                    </div>
                    <div className="col">
                        {
                            loadingCountries && (
                                <Loader />
                            )
                        }
                        {
                            !loadCountries && (
                                <>
                                    <label className={styles.inputLabel}
                                        htmlFor="countries">Paises de la actividad</label>
                                    <select
                                        id="countries"
                                        name="countries"
                                        value={newActivity.countries}
                                        onChange={handleCountries}
                                        required
                                        className={styles.inputMultiSelect}
                                        multiple={true}
                                    >
                                        {
                                            countries && countries?.map((c, i) => (
                                                <option value={c.id} key={i}>{c.name} - {c.continent}</option>
                                            ))
                                        }
                                    </select>
                                </>
                            )
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        countries: state.countryReducer.countries,
        savingActivity: state.activityReducer.loading,
        loadingCountries: state.countryReducer.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadCountries: dispatch(getAllCountries()),
        saveActivity: (activity) => dispatch(createActivity(
            activity.name,
            activity.difficulty,
            activity.duration,
            activity.season,
            activity.countries
        ))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Activities)