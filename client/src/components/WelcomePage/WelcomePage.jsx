import { Link } from 'react-router-dom';
import styles from './WelcomePage.module.css';

export default function WelcomePage() {

    return (
        <div className={styles.welcomeContent}>
            <h1 className={styles.welcomeTitle}>Bienvenido <br /> al Sitio!</h1>
            <Link to={'/countries'}>
                <button className={styles.welcomeButton}>Ingresar</button>
            </Link>
        </div>
    )
}