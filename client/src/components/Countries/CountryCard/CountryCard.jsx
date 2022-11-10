import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css';

export default function CountryCard({ id, name, continent, flag }) {
    return (
        <div className={styles.card}>
            <img className={styles.cardImg} src={flag} alt={name} />
            <div className={styles.cardContent}>
                <span className={styles.cardTitle}>{name.length > 20 ? `${name.substring(0, 20)}...` : name}</span>
                <span className={styles.cardText}>{continent}</span>
                <Link to={`/countries/${id}`}>
                    <button className={styles.cardBtn}>Detalles</button>
                </Link>
            </div>
        </div>
    )
}