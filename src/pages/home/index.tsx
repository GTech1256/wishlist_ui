import { MainInfo } from "../../entities/main-info/MainInfo"
import { MainRoutes } from "../../entities/main-routes/MainRoutes"
import { MyList } from "../../features/my-list/MyList"
import styles from './index.module.scss';

export const HomePage = () => {
    return (
        <div>
            <MainInfo />
            <div className={styles.mt16}>
                <MainRoutes />
            </div>
            <div className={styles.mt16}>
                <MyList />
            </div>
        </div>
    )
}