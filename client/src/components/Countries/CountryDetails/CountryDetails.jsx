import { useEffect } from "react"
import { connect } from "react-redux"
import { findCountryById } from "../../../redux/actions/countryActions"
import ActivityCard from "../../Activities/ActivityCard/ActivityCard"
import styles from './CountryDetails.module.css';

export function CountryDetails({ id, countryDetail, getCountryById }) {
    useEffect(() => {
        getCountryById(id)
    }, [id, getCountryById])

    return (
        <div>
            <div className={styles.row}>
                <div className={styles.col}>
                    <h1 className={styles.title}>{countryDetail.name} ({countryDetail.id})</h1>
                    <div className={`row`}>
                        <div className="col">
                            <h3 className={styles.subTitle}>{countryDetail.continent}</h3>
                        </div>
                        <div className="col">
                            <span className={styles.subTitle}>-</span>
                        </div>
                        <div className="col">
                            <h3 className={styles.subTitle}>{countryDetail.capital}</h3>
                        </div>
                    </div>
                    <span className={styles.details}>Subregión: {countryDetail.subRegion}</span>
                    <span className={styles.details}>Área: {countryDetail.area}</span>
                    <span className={styles.details}>Población: {countryDetail.population} habitantes</span>
                </div>
                <div className={styles.col}>
                    <img className={styles.detailImg} src={countryDetail.flag} alt={countryDetail.name} />
                </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.col}>
                {
                    countryDetail.Activities?.length > 0
                        ? <h3 className={styles.title}>Actividades Turisticas</h3>
                        : <h3 className={styles.title}>No hay actividades disponibles</h3>
                }
                <div className="row">
                    {
                        countryDetail.Activities?.length > 0
                        && countryDetail.Activities?.map((a, i) => (
                            <div key={i} className="col">
                                <ActivityCard
                                    name={a.name}
                                    difficulty={a.difficulty}
                                    duration={a.duration} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        countryDetail: state.countryReducer.countryDetail
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getCountryById: (id) => dispatch(findCountryById(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CountryDetails)