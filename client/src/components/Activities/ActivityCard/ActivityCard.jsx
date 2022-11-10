import styles from './ActivityCard.module.css';

export default function ActivityCard({ name, difficulty, duration }) {
    return (
        <div className={styles.card}>
            <span className={styles.cardTitle}>{name}</span>
            <hr className={styles.cardDivider} />
            <span className={styles.cardText}>Dificultad</span>
            <span>{difficulty}</span>
            <hr className={styles.cardDivider} />
            <span className={styles.cardText}>Duracion: {duration} min.</span>
        </div>
    )
}