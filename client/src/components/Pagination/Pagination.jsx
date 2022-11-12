import styles from './Pagination.module.css';

export default function Pagination({ onNextPage, onPrevPage }) {
    return (
        <div className={styles.paginationContent}>
            <ul className={styles.paginationItems}>
                <li onClick={onPrevPage} className={styles.paginationItem}>
                    <img src={'./leftArrow.svg'} width={30} alt="arrowLeft" />
                </li>
                <li onClick={onNextPage} className={styles.paginationItem}>
                    <img src={'./rightArrow.svg'} width={30} alt="arrowRight" />
                </li>
            </ul>
        </div >
    )
}