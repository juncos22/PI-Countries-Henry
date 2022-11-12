import styles from './ComboBox.module.css';

export default function ComboBox({ label, onSelected, data }) {
    return (
        label.endsWith('continente')
            ? (
                <select className={styles.comboBox}
                    name="continent"
                    onChange={onSelected}>
                    <option value={''}>{label}</option>
                    {
                        data.map((d, i) => (
                            <option key={i} className={styles.listItem} value={d}>{d}</option>
                        ))
                    }
                </select>
            ) : label.endsWith('actividad') ? (
                <select className={styles.comboBox}
                    name="id"
                    onChange={onSelected}>
                    <option value={0}>{label}</option>
                    {
                        data && data.map((d, i) => (
                            <option key={i} className={styles.listItem} value={d.id}>{d.name}</option>
                        ))
                    }
                </select>
            ) : (
                <select className={styles.comboBox}
                    name="order"
                    onChange={onSelected}>
                    <option value={''}>{label}</option>
                    {
                        data && data.map((d, i) => (
                            <option key={i} className={styles.listItem} value={d}>{d}</option>
                        ))
                    }
                </select>
            )
    )
}