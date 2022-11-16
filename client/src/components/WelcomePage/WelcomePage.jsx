import { Link } from 'react-router-dom';
import styles from './WelcomePage.module.css';

export default function WelcomePage() {

    return (
        <div className={styles.welcomeContent}>
            <h1 className={styles.welcomeTitle}>Bienvenido <br /> al PI - COUNTRIES!</h1>
            <Link to={'/countries'}>
                <button className={styles.welcomeButton}>Ingresar</button>
            </Link>
            <div className="row">
                <div className="col">
                    <a href={'https://www.instagram.com/niko26_____/'} rel='noreferrer' target={'_blank'}>
                        <img className={styles.redesIcons} src="./ig.svg" alt="instagram" width={50} />
                    </a>
                </div>
                <div className="col">
                    <a href={'https://www.github.com/juncos22'} rel='noreferrer' target={'_blank'}>
                        <img className={styles.redesIcons} src="./github.svg" alt="github" width={50} />
                    </a>
                </div>
                <div className="col">
                    <a href={'https://www.linkedin.com/in/nicolas-juncos/'} rel='noreferrer' target={'_blank'}>
                        <img className={styles.redesIcons} src="./linkedin.svg" alt="linkedin" width={50} />
                    </a>
                </div>
            </div>
            <span className={styles.copyText}>Copyright &copy; Nicolas Juncos - {new Date().getFullYear()}</span>
        </div>
    )
}