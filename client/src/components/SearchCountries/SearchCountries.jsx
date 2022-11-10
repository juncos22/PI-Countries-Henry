import styles from './SearchCountries.module.css';

export default function SearchCountries({ onSearch }) {

    return (
        <input type="text" name='countryName' onChange={onSearch} className={styles.searchInput} placeholder="Buscar por nombre..." />
    )
}