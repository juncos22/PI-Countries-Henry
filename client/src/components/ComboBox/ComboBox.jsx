import styles from './ComboBox.module.css';

export default function ComboBox({ onSelected, data }) {
    return (
        <select className={styles.comboBox}
            name="value"
            onChange={onSelected}>
            {
                data && data.map((d, i) => (
                    <option key={i} className={styles.listItem} value={d}>{d}</option>
                ))
            }
        </select>
    )
}