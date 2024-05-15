import { useGetUserStatsDataQuery, UserStats } from 'shared/api/api'
import styles from './MainInfo.module.scss'
import { Spin } from 'antd'
import { Stats } from './Stats'
import { useEffect } from 'react'

const defaultUserStats: UserStats = {
    wishComplete: 0,
    wishPublic: 0,
    wishTotal: 0
}
export const MainInfo = () => {
    const { data, isLoading, isError, refetch } = useGetUserStatsDataQuery()

    useEffect(() => {
        refetch()
    }, [refetch])

    if (data) {

        return (
            <div className={styles.wrapper}>
                <Stats {...data} />
            </div>
        )
    }

    if (isLoading) {
        return (
            <Spin tip="Загрузка">
                <div className={styles.wrapper}>
                    <Stats {...defaultUserStats} />
                </div>
            </Spin>
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