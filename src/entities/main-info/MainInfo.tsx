import { useGetUserStatsDataQuery } from 'shared/api/api'
import styles from './MainInfo.module.scss'
import Spinner from 'shared/ui/spinner'

export const MainInfo = () => {

    const { data, isLoading, isError } = useGetUserStatsDataQuery()

    if (data) {
        const { wishComplete, wishPublic, wishTotal } = data!

        return (
            <div className={styles.wrapper}>
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
            </div>
        )
    }

    if (isLoading) {
        return (<div className={styles.wrapper}>
            <Spinner />
        </div>
        )
    }

    if (isError) {
        return (<div className={styles.wrapper}>
            <p>Произошла ошибка</p>
        </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            ****
        </div>
    )
}