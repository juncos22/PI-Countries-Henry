import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
    return (
        <div className={styles.nav}>
            <div className={styles.navBrand}>
                <img className={styles.brandLogo} src={'./logo.jpg'} alt="logo" />
            </div>
            <ul className={styles.navItems}>
                <li className={styles.navItem}>
                    <Link to={'/countries'} className={styles.navLink}>Inicio</Link>
                </li>
                <li className={styles.navItem}>
                    <Link to={'/activities'} className={styles.navLink}>Nueva Actividad</Link>
                </li>
            </ul>
        </div>
    )
}