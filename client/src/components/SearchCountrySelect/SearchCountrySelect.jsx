import { useState } from 'react';
import styles from './SearchCountrySelect.module.css';

export default function SearchCountrySelect({ onSearch }) {
    const [countryName, setCountryName] = useState("")
    return (
        <div className={styles.searchContent}>
            <input onKeyDown={(e) => onSearch(e, countryName)}
                className={styles.searchInput} type="text"
                name='countryName'
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                placeholder="Buscar por nombre..." />
        </div>
    )
}