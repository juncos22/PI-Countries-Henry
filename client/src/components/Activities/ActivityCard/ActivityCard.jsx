import styles from './ActivityCard.module.css';

export default function ActivityCard({ name, difficulty, duration }) {
    return (
        <div className={styles.card}>
            <span className={styles.cardTitle}>{name}</span>
            <hr className={styles.cardDivider} />
            <span className={styles.cardText}>Dificultad</span>
            <div className="row">
                {
                    range(1, difficulty).map(d => (
                        <span key={d} className={styles.difficultyRating}></span>
                    ))
                }
            </div>
            <hr className={styles.cardDivider} />
            <span className={styles.cardText}>Duración: {duration} min.</span>
        </div>
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