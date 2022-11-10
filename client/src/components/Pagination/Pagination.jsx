import styles from './Pagination.module.css';

export default function Pagination({ count, onChange }) {
    return (
        <div className={styles.paginationContent}>
            <ul className={styles.paginationItems}>
                {
                    range(0, count + 1, 1).map(i => (
                        i === 0 ? (
                            <li key={i} onClick={(e) => onChange(e, 1)} className={styles.paginationItem}>
                                <img src={'./leftArrow.svg'} width={25} alt="arrowLeft" />
                            </li>
                        ) :
                            i > count ? (
                                <li key={i} onClick={(e) => onChange(e, count)} className={styles.paginationItem}>
                                    <img src={'./rightArrow.svg'} width={25} alt="arrowRight" />
                                </li>
                            ) : (
                                <li key={i} onClick={(e) => onChange(e, i)} className={styles.paginationItem}>{i}</li>
                            )
                    ))
                }
            </ul>
        </div >
    )
}

function range(from, to, step = 1) {
    let i = from
    const rangeArr = []
    while (i <= to) {
        rangeArr.push(i)
        i += step
    }
    return rangeArr
}