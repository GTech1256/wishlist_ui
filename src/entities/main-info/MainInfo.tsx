import styles from './MainInfo.module.scss'

export const MainInfo = () => {
    const { total, public2, complete } = { total: 0, public2: 0, complete: 0 }

    return (
        <div className={styles.wrapper}>
            <div className={styles.item}>
                <p className={styles.value}>{total}</p>
                <p className={styles.title}>Всего желаний</p>
            </div>

            <div className={styles.item}>
                <p className={styles.value}>{public2}</p>
                <p className={styles.title}>Публичных желаний</p>
            </div>

            <div className={styles.item}>
                <p className={styles.value}>{complete}</p>
                <p className={styles.title}>Завершенных желаний</p>
            </div>
        </div>
    )
}