import styles from './SearchButton.module.css';

export default function SearchButton({ onSearch }) {
    return (
        <button className={styles.btnSearch} onClick={onSearch}>
            <div className={styles.btnContent}>
                <span>Buscar</span>
                <img src={'./search.svg'} alt="search" width={25} height={25} />
            </div>
        </button>
    )
}