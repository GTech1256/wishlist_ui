import { Fragment } from "react/jsx-runtime"
import styles from './MainInfo.module.scss'

type Props = {
    wishTotal: number;
    wishPublic: number;
    wishComplete: number;
}

export const Stats = ({ wishComplete, wishPublic, wishTotal}:  Props) => (
    <Fragment>
        <div className={styles.item}>
            <p className={styles.value}>{wishTotal}</p>
            <p className={styles.title}>Всего желаний</p>
        </div>

        <div className={styles.item}>
            <p className={styles.value}>{wishPublic}</p>
            <p className={styles.title}>Публичных желаний</p>
        </div>

        <div className={styles.item}>
            <p className={styles.value}>{wishComplete}</p>
            <p className={styles.title}>Завершенных желаний</p>
        </div>
    </Fragment>
)