import { useEffect, useState } from "react"
import { connect } from "react-redux";
import { createActivity } from "../../redux/actions/activityActions";
import { filterCountriesByName, getAllCountries } from "../../redux/actions/countryActions";
import Loader from "../Loader/Loader";
import SearchCountrySelect from "../SearchCountrySelect/SearchCountrySelect";
import styles from './Activities.module.css';

export function Activities({
    countries,
    loadingCountries,
    savingActivity,
    loadCountries,
    saveActivity,
    searchCountries,
    countryError,
    activityError
}) {
    const [newActivity, setNewActivity] = useState({
        name: '',
        difficulty: 0,
        duration: 0,
        season: '',
        countries: []
    })
    const [errors, setErrors] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: ''
    })

    const seasons = ['Primavera', 'Verano', 'Otoño', 'Invierno']
    const handleName = (e) => {
        if (!e.target.value) {
            setErrors({
                ...errors,
                name: 'Ingrese un nombre',
            })
        }
        else {
            setErrors({
                ...errors,
                name: ''
            })
        }
        setNewActivity((oldActivity) => ({ ...oldActivity, [e.target.name]: e.target.value }))
    }
    const handleDifficulty = (e) => {
        if (!e.target.value || (Number(e.target.value) < 1 || Number(e.target.value) > 5)) {
            setErrors({
                ...errors,
                difficulty: 'Ingrese una dificultad entre 1 y 5',
            })
        }
        else {
            setErrors({
                ...errors,
                difficulty: ''
            })
        }
        setNewActivity((oldActivity) => ({ ...oldActivity, [e.target.name]: e.target.value }))
    }
    const handleDuration = (e) => {
        if (!e.target.value || Number(e.target.value) < 1) {
            setErrors({
                ...errors,
                duration: 'Ingrese una duracion en min.',
            })
        }
        else {
            setErrors({
                ...errors,
                duration: ''
            })
        }
        setNewActivity((oldActivity) => ({ ...oldActivity, [e.target.name]: e.target.value }))
    }
    const handleSeason = (e) => {
        if (!e.target.value) {
            setErrors({
                ...errors,
                season: 'Elija una temporada',
            })
        }
        else {
            setErrors({
                ...errors,
                season: ''
            })
        }
        setNewActivity((oldActivity) => ({ ...oldActivity, [e.target.name]: e.target.value }))
    }
    const handleCountries = (e) => {
        if (!e.target.value.length) {
            setErrors({
                ...errors,
                countries: 'Elija al menos un pais',
            })
        }
        else {
            newActivity.countries.push(e.target.value)
            setErrors({
                ...errors,
                countries: ''
            })
        }
    }

    const onSubmitActivity = (e) => {
        e.preventDefault();
        console.log(newActivity);
        saveActivity(newActivity)
        setNewActivity({ name: '', difficulty: 0, duration: 0, season: '', countries: [] })
        loadCountries()
    }
    const handleSearch = (countryName) => {
        if (countryName) {
            countryName = countryName[0].toUpperCase() + countryName.slice(1)
            searchCountries(countryName)
        } else {
            loadCountries()
        }
    }
    useEffect(() => {
        loadCountries()
    }, [loadCountries])

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Nueva Actividad</h3>
            {
                countryError && (
                    <span className={styles.errorMessage}>{countryError}</span>
                )
            }
            {
                activityError && (
                    <span className={styles.errorMessage}>{activityError}</span>
                )
            }
            <form className={styles.formContent} onSubmit={onSubmitActivity}>
                <div className="row">
                    <div className="col">
                        <label className={styles.inputLabel} htmlFor="name">Nombre de la actividad</label>
                        <input type="text"
                            id="name"
                            className={`${styles.inputForm} ${errors.name
                                ? styles.errorInput : ''}`}
                            name="name"
                            placeholder="Nombre de la actividad"
                            value={newActivity.name}
                            onChange={handleName} />
                        {
                            errors.name && (
                                <span className={styles.errorMessage}>
                                    {errors.name}
                                </span>
                            )
                        }

                        <label className={styles.inputLabel}
                            htmlFor="difficulty">Dificultad</label>
                        <input type="number"
                            className={`${styles.inputForm} ${errors.difficulty
                                ? styles.errorInput : ''}`}
                            id="difficulty"
                            name="difficulty"
                            placeholder={"Dificultad"}
                            value={newActivity.difficulty}
                            onChange={handleDifficulty} />
                        {
                            errors.difficulty && (
                                <span className={styles.errorMessage}>
                                    {errors.difficulty}
                                </span>
                            )
                        }


                        <label className={styles.inputLabel}
                            htmlFor="duration">Duración (min.)</label>
                        <input type="number"
                            className={`${styles.inputForm} ${errors.duration
                                ? styles.errorInput : ''}`}
                            id="duration"
                            name="duration"
                            placeholder="Duracion (min.)"
                            value={newActivity.duration}
                            onChange={handleDuration} />

                        {
                            errors.duration && (
                                <span className={styles.errorMessage}>
                                    {errors.duration}
                                </span>
                            )
                        }

                        <label className={styles.inputLabel}
                            htmlFor="season">Temporada</label>
                        <select name="season"
                            id="season"
                            value={newActivity.season}
                            className={`${styles.inputSelect} ${errors.season
                                ? styles.errorInput : ''}`}
                            placeholder="Temporada"
                            onChange={handleSeason}>
                            <option value="">Temporada</option>
                            {
                                seasons.map((s, i) => (
                                    <option value={s} key={i}>{s}</option>
                                ))
                            }
                        </select>
                        {
                            errors.season && (
                                <span className={styles.errorMessage}>
                                    {errors.season}
                                </span>
                            )
                        }

                        {
                            savingActivity && (
                                <Loader />
                            )
                        }
                        {
                            !savingActivity && (
                                <button type="submit"
                                    disabled={
                                        !newActivity.name
                                        || !newActivity.difficulty
                                        || !newActivity.duration
                                        || !newActivity.countries.length
                                        || !newActivity.season
                                    } className={`${!newActivity.name
                                        || !newActivity.difficulty
                                        || !newActivity.duration
                                        || !newActivity.countries.length
                                        || !newActivity.season ? styles.disabled : styles.btnForm}`}>Guardar Actividad</button>
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
                            !loadingCountries && (
                                <>
                                    <label className={styles.inputLabel}
                                        htmlFor="countries">Paises para la actividad</label>

                                    <SearchCountrySelect onSearch={handleSearch} />
                                    <select
                                        id="countries"
                                        name="countries"
                                        value={newActivity.countries}
                                        onChange={handleCountries}
                                        className={`${styles.inputMultiSelect} ${errors.countries.length > 0
                                            ? styles.errorInput : ''}`}
                                        multiple={true}
                                    >
                                        {
                                            countries && countries?.map((c, i) => (
                                                <option value={c.id} key={i}>{c.name} - {c.continent}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.countries.length > 0 && (
                                            <span className={styles.errorMessage}>
                                                {errors.countries}
                                            </span>
                                        )
                                    }
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
        loadingCountries: state.countryReducer.loading,
        countryError: state.countryReducer.error,
        activityError: state.activityReducer.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadCountries: () => dispatch(getAllCountries()),
        searchCountries: (name) => dispatch(filterCountriesByName(name)),
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