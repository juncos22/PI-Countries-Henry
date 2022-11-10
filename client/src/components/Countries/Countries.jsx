import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { usePagination } from "../../hooks/paginationHook";
import { getAllCountries } from "../../redux/actions/countryActions";
import ComboBoxContinente from "../ComboBox/ComboBox";
import ComboBoxActividad from '../ComboBox/ComboBox';
import ComboBoxOrdenamiento from '../ComboBox/ComboBox';
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import SearchCountries from "../SearchCountries/SearchCountries";
import CountryCard from "./CountryCard/CountryCard";

export function Countries({ countries, loading, loadCountries }) {

    useEffect(() => {
        loadCountries()
    }, [loadCountries])
    const [page, setPage] = useState(1)
    const pageSize = 10
    const pageCount = Math.ceil(countries.length / pageSize)
    const pagination = usePagination(countries, pageSize)

    const handlePage = (e, page) => {
        console.log(page);
        setPage(page)
        pagination.jump(page)
    }

    const searchCountries = (e) => {
        console.log(e.target.value);
    }
    const searchByContinent = (e) => {
        console.log(e.target.value);
    }
    const searchByActividad = (e) => {
        console.log(e.target.value);
    }
    const orderBy = (e) => {
        console.log(e.target.value);
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <SearchCountries onSearch={searchCountries} />
                </div>
                <div className="col">
                    <ComboBoxContinente onSelected={searchByContinent} data={
                        ['Continente 1',
                            'Continente 2',
                            'Continente 3']} />
                </div>
                <div className="col">
                    <ComboBoxActividad onSelected={searchByActividad} data={
                        ['Actividad 1',
                            'Actividad 2',
                            'Actividad 3']} />
                </div>
                <div className="col">
                    <ComboBoxOrdenamiento onSelected={orderBy} data={[
                        'Nombre: A - Z',
                        'Nombre: Z - A',
                        'Poblacion: Asc.',
                        'Poblacion: Desc.'
                    ]} />
                </div>
            </div>
            {
                countries && countries.length > 0 && (
                    <div className="row">
                        <Pagination count={pageCount} page={page} onChange={handlePage} />
                    </div>
                )
            }
            <div className="row">
                {
                    loading && <Loader />
                }
                {
                    pagination.actualData().map((c, i) => (
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
        loading: state.countryReducer.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCountries: () => dispatch(getAllCountries())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries)
