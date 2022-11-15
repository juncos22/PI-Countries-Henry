import styles from './Countries.module.css';
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getActivities } from "../../redux/actions/activityActions";
import {
    // filterByActivity,
    // filterByContinent,
    filterCountriesByName,
    getAllCountries,
    getContinents,
    // orderByName,
    // orderByPopulation
} from "../../redux/actions/countryActions";
import ComboBoxContinente from "../ComboBox/ComboBox";
import ComboBoxActividad from '../ComboBox/ComboBox';
import ComboBoxOrdenamiento from '../ComboBox/ComboBox';
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import SearchButton from "../SearchButton/SearchButton";
import SearchCountries from "../SearchCountries/SearchCountries";
import CountryCard from "./CountryCard/CountryCard";

export function Countries({
    countries,
    loading,
    loadCountries,
    searchByName,
    loadActivities,
    activities,
    continents,
    loadContinents,
    countryError
}) {

    const [page, setPage] = useState(0)
    const queryParams = []

    useEffect(() => {
        loadCountries()
        loadActivities()
        loadContinents()
    }, [loadCountries, loadActivities, loadContinents])

    const paginatedCountries = () => {
        return countries.slice(page, page === 0 ? page + 9 : page + 10)
    }

    const nextPage = () => {
        if (countries.length > page + 10) {
            setPage(page => page + 10)
        }
    }
    const prevPage = () => {
        if (page > 0) {
            setPage(page => page - 10)
        }
    }
    const searchCountries = (e) => {

        if (e.target.value.length) {
            let name = e.target.value
            name = name[0].toUpperCase() + name.slice(1)
            searchByName(name)
        }
    }

    const onSearch = () => {
        setPage(0)
        loadCountries(queryParams)
    }

    const searchByContinent = (e) => {
        console.log(e.target.value);

        if (e.target.value.length) {
            queryParams.push({ continent: e.target.value })
        } else {
            loadCountries()
        }
    }
    const searchByActividad = (e) => {
        console.log(e.target.value);

        if (Number(e.target.value) > 0) {
            queryParams.push({ activityId: Number(e.target.value) })
        } else {
            loadCountries()
        }
    }
    const orderBy = (e) => {
        const order = e.target.value
        switch (order) {
            case 'Nombre: A - Z':
                queryParams.push({ orderByName: 'ASC' })
                // orderByName('ASC')
                break;
            case 'Nombre: Z - A':
                queryParams.push({ orderByName: 'DESC' })
                // orderByName('DESC')
                break;
            case 'Poblacion: Asc.':
                queryParams.push({ orderByPopulation: 'ASC' })
                // orderByPopulation('ASC')
                break;
            case 'Poblacion: Desc.':
                queryParams.push({ orderByPopulation: 'DESC' })
                // orderByPopulation('DESC')
                break;
            default:
                loadCountries()
                break;
        }
        console.log(e.target.value);
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <SearchCountries onSearch={searchCountries} />
                </div>
                {
                    continents.length > 0 && (
                        <div className="col">
                            <ComboBoxContinente label={'Filtrar por continente'}
                                onSelected={searchByContinent}
                                data={continents} />
                        </div>
                    )
                }
                {
                    activities.length > 0 && (
                        <div className="col">
                            <ComboBoxActividad label="Filtrar por actividad"
                                onSelected={searchByActividad}
                                data={activities} />
                        </div>
                    )
                }
                <div className="col">
                    <ComboBoxOrdenamiento
                        label={'Ordenamientos'}
                        onSelected={orderBy}
                        data={[
                            'Nombre: A - Z',
                            'Nombre: Z - A',
                            'Poblacion: Asc.',
                            'Poblacion: Desc.'
                        ]} />
                </div>
                <div className="col">
                    <SearchButton onSearch={onSearch} />
                </div>
            </div>
            {
                countryError && (
                    <div className="row">
                        <span className={styles.errorMessage}>{countryError}</span>
                    </div>
                )
            }
            {
                countries && countries.length > 0 && (
                    <div className="row">
                        <Pagination onNextPage={nextPage} onPrevPage={prevPage} />
                    </div>
                )
            }
            {
                loading && (
                    <div className="col">
                        <Loader />
                    </div>
                )
            }
            <div className="row">
                {
                    countries && paginatedCountries().map((c, i) => (
                        <div key={i} className="col">
                            <CountryCard
                                id={c.id}
                                name={c.name}
                                continent={c.continent}
                                flag={c.flag}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        countries: state.countryReducer.countries,
        loading: state.countryReducer.loading,
        activities: state.activityReducer.activities,
        continents: state.countryReducer.continents,
        countryError: state.countryReducer.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCountries: (queryParams) => dispatch(getAllCountries(queryParams)),
        searchByName: (name) => dispatch(filterCountriesByName(name)),
        loadActivities: () => dispatch(getActivities()),
        loadContinents: () => dispatch(getContinents()),
        // filterByActivity: (activityId) => dispatch(filterByActivity(activityId)),
        // filterByContinent: (continent) => dispatch(filterByContinent(continent)),
        // orderByName: (order) => dispatch(orderByName(order)),
        // orderByPopulation: (order) => dispatch(orderByPopulation(order)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries)
