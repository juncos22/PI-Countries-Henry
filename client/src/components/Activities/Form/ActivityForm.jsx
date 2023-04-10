import styles from '../Activities.module.css';
import React from 'react';

export default function ActivityForm() {
    return (
        <form className={styles.formContent}>
            <div className="row">
                <div className="col">
                    <label className={styles.inputLabel} htmlFor="name">Nombre de la actividad</label>
                    <input type="text"
                        id="name"
                        className={`${styles.inputForm}`}
                        name="name"
                        placeholder="Nombre de la actividad"
                    />

                    <label className={styles.inputLabel}
                        htmlFor="difficulty">Dificultad</label>
                    <input type="number"
                        className={`${styles.inputForm}`}
                        id="difficulty"
                        name="difficulty"
                        placeholder={"Dificultad"}
                    />


                    <label className={styles.inputLabel}
                        htmlFor="duration">Duraction (min.)</label>
                    <input type="number"
                        className={`${styles.inputForm}`}
                        id="duration"
                        name="duration"
                        max={100000}
                        placeholder="Duracion (min.)"
                    />

                    <label className={styles.inputLabel}
                        htmlFor="season">Temporada</label>

                    <select name="season"
                        id="season"
                        className={`${styles.inputSelect}`}>
                        <option value="">Temporada</option>

                    </select>

                    <button className={styles.btnForm}>Guardar Actividad</button>
                </div>
            </div>
        </form>
    )
}